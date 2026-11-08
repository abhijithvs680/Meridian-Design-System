# Localization

Meridian is built to ship in any market: any language, script, direction, currency and date convention. Components never hard-code text direction, number formats or fonts. The app sets the locale and everything else follows. **LocaleShowcase** shows the same screen in English, German, Arabic, Japanese and Hindi.

## 1. Set the locale once
```html
<html lang="ar" dir="rtl">
```
- `lang` selects the script font stack, line height and hyphenation, and tells screen readers how to pronounce text.
- `dir="rtl"` mirrors the whole layout (Arabic, Hebrew, Persian, Urdu). Meridian uses logical CSS properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start`), so sidebars, toolbars, tables, badges and dialogs flip with no extra code.
- Set both on `<html>`. Mark mixed-language fragments with their own `lang` (a Latin customer name inside Arabic text needs nothing; a quoted Hindi phrase inside English gets `lang="hi"`).

## 2. Direction rules
| Element | Behavior in RTL |
| --- | --- |
| Layout, spacing, borders, text alignment | Mirrors automatically (logical properties) |
| Directional icons: back/next chevrons, send, play | Add `.m-icon-dir`; they flip with `scaleX(-1)` |
| Non-directional icons: search, check, settings, sparkle | Never flip |
| Numbers, IDs, code, tool calls, keys | Stay left-to-right inside RTL text (`unicode-bidi: isolate`) |
| Charts | Time still runs left to right on the x-axis (international convention); legends and labels align to the start |
| Progress bars, sliders, switches | Fill and move from the inline start (right in RTL) |
| ImageCompare, DateReel, keyboard keycaps | Spatial, not textual: stay as drawn |
| Arrows inside copy ("Next →") | Write them in the translation, not in the component; RTL translators use ← |

## 3. Scripts and fonts
Inter covers Latin, Greek and Cyrillic. For other scripts, `bundle.css` switches `--font-sans` by `:lang()` to the matching Noto family with the operating system's UI font as a fallback:

| Languages | Font stack after Inter |
| --- | --- |
| Arabic, Persian, Urdu | Noto Sans Arabic, Segoe UI, Tahoma |
| Hebrew | Noto Sans Hebrew, Segoe UI, Arial |
| Hindi, Marathi, Nepali | Noto Sans Devanagari, Nirmala UI |
| Bengali, Tamil, Telugu | Noto Sans Bengali / Tamil / Telugu, Nirmala UI |
| Thai | Noto Sans Thai, Leelawadee UI |
| Japanese | Noto Sans JP, Hiragino Sans, Yu Gothic UI, Meiryo |
| Chinese (Simplified / Traditional) | Noto Sans SC / TC, PingFang, Microsoft YaHei / JhengHei |
| Korean | Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic |

- Load only the Noto families for the locales you ship (Google Fonts or self-hosted WOFF2 subsets).
- Arabic, Indic and Thai text gets a 24px body line height so marks above and below letters never clip.
- Letter-spacing is Latin-only; it is reset to 0 for CJK, Arabic, Hebrew, Devanagari and Thai.
- CJK has no italics: emphasis uses weight, never `font-style: italic`.

## 4. Numbers, money, dates and time
Always format with the platform's `Intl` APIs and the user's locale. Never concatenate symbols or hard-code patterns.

```js
new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount)
// en-US $1,024.50 · de-DE 958,40 € · ar-SA ٣٬٨٤٢٫٠٠ ر.س. · ja-JP ￥154,000 · hi-IN ₹86,200.00
new Intl.NumberFormat(locale, { notation: "compact", style: "currency", currency }).format(4820000)
// hi-IN ₹48.2 लाख · ja-JP ￥724万 · en-US $48.2K
new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone }).format(date)
// en-US Oct 18, 2026 · de-DE 18.10.2026 · ja-JP 2026/10/18
new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-2, "minute")  // "2 minutes ago"
```
- **Currency** comes from the record, not the user: an invoice in EUR shows EUR to every viewer. Show the code (EUR, INR) when several currencies appear together.
- **Digits:** let the locale decide (Arabic-Indic digits for `ar-SA`); keep IDs and codes in Latin digits.
- **Calendars:** default to Gregorian for business records (`ar-SA-u-ca-gregory`); offer the local calendar as a display option where users expect it.
- **Time zones:** store UTC, display in the user's zone, and name the zone wherever a deadline crosses zones ("Due 18 Oct, 17:00 IST").
- **Units:** use locale-aware unit formatting (`Intl.NumberFormat(locale, { style: "unit", unit: "kilogram" })`).
- **Tabular numerals** stay on for every column of numbers in every script.

## 5. Text and translation
- **Expansion:** design for +35% length. German and Finnish run 30–40% longer than English; Japanese and Chinese run shorter but need taller lines. Buttons may wrap to two lines on narrow screens; never truncate a primary action.
- **No text in images or icons.** Every string lives in a translation file.
- **Plurals and gender** go through ICU MessageFormat (`{count, plural, one {# invoice} other {# invoices}}`), never `count + " invoices"`.
- **Sentence case** in English; follow each language's own capitalization rules (German capitalizes nouns).
- **Names and addresses:** a single "Full name" field unless the market needs split fields; never assume first/last order. Address forms adapt by country.
- **Agent copy** is translated like any other UI text. Agents answer in the user's language and keep citations, IDs and amounts in their original form.

## 6. Market and compliance cues
- **Tax IDs, phone numbers and postcodes** validate per country and say the expected format in the error ("Tax ID must be 15 characters for India").
- **Consent:** the cookie consent pattern (Banner) offers equal-weight choices, as GDPR-style rules require.
- **Personal data:** PiiRedaction and the ApprovalCard rule apply in every market; the redaction labels ([NAME], [PHONE], [ID]) are translated.
- **Accessibility law** (EU Accessibility Act, ADA, Section 508, EN 301 549) maps to WCAG 2.1/2.2 AA, which Meridian targets.

## 7. Print
`bundle.css` includes print rules: navigation, toolbars and buttons are hidden, cards don't split across pages, table headers repeat on every page, and external links print their address. Set the page size per market (A4 in most of the world, Letter in the US and Canada).

## 8. Checklist for a new market
- [ ] `lang` and `dir` set; LocaleShowcase renders correctly with the new locale added.
- [ ] Fonts for the script load; no missing-glyph boxes.
- [ ] All numbers, currencies, dates and plurals go through `Intl` / ICU.
- [ ] Longest translation of each primary button fits at 390px wide.
- [ ] Directional icons flip; non-directional ones don't.
- [ ] Forms validate local formats (tax ID, phone, postcode).
- [ ] Screen reader reads the language correctly (VoiceOver and NVDA with the locale's voice).
