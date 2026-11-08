# ImageGeneration

Prompt and variation workspace for generated images.

## When to use
Create, compare, retry, or download generated images.

## Anatomy
Prompt settings, progress, result grid, selected preview.

## Variants
| Variant | Use |
| --- | --- |
| Workspace | Controls left, results right (stacks on phones) |
| Inline | Inside a conversation: prompt line + result grid |
| Edit | One source image + masked edit prompt (same layout) |

## States
Designed states: queued, generating, complete, partial, failed, cancelled.

| State | Treatment |
| --- | --- |
| queued | Grid of pending tiles, status "Queued" |
| generating | Each tile shows its own progress; finished tiles appear as they land |
| complete | All tiles; one selectable; Use, Download, Retry |
| partial | Failed tiles say why ("Blocked by content policy") with Retry for that tile |
| failed | Danger Alert above the grid with the reason and Retry |
| cancelled | Kept tiles stay; neutral note "Stopped by you" |

## Accessibility and Meridian rules
Results are a listbox of options with alt text describing each image; selection is announced; progress is text, not only a ring. Generated images are labelled as generated wherever they are used.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
GenerationReveal (Expressive) can reveal each finished tile.

## OpenUI
`ImageGeneration(prompt, model, size, state, images?)`
