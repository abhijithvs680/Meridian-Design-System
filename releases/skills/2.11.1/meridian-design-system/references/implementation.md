# Build with Meridian

Use paths relative to [the bundled implementation](../assets/meridian/). Adapt the required files into the target repo and use that repo's asset paths and build conventions. Keep imported CSS local to the intended surface if the host already has global resets or a different token system. The bundle contains document-level styles, so check for collisions before adding it to a shared app entry point. For a new standalone surface, load the styles in the order shown below.

| Task | Starting point | Styles |
| --- | --- | --- |
| Records and business dashboards | [Invoice Workbench](../assets/meridian/components/InvoiceWorkbench/preview.html) and [business operations](../assets/meridian/patterns/business-operations.html) | `tokens.css`, `components/bundle.css`, `components/premium.css` for `mp-*` patterns |
| Agent panels and chat | [Chat Thread](../assets/meridian/components/ChatThread/preview.html) and [agent interfaces](agent-interfaces.md) | Core styles plus `components/composer.css` when using the portable composer |
| Marketing page or launch | [Marketing collection](../assets/meridian/docs/marketing-collection.md) and [Fieldwork launch](../assets/meridian/patterns/fieldwork-launch.html) | `marketing/marketing.css` with the `mk-page` wrapper and `marketing/marketing.js` for interactive sections |

- Search [catalog/data.json](../assets/meridian/catalog/data.json) for component names, categories, and page templates. Look up SVGs in [assets/manifest.json](../assets/meridian/assets/manifest.json). Bundle the assets the page uses and update their paths when moving markup.
- Follow [the token layers](../assets/meridian/01-tokens.md) and [theme contract](../assets/meridian/02-themes.md). Use semantic variables for text, surfaces, focus, actions, and feedback. Preserve tabular figures, locale formatting, and logical spacing. Load `components/expressive.css` only for patterns that use its `x-*` classes.
- In business views, make the record task primary. Follow the page heading with a summary if needed, filters, and the table or list. Place detail and secondary actions near their related record.
- For marketing, pick a fitting navigation, hero, evidence, CTA, and footer from the shipped sections. Replace demo URLs, claims, pricing, and form handlers. Preserve ordinary document scroll and a usable static view when motion is reduced.
- Wire required empty, loading, error, and restricted states to the host. Check keyboard focus order, responsive overflow, form labels and contrast. See [the accessibility guide](../assets/meridian/06-accessibility.md) for checks specific to components.
