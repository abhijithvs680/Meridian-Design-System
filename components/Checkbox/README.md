# Checkbox

Checkbox, Radio and Switch: the three choice controls, sharing one style.

## When to use
Checkbox: independent yes/no in a form, or row selection. Radio: one of 2–5 visible options. Switch: a setting that applies immediately.

## Anatomy
`.m-check` / `.m-switch` label → native `<input>` → label text. The whole label is the hit target.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| checkbox | `<label class="m-check"><input type="checkbox">` | Form options, multi-select rows |
| radio | `<input type="radio">` in `.m-check` | Mutually exclusive choices |
| switch | `<label class="m-switch"><input type="checkbox" role="switch">` | Instant on/off settings; no Save button needed |

## States
| State | How it looks / how to set it |
| --- | --- |
| Unchecked | `input-border` outline |
| Checked | `control-checked-bg` + `control-checked-fg` mark |
| Indeterminate | `el.indeterminate = true` (select-all with partial selection) |
| Focus | Focus ring on the input |
| Disabled | `disabled`; label goes `fg-disabled` |

## Accessibility
Native inputs keep keyboard and screen-reader support. Group radios in a `<fieldset>` with a `<legend>`. A switch must take effect immediately and announce its new state.

## Do and don't
- Do: phrase labels positively ("Send copy"), not negatively.
- Don't: use a switch inside a form that has a Save button.

## OpenUI
`Checkbox(label, name, checked?) · Radio(label, name, options) · Switch(label, name, checked?)`
