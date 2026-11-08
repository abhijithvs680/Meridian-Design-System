# ReplyDraft

Agent-drafted text the user edits before using; covers ghost-text completion, tone, translate and TL;DR toggles.

## When to use
Emails, replies, summaries, notes: anything the agent writes on the user's behalf.

## Anatomy and variants
`.m-ai-card` head (recipient, tone Segmented) → editable body; inline completions in `.m-ghost` (Tab accepts) → actions: Use, Rewrite, Translate, TL;DR.

## States
Generating (shimmer), editable, used (collapses into the thread). Nothing is sent from here: sending is a separate, approved action.

## Accessibility
Ghost text is announced as a suggestion; Tab accepts, Esc dismisses.

## OpenUI
`ReplyDraft(to, text, tone?)`
