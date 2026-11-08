# VectorSearch

A visual of semantic search: the question as a point, documents as dots, and lines drawn to the nearest matches.

## When to use
Explaining retrieval to users ("what the agent looked at"), admin views of knowledge bases, demos. The list of matches always lives in SourceCards too.

## How it works
SVG `.x-vec`: neutral `.pt` dots, `.is-hit` matches in `primary`, the query `.q` in `agent` with a dashed radius, `.link` lines that draw when `.is-searched` is set, labels on the top hits.

## Motion
Links draw over 700ms. Reduced motion: drawn immediately.

## Accessibility
`role="img"` names the matched documents; SourceCards beside it gives the clickable list.

## Core equivalent
SourceCards.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
