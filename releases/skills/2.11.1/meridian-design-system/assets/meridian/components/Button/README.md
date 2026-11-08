# Button

Triggers an action. Secondary is the default; **primary** appears at most once per view.

## When to use
Any action the user triggers. For navigation to another page, use a link; for toggling a setting, use Switch.

## Anatomy
`.m-btn` root → optional leading icon (16px) → label → optional trailing icon. Icon-only: `.m-btn-icon` with `aria-label`.

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| secondary | `m-btn` | Default for everything that isn't THE action of the page |
| primary | `m-btn m-btn-primary` | The one thing the view is for; one per view (dialogs count as their own view) |
| ghost | `m-btn m-btn-ghost` | Tertiary actions in toolbars, Cancel |
| agent | `m-btn m-btn-agent` | Hands work to an AI agent; soft slate so it never competes with the primary; always with the sparkle |
| agent solid | `m-btn m-btn-agent-solid` | Only the Send button in the agent composer |
| danger | `m-btn m-btn-danger` | Irreversible destruction, only inside a confirmation |
| sizes | `m-btn-sm` · default · `m-btn-lg` | 28px tables/toolbars · 34px default · 40px sparse forms |

## States
| State | How it looks / how to set it |
| --- | --- |
| Rest | Variant tokens `button-<variant>-bg/fg` |
| Hover | `button-<variant>-bg-hover`, 120ms |
| Pressed | `:active` → `button-<variant>-bg-pressed` |
| Focus | 2px `focus-ring` outline, 2px offset, on `:focus-visible` only |
| Loading | `aria-busy="true"` + leading `.m-spinner`; keep the label ("Saving") |
| Disabled | `disabled` → sunken fill, `fg-disabled`. Prefer enabled + explain on click |

## Accessibility
Native `<button>`. Icon-only buttons need `aria-label`. Loading keeps focus and announces via `aria-busy`. Minimum target 24×24px (WCAG 2.5.8); 34px default.

## Do and don't
- Do: verb-first labels ("Approve invoice"), one primary per view, primary rightmost in a group.
- Don't: use "OK"/"Submit", put two primaries side by side, or disable without explanation.

## OpenUI
`Button(label, variant?, size?, icon?, action?)`
