# AgentPlan

The steps an agent intends to take, shown before (and while) it executes, editable by the user.

## When to use
Any multi-step task longer than ~3 tool calls, so the user can correct course before work starts.

## Anatomy and variants
`.m-ai-card` → head (goal + Edit plan) → `ol.m-plan` numbered steps (`.done`, `.active`) → Run / Cancel.

## States
Proposed → running (active step) → done; edited steps show "edited by you".

## Accessibility
Ordered list; current step announced; Run is never automatic for plans containing writes.

## OpenUI
`AgentPlan(goal, steps, status)`
