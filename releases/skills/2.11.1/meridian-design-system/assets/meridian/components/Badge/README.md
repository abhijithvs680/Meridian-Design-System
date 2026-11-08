# Badge

One to three words of status for a record; the tone carries meaning, never decoration.

## When to use
Record status in tables, headers and cards. For counts use a Tab count or nav count; for categories use plain text.

## Anatomy
`.m-badge` → status dot (`::before`) → label.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| neutral | `m-badge` | Draft, archived, inactive |
| info | `m-badge-info` | In review, scheduled |
| success | `m-badge-success` | Paid, complete, active |
| warning | `m-badge-warning` | Pending, awaiting approval, expiring |
| danger | `m-badge-danger` | Failed, overdue, rejected |
| agent | `m-badge-agent` | Being worked on by an agent |
| plain | add `plain` | Very dense tables (dot removed) |

## States
| State | How it looks / how to set it |
| --- | --- |
| Static | Badges are not interactive. For filter chips use a small secondary Button. |

## Accessibility
The word carries the meaning; color and dot are reinforcement, so it reads in grayscale and for color-blind users.

## Do and don't
- Do: map each status enum to one tone, once, in the app spec.
- Don't: invent a tone per screen or use badges as buttons.

## OpenUI
`Badge(label, tone?)`
