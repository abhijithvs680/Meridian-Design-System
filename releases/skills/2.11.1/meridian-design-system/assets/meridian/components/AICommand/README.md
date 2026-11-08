# AICommand

Keyboard-first actions and cited natural-language answers.

## When to use
Search actions or ask a question from the command surface.

## Anatomy
Search field, results, answer, citations, actions.

## Variants
| Variant | Use |
| --- | --- |
| Answer + actions | Query reads as a question: a short cited answer, then actions |
| Actions only | Query reads as a command: grouped actions, no answer |
| Inline | Embedded in a page header instead of a dialog |

## States
Designed states: idle, searching, answering, no results, failed.

| State | Treatment |
| --- | --- |
| idle | Recent commands and starter questions |
| searching | Results update as you type |
| answering | Answer region shows AgentStatus "Thinking…" and streams in |
| answered | Cited answer + actions |
| no results | "No matches. Ask the agent instead" option |

## Accessibility and Meridian rules
Dialog + combobox pattern with a unique id per instance; the answer is a labelled region announced politely; actions that write say "needs approval" and open an ApprovalCard.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
CommandPalette is the navigation launcher; AICommand adds the cited answer region and agent actions on the same `.m-cmdk` styles.

## OpenUI
`AICommand(query, open?, results, answer?)`
