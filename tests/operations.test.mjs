import test from 'node:test';
import assert from 'node:assert/strict';
import { applyRunEvent, createDecision, createRun } from '../operations/runtime.mjs';

const at = '2026-11-08T12:00:00.000Z';
const expiresAt = '2026-11-08T12:05:00.000Z';
const runId = 'example-run';
const event = (seq, type, fields) => ({ seq, type, at, runId, ...fields });
const start = event(1, 'run.started', { limitCents: 150 });
const evidence = event(2, 'evidence.added', {
  sourceId: 'invoice', title: 'Invoice record', version: 'v18', excerpt: 'Duplicate processing fee'
});
const request = event(3, 'approval.requested', {
  proposalId: 'P-01', revision: 2, action: 'Adjust invoice', target: 'INV-1042',
  before: '$1,480.00', after: '$1,455.00', impact: 'One adjustment',
  expiresAt, sourceIds: ['invoice']
});
const receipt = event(4, 'approval.resolved', {
  proposalId: 'P-01', revision: 2, actor: 'Reviewer', receiptId: 'D-01', decision: 'approved'
});
const waitingRun = () => [start, evidence, request].reduce(applyRunEvent, createRun(runId));

test('replay tolerates duplicate delivery and detects gaps without advancing the cursor', () => {
  const running = applyRunEvent(createRun(runId), start);
  assert.equal(applyRunEvent(running, start), running);
  assert.throws(() => applyRunEvent(running, request), { code: 'sequence-gap' });
  assert.equal(running.cursor, 1);
  assert.equal(applyRunEvent(applyRunEvent(running, evidence), request).status, 'awaiting-approval');
  assert.throws(() => applyRunEvent(running, { ...evidence, runId: 'different-run' }), { code: 'invalid-event' });
});

test('approval binds exact revision, blocks expiry, and waits for the execution result', () => {
  const state = waitingRun();
  assert.deepEqual(createDecision(state, 'approved', 'client-key', Date.parse(at)), {
    runId, proposalId: 'P-01', revision: 2, decision: 'approved', idempotencyKey: 'client-key'
  });
  assert.throws(() => createDecision(state, 'approved', 'client-key', Date.parse(expiresAt)), { code: 'expired' });
  assert.throws(() => applyRunEvent(state, { ...receipt, revision: 1 }), { code: 'invalid-event' });
  assert.throws(() => applyRunEvent(state, { ...receipt, at: expiresAt }), { code: 'invalid-event' });
  const approved = applyRunEvent(state, receipt);
  assert.equal(approved.status, 'running');
  const write = event(5, 'step.recorded', {
    stepId: 'write', label: 'Write invoice', detail: 'Pending write', status: 'running',
    effect: 'write', receiptId: 'D-01'
  });
  assert.throws(() => applyRunEvent(approved, { ...write, receiptId: 'other-receipt' }), { code: 'invalid-event' });
  const writing = applyRunEvent(approved, write);
  assert.throws(() => applyRunEvent(writing, event(6, 'run.finished', { status: 'completed', message: 'Recorded.' })), { code: 'invalid-event' });
  const written = applyRunEvent(writing, { ...write, seq: 6, status: 'succeeded' });
  const completed = applyRunEvent(written, event(7, 'run.finished', { status: 'completed', message: 'Recorded.' }));
  assert.equal(completed.status, 'completed');
});

test('rejected and expired proposals close the run and cannot start a write', () => {
  for (const decision of ['rejected', 'expired']) {
    const state = applyRunEvent(waitingRun(), { ...receipt, decision, at: decision === 'expired' ? expiresAt : at });
    assert.equal(state.status, 'cancelled');
    assert.throws(() => applyRunEvent(state, event(5, 'step.recorded', {
      stepId: 'write', label: 'Write invoice', detail: 'Attempted write', status: 'running'
    })), { code: 'invalid-event' });
  }
});
