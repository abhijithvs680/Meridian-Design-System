# DataTable

Search, filter, sort, select and act on records. The workhorse of business apps.

## When to use
Any collection of more than ~5 records with comparable fields. For 1–5 items with rich content, use a list of Cards.

## Anatomy
`.m-table-wrap` → `.m-toolbar` (search, filters, selection count, secondary actions) → `.m-table-scroll` → `.m-table` (`thead` on `table-header-bg`, rows) → `.m-pagination`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| default | `m-table` | 44px rows |
| compact | `[data-density="compact"]` | 36px rows for power users |
| selectable | leading checkbox column + `aria-selected` rows | Bulk actions |
| responsive | `hide-sm` on low-priority columns | Phones keep ID, name, status |

## States
| State | How it looks / how to set it |
| --- | --- |
| Row hover | `table-row-hover` |
| Row selected | `aria-selected="true"` → `table-row-selected` |
| Sorted column | `aria-sort` on `<th>`, arrow in label |
| Loading | 5 skeleton rows with real column widths |
| Empty | EmptyState inside the wrap; filtered-empty offers "Clear filters" |
| Error | Alert (danger) with Retry in place of the body |

## Accessibility
Real `<table>` with `<th scope="col">`. Sortable headers are buttons inside `<th>` with `aria-sort`. Row actions have unique labels ("Actions for INV-2040"). Keep the header sticky.

## Do and don't
- Do: right-align numbers, use mono for IDs, make the first column open the record.
- Don't: put the page's primary action in the toolbar, or show more than 8 columns.

## OpenUI
`Table(columns, rows, searchable?, filters?, selectable?, pageSize?)`
