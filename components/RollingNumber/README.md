# RollingNumber

A number whose digits roll like an odometer when it changes.

## When to use
Live KPIs that update while the user watches: collections today, runs completed, tickets resolved.

## How it works
`.x-roll` holds one `.x-roll-col` per digit (a 0–9 column moved by `--n`) and static separators. A tiny script splits the formatted number.

## Motion
900ms ease-out per digit. Reduced motion: digits change instantly.

## Accessibility
The container has the full value as `aria-label` and is a polite live region; announce at most every few seconds.

## Core equivalent
StatCard value.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
