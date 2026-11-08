# AIEditReview

Per-change review of proposed text or code edits.

## When to use
Approve or reject AI changes before they enter a document.

## Anatomy
Change summary, before and after, accept/reject/undo.

## Variants
| Variant | Use |
| --- | --- |
| Text | Inline word-level changes in prose (emails, policies) |
| Code | Line-level diff using CodeBlock `.add`/`.del` lines with the same per-change actions |
| Field | Single record field: old → new value |

## States
Designed states: draft, reviewing, accepted, rejected, conflict.

| State | Treatment |
| --- | --- |
| draft | Agent still proposing; head shows AgentStatus |
| reviewing | Current change `aria-current="true"` (agent-soft) |
| accepted | Success tint + Undo |
| rejected | Insertion struck through + Undo |
| conflict | Warning: "The text changed since this was suggested" + Refresh |

## Accessibility and Meridian rules
Insertions and deletions use `<ins>`/`<del>` so screen readers announce them; each change has its own Accept/Reject with the change in its accessible name; J/K move between changes.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
CodeBlock covers a single code suggestion; AIEditReview is for reviewing several changes one at a time. Applying the reviewed text to an external system still goes through ApprovalCard.

## OpenUI
`AIEditReview(title, changes)`
