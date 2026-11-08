# Banner

Full-width announcement, agent-activity and trial banners, plus the cookie consent panel.

## When to use
App-wide news, a long-running agent job the user should know about, billing state, consent.

## Anatomy and variants
`.m-banner` (neutral inverted), `.is-info`, `.is-agent`, `.is-warning`; one link at the end. Cookie consent is a bottom-left popover with two equal choices.

## States
Dismissible (stored per user) except billing and consent until resolved.

## Accessibility
`role="region"` with a label; never auto-rotating. Consent buttons are equally prominent.

## OpenUI
`Banner(text, tone?, link?)`
