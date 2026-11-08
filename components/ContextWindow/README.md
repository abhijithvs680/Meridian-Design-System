# ContextWindow

How much of the model's context an agent session is using, by category; includes prompt cache stats.

## When to use
Admin and developer views, long agent sessions, debugging cost or quality.

## Anatomy and variants
`.m-meter-row` label + "used / limit" → `.m-ctx-bar` stacked segments (chart tokens) → legend → `.m-stats-line`.

## States
≥ 80% turns the label warning; at the limit, say what will be summarised or dropped.

## Accessibility
Segment values are in the legend as text.

## OpenUI
`ContextWindow(used, limit, segments)`
