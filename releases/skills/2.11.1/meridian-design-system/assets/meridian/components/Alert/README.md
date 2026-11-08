# Alert

An inline banner for page- or section-level status that persists until resolved.

## When to use
Something the user must know about this page or section. Transient confirmations: Toast.

## Anatomy
`.m-alert` → icon → title + body (`p`) → optional action button at the end.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| info | `m-alert-info` | Neutral system information |
| warning | `m-alert-warning` | Needs attention soon |
| danger | `m-alert-danger` | Something failed; offer Retry |

## States
| State | How it looks / how to set it |
| --- | --- |
| Dismissible | Add a ghost icon button "Dismiss" for info only; warnings and errors clear when resolved |

## Accessibility
`role="alert"` for errors only (interrupts screen readers); `role="status"` otherwise. Icon plus title text, never color alone.

## Do and don't
- Do: say what happened, then what to do.
- Don't: stack more than one alert per section or show raw error messages.

## OpenUI
`Alert(title, body?, tone?, action?)`
