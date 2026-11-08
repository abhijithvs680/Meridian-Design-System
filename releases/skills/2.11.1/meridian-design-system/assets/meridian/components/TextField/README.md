# TextField

A labelled single-line input or multi-line textarea, with helper or error text.

## When to use
Free-text entry. For a fixed list of options use Select; for yes/no use Checkbox or Switch.

## Anatomy
`.m-field` (label element) → `.m-label` (+ optional `<small>(optional)</small>`) → `.m-input` or `.m-textarea` → `.m-help`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| input | `m-input` | Single-line text, numbers, email, dates |
| textarea | `m-textarea` | Multi-line notes; min 88px, vertical resize |
| compact | `[data-density="compact"]` on an ancestor | 28px inputs in dense admin screens |

## States
| State | How it looks / how to set it |
| --- | --- |
| Rest | `input-border` |
| Hover | `input-border-hover` |
| Focus | `input-border-focus` + focus ring |
| Error | `aria-invalid="true"` → `input-border-error`; help text turns `danger-text` and says how to fix |
| Read-only | `readonly` → sunken fill; value stays selectable/copyable |
| Disabled | `disabled` → sunken fill, muted text; avoid where read-only works |

## Accessibility
Every input has a visible `<label>`. Link help/error text with `aria-describedby`. Errors are announced (`aria-live="polite"` on the form error summary). Never use placeholder as label.

## Do and don't
- Do: validate on blur, show the format in helper text, mark optional fields.
- Don't: validate on every keystroke, star required fields, or clear input on error.

## OpenUI
`TextField(label, name, placeholder?, helper?, type?, required?)`
