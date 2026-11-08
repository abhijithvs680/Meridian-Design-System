# Meridian / AI builder contract

Meridian 2.8.0 is a framework-neutral CSS system, static component examples, and an existing OpenUI adapter. It is not a universal React package. Prefer the shipped patterns over inventing new styles.

## Identity
Calm, precise, accountable. Warm neutral surfaces; ink blue for primary actions; slate for agent identity, with inline text for activity and semantic colors for exceptions. Inter with system sans fallback; JetBrains Mono with monospace fallback for identifiers. Use tabular figures for numbers. Default body 14px; a 4px spacing grid. Core app cards are flat with borders. Large editorial type and original illustrations belong in onboarding and marketing, not dense record tables.

## Assembly
Load `tokens.css`, then `components/bundle.css`. Add `components/premium.css` for the 2.8 composition patterns. `components/expressive.css` remains optional. Never replace semantic colors with arbitrary hex values. Set `lang`, `dir` and `data-theme` at the document root. Apply `data-density="compact"` where required. Use logical CSS properties.

Read `catalog/data.json` for the actual component inventory and `assets/manifest.json` for available assets. Preview paths are real files. The 2.8 patterns have usage documents beside their previews. They are not automatically registered in `openui/library.tsx`; compose existing primitives or implement a typed adapter. Do not fabricate imports.

## Task-first composition
- Business: page heading → KPI summary → filters → record table → contextual details.
- Agent: user intent → scope and limits → observable run steps → source-linked output → concrete review → decision receipt.
- Marketing: navigation → clear value proposition → product evidence → pricing → next action → useful footer.
- Administration: workspace context → members/roles → integrations → usage → audit trail.

## Interaction and safety contracts
Every control needs a working handler or an explicit read-only/demo treatment. Production state comes from the server. Never claim a connector, agent run, email or payment succeeded from a local click. Do not expose secret keys. Require the consuming app's authorization and approval rules for writes. Bind a decision to the exact proposal version and use an idempotency key. Show provenance rather than invented confidence. Display concise decision summaries; do not request or expose hidden chain-of-thought.

## Accessibility
Use native HTML before custom ARIA. Label controls, preserve visible focus, use headings in order, provide textual status and reduced-motion behavior. Tables need captions and header scopes. Dialogs need a label, Escape handling and restored focus. Test both themes, RTL, narrow layouts, keyboard and zoom. The provided checklist is a target, not a certification of every downstream composition.

## Content
Sentence case, concrete actions, locale-formatted numbers and dates. A failure explains what happened and the next useful step. Distinguish fictional sample data from live data. Avoid decorative badges, unsupported social proof and claims of universal superiority.
