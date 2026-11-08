# FilterToolbar

Filter toolbar (applied filters as removable chips) and reorderable list.

## When to use
Above any DataTable with more than one filter; column ordering, priority lists, pipeline stages.

## Anatomy and variants
`.m-filterbar`: search, applied filters as `.m-filter-chip` ("Field Value ×"), dashed "Add filter", Clear all, optional agent "Filter with AI" (turns a sentence into chips the user can see and edit). `.m-reorder` rows with `.m-handle`.

## States
Dragging row lifts with `shadow-overlay`; drop position shows a 2px primary line.

## Accessibility
Each chip says "Remove filter Status: Overdue". Reordering also works by keyboard (Space to pick up, arrows to move).

## OpenUI
`FilterToolbar(filters) · ReorderableList(items)`
