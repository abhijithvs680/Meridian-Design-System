# CodeBlock

Code block, JSON viewer and code suggestion (diff with accept/reject).

## When to use
Tool-call arguments and results, API keys and install snippets, JSON payloads, agent-proposed code changes.

## Anatomy and variants
`.m-code` → `.m-code-head` (label + copy) → `pre` with token spans (`.k .s .n .c`); diffs use `.add`/`.del` lines with `.m-diff-actions`. JSON viewer collapses objects with the Tree pattern.

## States
Copy → "Copied"; long blocks scroll inside; diffs need an explicit Accept.

## Accessibility
`pre` keeps text selectable; diff lines carry "added"/"removed" in visually hidden text, not color only.

## OpenUI
`CodeBlock(code, language?, title?) · CodeSuggestion(before, after)`
