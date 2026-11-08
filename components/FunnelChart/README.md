# FunnelChart

Funnel for stage conversion. Sankey, radar and streamgraph follow the same card and token rules.

## When to use
Pipelines and conversion flows with 3–6 stages.

## Anatomy and variants
`.m-funnel-row` grid: stage label, centered bar sized by value, count right-aligned; the final stage may use `success`.

## States
Hover shows conversion % from the previous stage.

## Accessibility
Summarise each stage in the label; conversion percentages available as text.

## OpenUI
`FunnelChart(title, stages)`
