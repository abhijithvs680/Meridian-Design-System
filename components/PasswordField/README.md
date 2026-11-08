# PasswordField

Password input with show/hide and a strength meter.

## When to use
Sign-up, password change, API secret entry.

## Anatomy and variants
`.m-input-group` with lock icon and show/hide toggle; `.m-strength[data-level=1–4]` meter; helper text says what to improve.

## States
Levels: 1 weak (danger), 2 fair (warning), 3–4 strong (success). Error via `aria-invalid` on the group.

## Accessibility
Toggle is a button with `aria-label` "Show password"/"Hide password". The meter is decorative; the helper text states strength.

## OpenUI
`PasswordField(label, showStrength?)`
