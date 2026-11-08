# Section studio · Meridian 2.11

Open `index.html#studio` through the local preview server. The studio provides 33 original layouts and 16,896 configurable combinations. These are not 16,896 independently designed templates.

| Category | Original layouts | Configurations |
| --- | ---: | ---: |
| AI composers | 6 | 3,072 |
| Navigation | 7 | 3,584 |
| Heroes | 5 | 2,560 |
| Calls to action | 6 | 3,072 |
| Footers | 5 | 2,560 |
| Scroll effects | 4 | 2,048 |

Each original layout has eight palettes × four typography directions × four spacing scales × four surface treatments = 512 configurations. Artwork and layout-specific interactions stay consistent. Typography uses local system fonts; appearance depends on the operating system. The studio covers the six categories above, not every primitive in the component workbench.

Filter any dimension, browse six previews at a time, open an interactive selection, and switch to a 390px preview. Save favorites in this browser and share a stable variant URL. URLs require the recipient to have access to the same catalog server. Export embeds CSS, JavaScript, and original SVG artwork into the HTML; internal catalog navigation still expects the Meridian folder. Favorites do not sync between devices.

## Composer integration

Use Workspace for record actions, Command for quick requests, and Context reply for chat. Each starts on one line. Research, Brief, and Canvas start with more room for longer instructions. Workspace puts task options behind its settings control. The default components inherit the host theme, and Section Studio applies the palette you select. Load `components/composer.css` and `components/composer.js`; the markup is in each preview. For dynamically inserted markup call `MeridianComposer.init(container)`.

Listen to `meridian:compose` on the form. Its detail contains `text`, `files` (File objects), `model`, `mode`, and `context`. Model and mode are preferences for your adapter, not connected services. The default adapter displays a local handoff, supports Stop, and preserves the draft. Replace its timer when connecting a real backend. Staged files are not read or uploaded. Permissions, validation, actual model selection, streaming, cancellation, upload limits and backend errors belong to the consuming application.

The controls use native form semantics, named selects, keyboard submission, IME protection, focus indicators and live status announcements. Validate actual brand variants, zoom, keyboard navigation, RTL, forced colors and host theme before production use. Configuration counts are exhaustive; visual review is representative rather than a claim that every combination has been manually audited.
