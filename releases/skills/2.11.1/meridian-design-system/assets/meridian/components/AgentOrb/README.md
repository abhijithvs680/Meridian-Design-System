# AgentOrb

Meri, Meridian's agent character: an original slate orb crossed by the meridian arc, with eyes that show state.

## When to use
Agent empty states, onboarding, the voice/agent panel header, and success or error moments, so the agent has a consistent, friendly presence. One per screen.

## How it works
Inline SVG `.x-orb` with `data-state`: idle (floats, blinks), thinking (meridian spins, eyes look up), listening (halo breathes), waiting (amber), done (green, eyes smile), error (red, eyes lower). Size with `--size`.

## Motion
4s float, occasional blink, 1.8s spin when thinking. Reduced motion: static pose per state.

## Accessibility
`role="img"` with the state in words. Never the only indicator of state; pair with AgentStatus text.

## Core equivalent
`.m-agent-avatar`.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
