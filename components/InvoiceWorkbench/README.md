# InvoiceWorkbench

Searchable invoice table with status filtering, amount sorting and CSV export.

## Implementation
Optional Meridian 2.8 HTML/CSS pattern. Load `tokens.css`, `components/bundle.css`, `components/premium.css`; load `components/premium.js` for the documented local demo interactions. Existing core classes are preserved. Copy the inner markup from `preview.html` into your application.

## Anatomy and variants
Use the semantic sections, labels and native controls in the preview. `.mp-stack`, `.mp-panel`, `.mp-row` and `.mp-grid` compose the layout. All colors inherit the current Meridian light/dark theme. Compact mode inherits core control density. RTL follows logical spacing.

## Behavior
Search and status filters combine; amount header toggles numeric sort. CSV exports currently visible sample rows. Filtering announces the number of results.

## States
All rows, filtered results, zero results and sorted states are implemented. Fetch/loading/errors belong to your data adapter.

## Accessibility
Preserve heading order, native button and form semantics, visible labels, status text and focus rings. Do not announce the entire component on every update. Test keyboard order, 200% zoom, narrow viewports, forced colors and reduced motion in the consuming app. Color is never the only status indicator.

## Integration contract
This is a composition pattern, not an exported React component or a registered OpenUI primitive. Bind real data and action handlers in your adapter. Validate and authorize operations on the server. The standalone preview is deliberately local; no payment, email, authentication or agent execution occurs.
