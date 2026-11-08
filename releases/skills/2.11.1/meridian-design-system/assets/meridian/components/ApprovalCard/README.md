# ApprovalCard

Human-in-the-loop gate before an agent changes data, spends money or contacts anyone.

## When to use
Required for every write action an agent proposes: sending messages, updating records, payments, deletions.

## Anatomy
`.m-approval` → `.m-approval-head` (action as verb phrase) → `.m-approval-body` (why + `.m-kv` exact parameters) → `.m-approval-foot` (Edit, Reject, Approve).

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| standard | primary Approve | Reversible writes |
| destructive | `m-btn-danger` Approve | Deletes, payments |
| bulk | count + first 3 items + "View all" | Batch writes |
| decided | `is-decided`, one line | After approve/reject |

## States
| State | How it looks / how to set it |
| --- | --- |
| Pending | `approval-header-bg` warning header |
| Submitting | Approve `aria-busy` |
| Decided | Collapses to who, when, outcome |
| Expired | Neutral header "Expired. Ask the agent to redo it." |

## Accessibility
A labelled `region`. Approve label repeats the action. Keyboard: Approve is never the default Enter action for destructive writes.

## Do and don't
- Do: show exact parameters, so nothing is hidden.
- Don't: auto-approve, or hide parameters behind "Details".

## OpenUI
`ApprovalCard(action, reason, params, tone?)`
