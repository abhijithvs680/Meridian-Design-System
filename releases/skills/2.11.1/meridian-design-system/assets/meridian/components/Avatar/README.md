# Avatar

A person's initials (or photo) in a circle. Agents use AgentAvatar instead.

## When to use
Owners and assignees in tables, comments, activity feeds.

## Anatomy
`.m-avatar` with two initials or an `<img>`; `.m-avatar-group` overlaps with a 2px surface ring.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| sizes | `m-avatar-sm` 24 · default 32 · `m-avatar-lg` 40 | Tables · lists · headers |
| group | `m-avatar-group` | Up to 3 + "+N" |

## States
| State | How it looks / how to set it |
| --- | --- |
| Static | Not interactive by itself; wrap in a button/link if it opens a profile |

## Accessibility
Give a standalone avatar `role="img"` and `aria-label` with the full name; hide it (`aria-hidden`) when the name is printed next to it.

## Do and don't
- Do: pair with the name in text wherever space allows.
- Don't: use color-coded avatar backgrounds to mean anything.

## OpenUI
`Avatar(name, size?, src?)`
