# SpotlightCard

Interactive card with a soft light that follows the pointer along its border.

## When to use
Choosing between a few rich options: agent templates, app templates, plans, integrations. Not for dense dashboards.

## How it works
`.x-spot` card; pointer position sets `--x`/`--y`; a masked radial gradient lights the border and a faint wash fills behind the content.

## Motion
Follows the pointer continuously; fades in on hover/focus. Reduced motion: unchanged (no movement beyond the pointer itself).

## Accessibility
It is a link or button with real text; focus shows the lit border.

## Core equivalent
Card (interactive).

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
