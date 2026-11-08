# AgentLoop

Animated plan → act → observe → reflect cycle showing which phase an agent is in.

## When to use
Explaining how agents work (onboarding, docs, sales demos) and live run headers for autonomous agents.

## How it works
`.x-loop`: dashed SVG ring with a runner dot; four `.x-loop-node` labels; the current one is `.is-active` (agent fill, scaled). Centre shows the iteration count.

## Motion
Runner travels the ring (~6s per loop); phase pops with a spring. Reduced motion: static diagram, active phase highlighted.

## Accessibility
`role="img"` describes the loop and current iteration; live runs also show AgentStatus text.

## Core equivalent
AIWorkflow / AgentRunSteps.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
