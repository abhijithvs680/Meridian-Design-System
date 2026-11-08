# LocaleShowcase

The same invoice header, KPI and table row in five markets, showing that Meridian components adapt to language, script, direction and number formats without any component changes.

## What it demonstrates
- **Direction:** Arabic sets `dir="rtl"`; the button, badge, numbers and table align from the right with no extra CSS, because components use logical properties.
- **Scripts:** Latin, Arabic, Japanese and Devanagari use their script font from the `:lang()` font stacks, with taller line height where the script needs it.
- **Formats:** every amount, compact KPI, percent and date comes from `Intl.NumberFormat` and `Intl.DateTimeFormat` for the locale: `$1,024.50`, `958,40 €`, Arabic-Indic digits with ر.س., `￥154,000`, and lakh grouping in `₹48.2 लाख`.
- **Bidirectional text:** the Latin customer name and invoice ID stay readable inside Arabic text because IDs and numbers are isolated (`unicode-bidi: isolate`).
- **Text expansion:** German labels run about 30% longer than English and still fit.

## Rules it relies on
See the **Localization** section: set `lang` and `dir` on `<html>`, never hard-code currency symbols or date patterns, and leave room for longer translations.

## Related components
Every component. This page is a test fixture: if a component breaks here, it isn't market-ready.
