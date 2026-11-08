---
name: meridian-design-system
description: Build, revise, or review interfaces using the Meridian design system. Use for Meridian projects or when the user asks for Meridian patterns, tokens, or components in a dashboard, business app, agent interface, or marketing page.
---

# Meridian design system

Apply Meridian to the requested surface in the project's existing stack. The versioned reference implementation is bundled at [assets/meridian](assets/meridian/). Its components use framework-neutral CSS and HTML. An OpenUI adapter and a typed agent run inspector are available for projects that need them.

1. Inspect the host app's framework, styles, theme setup, and relevant interactions. Find matching entries by name or group in [catalog/data.json](assets/meridian/catalog/data.json). Each entry's `path` points to a specimen relative to the bundle. Read the specimen and its adjacent usage guide before adapting it.
2. Load [tokens.css](assets/meridian/tokens.css) followed by [bundle.css](assets/meridian/components/bundle.css) where Meridian is used. Import optional CSS only for the chosen patterns. Keep theme, density, and direction aligned with the host. Reuse existing dependencies and business logic.
3. Assemble the layout around the task. Keep business screens calm and dense with clear headings, filters, and contextual details. Use slate for agent identity, inline text for activity, and semantic colors for decisions and failures. Reserve large type and expressive art for surfaces that benefit from them.
4. Adapt examples to the host's data, routes, and handlers. Check the changed surface with representative data and states, at a narrow viewport and with keyboard input. Verify light and dark where supported, including visible focus and legible status labels.

Read the matching reference when you need more detail:

- [Build with Meridian](references/implementation.md) for CSS integration, dashboard and marketing recipes, asset lookup, and a targeted review.
- [Agent interfaces](references/agent-interfaces.md) for composer sizing, activity and approval patterns, real transport integration, and OpenUI.
