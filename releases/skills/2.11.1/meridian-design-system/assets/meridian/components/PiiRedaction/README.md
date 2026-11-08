# PiiRedaction

Shows which personal data was masked before text reached a model.

## When to use
Healthcare, finance and HR flows; any prompt built from customer records.

## Anatomy and variants
`.m-ai-card` with a count badge; masked spans as `.m-redact-tag` type labels (`[NAME]`, `[PHONE]`). Fully hidden values use `.m-redact`.

## States
Admins can see the policy that matched; values are never revealed here.

## Accessibility
Tags read as "redacted name"; the count is in text.

## OpenUI
`PiiRedaction(text, entities)`
