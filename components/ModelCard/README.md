# ModelCard

A model's identity, capabilities and live stats; covers provider status, generation stats and provider keys.

## When to use
AI settings, agent configuration, cost dashboards.

## Anatomy and variants
Head (icon, name, capabilities, status badge) → `.m-kpi-mini` row (latency, cost, success, rating) → `.m-stats-line` (provider status dot, key last-4, fallback). Keys show as `.m-secret` masked with Reveal/Rotate.

## States
Provider degraded → warning dot and banner; keys never shown in full after creation.

## Accessibility
Status dots have text beside them. Masked keys are announced as "ending in 4f2a".

## OpenUI
`ModelCard(name, capabilities, stats)`
