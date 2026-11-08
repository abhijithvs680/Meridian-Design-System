# ResizablePanels

Split view with a draggable divider; Scroll area for contained scrolling.

## When to use
List–detail layouts, code/preview, agent panel beside content.

## Anatomy and variants
`.m-panes` → `.m-pane`s separated by `.m-gutter` (separator with grip). `.m-scroll` gives thin token-colored scrollbars.

## States
Gutter hover/focus: grip turns `primary`. Double-click resets to default size; widths persist per user.

## Accessibility
The gutter is a focusable `separator` with `aria-valuenow`; arrow keys resize by 16px.

## OpenUI
`ResizablePanels(panes, sizes?)`
