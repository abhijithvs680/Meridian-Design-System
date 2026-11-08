# Sparkline

Sparkline (tiny trend, no axes), split bar and animated counter, for use inside StatCards and table cells.

## When to use
Show direction next to a number. Split bar: share at a glance in a cell.

## Anatomy and variants
Inline SVG polyline 100×30, 1.75px, last point dotted; colored by good/bad meaning. Split bar `.m-split-bar` of flex segments.

## States
No hover needed; the exact series lives in the full chart.

## Accessibility
`role="img"` with the trend in words.

## OpenUI
`Sparkline(values, good?) · SplitBar(segments)`
