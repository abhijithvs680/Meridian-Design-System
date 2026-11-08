# SegmentedControl

A compact single-choice switch for 2–5 options that change a view immediately.

## When to use
Chart ranges, list/board views, billing period. For form values that are submitted, use Radio or Select.

## Anatomy and variants
`.m-segmented` track with `button`s (`role="radio"`, `aria-checked`). Billing toggle = segmented with a discount badge.

## States
Rest muted; hover `fg`; selected raised on `surface` with `shadow-raised`.

## Accessibility
`role="radiogroup"` with a label; arrow keys move and select.

## OpenUI
`SegmentedControl(options, value)`
