# DataFlow

A live system diagram: data moving between sources, warehouse, agents and destinations, with health on each node.

## When to use
Integration health pages, "how your data reaches the agent" explainers, incident views (a source down, a failover).

## How it works
SVG `.x-flow`: `.node` boxes (`.is-agent`, `.is-down`) with a status sub-line, curved `.edge`s (`.is-live` tinted), and `.packet` dots moving along live edges. Down edges carry no packets.

## Motion
Packets loop along edges every ~2.2s. Reduced motion: packets hidden; live edges stay tinted.

## Accessibility
`role="img"` with a sentence describing the flow and any outage; node status is in text, not only colour or dashes.

## Core equivalent
AIWorkflow + Alert.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
