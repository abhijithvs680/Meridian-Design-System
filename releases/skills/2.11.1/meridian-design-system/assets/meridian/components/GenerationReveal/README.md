# GenerationReveal

Agent-generated content (charts, images, documents) resolving from a field of tiles as it finishes.

## When to use
Charts, images and documents an agent generates in place, where a skeleton would feel static for multi-second waits.

## How it works
`.x-gen` wraps the real content; `.x-gen-grid` covers it with tiles in `agent-soft`; `.is-done` fades the tiles out in a scattered order (`--k`). A status pill sits on top while generating.

## Motion
Tiles fade out over ~1.8s in pseudo-random order. Reduced motion: single fade.

## Accessibility
The real content is in the DOM underneath; `aria-busy` while generating; the status text says what is being built.

## Core equivalent
Skeleton + InsightCard.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
