# Timeline

Activity timeline and comment thread, the audit trail of people and agents on a record.

## When to use
Activity and Agent log tabs; comments and @mentions on records.

## Anatomy and variants
`.m-timeline` items: icon (agent/success/neutral), actor in bold, action, time. `.m-comment`: avatar, name, time, text with mentions, reactions.

## States
New items fade in; edited comments show "edited"; agent entries are always labelled with the agent name.

## Accessibility
Ordered list in time order; times are `<time datetime>`. Reactions are toggle buttons with counts in their names.

## OpenUI
`Timeline(events) · CommentThread(comments)`
