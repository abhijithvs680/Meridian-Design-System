# TreeView

Tree view and tree table for hierarchical data.

## When to use
Chart of accounts, org structures, folders, nested categories. With columns: a tree table (DataTable with an indented first column).

## Anatomy and variants
`ul.m-tree` (`role="tree"`) → `.m-tree-row` (chevron, label, trailing value) → nested `ul` with guide line.

## States
Expanded/collapsed chevron; selected = `aria-selected="true"` on the `treeitem` (row turns `primary-soft`); lazy children show a skeleton row.

## Accessibility
WAI-ARIA tree: arrows move/expand/collapse, Home/End, type-ahead.

## OpenUI
`TreeView(nodes, selected?)`
