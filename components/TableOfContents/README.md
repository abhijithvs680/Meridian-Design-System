# TableOfContents

On-page navigation for long reports and docs, highlighting the section in view.

## When to use
Reports, generated summaries, settings pages longer than two screens.

## Anatomy and variants
Rail of links with a 2px indicator; nested headings indented; `aria-current="location"` on the active section.

## States
Active section follows scroll; clicking scrolls smoothly (instant under reduced motion).

## Accessibility
A `nav` with "On this page"; links target heading ids.

## OpenUI
`TableOfContents(headings)`
