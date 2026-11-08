# Themes

Meridian ships **Light** (default) and **Dark**. Both are complete: every semantic token has a value in each, and every text pairing passes WCAG AA in each.

## Switching
```html
<html data-theme="dark">
```
- Default to the OS preference on first visit: `matchMedia('(prefers-color-scheme: dark)')`, then remember the user's choice (Settings › Appearance: System / Light / Dark).
- Set the attribute before first paint (an inline script in `<head>`) to avoid a flash.
- Previews and charts read the same variables, so they switch with the page.

## How dark differs (not just inverted)
| Concern | Light | Dark |
| --- | --- | --- |
| Elevation | `surface` (white) sits above `bg` (gray-50) | `surface` (gray-975) is *lighter* than `bg` (gray-990): raised = lighter |
| Accent | `primary` = blue-600 with white text | `primary` = blue-400 with dark text (`on-primary` = blue-950), so the accent doesn't glow |
| Soft fills | 50-stop tints | 950-stop tints, with 200/300-stop text |
| Borders | gray-200 hairline, gray-500 control border | gray-925 hairline, gray-600 control border |
| Shadows | Soft, 8–12% black | Stronger (40–50%), used even less |
| Charts | 500–600 stops | 300–400 stops for equal perceived weight |

## Contrast guarantees (both themes)
- `fg`, `fg-muted` on `bg`, `surface`, `surface-sunken`: ≥ 4.5:1.
- `fg-subtle` on `surface`: ≥ 4.5:1 (placeholders and timestamps stay readable).
- Every `on-*` on its fill and every `*-text` on its `*-soft`: ≥ 4.5:1.
- `border-strong` (control borders) and `focus` on their backgrounds: ≥ 3:1.

## Adding a brand theme
White-label apps (one per customer) override **semantic tokens only**:
```css
[data-brand="acme"] {
  --primary: #0f766e; --primary-hover: #115e59; --primary-pressed: #134e4a;
  --primary-soft: #e6f4f1; --primary-text: #115e59; --focus: #0f766e;
}
[data-theme="dark"][data-brand="acme"] { --primary: #2dd4bf; --on-primary: #042f2e; … }
```
Rules: brand themes may change `primary-*`, `focus`, `chart-1` and the logo. They may not change neutrals, status colors or `agent`, so status and AI meaning stay consistent across every customer. Re-run the contrast check for each brand.

## High contrast and forced colors
Under `forced-colors: active` (Windows high contrast), `bundle.css` gives buttons, badges, chips and cards real borders, marks selected rows, tabs, options and nav items with a `Highlight` outline, and keeps progress bars, switches and checkboxes visible with system colors. Never convey state with background color alone: selected rows also set `aria-selected`, tabs have an underline, badges have words.

## Print
Print uses a fixed light palette regardless of theme; see Localization › Print.
