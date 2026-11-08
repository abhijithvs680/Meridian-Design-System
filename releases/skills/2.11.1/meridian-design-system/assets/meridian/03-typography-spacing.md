# Typography and spacing

## Type scale
One family (Inter) on a tight scale tuned for data-dense UI. Body is 14px; line heights sit on the 4px grid.

| Style | Size / line | Weight | Use |
| --- | --- | --- | --- |
| `text-display` | 28 / 36 | 600, −2% tracking | Dashboard or report title, max one per page |
| `text-title` | 20 / 28 | 600, −1% | Page title (`h1` in PageHeader) |
| `text-heading` | 16 / 24 | 600 | Card, section and dialog titles |
| `text-body` | 14 / 20 | 400 | Default UI text, tables, forms, messages |
| `text-body-strong` | 14 / 20 | 500 | Labels, buttons, emphasized cells |
| `text-small` | 13 / 18 | 400 | Descriptions, helper text, breadcrumbs |
| `text-caption` | 12 / 16 | 500 | Badges, column headers, axis labels; never paragraphs |
| `text-metric` | 28 / 32 | 600, tabular | KPI values |
| `text-mono` | 12.5 / 20 | 400 mono | IDs, tool calls, logs, code |

Rules:
- Use `font-variant-numeric: tabular-nums` for every number that sits in a column or updates live.
- Max line length 72 characters for prose (agent answers, descriptions).
- No text smaller than 12px. No weights other than 400, 500, 600. No italics for emphasis; use weight.
- Agent messages use the same body style as the rest of the UI: they are part of the product, not a different voice.
- Fallback stack: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Noto Sans", sans-serif`. Non-Latin scripts switch to their Noto family by `:lang()` (see Localization). Load Inter with `display=swap`; self-host the WOFF2 files in production.

## Spacing scale
A 4px base grid. Use only these steps:

| Token | px | Typical use |
| --- | --- | --- |
| `space-1` | 4 | Icon–label gap inside badges |
| `space-1-5` | 6 | Label → input |
| `space-2` | 8 | Gap between related controls, icon–label in buttons |
| `space-3` | 12 | Table cell padding, toolbar padding |
| `space-4` | 16 | Form field gap, compact card padding, mobile gutter |
| `space-5` | 20 | Card padding |
| `space-6` | 24 | Card grid gap, desktop gutter, header → content |
| `space-8` | 32 | Between page sections |
| `space-10` | 40 | Large dashboard section padding |
| `space-12` | 48 | Empty-state padding |
| `space-16` | 64 | Sparse pages only |

Rhythm rule: **inside a component use 4–16px, between components 16–24px, between sections 32px+.** Related things sit closer than unrelated things.

## Sizes
| Token | Value | Use |
| --- | --- | --- |
| `control-sm` / `-md` / `-lg` | 28 / 34 / 40px | Control heights |
| `row-height` | 44px (36 compact) | Table rows |
| `sidebar-width` | 240px (56 rail) | App sidebar |
| `topbar-height` | 52px | Top bar |
| `agent-panel-width` | 400px | Docked agent panel |

## Density
`data-density="compact"` on any container switches to 36px rows, 28px controls and 16px card padding. Offer it as a user setting for power users; default to comfortable.

## Layout grid
- 12 columns, gap `gap-grid` (24px), content max width 1440px, centered.
- Common splits: 12 (tables), 6 + 6 (two charts), 8 + 4 (main + side), 4 × 3 (KPI row).
- Forms: single column, max 640px.
