# RadialMenu

Quick actions that fan out in a circle around a floating button.

## When to use
Touch-first screens (field apps, tablets, kiosks) with 3–6 frequent actions on the current record.

## How it works
`.x-radial` → items with `--a` (angle) and `--i` (stagger index) → `.x-radial-trigger`. `.is-open` moves items 72px out along their angle; the plus rotates into an ×.

## Motion
380ms spring with 40ms stagger. Reduced motion: items appear in place without travel.

## Accessibility
Trigger has `aria-expanded`; items are only focusable when open; Esc closes and returns focus. Long-press is never the only way in.

## Core equivalent
Menu from an icon button.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
