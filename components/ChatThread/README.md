# ChatThread

Grouped conversation turns with attachments and citations.

## When to use
Review and continue an agent conversation.

## Anatomy
Thread header, grouped turns, sources, composer.

## Variants
| Variant | Use |
| --- | --- |
| Panel | Inside the docked agent panel (no outer border, composer pinned) |
| Page | Full agent workspace conversation with header and day separators |
| Read-only | Agent log tab: no composer, history only |

## States
Designed states: loading, empty, streaming, complete, failed.

| State | Treatment |
| --- | --- |
| loading | Three skeleton turns, `aria-busy` |
| empty | StarterPrompts in place of turns |
| streaming | Last agent turn streams; AgentStatus shows "Thinking…" in the header; Stop replaces Send |
| complete | Run summary in the turn meta ("3 steps · 5.1s") |
| failed | Failed user turn shows "Not sent · Retry"; failed agent turn shows an inline danger Alert with Retry |

## Accessibility and Meridian rules
The turn list is `role="log"` with `aria-live="polite"`; agent turns name the agent ("Billing agent"), never just "Agent". Delivery state is text, not only an icon.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
Turns reuse AgentMessage styling (`.m-msg`, `.m-msg-user`) and the composer is AIComposer. Use AgentMessage alone for a single answer; ChatThread for a multi-turn history.

## OpenUI
`ChatThread(label, state?, messages, agentName?)`
