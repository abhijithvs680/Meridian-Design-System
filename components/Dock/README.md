# Dock

A floating launcher whose icons magnify toward the pointer, for apps with a handful of top-level areas.

## When to use
Kiosk, tablet and focused-workspace layouts where a sidebar is too heavy; a quick switcher pinned to the bottom of an agent workspace.

## How it works
`.x-dock` frosted bar of `.x-dock-item` icon buttons (labels as tooltips, `aria-current` dot), `.x-dock-sep` dividers, the agent item filled slate. A pointer listener sets `--s` per item from its distance to the cursor.

## Motion
Scale up to 1.55× with neighbours easing in (200ms). Reduced motion or touch: no magnification, tooltips on focus.

## Accessibility
A `nav` of buttons with `aria-label`s; keyboard focus shows the same tooltip; never the only navigation on large screens.

## Core equivalent
Sidebar (rail).

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
