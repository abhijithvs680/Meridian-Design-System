# LineChart

Line and area charts for trends over time; brush chart adds a range selector under the main plot.

## When to use
Change over time, up to 4 series. Targets and forecasts as dashed lines. Long histories: add a brush to zoom.

## Anatomy and variants
SVG plot in a Card: 3–5 gridlines (`border`), axis labels `fg-subtle` 11px, series `chart-1…`, 2–2.5px strokes, last point marked. Area = same with 12% fill.

## States
Hover: vertical guide + tooltip listing every series at that x. Loading: skeleton. Empty: "No data for this period".

## Accessibility
`role="img"` with a summary; "View as table" toggle. Dashed vs solid distinguishes series without color.

## OpenUI
`LineChart(title, labels, series, unit?)`
