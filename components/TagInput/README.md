# TagInput

Tag input (multiple values as chips) and mention input (@people, @agents, #records inside text).

## When to use
Recipients, labels, keywords; comments and agent prompts that reference people, agents or records.

## Anatomy and variants
`.m-tags` container with `.m-tag` chips (remove button) and a trailing input. Mentions render as `.m-mention` tokens and open a Combobox listbox while typing.

## States
Enter or comma adds a tag; Backspace on empty input removes the last; invalid values show as danger tags with a reason.

## Accessibility
Each remove button names its tag. The mention popup follows the combobox pattern.

## OpenUI
`TagInput(label, values) · MentionInput(placeholder)`
