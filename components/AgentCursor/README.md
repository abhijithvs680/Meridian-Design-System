# AgentCursor

A labelled cursor that shows an agent working inside the UI: moving between fields and typing, while the user watches.

## When to use
Smart form fill, agent-driven edits on shared screens, "show me how" walkthroughs. Makes agent actions legible instead of magical.

## How it works
`.x-cursor` (pointer + agent name tag) positioned over the form; the active field gets `.x-typing` (agent ring) while text appears.

## Motion
700ms glide between fields, ~22 characters/s. Reduced motion: values appear without travel.

## Accessibility
The cursor is `aria-hidden`; a visible note (also `aria-describedby`) says the agent is filling the form. Fields remain editable and the user can stop it.

## Core equivalent
EnrichColumn / smart form fill.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
