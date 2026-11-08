# Drawer

Side drawer for forms and detail previews; becomes a bottom sheet on phones.

## When to use
Create/edit forms of 5–12 fields, record previews from a list, the agent panel on smaller screens.

## Anatomy and variants
`.m-drawer` (head with title + close, scrolling body, sticky footer) on `.m-scrim`; `.m-sheet` on mobile (drag handle, rounded top).

## States
Enters from the right (`duration-slow`); dirty forms confirm before closing.

## Accessibility
Same as Dialog: `role="dialog"`, focus trap, Esc closes, focus returns to the trigger.

## OpenUI
`Drawer(title, children, primaryAction)`
