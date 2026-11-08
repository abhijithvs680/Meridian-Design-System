# PageHeader

The top of every page: where you are, what this is, what you can do.

## When to use
Every page. One per page.

## Anatomy
`.m-pagehead` → left: `.m-crumbs` breadcrumb + `.m-pagetitle` (`h1`, optional badge) → right: `.m-actions` (agent, secondary, then primary rightmost).

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| list | title + count badge + New | List pages |
| detail | breadcrumb › record name + status badge | Detail pages |
| dashboard | title + date-range Select + Export | Dashboards |

## States
| State | How it looks / how to set it |
| --- | --- |
| Wraps | Actions wrap below the title under 768px; overflow beyond 3 actions goes into a Menu |

## Accessibility
One `<h1>` per page, here. Breadcrumb is a `<nav aria-label="Breadcrumb">` with `aria-current="page"` on the last item.

## Do and don't
- Do: keep 3 actions or fewer, primary rightmost.
- Don't: repeat the page title inside the first card.

## OpenUI
`PageHeader(title, breadcrumb?, actions?)`
