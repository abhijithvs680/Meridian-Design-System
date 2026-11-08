# EmptyState

What a list, table or dashboard shows before it has data: an invitation, not an apology.

## When to use
First-run empty lists; no results after filtering; no permission.

## Anatomy
`.m-empty` → heading (next step) → one sentence → 1–2 buttons.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| first run | headline = first action | New workspaces |
| no results | "No invoices match these filters" + Clear filters | Filtered lists |
| no access | "You don't have access to Billing" + Ask an admin | Permissions |

## States
| State | How it looks / how to set it |
| --- | --- |
| Static | — |

## Accessibility
Heading level fits the page outline. Buttons are real buttons.

## Do and don't
- Do: offer the agent path when an agent can do the work.
- Don't: say "Nothing here yet" or show a sad illustration.

## OpenUI
`EmptyState(title, description, actions?)`
