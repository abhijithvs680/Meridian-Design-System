# NumberInput

Number, money, phone and percent inputs: one input group with prefixes, suffixes and steppers.

## When to use
Quantities (stepper), currency amounts (money), phone numbers with country code, rates and percentages.

## Anatomy and variants
`.m-input-group` + `.m-affix` (prefix/suffix; `.is-sep` adds a divider) + optional `.m-stepper-input` buttons. Numbers right-aligned, tabular.

## States
Format on blur (₹1,24,500.00), raw while editing; min/max errors via `aria-invalid`.

## Accessibility
Use `inputmode` for the right mobile keyboard. Stepper buttons are labelled. The unit is part of the accessible name ("Amount in INR").

## OpenUI
`NumberInput(label, value?, prefix?, suffix?, step?)`
