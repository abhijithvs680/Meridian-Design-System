const terminal = new Set(['completed', 'cancelled', 'failed']);
const requiredText = value => typeof value === 'string' && value.trim().length > 0;

export class RunEventError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'RunEventError';
    this.code = code;
  }
}

function requireEvent(condition, message) {
  if (!condition) throw new RunEventError('invalid-event', message);
}

export function createRun(runId) {
  requireEvent(requiredText(runId), 'A run ID is required.');
  return {
    runId, cursor: 0, status: 'queued',
    steps: [], sources: [], proposal: null, receipt: null,
    spentCents: 0, limitCents: 0, audit: [], message: ''
  };
}

/**
 * Project trusted, ordered server events. A gap leaves the prior state intact.
 * Replay from state.cursor to recover. This reducer never executes a tool.
 */
export function applyRunEvent(state, incoming) {
  requireEvent(incoming?.runId === state.runId, 'Event belongs to a different run.');
  requireEvent(Number.isSafeInteger(incoming.seq) && incoming.seq > 0, 'Invalid sequence.');
  if (incoming.seq <= state.cursor) return state;
  if (incoming.seq !== state.cursor + 1) {
    throw new RunEventError('sequence-gap', 'Replay required from cursor ' + state.cursor + '.');
  }
  requireEvent(requiredText(incoming.at) && Number.isFinite(Date.parse(incoming.at)), 'Invalid timestamp.');
  const event = structuredClone(incoming);
  const next = { ...state, cursor: event.seq, audit: [...state.audit, event] };

  switch (event.type) {
    case 'run.started':
      requireEvent(state.status === 'queued', 'Run already started.');
      requireEvent(Number.isSafeInteger(event.limitCents) && event.limitCents > 0, 'Invalid budget.');
      return { ...next, status: 'running', limitCents: event.limitCents };
    case 'step.recorded': {
      requireEvent(state.status === 'running', 'Tool steps require a running run.');
      requireEvent([event.stepId, event.label, event.detail].every(requiredText), 'Tool step fields are required.');
      requireEvent(['running', 'succeeded', 'failed'].includes(event.status), 'Unknown tool state.');
      requireEvent(['read', 'write'].includes(event.effect), 'Tool step must declare its effect.');
      if (event.effect === 'write') {
        requireEvent(state.receipt?.decision === 'approved' && state.receipt.receiptId === event.receiptId,
          'Write step requires the corresponding approval receipt.');
      }
      const previous = state.steps.find(step => step.stepId === event.stepId);
      requireEvent(!previous || previous.status === 'running', 'A terminal tool step cannot change.');
      requireEvent(!previous || previous.effect === event.effect, 'Tool effect cannot change.');
      const steps = previous
        ? state.steps.map(step => step.stepId === event.stepId ? event : step)
        : [...state.steps, event];
      return { ...next, steps };
    }
    case 'cost.recorded':
      requireEvent(state.status === 'running', 'Cost update requires a running run.');
      requireEvent(Number.isSafeInteger(event.spentCents) && event.spentCents >= state.spentCents, 'Spend must be cumulative.');
      return { ...next, spentCents: event.spentCents };
    case 'evidence.added':
      requireEvent(state.status === 'running', 'Evidence requires a running run.');
      requireEvent([event.sourceId, event.title, event.version, event.excerpt].every(requiredText), 'Evidence needs a version and excerpt.');
      requireEvent(!state.sources.some(source => source.sourceId === event.sourceId), 'Evidence ID already exists.');
      return { ...next, sources: [...state.sources, event] };
    case 'approval.requested':
      requireEvent(state.status === 'running' && !state.proposal, 'An active proposal already exists or run is unavailable.');
      requireEvent([event.proposalId, event.action, event.target, event.before, event.after, event.impact].every(requiredText), 'Proposal requires exact impact.');
      requireEvent(Number.isSafeInteger(event.revision) && event.revision > 0, 'Invalid proposal revision.');
      requireEvent(Date.parse(event.expiresAt) > Date.parse(event.at), 'Invalid proposal expiry.');
      requireEvent(Array.isArray(event.sourceIds) && event.sourceIds.length > 0 &&
        event.sourceIds.every(id => state.sources.some(source => source.sourceId === id)), 'Proposal references missing evidence.');
      return { ...next, status: 'awaiting-approval', proposal: event };
    case 'approval.resolved': {
      const proposal = state.proposal;
      requireEvent(state.status === 'awaiting-approval' && proposal?.proposalId === event.proposalId &&
        proposal.revision === event.revision, 'Decision does not match the active proposal.');
      const expired = Date.parse(event.at) >= Date.parse(proposal.expiresAt);
      requireEvent(expired ? event.decision === 'expired' : ['approved', 'rejected'].includes(event.decision), 'Decision conflicts with proposal expiry.');
      requireEvent([event.actor, event.receiptId].every(requiredText), 'Decision requires an actor and receipt ID.');
      return {
        ...next, status: event.decision === 'approved' ? 'running' : 'cancelled',
        proposal: null, receipt: event,
        message: event.decision === 'approved' ? 'Decision recorded. Waiting for execution outcome.' : 'Proposal closed. No write was authorized.'
      };
    }
    case 'run.finished':
      requireEvent(state.status === 'running' || (state.status === 'awaiting-approval' && event.status !== 'completed'), 'Run cannot finish from this state.');
      requireEvent(terminal.has(event.status) && requiredText(event.message), 'Outcome and message required.');
      requireEvent(event.status !== 'completed' || state.steps.every(step => step.status !== 'running'), 'A tool is still running.');
      return { ...next, status: event.status, message: event.message, proposal: null };
    default:
      throw new RunEventError('invalid-event', 'Unknown event type.');
  }
}

/** Build a command for your authenticated transport. Retry with the same key. */
export function createDecision(state, decision, idempotencyKey, now = Date.now()) {
  const proposal = state.proposal;
  if (state.status !== 'awaiting-approval' || !proposal) {
    throw new RunEventError('no-proposal', 'No proposal is awaiting review.');
  }
  if (!Number.isFinite(now) || now >= Date.parse(proposal.expiresAt)) {
    throw new RunEventError('expired', 'This proposal has expired. Refresh before deciding.');
  }
  if (!['approved', 'rejected'].includes(decision) || !requiredText(idempotencyKey)) {
    throw new RunEventError('invalid-decision', 'A decision and idempotency key are required.');
  }
  return {
    runId: state.runId, proposalId: proposal.proposalId,
    revision: proposal.revision, decision, idempotencyKey
  };
}
