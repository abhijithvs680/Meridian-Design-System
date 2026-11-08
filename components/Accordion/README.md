# Accordion

Accordion, expandable card and expandable text for progressive disclosure.

## When to use
FAQs, settings groups, long descriptions, details that most users don't need every time.

## Anatomy and variants
`.m-accordion` of native `<details>`/`<summary>`; chevron rotates. Expandable text = `.m-clamp` + "Show more" button.

## States
Open/closed; hover `surface-hover`; focus ring inside the row.

## Accessibility
Native details/summary are keyboard and screen-reader friendly. Don't hide critical information or errors inside collapsed sections.

## OpenUI
`Accordion(items) · ExpandableText(text, lines?)`
