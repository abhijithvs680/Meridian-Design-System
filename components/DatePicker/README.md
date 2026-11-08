# DatePicker

Calendar, date picker, date range picker with presets, time picker and color picker.

## When to use
Dates on forms and filters. Ranges for reports and dashboards (with presets). Time for schedules. Color for brand themes only.

## Anatomy and variants
Field (`.m-input-group` with calendar icon) opens `.m-popover` → `.m-presets` + `.m-cal` (`.m-cal-grid` of day buttons). Swatch grid `.m-swatches` for colors.

## States
Today bold `primary-text`; selected `primary` fill; in-range `primary-soft`; outside month `fg-disabled`.

## Accessibility
Typed input always works ("24 Nov 2026"). Each day is a button named with the full date ("24 November 2026"); the selected day uses `aria-pressed`. Arrows move days, Page Up/Down months. Swatches have names.

## OpenUI
`DatePicker(label, value?) · DateRangePicker(label, presets?)`
