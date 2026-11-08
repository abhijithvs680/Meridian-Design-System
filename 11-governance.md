# Governance

## 2.10.0 — Marketing collection

Added 27 original section specimens, four SVG illustrations, two assembled launch templates, and a page composer with HTML export. The collection covers navigation, heroes, calls to action, footers, and native scroll effects.

## 2.9.1 — Agent palette

The dark theme uses muted amethyst for agent activity. LivePill uses tinted status surfaces with readable icons for running, waiting and completed states.

## 2.9.0 — Agent operations

Added the Operations Studio reference application, a typed run event projector and a reusable browser inspector. Restored the missing CSS token definitions from the JSON source and added validation for unresolved shared variables. Release artifacts include a local npm tarball and theme value handoff.

## 2.8.1 — Component workbench

The catalog opens directly to a searchable library of 130 specimens and four page templates. The workbench keeps live previews, original HTML, usage guides, and implementation details together. Use the viewport control to inspect responsive behavior and the foundations view to compare shipped token values.

## 2.8.0 — November 8, 2026

Added an optional premium composition pack (20 patterns), four page templates, 73 original SVG assets, and a searchable 130-preview catalog. Repaired imported manifest/document references and made component previews standalone. Preserved core token/CSS contracts and the existing OpenUI adapter. See `docs/premium-expansion.md` and `docs/verification.md` for scope and validation. New compositions are HTML/CSS recipes rather than new React/OpenUI exports.

## Versioning
Meridian follows semantic versioning across tokens, CSS classes, props and the OpenUI library together.

| Change | Version | Examples |
| --- | --- | --- |
| Major | x.0.0 | Renaming or removing a token, class, prop or OpenUI component; changing a positional argument order |
| Minor | 1.x.0 | New component, variant, token or OpenUI component; new optional prop at the end of a signature |
| Patch | 1.0.x | Color tuning within contrast targets, bug fixes, docs |

OpenUI signatures are positional, so **adding a required prop or reordering props is always a major change**. Add new props as optional, at the end.

## Deprecation
1. Mark it deprecated in the README and `index.d.ts` (`@deprecated` with the replacement).
2. Keep it working for at least one minor release; lint warns on use.
3. Remove it in the next major, listed in the changelog with a migration note.

## Contributing
- Proposals start from a real screen that can't be built with existing parts.
- Every change ships with: README update, tokens with usage notes, previews for all variants and states, both themes checked, accessibility checklist passed, OpenUI entry if the component is generatable.
- One owner approves design, one approves code. AI-builder impact (prompt size, rule changes) is reviewed for every new component.

## Quality gates in CI
- Token build: every semantic text pair re-checked for contrast in both themes.
- axe-core on every preview, light and dark.
- Visual regression screenshots of every preview at 390 and 1440px.
- Generated-app lint: no hex values, no unknown components, one primary per view.

## Changelog
### 2.7.0 — 8 Nov 2026
Professional and global-readiness release. No components removed; no breaking API changes.
- **Global markets:** right-to-left support (all layout CSS uses logical properties; `.m-icon-dir` mirrors directional icons), script-aware font stacks for Arabic, Hebrew, Devanagari, Bengali, Tamil, Telugu, Thai, Japanese, Chinese and Korean, taller line height for those scripts, locale-driven number, currency and date rules, print styles, and the new **Localization** section and **LocaleShowcase** (en-US, de-DE, ar-SA, ja-JP, hi-IN).
- **Accessibility, verified:** axe-core 4.14 (WCAG 2.0–2.2 A/AA rules) reports 0 violations across all 109 previews in light and dark. Fixed along the way: named listboxes, ARIA 1.2 combobox, calendar day names and pressed state, tree selection on the treeitem, chat log semantics, a real `<button>` for InlineEdit, 24px minimum remove-button targets, a global focus ring for every interactive element, and Windows high-contrast (forced colors) support.
- **OpenUI library, verified:** compiles under strict TypeScript against @openuidev/react-lang 1.1.0, zod 4 and React 19, and renders four end-to-end OpenUI Lang scenarios with 0 parse errors. Fixed: BarChart now renders (it referenced an unimplemented chart function), child lists are keyed, LLMCostEstimator formats for the user's locale (new optional `locale`), and React 19 types.
- **Professional hygiene:** sample data uses a fictional cast only (no real companies, products or banks); Expressive terminal colors are now tokens (`terminal-*`); print colors use primitives; one undefined token reference fixed; version aligned to 2.7.0 across files; README gains Quick start, Browser support and maintainer; claims in the README match what ships.

### 2.6.1 — 8 Nov 2026
- The nine AI components from 2.6.0 (ChatThread, AIComposer, AgentTimeline, MeetingSummary, AIEditReview, ImageGeneration, TrainingRun, LLMCostEstimator, AICommand) are kept and finished:
  - Real previews showing each component and its key states, with card markers (group "Agent"); previews no longer link their own stylesheets.
  - Full CSS for every part, built on existing Meridian styles: turns reuse AgentMessage (`.m-msg`), the composer extends `.m-composer`, AICommand extends `.m-cmdk`, timelines reuse `.m-timeline-icon`, progress uses `.m-progress`, the cost table uses `.m-table`.
  - READMEs gain variants, per-state treatments, accessibility notes, related components and real OpenUI signatures; the original text is kept.
- OpenUI fixes: `m-sr` instead of `sr-only`; per-instance ids via `useId`; solid agent Send; agent turns named by a new optional `agentName`; ImageGeneration adds Retry, Download and Use on the selected image; TrainingRun uses Meridian's progress bar and Resume; LLMCostEstimator uses `.m-table` and marks the lowest cost; AICommand gains an optional cited `answer`; AIEditReview changes can carry a `reason`. New props are optional and added last, so 2.6.0 output still parses.
- Docs: AgentRunSteps restored in the component inventory; changelog spacing and trailing blank lines fixed.

### 2.6.0 — 8 Nov 2026
- Added nine Meridian AI components: ChatThread, AIComposer, AgentTimeline, MeetingSummary, AIEditReview, ImageGeneration, TrainingRun, LLMCostEstimator and AICommand. Each has a README and preview, with CSS contracts and typed props. Added a complete AI pattern crosswalk; no UIArc source code is bundled.

### 2.5.1 — 8 Nov 2026
- Added the UIArc crosswalk and initial adaptation guidance. No third-party source code is bundled.

### 2.5.0 — 7 Nov 2026
- 12 Expressive components added to the OpenUI library (43 total): LivePill, AgentOrb, MorphButton, RollingNumber, ProgressRings, TextReveal, GenerationReveal, SuccessMoment, AgentLoop, AgentTerminal, Keycaps, ImageCompare.
- Props for those 12 in `index.d.ts`; shell-level Expressive components listed there as host-placed.

### 2.4.0 — 7 Nov 2026
- New opt-in **Expressive pack** (`components/expressive.css`, group "Expressive"): 23 original motion components — LivePill, MorphButton, SlidingTabs, Dock, RadialMenu, CardStack, ProgressRings, RollingNumber, DateReel, Keycaps, AgentTerminal, AgentOrb (Meri), AgentCursor, GenerationReveal, SpotlightCard, FrostedPanel, AgentLoop, DataFlow, TextReveal, SuccessMoment, VectorSearch, ImageCompare, TeamSwitcher.
- Each has a designed reduced-motion state and a named core equivalent. Motion curves `--ease-out`, `--ease-spring`, `--ease-in-out`.
- New docs section: Expressive pack.

### 2.3.0 — 7 Nov 2026
- OpenUI library grows from 13 to 31 components: AgentMessage, AgentRunSteps and all 16 agent components from 2.2.
- `index.d.ts` documents props for the 16 new agent components.

### 2.2.0 — 7 Nov 2026
- 51 new components (75 in total), filling the gaps found by reviewing the component types in a large public UI catalog. They're Meridian's own implementations, on Meridian tokens.
  - Inputs and forms: search, password + strength, number/money/phone, tags + mentions, inline edit, combobox + multi-select, segmented control, radio cards, chips, rating, slider + histogram, date/range/time/color pickers, file dropzone, rich text + signature.
  - Data: data grid, tree view, code block + diff, filter toolbar, reorderable list, timeline + comments; line, donut, gauge, sparkline, heatmap, treemap and funnel charts.
  - Navigation and overlays: command palette, table of contents, drawer + bottom sheet, popover + hover card, share access, accordion, resizable panels, banner, stepper, usage meter, onboarding checklist.
  - Agent: agent status, tool call, agent plan, reasoning block, source cards, context window, model card, agent handoff, response feedback, starter prompts, reply draft, PII redaction, AI workflow, connector setup, enrich column, voice input.
- Dark `surface-sunken` lightened to gray-950 so wells, avatars and timeline icons separate from the page.
- Deliberately not included (they conflict with the principles of flat, calm, data-first UI): glass and liquid effects, morphing menus and loaders, physics effects (black hole, ink, gravity), mascots, 3D/holo cards, cover flow, prize wheel, decorative text effects, marketing widgets (social proof toasts, live visitors).

### 2.1.0 — 7 Nov 2026
- Agent button is now soft (`agent-soft` fill, `agent-text` label) so a header has one filled button; new `m-btn-agent-solid` for the composer Send button. New tokens `agent-soft-hover`, `button-agent-solid-*`.
- KPI row (`m-stat-grid`) fits 4 cards in an 800px column instead of orphaning the last one; 16px gap.
- `m-grid-2` aligns cards to the top, so an insight beside a taller approval card doesn't stretch into empty space.
- Bar chart: slimmer 32px bars, light gridlines, optional value labels (`<b>` inside `.m-bar`).

### 2.0.0 — 7 Nov 2026
- Three-layer tokens: OKLCH primitive palette (8 hues), semantic tokens per theme, component tokens.
- Dark theme rebuilt on primitives; all text pairs pass AA in both themes.
- New tokens: breakpoints, z-index layers, durations, `space-0`, `space-1-5`, `space-10`, `space-16`, `shadow-raised`.
- New components: Menu, Select, Checkbox (checkbox, radio, switch), Avatar, Dialog (+ drawer), Toast, Tooltip, Progress (+ skeleton, spinner), pagination, DashboardShowcase.
- All components: hover, pressed, focus, disabled, loading, read-only and invalid states; compact density.
- Docs: principles and visual identity, themes, typography and spacing, component architecture, responsive, accessibility, governance.
- OpenUI library definition, theme mapping and example.
- Breaking: components now read component tokens (`button-primary-bg` …); semantic values changed slightly.

### 1.0.0 — 7 Nov 2026
- First release: tokens, 16 components, page patterns, agent UI, AI builder rules.
