# Stepper

Horizontal steps for multi-step flows (wizards, onboarding, imports).

## When to use
Processes of 3–6 ordered steps that must be done in sequence.

## Anatomy and variants
`ol.m-steps-h` → `li` with `.num` circle and label; `.done` filled, `aria-current="step"` ringed.

## States
Done steps are clickable to go back; future steps are not.

## Accessibility
An ordered list; current step uses `aria-current="step"`; "Step 3 of 4" in the page title.

## OpenUI
`Stepper(steps, current)`
