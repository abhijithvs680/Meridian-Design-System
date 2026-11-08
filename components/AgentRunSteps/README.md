# AgentRunSteps

Shows what an agent is doing, step by step, so users can trust and interrupt it.

## When to use
Every agent run longer than ~2 seconds, inline in the conversation or on a run detail page.

## Anatomy
`.m-steps` (`ol`) → `.m-step.<state>` rows: `.m-step-dot`, `.m-step-title` (plain language), optional `.m-step-detail` (mono tool call → result), `.m-step-time`. `.m-steps-foot` with status and Stop.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| live | all steps expanded | While running |
| summary | collapsed to "4 steps · 9.4s" | After completion, expandable |
| run page | full list with timestamps | Agent log tab on records |

## States
| State | How it looks / how to set it |
| --- | --- |
| queued | Dashed ring, muted title |
| running | Pulsing `agent` dot |
| waiting | `warning` dot: "Waiting for your approval…" |
| done | `success` check |
| failed | `danger` x, reason in plain words, Retry |
| stopped | Neutral; "Stopped by you · 2 of 4 done" |

## Accessibility
An ordered list. Each state is in the title text, not only the dot. Announce state changes politely; never announce every token.

## Do and don't
- Do: write titles for a business user; keep raw tool names in the detail line.
- Don't: hide failures or retries the agent made.

## OpenUI
`AgentRunSteps(steps, status, onStop?)`
