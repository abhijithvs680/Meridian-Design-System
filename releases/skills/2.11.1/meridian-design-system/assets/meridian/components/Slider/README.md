# Slider

Slider for one value, and a range slider with a histogram showing how data is distributed.

## When to use
Thresholds, limits and numeric filters where an approximate value is fine. Exact values: pair with a NumberInput.

## Anatomy and variants
Native `input[type=range].m-slider` with `--v` fill; label row shows the value. Range: two thumbs over `.m-histogram` bars (`.in` = inside range).

## States
Hover/drag enlarge thumb; focus ring; disabled muted.

## Accessibility
Native range input: arrows step, Page Up/Down jump, Home/End. Value text via `aria-valuetext` ("₹20k to ₹1.5L").

## OpenUI
`Slider(label, value, min, max, step?)`
