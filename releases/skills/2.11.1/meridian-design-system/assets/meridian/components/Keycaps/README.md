# Keycaps

Tactile keyboard keys for teaching shortcuts, with a pressed state that reacts to the real keyboard.

## When to use
Shortcut help (press ?), onboarding tips, command palette hints, empty states that teach a power-user path.

## How it works
`.x-keys` → `.x-key` caps (3px "travel" shadow) joined by `.plus` text. `.is-down` presses the key in and tints it `primary`.

## Motion
90ms press. The demo loop is off under reduced motion; real key presses still show.

## Accessibility
The group has an `aria-label` that reads the shortcut ("Command K"). Use platform symbols (⌘ / Ctrl) based on the OS.

## Core equivalent
`.m-kbd` inline hint.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
