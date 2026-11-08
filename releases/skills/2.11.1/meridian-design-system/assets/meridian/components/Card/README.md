# Card

The container for one unit of content on a page: a chart, a list, a form section.

## When to use
Grouping related content on dashboards, detail pages and settings.

## Anatomy
`.m-card` → `.m-card-head` (`.m-card-title` h3 + `.m-card-desc`, one action right) → body. Lay out cards with `.m-grid-2` or the 12-column grid.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| static | `m-card` | Content containers |
| interactive | `m-card is-interactive` on an `<a>` | The whole card opens something |

## States
| State | How it looks / how to set it |
| --- | --- |
| Hover (interactive) | `border-strong` border |
| Focus (interactive) | Focus ring on the link |
| Loading | Skeleton body, real title |

## Accessibility
Card titles are headings in page order (h2/h3). An interactive card is one link; don't nest other buttons inside it.

## Do and don't
- Do: one purpose per card, padding `pad-card`.
- Don't: nest cards, or add shadows to in-flow cards.

## OpenUI
`Card(title, description?, action?, children)`
