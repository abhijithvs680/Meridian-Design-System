# AIWorkflow

Node-and-edge view of an automated workflow: triggers, agents, tools, human steps.

## When to use
Workflow builders, explaining what an automation does, run replays. Covers agent loop, ticket router and data-flow diagrams.

## Anatomy and variants
`.m-flow` of `.m-flow-node`s (`.is-agent`, `.is-human`, `.is-running`) joined by `.m-flow-edge` arrows. Large graphs use a canvas library themed from tokens.

## States
Running node glows (agent ring); failed node danger border; human nodes always warning-toned.

## Accessibility
Provide an ordered text list of steps alongside the diagram.

## OpenUI
`AIWorkflow(nodes, edges)`
