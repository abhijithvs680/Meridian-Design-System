# TrainingRun

Training-job progress, metrics, checkpoints, and controls.

## When to use
Monitor a long-running training or fine-tuning job.

## Anatomy
Status, progress, ETA, metrics, checkpoints.

## Variants
| Variant | Use |
| --- | --- |
| Full | Run page: progress, metrics, loss curve, checkpoints, controls |
| Row | Runs list: name, state badge, progress bar, ETA |
| Compact | Dashboard card: state, progress, best metric |

## States
Designed states: queued, running, paused, complete, failed, cancelled.

| State | Treatment |
| --- | --- |
| queued | Neutral badge, position in queue |
| running | Agent badge, agent progress bar, Pause + Cancel |
| paused | Warning badge, Resume replaces Pause |
| completed | Success badge, best checkpoint highlighted, Deploy (through ApprovalCard) |
| failed | Danger badge, reason and last good checkpoint, Retry from checkpoint |
| cancelled | Neutral badge "Cancelled by you" |

## Accessibility and Meridian rules
Progress uses Meridian's progressbar with value text; metrics are a description list; the loss chart has a text summary; Cancel is a danger action with confirmation.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
Uses Progress, StatCard-style metrics and Sparkline conventions. Deploying a model is a write and goes through ApprovalCard.

## OpenUI
`TrainingRun(name, state, progress?, eta?, metrics?)`
