# Menu

A list of actions that opens from a button, usually the "⋯" row or page overflow.

## When to use
Secondary actions on a row or record (3+ actions). Not for choosing a value (use Select) or navigation (use Sidebar/Tabs).

## Anatomy
Trigger (`aria-haspopup="menu"`) → `.m-menu` popover → `.m-menu-item`s with icon, label, optional shortcut `<kbd>`; `.m-menu-sep` dividers.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| default | `m-menu-item` | Ordinary actions |
| danger | `m-menu-item is-danger` | Delete/remove, always last, after a separator |

## States
| State | How it looks / how to set it |
| --- | --- |
| Hover / highlighted | `surface-hover`; keyboard highlight sets `data-highlighted` |
| Open | `aria-expanded="true"` on the trigger; `shadow-overlay`, `z-popover` |
| Disabled item | `aria-disabled="true"`, `fg-disabled` |

## Accessibility
Follow the WAI-ARIA menu button pattern: Enter/Space/↓ opens, arrow keys move, Esc closes and returns focus to the trigger. Use Radix DropdownMenu or equivalent rather than hand-rolling.

## Do and don't
- Do: group related items, keep destructive items last.
- Don't: put the only way to do a common task inside a menu.

## OpenUI
`Menu(trigger, items)`
