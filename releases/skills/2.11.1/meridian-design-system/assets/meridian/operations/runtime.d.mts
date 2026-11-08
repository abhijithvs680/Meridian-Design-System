type Envelope = { runId: string; seq: number; at: string };
export type ToolStep = Envelope & {
  type: 'step.recorded'; stepId: string; label: string; detail: string;
  status: 'running' | 'succeeded' | 'failed';
} & ({ effect: 'read' } | { effect: 'write'; receiptId: string });
export type Evidence = Envelope & { type: 'evidence.added'; sourceId: string; title: string; version: string; excerpt: string };
export type Proposal = Envelope & {
  type: 'approval.requested'; proposalId: string; revision: number; action: string;
  target: string; before: string; after: string; impact: string; expiresAt: string; sourceIds: string[];
};
export type Receipt = Envelope & {
  type: 'approval.resolved'; proposalId: string; revision: number;
  decision: 'approved' | 'rejected' | 'expired'; actor: string; receiptId: string;
};
export type TerminalStatus = 'completed' | 'cancelled' | 'failed';
export type RunEvent = ToolStep | Evidence | Proposal | Receipt | (Envelope & (
  { type: 'run.started'; limitCents: number }
  | { type: 'cost.recorded'; spentCents: number }
  | { type: 'run.finished'; status: TerminalStatus; message: string }
));
export type RunState = {
  runId: string; cursor: number; status: 'queued' | 'running' | 'awaiting-approval' | TerminalStatus;
  steps: ToolStep[]; sources: Evidence[]; proposal: Proposal | null;
  receipt: Receipt | null; spentCents: number; limitCents: number; audit: RunEvent[]; message: string;
};
export type DecisionCommand = {
  runId: string; proposalId: string; revision: number;
  decision: 'approved' | 'rejected'; idempotencyKey: string;
};
export class RunEventError extends Error {
  constructor(code: string, message: string);
  code: string;
}
export function createRun(runId: string): RunState;
export function applyRunEvent(state: RunState, event: RunEvent): RunState;
export function createDecision(state: RunState, decision: DecisionCommand['decision'], idempotencyKey: string, now?: number): DecisionCommand;
