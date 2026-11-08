# Meridian 2.8.0 / Expanded edition

This release expands the user's 2.7.0 archive without replacing its core CSS or OpenUI library. It adds an optional composition layer and a usable, searchable catalog.

## What ships
- 20 original HTML composition patterns across business, agent operations and marketing.
- Four full-page starting points: business operations, agent workspace, SaaS launch and workspace administration.
- Original SVG icons, six illustrations, four background patterns and three restored logo files. See `assets/manifest.json` for the exact inventory.
- Catalog search, category filtering, new-release filtering, desktop/mobile preview, theme, density, RTL, source copying and asset downloads.
- Local demo interactions: invoice filtering/sorting/CSV export, task movement, approval/rejection, run pause/resume/cancel, billing toggle, onboarding progress and native form validation.
- Repaired manifest paths, a complete component index and standalone styles for imported previews.

## Use it
Open `index.html` directly, or run `npm run preview` and visit `http://127.0.0.1:8765`. HTTP serving enables reliable iframe theme synchronization and clipboard access. The kit has no npm runtime dependencies; Python 3 is used for its server and build checks, and Node 18+ for state tests.

Copy a preview's inner markup and include its styles. Include `components/premium.js` only for demos; applications should implement their own handlers. It deliberately performs no network writes. The separate pure helpers in `components/premium-state.mjs` illustrate state transitions and can be imported independently.

New patterns use the `.mp-` prefix to avoid breaking `.m-` core and `.x-` expressive contracts. These are composition recipes, not new exported React components. The existing `components/index.d.ts` and OpenUI library retain their previous scope. No dependency versions were installed or changed and the existing OpenUI adapter was not recompiled in this release.

## Where the inspiration led
Reviewed November 8, 2026. Public gallery information informed categories and interaction patterns; no paid source code, private templates or third-party artwork was copied.

| Reference | Observed focus | Meridian response |
| --- | --- | --- |
| [Navbar Gallery](https://www.navbar.gallery/) | Sticky, dropdown and mega navigation | Native disclosure-based MegaNavigation |
| [Supahero](https://supahero.io/) | Curated hero sections | Split ProductHero with original orbital artwork |
| [CTA Gallery](https://www.cta.gallery/) | Buttons, forms and pricing actions | ConversionPanel and PricingComparison |
| [Footer Design](https://www.footer.design/) | Typographic, grid and resource footers | ResourceFooter |
| [3dicons](https://3dicons.co/) | Free and premium rendered icon collections | Original editable vectors consistent with Meridian's outline system; no 3D assets copied |
| [Scrolltide](https://www.scrolltide.co/) | Cinematic scroll templates and tutorials | Restrained optional entrance motion, reduced-motion support; no scroll hijacking |
| [Refero Styles](https://styles.refero.design/) | AI-readable DESIGN.md style references | A project-specific DESIGN.md and machine-readable catalog |
| [Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/application-ui) | App shells, forms, tables and multi-column layouts | Complete business/admin compositions rather than isolated decoration |
| [Untitled UI](https://www.untitledui.com/) | Broad component, page and asset coverage | Asset inventory and connected page examples |

Scrolltide's bare domain initially failed to load through the research tool; its indexed www homepage and academy descriptions were available. Research is a directional comparison, not an exhaustive evaluation of every premium design system.

## Production boundaries
The kit supplies design and frontend examples. It does not implement authentication, a database, payment processing, OAuth, real agent execution, virtualization, collaborative editing or a production policy engine. Those require application-specific engineering. Frontend permission displays do not enforce permissions. SVG illustrations use fixed brand colors; inline outline icons inherit `currentColor`. External font loading in the inherited CSS is optional and falls back to system fonts.

No universal “best” ranking or complete feature parity is claimed. Accessibility guidance is provided; a full assistive-technology audit and framework adapter validation remain consuming-product work.

