# EnrichColumn

An agent fills a new column for every row (enrichment, classification, smart form fill).

## When to use
Classifying records, filling missing fields, extracting values from documents into a form.

## Anatomy and variants
A table column whose header carries the sparkle; pending cells shimmer (`.m-enriching`); filled cells sit on `agent-soft` until accepted. Smart form fill uses the same treatment on form fields.

## States
Pending → suggested (agent-soft) → accepted (plain) or rejected (empty). Bulk accept/reject in the toolbar.

## Accessibility
Suggested values are announced as suggestions; accepting is an explicit action.

## OpenUI
`EnrichColumn(column, rows)`
