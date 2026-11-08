# DonutChart

Donut (part of whole, ≤4 parts), gauge (one value against a target) and waffle charts.

## When to use
Mix/share with 2–4 parts; a single KPI against a goal. More parts: use a bar chart.

## Anatomy and variants
SVG ring with 2px gaps between segments, total in the center, legend with values beside it. Gauge: 180° track + value arc colored by status.

## States
Hover a segment to highlight it and its legend row.

## Accessibility
Legend repeats every value as text; the chart has a summary label.

## OpenUI
`DonutChart(title, segments) · Gauge(label, value, target?)`
