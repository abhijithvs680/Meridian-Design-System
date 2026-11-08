# FilterChips

Chip group (multi-select toggles) and Rating.

## When to use
Quick filters above lists; tagging. Rating for feedback and review scores.

## Anatomy and variants
`.m-filter-chip` buttons with `aria-pressed`; `.is-dashed` for "Add filter". `.m-rating` stars (`.on` filled).

## States
Pressed: `primary-soft` fill, `primary-text`.

## Accessibility
Chips are toggle buttons. A read-only rating is an image with "4 out of 5"; an input rating is a radio group.

## OpenUI
`FilterChips(options, selected) · Rating(value, max?)`
