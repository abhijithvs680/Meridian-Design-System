# Combobox

Searchable select (combobox) and multi-select, for long or dynamic option lists.

## When to use
More than ~15 options, remote data (customers, products), or picking several values.

## Anatomy and variants
Input group (`role="combobox"`) → `.m-popover.is-flush` → `.m-listbox` with `.m-option-group` headings and `.m-option`s (meta in `small`, check mark when selected, "Create …" last). Multi-select shows chips in `.m-tags`.

## States
Highlighted option `data-highlighted`; selected `aria-selected`; loading row; "No customers match" empty row.

## Accessibility
WAI-ARIA combobox: `aria-expanded`, `aria-activedescendant`, arrow keys, Enter selects, Esc closes.

## OpenUI
`Combobox(label, options, value?, multiple?, creatable?)`
