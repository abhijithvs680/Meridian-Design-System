# ImageCompare

Before/after slider, for comparing an original with what an agent produced.

## When to use
Document extraction (scan vs extracted fields), image cleanup, redline vs clean, old vs new dashboard.

## How it works
`.x-compare`: "before" layer (right), `.after` layer revealed from the left up to `--pos`, corner tags, a full-size invisible range input driving `--pos`, and a visual `.x-compare-handle`.

## Motion
Follows the pointer directly; no easing.

## Accessibility
Real range input: arrows move 1%, Page Up/Down 10%. Both versions should also be available as text or a diff.

## Core equivalent
CodeBlock diff.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
