# ProgressRings

Concentric goal rings: two to three related goals at a glance.

## When to use
Personal or team goal pages, agent performance summaries, onboarding progress. Not for comparing unrelated metrics.

## How it works
SVG `.x-rings` with a `.track` and a `.val` circle per goal; `data-v` is the percentage. Legend lists each ring with its value.

## Motion
Rings sweep in over 1.2s on first view. Reduced motion: drawn at their value.

## Accessibility
One `role="img"` label lists all values; the legend repeats them as text.

## Core equivalent
StatCard + Progress.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
