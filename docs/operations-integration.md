# Integrate the run inspector

The Operations Studio demonstrates a finance agent reading a ledger, proposing a specific adjustment, pausing for human review, and reporting the execution outcome. Its three scenarios cover a proposed write, connector failure with retry, and approval expiry. Disconnect and reconnect to exercise replay while a run continues in the simulated transport.

## Install locally

Use the release tarball with `npm install ./meridian-design-system-2.9.1.tgz`. The package contains CSS and the typed ES modules for the run projector and inspector. The full ZIP adds the catalog, source templates, assets, and design guidance. Serve the ZIP contents with `npm run preview` to run the module-based Studio.

## Use a real transport

Copy the inspector regions and their `data-run-*` hooks from `patterns/operations-studio.html`. Import the three stylesheets and connect the view to your authenticated application.

```js
import 'meridian-design-system/tokens.css';
import 'meridian-design-system/bundle.css';
import 'meridian-design-system/operations.css';
import { createRun, applyRunEvent, createDecision } from 'meridian-design-system/run-runtime';
import { mountRunInspector } from 'meridian-design-system/run-inspector';
```

1. Initialize with the server-issued run ID and mount the inspector with an `onDecision` handler.
2. Map your transport into the exported `RunEvent` union. Apply events in sequence with `applyRunEvent`, then call `inspector.render(state, { connected, pending })`. On a sequence gap, keep the last snapshot visible and resume from its cursor. Keep transport state separate from run state.
3. On review, use `createDecision` to bind the decision to the exact proposal revision. Submit through the signed-in user's authenticated transport. Retain the idempotency key on ambiguous failures and reconcile the server receipt before retrying.
4. Project the server's decision receipt and tool outcomes as separate events. Display completion after the run reports an outcome. Refresh the inspector when the proposal deadline passes.

## Event semantics

| Event | Visible result |
| --- | --- |
| `run.started` | A running trace and a budget limit |
| `step.recorded` | A tool summary with progress, success or failure |
| `cost.recorded` | Cumulative run spend in integer USD cents |
| `evidence.added` | Versioned source excerpt for review |
| `approval.requested` | Exact target, before and after values, impact, sources and expiry |
| `approval.resolved` | A receipt tied to the proposal revision |
| `run.finished` | A terminal result and an operator-facing message |

## Deployment responsibilities

Treat this as a client projection of an authenticated backend event log. The service owns reviewer identity, authorization, budget enforcement, idempotency, replay storage, concurrency and tool execution. Cap retained event history and paginate audit views for long runs. Render source excerpts as untrusted text and omit secrets before events reach the client.

The event contract is Meridian-specific. An AG-UI, AI SDK or assistant-ui integration needs a translation layer. The studio uses local fictional records. The renderer treats event text as text and accepts decisions only through the supplied callback. The JSON export is the client's observed trace, while an authoritative audit record belongs on the server.
