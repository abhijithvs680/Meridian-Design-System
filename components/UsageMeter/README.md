# UsageMeter

Usage meters (quota against a limit), onboarding checklist and countdown.

## When to use
Billing and plan limits; first-run setup; deadlines (trial end, filing due).

## Anatomy and variants
`.m-meter-row` (label + "used / limit") over `.m-progress` (`.is-warning` ≥ 80%, `.is-danger` ≥ 95%). `.m-checklist` with tick circles. `.m-countdown` blocks.

## States
Warning and danger thresholds also change the text ("Almost full").

## Accessibility
Each meter is a progressbar with `aria-valuetext` ("8,240 of 10,000 agent runs").

## OpenUI
`UsageMeter(label, used, limit) · Checklist(items)`
