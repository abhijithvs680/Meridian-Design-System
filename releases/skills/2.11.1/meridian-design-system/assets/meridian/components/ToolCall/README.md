# ToolCall

One tool call an agent made: what it did in plain words, the tool, arguments, result and timing.

## When to use
Inside AgentRunSteps details, the Agent log tab, and debugging views.

## Anatomy and variants
`.m-ai-card` → `.m-ai-head` (tool icon, plain-language title, tool name muted, result badge, duration) → optional `.m-ai-body.is-mono` arguments/result, collapsed by default.

## States
Running (shimmer title), done (result badge), needs approval (warning), failed (danger + Retry).

## Accessibility
Collapsible body is a disclosure button; result badges carry words.

## OpenUI
`ToolCall(title, tool, status, args?, result?, durationMs?)`
