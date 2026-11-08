# FrostedPanel

A translucent, blurred layer that floats over live content, keeping context visible behind it.

## When to use
Overlays that should not hide the data under them: the agent panel over a dashboard, a docked command bar, the Dock. Never for in-flow cards or long reading.

## How it works
`.x-frost`: 72% `surface` mixed with transparency, 20px backdrop blur with saturation, hairline border and inner highlight, `shadow-overlay`. Falls back to solid `surface` where blur is unsupported.

## Motion
None of its own; pairs with Drawer/Dock motion.

## Accessibility
Text sits on a mostly opaque surface, so contrast stays ≥ 4.5:1 over any content; check against your busiest screen. Honours `prefers-reduced-transparency` by going solid.

## Core equivalent
Drawer / Popover on `surface`.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
