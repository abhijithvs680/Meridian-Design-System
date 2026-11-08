# SearchField

Search input with icon, shortcut hint and clear button. Expanding search collapses to an icon button in tight toolbars.

## When to use
Global search (top bar), list search (table toolbar), filtering menus.

## Anatomy and variants
`.m-input-group` → search icon → input → `.m-kbd` hint or clear button.

## States
Focus ring on the group; clear appears once there is text; results update after 200ms debounce.

## Accessibility
`type="search"` with a label. Clear button labelled "Clear search". Announce result counts politely.

## OpenUI
`SearchField(placeholder, value?)`
