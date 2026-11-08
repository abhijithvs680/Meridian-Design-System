# Select

Choose one value from a list of 3–15 options.

## When to use
Up to ~15 known options. 2–4 options that should be visible: Radio. Long or searchable lists: a combobox (Select with search).

## Anatomy
Same field anatomy as TextField: `.m-field` → `.m-label` → `.m-select` → `.m-help`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| native | `<select class="m-select">` | Forms and filters; best mobile behaviour |
| searchable | Combobox built on the same tokens | Customers, products, any list over 15 |

## States
| State | How it looks / how to set it |
| --- | --- |
| Rest / hover / focus | Same tokens as TextField |
| Error | `aria-invalid="true"` |
| Disabled | `disabled` |

## Accessibility
Prefer native `<select>`; a custom listbox must follow the WAI-ARIA combobox pattern. Placeholder option reads as an instruction ("Choose a branch").

## Do and don't
- Do: sort options logically (alphabetical, or by frequency).
- Don't: use a select for two options.

## OpenUI
`Select(label, name, options, value?)`
