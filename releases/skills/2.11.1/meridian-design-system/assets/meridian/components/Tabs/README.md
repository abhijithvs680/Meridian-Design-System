# Tabs

Switch between views of ONE record or dataset, under the PageHeader.

## When to use
Sections of a detail page, or saved views on a list page. Not for steps (use a wizard) or unrelated areas (use Sidebar).

## Anatomy
`.m-tabs` (`role="tablist"`) → `.m-tab` buttons with optional `.m-tab-count`; each controls a `role="tabpanel"`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| default | `m-tabs` | 2–6 tabs |
| with count | `.m-tab-count` | Items needing review in that tab |

## States
| State | How it looks / how to set it |
| --- | --- |
| Rest | `fg-muted` |
| Hover | `fg` |
| Selected | `aria-selected="true"` → 2px `tab-indicator` |
| Focus | Focus ring |
| Overflow | Scrolls horizontally on small screens |

## Accessibility
WAI-ARIA tabs: arrow keys move between tabs, Tab moves into the panel. Selected state uses `aria-selected`, not color only (underline).

## Do and don't
- Do: keep labels to 1–2 nouns; put "Agent log" last.
- Don't: use tabs for forms that must be completed in order.

## OpenUI
`Tabs(tabs, selected?)`
