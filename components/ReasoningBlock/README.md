# ReasoningBlock

Collapsible summary of how the agent reached its answer.

## When to use
Answers involving judgment or trade-offs; collapsed by default, one line in the conversation.

## Anatomy and variants
Native `details.m-reasoning` → summary "Reasoned for Ns" → body with a left rule, muted text. Reasoning tree = nested blocks.

## States
Streaming: summary shimmers ("Reasoning…"); done: duration shown; collapsed after the answer arrives.

## Accessibility
Native disclosure; reasoning text is plain prose, never the only place a conclusion appears.

## OpenUI
`ReasoningBlock(summary, text, durationMs?)`
