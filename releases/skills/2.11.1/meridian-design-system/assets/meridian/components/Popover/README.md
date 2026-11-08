# Popover

Popover, hover card and confirm popover: small floating panels anchored to a trigger.

## When to use
Popover: quick settings or details. Hover card: preview a person or record on hover. Confirm popover: a lightweight confirmation for low-risk removals.

## Anatomy and variants
`.m-popover` (`shadow-overlay`, `z-popover`); hover card = `.m-hovercard` inside; confirm = title, consequence, Cancel + action.

## States
Opens on click (popover), hover after 500ms or focus (hover card). Closes on Esc and outside click.

## Accessibility
Trigger has `aria-expanded`/`aria-controls`. Hover cards must also open on focus and hold no essential actions.

## OpenUI
`Popover(trigger, content) · HoverCard(trigger, content)`
