# ResponseFeedback

Feedback and utility actions under an agent answer, with generation stats.

## When to use
Every agent answer (actions appear on hover/focus on desktop, always on touch).

## Anatomy and variants
`.m-feedback` ghost icon buttons (good, bad, copy, regenerate) + `.m-stats-line` (steps, time, tokens, cost). Bad opens a reason popover with chips.

## States
Selected rating `aria-pressed`; after sending: "Thanks, this helps improve the agent".

## Accessibility
Icon buttons are labelled; stats are plain text.

## OpenUI
`ResponseFeedback(stats?)`
