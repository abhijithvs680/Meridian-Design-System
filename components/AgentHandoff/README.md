# AgentHandoff

Shows work passing between agents, or from an agent to a person.

## When to use
Multi-agent workflows; escalations to humans; ticket routing.

## Anatomy and variants
`.m-handoff` dashed row: from (avatar, name) → to, the reason in one line, and View / Take over.

## States
Agent→agent is informational; agent→human needs an action and stays until taken.

## Accessibility
Readable as a sentence ("Sales agent handed off to Billing agent: …").

## OpenUI
`AgentHandoff(from, to, reason, action?)`
