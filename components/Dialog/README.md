# Dialog

A modal that interrupts for a decision or a short task. Drawers (right side, 480px) use the same anatomy for longer forms.

## When to use
Confirm destructive actions, short forms (≤4 fields). Longer forms: Drawer or full page. Information only: Toast or Alert.

## Anatomy
`.m-scrim` (`overlay-bg`) → `.m-dialog` (`role="dialog"`, `aria-modal`, `aria-labelledby`) → `.m-dialog-head` (title + close) → `.m-dialog-body` → `.m-dialog-foot` (Cancel, then the action).

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| confirm | title as question, danger action | Destructive confirmations |
| form | fields in body, primary action | Quick create/edit |
| drawer | same parts, right-anchored, full height | Forms of 5–12 fields |

## States
| State | How it looks / how to set it |
| --- | --- |
| Entering | Fade + 8px rise, `duration-slow` |
| Open | Focus on the first field or the least destructive button; page behind is inert |
| Submitting | Action button `aria-busy`, other controls stay enabled |

## Accessibility
Trap focus, close on Esc, return focus to the trigger. Title is the accessible name. On phones the footer stacks full-width with the action on top.

## Do and don't
- Do: name the consequence in the title and the action ("Delete invoices").
- Don't: stack dialogs, or use "Are you sure?" with OK/Cancel.

## OpenUI
`Dialog(title, body, confirmLabel, tone?)`
