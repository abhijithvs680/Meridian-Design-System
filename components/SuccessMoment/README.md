# SuccessMoment

A brief, restrained celebration for meaningful completions: a check that draws itself, two ripples and a ring of sparks.

## When to use
The end of a real milestone: first agent approval, import finished, month closed, onboarding complete. Not for routine saves (use Toast).

## How it works
`.x-success` → SVG `.x-success-mark` (disc pops, tick draws, ripples and 8 sparks expand once) → title and next-step text.

## Motion
Plays once (~1.2s total). Reduced motion: static green check, no ripples or sparks.

## Accessibility
`role="status"` announces the title; nothing flashes more than 3 times per second.

## Core equivalent
Toast (success) / EmptyState.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
