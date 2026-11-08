# SourceCards

The sources behind an agent answer as numbered cards, matching the inline citation chips.

## When to use
Under any agent answer that used data or documents; in Ask-your-data results.

## Anatomy and variants
`.m-sources` grid of `a.m-source`: title (truncated), number badge, source type icon, system and freshness or location.

## States
Hover border; missing/permission-denied sources show "No access" muted.

## Accessibility
Each card is a link with the full title as its name; numbers match the citations in text.

## OpenUI
`SourceCards(sources)`
