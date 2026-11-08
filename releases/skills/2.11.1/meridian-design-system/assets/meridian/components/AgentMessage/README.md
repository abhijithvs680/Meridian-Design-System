# AgentMessage

One turn in a conversation with an agent, plus the composer, in the docked agent panel or a full chat page.

## When to use
Any chat-style interaction with an agent.

## Anatomy
User turn: `.m-msg-user` bubble, right. Agent turn: `.m-msg` → `.m-agent-avatar` → `.m-msg-body` (`.m-msg-meta` with agent name and run summary, content with `.m-cite` chips, `.m-chips` suggestions). `.m-composer` at the bottom.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| answer | text + citations | Questions about data |
| rich answer | embeds DataTable, Chart, StatCard | When a table or chart answers better |
| proposal | ends with an ApprovalCard | Any write the agent proposes |

## States
| State | How it looks / how to set it |
| --- | --- |
| Streaming | AgentRunSteps above the text; text streams in; Stop button replaces Send |
| Done | Steps collapse into the meta line ("4 steps · 9.4s") |
| Failed | Inline Alert (danger) with Retry; partial text kept |
| Composer focus | `input-border-focus` |

## Accessibility
The conversation is a `role="log"` with `aria-live="polite"`; stream updates are announced in sentences, not tokens. Citation chips are links with descriptive text.

## Do and don't
- Do: answer first, cite every data claim, end with 1–3 next actions.
- Don't: let chips trigger writes directly, or hide which agent answered.

## OpenUI
`AgentMessage(role, content, citations?, suggestions?)`
