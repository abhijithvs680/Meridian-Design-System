# Design tokens

Meridian tokens come in **three layers**. Each layer only references the one below it, so a brand change happens in one place and every component follows.

```
Layer 1  Primitive   gray-50 … gray-990, blue-50 … blue-950, violet-*, green-*, amber-*, red-*, teal-*, rose-*
            ↓  (aliased per theme)
Layer 2  Semantic    bg, surface, fg, fg-muted, border, primary, on-primary, agent, success-soft, danger-text, focus, chart-1 …
            ↓  (aliased once)
Layer 3  Component   button-primary-bg, input-border-focus, table-row-selected, nav-item-active-bg, approval-header-bg …
```

| Layer | Purpose | Who may use it |
| --- | --- | --- |
| Primitive | The raw palette: 8 hues × 11 stops (gray has 16), generated in OKLCH with even lightness steps so the same stop has the same contrast across hues. Mode-stable: `blue-600` is the same color in every theme. | Only semantic tokens. Never components, never app code. |
| Semantic | What a color **means**: surfaces, text, borders, actions, status, agent, charts. Each has a light and a dark value pointing at primitives. | Components and app code. |
| Component | What a specific part of a component uses: `button-primary-bg`, `input-border-error`. Points at semantic tokens. | That component only. Override these to restyle one component without touching the rest. |

## Naming
- Lowercase kebab-case. Pattern: `{category}-{role}-{variant}-{state}`, dropping parts that don't apply.
- Semantic text-on-fill pairs: `primary` / `on-primary`; soft backgrounds pair with `-text`: `danger-soft` / `danger-text`.
- States append `-hover`, `-pressed`, `-focus`, `-disabled`, `-selected`.
- Component tokens start with the component name: `button-`, `input-`, `table-`, `nav-item-`, `agent-`, `approval-`.

## Example: how a primary button gets its color
```
button-primary-bg  →  {primary}  →  light: {blue-600} = #2e6ae1
                                     dark:  {blue-400} = #71a3ff
```
Changing the brand to teal means changing `primary`, `primary-hover`, `primary-pressed`, `primary-soft` and `primary-text` to teal primitives. No component changes.

## Non-color scales
Spacing, radius, size, breakpoints, layers (z-index) and durations are single-value scales (layer 1). Their semantic layer lives in `components/bundle.css` as aliases:

| Semantic alias | Points at | Used by |
| --- | --- | --- |
| `--pad-card` | `space-5` (compact: `space-4`) | Card, StatCard, InsightCard |
| `--gap-grid` | `space-6` | Card grids, KPI row |
| `--gap-section` | `space-8` | Between page sections |
| `--gap-field` | `space-4` | Between form fields |
| `--gutter` | `space-4` → `space-6` at `bp-lg` | Page side padding |
| `--button-height` / `--input-height` | `control-md` (compact: `control-sm`) | Button, inputs |
| `--card-radius` / `--button-radius` | `radius-lg` / `radius-md` | All cards / controls |

## Consuming tokens
- **CSS**: `var(--surface)`, `var(--space-4)`. Generated `tokens.css` declares the light theme on `:root` and dark under `[data-theme="dark"]`.
- **Tailwind**: map semantic tokens in `theme.extend.colors` (`surface: 'var(--surface)'`) and spacing to the scale; disable arbitrary values in lint.
- **JS / OpenUI themes**: read `tokens.json` and resolve aliases per theme (see the OpenUI section).
- **Rules**: never hard-code hex values; never reference primitives in components; never add a token without a usage note.
