# AgentTimeline

Timestamped audit events across agents, tools, approvals, and handoffs.

## When to use
Inspect a multi-agent run or audit trail.

## Anatomy
Run summary, time axis, expandable events.

## Variants
| Variant | Use |
| --- | --- |
| Run | One run, every event (Agent log tab, run page) |
| Multi-agent | Handoffs between agents shown inline with both names |
| Compact | Last 5 events in a side panel, "View full log" link |

## States
Designed states: queued, running, waiting, complete, failed, stopped.

| State | Treatment |
| --- | --- |
| queued | Header badge neutral "Queued" |
| running | Current event `aria-current="step"` with agent ring |
| waiting | Approval event warning-toned, header badge "Waiting" |
| complete | Header badge success, total duration |
| failed | Failed events danger-toned with the reason; Retry on the header |
| stopped | Neutral badge "Stopped by you"; events after the stop are omitted |

## Accessibility and Meridian rules
An ordered list in time order with `<time datetime>`; event kind is text ("tool", "handoff"), not only an icon; details are native disclosures.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
Timeline is for people and records; AgentRunSteps is the live, plain-language progress view inside a conversation; AgentTimeline is the timestamped audit of a run across agents, tools and approvals.

## OpenUI
`AgentTimeline(label, state, events)`
