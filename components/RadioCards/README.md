# RadioCards

Radio options presented as cards, for choices that need a description.

## When to use
Plans, deployment regions, model choices, onboarding paths: 2–4 options a user compares.

## Anatomy and variants
`.m-radio-cards` grid of `label.m-radio-card` wrapping a hidden native radio, a bold title and a description.

## States
Hover `fg-subtle` border; checked `primary` border + `primary-soft` fill; focus ring on the card.

## Accessibility
Native radios stay in the DOM (visually hidden), so keyboard and screen readers work. Group in a `radiogroup` with a label.

## OpenUI
`RadioCards(name, options, value?)`
