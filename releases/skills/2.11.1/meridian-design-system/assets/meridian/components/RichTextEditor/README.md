# RichTextEditor

Rich text editor with a formatting toolbar and agent writing actions, plus a signature pad.

## When to use
Emails, notes, descriptions. Signature for approvals and delivery confirmations.

## Anatomy and variants
`.m-editor` → `.m-editor-bar` toolbar (ghost icon buttons, separator, agent button) → `.m-editor-body`. `.m-signature` canvas with a baseline.

## States
Focus border on the whole editor; active format buttons `aria-pressed`.

## Accessibility
Toolbar uses `role="toolbar"` with roving focus; standard shortcuts (⌘B, ⌘I). Signature pads must offer a typed-name alternative.

## OpenUI
`RichTextEditor(value?, agentActions?)`
