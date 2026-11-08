# ThemeSwitcher

Light / System / Dark switch, a Segmented control bound to `data-theme`.

## When to use
Settings › Appearance and the user menu. System is the default.

## Anatomy and variants
`.m-segmented` with three radio buttons; sets `data-theme` on `<html>` and stores the choice.

## States
Selected: raised white segment. Applies instantly; no Save.

## Accessibility
A `radiogroup`; arrow keys move the selection.

## OpenUI
`ThemeSwitcher(value?)`
