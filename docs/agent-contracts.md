# Agent UI integration contracts

## Run lifecycle
Use server-issued IDs and ordered event sequence numbers. States: ready → running → completed / failed / cancelled; running ↔ paused; running → awaiting approval → running. A disconnected stream is a separate connectivity condition, not proof that a run stopped. Reconnect using the last acknowledged event ID and deduplicate repeats. Surface cancel-pending until the server confirms cancellation. Never restart an irreversible tool call merely because its response was lost.

Each run carries actor identity, workspace, scope, model deployment alias, budget, start time, state, event cursor and artifact references. Bound logs, paginate history and redact secrets before rendering. Status summaries explain observable work, not hidden reasoning.

## Proposal and decision
The minimum write proposal includes `proposalId`, `revision`, `runId`, `action`, exact target IDs, before/after values, side effects, source references, expiry and reversibility. Decisions include the signed-in actor, expected revision, idempotency key and approve/reject outcome. The server checks membership, role, proposal expiry, revision and target state in one transactional boundary. A stale proposal must be reviewed again. A client checkbox or disabled button is never authorization.

On submission disable duplicate decisions and announce pending state. If the request fails, show a retry path using the same idempotency key. On an ambiguous timeout, reconcile the decision receipt before retrying. The server receipt identifies the action, actor, time and final outcome; approval does not itself prove execution succeeded.

## Sources and artifacts
Evidence includes stable document ID, version, retrieved timestamp, permission-checked link and exact excerpt. Generated claims should be mapped to evidence. An unavailable or untrusted source is shown as such. Retrieved document instructions are content, not executable user intent. Generated artifacts are drafts until the relevant human review or policy permits publication.

## Budget and policies
Enforce spend, tool-call count, duration and connector scope server-side across retries and parallel actions. The UI shows used, reserved and remaining budget, currency, reset period and overrun behavior. Fail closed when permissions or budget cannot be verified for a write. Model routing policy should make fallback and data residency visible.

## Required UI states
Design and test loading, empty, running, waiting, paused, completed, failed, cancelled, stale, expired, no-permission, reconnecting, retrying and partially-completed outcomes. Preserve successful artifacts on partial failure and identify which side effects have already occurred.

The shipped controller demonstrates a subset of local interaction states. It is not a production agent orchestrator. `premium-state.mjs` supplies small pure transition utilities, not server policy enforcement.
