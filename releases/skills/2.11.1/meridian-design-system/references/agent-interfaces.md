# Agent interfaces

## Choose the input by task

| Context | Specimen | Treatment |
| --- | --- | --- |
| Ask about the current record | [AI Composer](../assets/meridian/components/AIComposer/preview.html) | One line inside the record. Keep model, mode, and record inclusion under task settings. |
| Run a quick command | [Command Composer](../assets/meridian/components/CommandComposer/preview.html) | One line with an action beside the input. |
| Reply to a conversation | [Context Composer](../assets/meridian/components/ContextComposer/preview.html) | One line, grows with the draft, with attachments beside the action. |
| Research, structured brief, or drafting | [Research](../assets/meridian/components/ResearchComposer/preview.html), [Brief](../assets/meridian/components/BriefComposer/preview.html), [Canvas](../assets/meridian/components/CanvasComposer/preview.html) | Multiline with only the controls relevant to that task. |

Reuse `components/composer.css` and the form markup. [composer.js](../assets/meridian/components/composer.js) shows the local event contract. It emits `meridian:compose` with `text`, `files`, `model`, `mode`, and `context`, then simulates a local handoff. For production, wire equivalent inputs to the host's transport, attachment handling, draft state, and cancellation. Preserve Shift+Enter, composition input, and accessible names for icon buttons.

## Show what the agent is doing

Use [Agent Status](../assets/meridian/components/AgentStatus/preview.html) inline. Name the active work when known, such as “Reviewing invoices.” Show a step count only with a reliable total. Reserve amber for decisions and red for failures, with plain text in both cases. In a run view, connect steps to evidence, visible limits, a review of the exact proposed change, and a receipt. Follow [the agent contracts](../assets/meridian/docs/agent-contracts.md) for state and approval boundaries.

## Integrate the runtime when needed

Use the [Operations Studio](../assets/meridian/patterns/operations-studio.html) as a reference for a real run inspector. The portable modules are `operations/runtime.mjs` and `operations/inspector.mjs`. The host owns authentication, authorization, and execution. Bind decisions to the exact proposal revision, reconcile ambiguous retries using idempotency, and distinguish decision receipts from execution results. Follow [the integration guide](../assets/meridian/docs/operations-integration.md) for event projection, replay, and mount hooks.

For a project already using OpenUI, inspect [the actual adapter schemas](../assets/meridian/openui/library.tsx). `AIComposer` defaults to compact and accepts an optional `layout` of `expanded`. For other stacks, reuse HTML and CSS or adapt them to the host's components.
