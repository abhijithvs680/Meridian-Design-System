# Tooltip

A short label that appears on hover or focus, mainly for icon-only buttons and truncated text.

## When to use
Naming icon-only controls, showing exact values for abbreviated numbers, full text of truncated cells. Never for essential information.

## Anatomy
`.m-tooltip` (`role="tooltip"`, inverted `tooltip-bg/fg`), referenced by the trigger's `aria-describedby`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| default | `m-tooltip` | Max 240px, one short line ideally |

## States
| State | How it looks / how to set it |
| --- | --- |
| Showing | After 400ms hover or immediately on keyboard focus; `z-popover` |
| Hidden | On blur, mouse leave or Esc |

## Accessibility
Appears on focus as well as hover, is dismissable with Esc, and can be hovered itself (WCAG 1.4.13). Touch devices: don't rely on it.

## Do and don't
- Do: keep to a few words.
- Don't: put links or buttons inside a tooltip.

## OpenUI
`Tooltip(text, children)`
