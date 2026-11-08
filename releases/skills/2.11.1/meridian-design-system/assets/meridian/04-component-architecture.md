# Component architecture

## Layers of the component library
```
tokens.css          design tokens (generated from tokens.json)
bundle.css          one class contract per component: .m-<name>, parts, modifiers, states
index.d.ts          the props API every implementation exposes
implementations     React wrappers · OpenUI components (defineComponent) · JSON-spec renderer
```
The CSS contract is the source of truth for look; `index.d.ts` is the source of truth for API. React, OpenUI and the JSON renderer are thin adapters over both, so a component looks and behaves the same whichever path generated it.

## Conventions
| Concern | Convention | Example |
| --- | --- | --- |
| Root | `.m-<component>` | `.m-btn`, `.m-approval` |
| Part | `.m-<component>-<part>` | `.m-approval-head`, `.m-card-title` |
| Variant | modifier class | `.m-btn-primary`, `.m-badge-danger` |
| Size | `-sm` / `-lg` modifier | `.m-btn-sm`, `.m-avatar-lg` |
| Boolean style | `is-<state>` | `.m-card.is-interactive`, `.m-insight.is-low` |
| Interaction state | native pseudo-class or ARIA attribute, never a class | `:hover`, `:focus-visible`, `[aria-selected="true"]`, `[aria-invalid="true"]`, `[aria-busy="true"]`, `[aria-current="page"]`, `:disabled` |
| Colors | component tokens only | `background: var(--button-primary-bg)` |
| Spacing | spacing scale or semantic alias | `padding: var(--pad-card)` |
| Direction | logical properties only: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start`; never `left`/`right` except for centered or JS-positioned parts | `margin-inline-start: auto` |
| Directional icons | `.m-icon-dir` on chevrons, arrows, send and play so they mirror in RTL | `<svg class="m-icon m-icon-dir">` |
| Prefixes | `m-` core components, `x-` Expressive pack | `.m-card`, `.x-pill` |

Using ARIA for state means the visual state and the accessible state can't drift apart: if it looks selected, a screen reader hears "selected".

## Interaction states
Every interactive component defines all of these:

| State | Trigger | Treatment |
| --- | --- | --- |
| Rest | — | Component tokens |
| Hover | `:hover` (pointer only) | `*-hover` token, 120ms |
| Pressed | `:active` | `*-pressed` token |
| Focus | `:focus-visible` | 2px `focus-ring` outline, 2px offset |
| Selected / current | `aria-selected`, `aria-current`, `:checked` | `*-selected` / soft fill plus a non-color cue |
| Disabled | `disabled` / `aria-disabled` | `surface-sunken` fill, `fg-disabled` text, `not-allowed` cursor |
| Read-only | `readonly` | Sunken fill, value selectable |
| Invalid | `aria-invalid="true"` | `danger` border + message |
| Loading | `aria-busy="true"` | Spinner (buttons) or skeleton (content) |

Content components also define **Loading, Empty, Error** (see Page patterns).

## Composition rules
- Components don't set outer margins. Parents space children with `gap`.
- Components never nest the same surface (no card in card).
- One component, one job. A "user card with chart and form" is three components in a layout.
- Slots over props for content: Card takes children; PageHeader takes `actions`.

## Component inventory
| Group | Components |
| --- | --- |
| Actions | Button, ButtonGroup (group, split, copy, hold to confirm), Menu (dropdown, context, user menu), ThemeSwitcher |
| Forms | TextField, SearchField, PasswordField, NumberInput (number, money, phone, percent), TagInput (+ mentions), InlineEdit, Select, Combobox (+ multi-select), Checkbox (checkbox, radio, switch), SegmentedControl (+ billing toggle), RadioCards, FilterChips (+ rating), Slider (+ range histogram), DatePicker (calendar, range, time, color), FileDropzone, RichTextEditor (+ signature) |
| Data display | Badge, Avatar (+ presence), StatCard, DataTable (+ pagination), DataGrid, TreeView, CodeBlock (+ JSON, code suggestion), FilterToolbar (+ reorderable list), Timeline (+ comment thread, reactions) |
| Charts | BarChart, LineChart (+ area, brush), DonutChart (+ gauge, waffle), Sparkline (+ split bar), Heatmap (+ treemap), FunnelChart |
| Navigation | Sidebar, Tabs, PageHeader (+ breadcrumb), TableOfContents, CommandPalette |
| Layout | Card, Accordion (+ expandable text), ResizablePanels (+ scroll area), app shell |
| Overlays | Dialog, Drawer (+ bottom sheet), Popover (+ hover card, confirm popover), Tooltip, Toast, ShareAccess |
| Feedback | Alert, Banner (+ trial, cookie consent), EmptyState, Progress (+ skeleton, spinner), Stepper, UsageMeter (+ onboarding checklist, countdown) |
| Agent | AgentMessage, AgentRunSteps, ChatThread, AIComposer, AgentTimeline, ApprovalCard, InsightCard, AgentStatus (+ text shimmer), ToolCall, AgentPlan, ReasoningBlock, SourceCards, ContextWindow (+ prompt cache), ModelCard (+ provider status, keys, generation stats), AgentHandoff, ResponseFeedback, MeetingSummary, AIEditReview, ImageGeneration, TrainingRun, LLMCostEstimator, AICommand, StarterPrompts (+ ask your data), ReplyDraft (+ ghost text, translate, TL;DR), PiiRedaction, AIWorkflow (+ agent loop, ticket router, data flow), ConnectorSetup, EnrichColumn (+ smart form fill), VoiceInput (+ speech player) |

## Adding a component
1. Check it can't be composed from existing ones.
2. Write the README (template: When to use, Anatomy, Variants, States, Accessibility, Do and don't, OpenUI signature).
3. Add component tokens (`<name>-*`) pointing at semantic tokens.
4. Add classes to `bundle.css` following the conventions, every state included.
5. Add props to `index.d.ts` and an OpenUI `defineComponent` entry.
6. Add a preview showing every variant and state, check both themes and keyboard use.
7. Bump the minor version and add a changelog entry.
