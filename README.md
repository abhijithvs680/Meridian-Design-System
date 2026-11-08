# Meridian — design system for business apps and agent dashboards

Meridian is a design system and implementation reference for internal tools, CRUD apps and dashboards where AI agents work alongside people. It is built to be used by human developers **and** assembled by AI app builders: three layers of tokens, 84 core components plus a 23-component Expressive pack, with variants and states, six page patterns, and an OpenUI library definition, so a model can compose screens without making design decisions of its own.

Calm, dense, and honest about what the agent did.

**Version 2.11.1** · Light and dark themes · Targets WCAG 2.2 AA · Right-to-left and locale-ready · OpenUI-compatible

Maintained by Abhijith.

## Use Meridian in a coding agent

Extract the Meridian skill ZIP and copy the whole `meridian-design-system` folder to your agent's skills directory. Use one of these project locations to share it with a team.

| Agent | Project directory | Personal directory | Invoke |
| --- | --- | --- | --- |
| [Codex](https://learn.chatgpt.com/docs/build-skills) | `.agents/skills/` | `~/.agents/skills/` | `$meridian-design-system` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `.claude/skills/` | `~/.claude/skills/` | `/meridian-design-system` |

For another Agent Skills client, use its skill discovery directory. For example, ask the agent to “Use Meridian to add a compact invoice assistant with inline run status.” The skill contains the design rules and the source needed to work offline. Rebuild it from this repo with `npm run build` followed by `npm run package:skill`. The expanded skill and ZIP are written to `releases/`.

## New in 2.11.1

AIComposer, CommandComposer, and ContextComposer start on one line. Research, Brief, and Canvas have room for longer instructions. Agent activity uses inline labels and progress indicators with slate identity tokens.

## New in 2.11.0

The [Section studio](index.html#studio) adds six agent composer layouts and 16,896 configurable combinations across six categories. Filter, save, preview and export HTML. The [studio guide](docs/section-studio.md) distinguishes original layouts from configurations and documents integration. The AIComposer and ChatThread now use the teal agent input surface.

## New in 2.10.0

The [Marketing collection](index.html#marketing) adds 27 original sections, four editable illustrations, two assembled launch pages, and a page composer with HTML export. See the [collection guide](docs/marketing-collection.md) for the section inventory and reference sources.

## New in 2.9.0

[Agent Operations Studio](patterns/operations-studio.html) demonstrates a complete review workflow with evidence, decisions, execution, reconnection, and audit export. Use the local npm tarball for the typed runtime and browser inspector. The [integration guide](docs/operations-integration.md) describes the event and authorization boundaries, and the [premium benchmark](docs/premium-benchmark.md) documents the comparison and remaining buyer requirements.

## New in 2.8.0

Open [the component workspace](index.html) to browse **130 previews**, including **20 new composition patterns**, **4 complete page templates** and **73 original SVG assets**. The original core and OpenUI library are preserved. New business, agent operations and marketing patterns are optional HTML/CSS compositions with local interaction demos.

- [Release guide and research sources](docs/premium-expansion.md)
- [AI builder contract](DESIGN.md)
- [Agent integration contracts](docs/agent-contracts.md)
- [Asset library](assets/README.md)
- [Verification report](docs/verification.md)

Run `npm run preview` (Python 3 required), then visit `http://127.0.0.1:8765`. Run `npm test` for state and package-integrity checks; `npm run build` rebuilds the catalog; `npm run package` produces the distributable ZIP. Native interactions work in standalone files, while serving over HTTP enables reliable iframe theme synchronization and clipboard support.

The counts in the original sections below describe the inherited 2.7 foundation. The complete current inventory is `catalog/data.json`. The new patterns are not additional React exports or automatically registered OpenUI primitives. Backend services and production accessibility validation remain application responsibilities.

## Design principles

1. **Data first, chrome last.** Neutral surfaces, one accent, hairline borders. Color is spent only on meaning: status, the primary action, and agent activity.
2. **Dense but breathable.** 14px body text, 44px rows, a 4px grid. Business users scan tables all day; respect their screen space without cramming.
3. **The agent is always visible.** Everything an agent produced or is doing carries the `agent` color, the sparkle icon and a name. People can always tell a computed fact from a generated one.
4. **Humans approve writes.** Agents read freely; any action that changes data, spends money or contacts someone passes through an ApprovalCard.
5. **Every state is designed.** Loading, empty, error, disabled, read-only and no-permission are part of the component, not an afterthought.
6. **Composition over invention.** Screens are assembled from components and page patterns. If something can't be built from them, the system gets a new component; the screen doesn't get custom CSS.
7. **Accessible by default.** Contrast, focus, keyboard and screen-reader behavior are built into every component, in both themes.

## Visual identity

**Character.** Meridian looks like a well-kept ledger: precise, quiet, trustworthy. It borrows from financial and clinical software, not consumer apps: no gradients, no illustrations in the UI, no playful motion.

**Name and mark.** A meridian is a line of reference: the mark is a circle crossed by a single vertical arc, drawn in `primary`. It sits in the top-left of the sidebar at 24px. Never recolor it to `agent`, never put it on a photo. The logo files are in Assets › Logos.

**Color identity.** Ink blue (`primary`) is the brand color, used sparingly. Violet (`agent`) belongs to AI only. Everything else is warm-neutral gray, which keeps long data-heavy sessions easy on the eyes.

**Shape.** Small, consistent radii: 4px for badges, 6px for controls, 10px for cards. Corners are soft but never round; only status dots, avatars and suggestion chips are pills.

**Depth.** Flat. Borders separate in-flow content; shadows exist only for things that float (menus, dialogs, toasts).

**Iconography.** Outline icons on a 24px grid, 1.75 stroke, rendered at 16px next to text and inheriting `currentColor`. Use Lucide (or Tabler outline) and never mix sets. The sparkle means "agent" and nothing else.

**Typography.** Inter for everything, JetBrains Mono for IDs, tool calls and logs. Three weights: 400, 500, 600. Sentence case everywhere.

**Motion.** Functional only: 120ms color changes, 200ms menus, 280ms drawers. The only looping animation is the running-agent pulse. Everything stops under `prefers-reduced-motion`.

## Content and voice
- Verb-first, sentence-case buttons: "Approve and send", "New invoice". Never "OK", "Submit" or "Click here".
- Errors say what happened, then what to do: "Couldn't load invoices. Retry in a minute." No "Error:", no stack traces.
- Empty states invite: "Create your first invoice."
- Agent copy is plain and accountable: "I drafted 4 reminders. Nothing is sent until you approve." The agent names its sources and never claims an action it didn't take.
- Numbers, money and dates: always formatted for the user's locale with `Intl` (examples in this system use en-IN: ₹1,24,500, "12 Oct 2026"); tabular numerals in every column; units in labels; relative times under 24 hours ("2 min ago"). See Localization.

## How this system is organised
| Section | What's in it |
| --- | --- |
| Design tokens | The three layers (primitive → semantic → component) and naming rules |
| Themes | Light and dark, how switching works, adding a brand theme |
| Typography and spacing | Type scale, spacing scale, density, layout grid |
| Component architecture | Anatomy, class and prop conventions, states, how to add a component |
| Responsive design | Breakpoints and how each pattern adapts |
| Accessibility | WCAG 2.2 AA standards and the per-component checklist |
| Localization | Right-to-left layouts, script-aware fonts, locale formatting, text expansion and print |
| Page patterns | Six page templates every app is built from |
| Agent UI | The five agent surfaces and their rules |
| Rules for AI builders | Hard rules and the JSON app spec for code-generating models |
| OpenUI | Library definition, prompt generation, theme mapping and an OpenUI Lang example |
| Governance | Versioning, contribution, deprecation and the changelog |
| Expressive pack | Optional motion layer: 23 original components, rules for when motion is allowed, Meri the agent character |
| UIArc crosswalk | Maps the AI catalog and records Meridian equivalents and source-access boundaries |

Every component has a live preview of its variants and key states and a README covering when to use it, its anatomy, variants, states and accessibility, plus its OpenUI signature where it can be generated. The 24 foundation components also carry do and don't guidance. **DashboardShowcase** shows a full agent-driven dashboard built only from these parts, and **LocaleShowcase** shows the same screen in five markets, including right-to-left Arabic.

## Quick start

```html
<html lang="en" dir="ltr" data-theme="light">
<head>
  <link rel="stylesheet" href="meridian/tokens.css">
  <link rel="stylesheet" href="meridian/components/bundle.css">
  <!-- optional: <link rel="stylesheet" href="meridian/components/expressive.css"> -->
</head>
<body>
  <button class="m-btn m-btn-primary">New invoice</button>
  <span class="m-badge m-badge-success">Paid</span>
</body>
</html>
```

Set `lang` and `dir` on `<html>` for every locale: fonts, number formats and right-to-left layout follow them (see Localization).

## Browser support

Current and previous major versions of Chrome, Edge, Firefox and Safari (desktop and mobile). Meridian relies on CSS custom properties, `color-mix()`, `:has()`, logical properties and `:focus-visible`, all available in these browsers since 2023. Older browsers get a usable but unstyled-in-places experience; no polyfills are shipped.

## Using this system
- Load `tokens.css` (the custom properties) and `components/bundle.css` (component classes); add `components/expressive.css` only if the app uses the Expressive pack. Light is the default; `data-theme="dark"` on `<html>` switches themes; `data-density="compact"` on any container tightens spacing.
- Build in any framework: components are CSS classes (`m-btn`, `m-table`, `m-approval` …) with state in ARIA attributes. `components/index.d.ts` documents the props every implementation exposes (React wrappers, OpenUI components or a JSON renderer).
- With shadcn/ui + Tailwind, map the semantic tokens onto shadcn's variables (`--background` = `bg`, `--card` = `surface`, `--primary` = `primary`, `--muted` = `surface-sunken`, `--border` = `border`, `--ring` = `focus`, `--radius` = `radius-md`) and keep the component rules.
- Components should only ever reference **semantic or component tokens**, never primitives like `blue-600`.

