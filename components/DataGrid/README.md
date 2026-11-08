# DataGrid

Editable, spreadsheet-like grid with cell focus, inline editing and conditional formatting.

## When to use
Budgets, plans, bulk edits and agent "enrich column" results. Read-only lists stay in DataTable.

## Anatomy and variants
DataTable markup at 13px with cell-level focus (2px primary outline), editable cells, frozen first column, conditional formats from status tokens.

## States
Cell focus, editing, invalid (danger border + tooltip), agent-filled (agent-soft until accepted).

## Accessibility
WAI-ARIA grid: arrows move between cells, Enter edits, Esc cancels.

## OpenUI
`DataGrid(columns, rows, editable?)`
