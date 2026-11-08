# MorphButton

A button that shows its own result: idle → working → done, or a two-step inline confirm for small destructive actions.

## When to use
Save, send, sync and other actions that finish in under ~5s on the same screen. Inline confirm replaces a dialog for low-risk removals (filters, views, drafts).

## How it works
`.m-btn.x-morph` with `data-state` idle | working | done | confirm. The label swaps with a 300ms rise; done draws a check and returns to idle after 1.8s; confirm times out after 3s.

## Motion
Label rise 300ms, check draw 420ms, colour cross-fade 200ms. Reduced motion: instant swaps, check drawn.

## Accessibility
`aria-busy` while working; the new label is the accessible name, so "Saved" and "Click again to delete" are read out. Confirm never triggers on a single Enter.

## Core equivalent
Button with loading state + Toast; Dialog for confirmation.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
