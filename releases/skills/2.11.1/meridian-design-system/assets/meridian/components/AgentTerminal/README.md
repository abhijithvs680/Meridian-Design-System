# AgentTerminal

A streaming, terminal-style log of an agent run, for technical users who want to watch the raw steps.

## When to use
Developer and admin views, run detail pages, debugging. Business users see AgentRunSteps instead.

## How it works
`.x-term` (always dark, independent of theme) → header with live pulse and run id → body with typed lines coloured by kind: `.dim` time, `.ag` agent, `.ok`, `.warn`, and a blinking `.x-caret`.

## Motion
Characters type at ~70/s with pauses between lines. Reduced motion: full log shown at once, caret still.

## Accessibility
The body is a polite live region announcing completed lines, not characters. Colours always paired with ✓/⚠ symbols.

## Core equivalent
AgentRunSteps, ToolCall.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
