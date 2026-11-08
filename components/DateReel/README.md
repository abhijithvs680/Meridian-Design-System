# DateReel

A wheel-style date and time picker with snap scrolling, for touch-first scheduling.

## When to use
Scheduling on phones and tablets (send a reminder, book a follow-up). On desktop forms keep DatePicker, which supports typing.

## How it works
`.x-reel` with `.x-reel-col` scroll-snap columns; the centred row is `.sel`; a highlight band sits behind it and the edges fade.

## Motion
Native momentum scroll with snap. Keyboard arrows step one row (smooth unless reduced motion).

## Accessibility
Each column is focusable with a label; arrows change value; the chosen date/time is repeated as text beside the reel.

## Core equivalent
DatePicker + time input.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
