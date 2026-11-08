# Sidebar

The app's primary navigation, fixed on the left.

## When to use
Every app with more than 3 top-level areas. Within a record, use Tabs.

## Anatomy
`<nav class="m-sidebar" aria-label>` → `.m-nav-item` links (icon + `.m-nav-label` + optional `.m-nav-count`) → optional `.m-nav-section` labels.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| expanded | `m-sidebar` | ≥1024px, `sidebar-width` 240px |
| rail | `m-sidebar is-rail` | 768–1023px, 56px icons with tooltips |
| drawer | Sidebar inside a Drawer | <768px, opened from a menu button |

## States
| State | How it looks / how to set it |
| --- | --- |
| Rest | `nav-item-fg` |
| Hover | `surface-hover`, label `fg` |
| Current | `aria-current="page"` → `nav-item-active-bg/fg` |
| Focus | Focus ring |

## Accessibility
A `<nav>` landmark with `aria-label`. Current page uses `aria-current="page"`. Rail items need `aria-label` and a tooltip.

## Do and don't
- Do: 5–9 items; counts only for things needing action.
- Don't: nest more than one level, or show totals as counts.

## OpenUI
`Sidebar(items, current?)`
