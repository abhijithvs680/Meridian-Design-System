# CommandPalette

Keyboard-first launcher for navigation, actions and agent questions (⌘K). Also the home of the "AI command" pattern.

## When to use
Every app. Power users navigate and act without the mouse; anyone can ask the agent from anywhere.

## Anatomy and variants
`.m-cmdk` → input row → `.m-listbox` grouped (Ask the agent first when the query reads as a question, then Go to, Actions) → footer of key hints.

## States
Results update as you type; agent writes from here still produce an ApprovalCard.

## Accessibility
Dialog + combobox pattern; arrows move, Enter runs, Esc closes. Shortcut shown in the UI and announced.

## OpenUI
`CommandPalette(groups)`
