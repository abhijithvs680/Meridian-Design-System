# CardStack

A stack of record cards reviewed one at a time: swipe or press → to move on.

## When to use
Triage flows: approve or dismiss agent suggestions, review flagged invoices, clear an inbox of exceptions.

## How it works
`.x-stack` of `.x-stack-card`s with `--d` depth (0 = top). Depth sets offset, scale and fade; hover fans the stack; the top card leaves with `.is-leaving` and moves to the back.

## Motion
420ms spring; leaving card slides and tilts out. Reduced motion: instant reorder.

## Accessibility
The stack is focusable with a count in its label; every swipe action also has a visible button and arrow-key shortcut.

## Core equivalent
DataTable with row actions.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
