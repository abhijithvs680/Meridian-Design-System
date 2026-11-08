# ButtonGroup

Button group, split button, copy button and hold-to-confirm: compound buttons built from Button.

## When to use
Group: 2–4 related actions or a single-choice view switch. Split: a default action plus alternatives. Copy: copying IDs, links, keys. Hold to confirm: an irreversible action outside a dialog (delete workspace).

## Anatomy and variants
`.m-btn-group` of `.m-btn`s (`role="group"`, `aria-pressed` for toggles). Split: `.m-btn-group.is-split` (+ `.is-primary`) with a chevron button that opens a Menu. Copy: swaps to `.is-copied` "Copied" for 2s. Hold: `.m-hold` with `--p` fill driven by a 1.5s press.

## States
Copy: idle → copied (2s) → idle. Hold: progress fills while pressed; releasing early resets; keyboard holds Space.

## Accessibility
Toggle groups use `aria-pressed`. The split chevron has its own `aria-label`. Copy announces "Copied" via `aria-live`. Hold-to-confirm also accepts a long Space press and shows the remaining time as text for screen readers.

## OpenUI
`ButtonGroup(buttons) · SplitButton(label, action, options)`
