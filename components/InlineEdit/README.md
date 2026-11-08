# InlineEdit

Click-to-edit text for titles and single fields on detail pages.

## When to use
Renaming records, editing one field without opening a form.

## Anatomy and variants
Read state: `.m-inline-edit` with a pencil on hover/focus. Edit state: input group with Save and Cancel.

## States
Enter saves, Esc cancels, blur saves; show a Toast with Undo.

## Accessibility
The read state is a real `<button>` (never a span with `role="button"`) labelled "Edit name: …". Focus moves into the input and back after saving.

## OpenUI
`InlineEdit(value, field)`
