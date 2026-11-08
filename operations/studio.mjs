import { applyRunEvent, createDecision, createRun } from './runtime.mjs';
import { mountRunInspector } from './inspector.mjs';

const byId = id => document.getElementById(id);
const scenario = byId('scenario');
const runAction = byId('run-action');
const connection = byId('connection');
const cancel = byId('cancel-run');
const auditExport = byId('export-audit');
let state;
let events;
let connected;
let pending;
let runNumber = 0;
let timer;
let expiryTimer;

const inspector = mountRunInspector(document.querySelector('.mo-shell'), { onDecision: decide });

function render() {
  inspector.render(state, { connected, pending });
  byId('run-id').textContent = state.runId;
  byId('connection-label').textContent = connected ? 'Stream connected' : 'Disconnected · last known state';
  connection.textContent = connected ? 'Disconnect' : 'Reconnect';
  runAction.textContent = state.status === 'failed' ? 'Retry in new run' : 'Start run';
  runAction.disabled = !connected || !['queued', 'failed'].includes(state.status);
  cancel.disabled = !connected || pending || !['running', 'awaiting-approval'].includes(state.status);
  auditExport.disabled = state.audit.length === 0;
}

function receive() {
  if (!connected) return;
  for (const event of events.slice(state.cursor)) {
    state = applyRunEvent(state, event);
  }
  render();
}

function emit(type, fields = {}) {
  events.push({ type, runId: state.runId, seq: events.length + 1, at: new Date().toISOString(), ...fields });
  receive();
}

function reset() {
  clearTimeout(timer);
  clearTimeout(expiryTimer);
  state = createRun('RUN-' + String(241 + runNumber++));
  events = [];
  connected = true;
  pending = false;
  byId('run-name').textContent = scenario.selectedOptions[0].textContent;
  byId('run-feedback').textContent = '';
  render();
}

function prepareReview(expiresAfter) {
  emit('step.recorded', {
    stepId: 'ledger.lookup', label: 'Look up invoice INV-1042', status: 'succeeded', effect: 'read',
    detail: 'Read-only query returned the invoice and a duplicate fee line.'
  });
  emit('evidence.added', {
    sourceId: 'LEDGER-1042', title: 'Invoice ledger · INV-1042', version: 'snapshot v18',
    excerpt: 'Processing fee P-021 appears twice on the same invoice. Both rows reference receipt RCPT-882.'
  });
  emit('evidence.added', {
    sourceId: 'POLICY-12', title: 'Duplicate charge policy', version: 'revision 4',
    excerpt: 'A finance reviewer must approve every ledger adjustment before it is applied.'
  });
  emit('cost.recorded', { spentCents: 14 });
  emit('approval.requested', {
    proposalId: state.runId + '/P-01', revision: 1,
    action: 'Remove duplicate processing fee', target: 'INV-1042 · line P-021-B',
    before: '$1,480.00 invoice total', after: '$1,455.00 invoice total',
    impact: 'One ledger adjustment · $25.00 reduction',
    sourceIds: ['LEDGER-1042', 'POLICY-12'],
    expiresAt: new Date(Date.now() + expiresAfter).toISOString()
  });
  expiryTimer = setTimeout(() => resolve('expired', 'Simulation clock'), expiresAfter);
}

function start({ seeded = false, recovered = false } = {}) {
  const mode = scenario.value;
  emit('run.started', { limitCents: 150 });
  emit('step.recorded', {
    stepId: 'ledger.lookup', label: 'Look up invoice INV-1042', status: 'running', effect: 'read',
    detail: 'Checking the ledger snapshot for duplicate charges.'
  });
  if (seeded) {
    prepareReview(15 * 60_000);
    return;
  }
  timer = setTimeout(() => {
    if (mode === 'failure' && !recovered) {
      emit('step.recorded', {
        stepId: 'ledger.lookup', label: 'Look up invoice INV-1042', status: 'failed', effect: 'read',
        detail: 'The finance connector timed out before returning a result.'
      });
      emit('run.finished', { status: 'failed', message: 'Connector timed out. No ledger change was requested.' });
    } else {
      prepareReview(mode === 'expiry' ? 4000 : 15 * 60_000);
    }
  }, 650);
}

function resolve(decision, actor) {
  const proposal = events.find(event => event.type === 'approval.requested');
  if (!proposal || events.some(event => ['approval.resolved', 'run.finished'].includes(event.type))) return;
  emit('approval.resolved', {
    proposalId: proposal.proposalId, revision: proposal.revision,
    decision, actor, receiptId: state.runId + '/D-01'
  });
}

function decide(decision) {
  if (pending || !connected) return;
  let command;
  try {
    command = createDecision(state, decision, state.proposal.proposalId + '/decision');
  } catch (error) {
    byId('run-feedback').textContent = error.message;
    render();
    return;
  }
  pending = true;
  render();
  timer = setTimeout(() => {
    pending = false;
    // A simulated server acknowledgement remains tied to the proposal revision.
    const proposal = events.find(event => event.type === 'approval.requested');
    if (proposal?.revision !== command.revision || proposal.proposalId !== command.proposalId) return;
    clearTimeout(expiryTimer);
    if (events.some(event => event.type === 'approval.resolved')) {
      render();
      return;
    }
    if (Date.now() >= Date.parse(proposal.expiresAt)) {
      resolve('expired', 'Simulation clock');
      return;
    }
    resolve(command.decision, 'Finance reviewer');
    if (command.decision === 'approved') {
      emit('step.recorded', {
        stepId: 'ledger.adjust', label: 'Apply approved adjustment', status: 'running',
        effect: 'write', receiptId: state.runId + '/D-01',
        detail: 'Simulated write queued after the review receipt was recorded.'
      });
      timer = setTimeout(() => {
        emit('step.recorded', {
          stepId: 'ledger.adjust', label: 'Apply approved adjustment', status: 'succeeded',
          effect: 'write', receiptId: state.runId + '/D-01',
          detail: 'Simulation recorded a $25.00 adjustment for INV-1042.'
        });
        emit('run.finished', { status: 'completed', message: 'Simulated adjustment complete. No external ledger was changed.' });
      }, 700);
    }
  }, 350);
}

scenario.addEventListener('change', reset);
byId('reset-run').addEventListener('click', reset);
runAction.addEventListener('click', () => {
  const recovered = state.status === 'failed';
  if (recovered) reset();
  start({ recovered });
});
connection.addEventListener('click', () => {
  connected = !connected;
  const missed = events.length - state.cursor;
  byId('run-feedback').textContent = connected
    ? 'Reconnected. Replayed ' + missed + ' events from the last cursor.'
    : 'Stream paused. The simulated run can continue in the background.';
  receive();
  render();
});
cancel.addEventListener('click', () => {
  clearTimeout(timer);
  clearTimeout(expiryTimer);
  emit('run.finished', { status: 'cancelled', message: 'Run cancelled in simulation.' });
});
auditExport.addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(state.audit, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = state.runId + '-audit.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

reset();
start({ seeded: true });
