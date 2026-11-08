# BarChart

Charts live in a Card and draw series with `chart-1…6` in order. This preview shows a stacked bar; the rules cover all chart types.

## When to use
Change over time → line. Compare categories → bar (horizontal for long labels). Part of whole with ≤4 parts → stacked bar. Never pie with more than 4 slices; never 3D.

## Anatomy
Card (title states the question, description gives the unit) → legend top-right → plot → axis labels in `text-caption` `fg-subtle` → 1px baseline.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| bar / stacked bar | Recharts or ECharts themed from tokens | Categories, composition |
| line / area | same | Trends; max 4 lines |
| sparkline | inline in StatCard or table cell | Trend hint without axes |

## States
| State | How it looks / how to set it |
| --- | --- |
| Hover | Tooltip with exact values for all series at that x |
| Loading | Skeleton block at chart height |
| Empty | "No data for this period" + change-range action |
| Error | Alert inside the card |

## Accessibility
Give every chart a text alternative (`role="img"` + `aria-label` summarising the trend) and offer "View as table". Series are distinguishable by lightness, not hue alone; label lines directly when possible.

## Do and don't
- Do: one question per chart, units in the description.
- Don't: use status colors for categories, or library default palettes.

## OpenUI
`BarChart(title, labels, series, stacked?) · LineChart(title, labels, series)`
