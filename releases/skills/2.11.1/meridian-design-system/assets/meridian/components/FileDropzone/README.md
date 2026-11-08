# FileDropzone

Drag-and-drop upload area with a file list showing progress and results. Avatar upload is the same pattern in a 64px circle.

## When to use
Imports, attachments, documents an agent will read.

## Anatomy and variants
`.m-dropzone` (icon, instruction, constraints) → `.m-file` rows (icon, name, size/progress, status badge or cancel).

## States
Drag over: `.is-over` primary tint; uploading: progress; done: badge; error: danger badge + reason + Retry.

## Accessibility
The zone contains a real "browse" button/file input. Upload progress is announced politely.

## OpenUI
`FileDropzone(accept, maxSize, multiple?)`
