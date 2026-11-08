# Toast

Brief confirmation of something the user just did, bottom-right, auto-dismissing.

## When to use
Success of a user action ("Invoice created"), with Undo where possible. Errors that block work belong inline (Alert), not in a toast.

## Anatomy
`.m-toast` → status icon → message → optional single action link.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| success | `m-toast` | Completed actions |
| error | `m-toast is-error` | Background failures of a user action, with Retry |

## States
| State | How it looks / how to set it |
| --- | --- |
| Entering | Slide up 8px, `duration-base`, `z-toast` |
| Visible | 5s; pauses on hover or focus; errors stay until dismissed |
| Stacked | Max 3, newest at the bottom |

## Accessibility
`role="status"` (success) or `role="alert"` (error). Don't auto-dismiss toasts that contain the only way to Undo before the user can reach them (keep 5s minimum, pause on focus).

## Do and don't
- Do: past tense, specific ("Invoice INV-2042 created").
- Don't: use toasts for agent results the user must read.

## OpenUI
`Toast(message, tone?, action?)`
