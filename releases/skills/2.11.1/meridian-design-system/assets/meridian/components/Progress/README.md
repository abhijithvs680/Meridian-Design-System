# Progress

Progress bars for measurable work, skeletons for loading content, spinners only inside buttons.

## When to use
Progress bar: imports, uploads, multi-step agent runs. Skeleton: any content loading over 300ms. Spinner: a button that is submitting.

## Anatomy
`.m-progress-row` (label + value) → `.m-progress` track → `i` fill. `.m-skel` blocks shaped like the coming content.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| determinate | `m-progress` | Known percentage |
| agent | `m-progress is-agent` | Agent run progress |
| skeleton | `m-skel` | Loading layout |
| spinner | `m-spinner` inside `m-btn` | Submitting |

## States
| State | How it looks / how to set it |
| --- | --- |
| Loading | Skeleton after 300ms (avoid flashes); full-page spinners are not allowed |
| Complete | Replace with result; announce via a status region |

## Accessibility
`role="progressbar"` with `aria-valuenow/min/max` and a label. Loading regions set `aria-busy="true"`. Animations stop under `prefers-reduced-motion`.

## Do and don't
- Do: shape skeletons like the real content.
- Don't: show a spinner for the whole page.

## OpenUI
`Progress(label, value, max?, tone?) · Skeleton(lines?)`
