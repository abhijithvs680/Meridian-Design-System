# LivePill

A compact, always-visible island that grows to show what an agent is doing in the background, then shrinks back.

## When to use
Long-running agent work the user should be able to ignore: imports, reconciliations, report generation. One per app, top-centre or bottom-centre.

## How it works
`.x-pill` (collapsed = orb only) → `.is-open` expands to title, sub-status and a progress bar. `.is-wait` turns the orb warning when the agent needs you; `.is-done` turns it success, then it collapses after 4s. Click opens the run.

## Motion
Width and height spring (420ms, `--ease-spring`); text rises in after 120ms; the orb pings while running. Reduced motion: no ping, instant resize.

## Accessibility
`role="status"` + `aria-live="polite"`: announces "Billing agent: drafting 4 reminders" on change, not every percent. It is a button when clickable.

## Core equivalent
AgentStatus pill + AgentRunSteps.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
