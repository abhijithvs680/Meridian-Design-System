# StatCard

A single KPI: label, value, and what changed against a stated period.

## When to use
The KPI row at the top of a dashboard (3–4 cards, never more than 6).

## Anatomy
`.m-stat` → `.m-stat-label` → `.m-stat-value` (`text-metric`, tabular) → `.m-delta` with direction and comparison period. Lay out with `.m-stat-grid`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| with delta | `.m-delta.up` / `.down` | Metrics with a comparison |
| with context | `.m-delta` with only a `<span>` | Counts that need a note instead of a trend |

## States
| State | How it looks / how to set it |
| --- | --- |
| Loaded | Value + delta |
| Loading | `aria-busy="true"`, skeletons sized like the value |
| Error | Value "—" and help text "Couldn't load"; never 0 |
| Interactive | Wrap in a link to the filtered list it summarises |

## Accessibility
The delta is text ("▲ 12.4% vs last month"), not color alone. Abbreviated values (₹48.2L) expose the exact value via `title` or tooltip.

## Do and don't
- Do: state the period on every delta; color by good/bad (rising costs are red).
- Don't: show a delta with no comparison period.

## OpenUI
`StatCard(label, value, delta?, deltaLabel?, trend?)`
