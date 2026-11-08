# Rules for AI builders

Put these rules (condensed) into the system prompt of any model that generates apps with Meridian. The model **assembles**; it does not design. Two generation paths are supported: **OpenUI Lang** (see the OpenUI section; best for streaming, generative UI inside chat and dashboards) and a **JSON app spec** (best for whole multi-page apps).

## Hard rules
1. Use only Meridian components and page patterns. No new components, no custom CSS, no inline styles.
2. Use only semantic or component tokens. No hex values, no off-scale spacing, no other fonts, no shadows on in-flow content.
3. One primary button per view. Agent actions use the agent variant with the sparkle.
4. Every page is one of the six page patterns. Pick the pattern first, then fill its slots.
5. Every list and dashboard ships loading, empty and error states.
6. Status fields map once to badge tones in the app spec; screens reuse the map.
7. Every agent write is an ApprovalCard. Every agent claim from data has a citation.
8. Copy: sentence case, verb-first buttons, errors that say what to do next.

## JSON app spec
A renderer you own turns the spec into UI: consistent design, far fewer output tokens than markup, and one theme change restyles every generated app.

```json
{
  "app": "Billing",
  "theme": { "brand": "default", "density": "comfortable" },
  "statusTones": { "invoice.status": { "draft": "neutral", "sent": "info", "paid": "success", "overdue": "danger" } },
  "nav": [
    { "label": "Overview", "icon": "home", "page": "dashboard" },
    { "label": "Invoices", "icon": "inbox", "page": "invoices", "count": "invoices.open" }
  ],
  "pages": [
    {
      "id": "invoices", "pattern": "list", "entity": "invoice", "title": "Invoices",
      "primaryAction": { "label": "New invoice", "opens": "invoice-form" },
      "agentAction": { "label": "Ask agent", "agent": "billing" },
      "views": ["All", "Open", "Overdue"],
      "columns": [
        { "key": "number", "type": "id" },
        { "key": "customer.name", "label": "Customer" },
        { "key": "status", "type": "status" },
        { "key": "amount", "type": "currency", "align": "right" }
      ],
      "filters": ["status", "customer", "dueDate"],
      "empty": { "title": "Create your first invoice", "agentPath": "Draft with agent" }
    },
    {
      "id": "dashboard", "pattern": "dashboard", "title": "Collections overview",
      "kpis": [{ "label": "Collected (30d)", "metric": "sum(invoice.amount where paid)", "compare": "previous_period" }],
      "insights": { "agent": "billing", "max": 3 },
      "charts": [{ "title": "Revenue by channel", "type": "stacked-bar", "x": "month", "series": "channel", "y": "sum(amount)" }],
      "attention": { "entity": "invoice", "filter": "status = overdue", "limit": 10 }
    }
  ],
  "agents": [
    { "id": "billing", "name": "Billing agent", "tools": { "read": ["get_invoices", "get_payments"], "write": ["send_reminder", "update_invoice"] } }
  ]
}
```
The renderer enforces the rules: `write` tools always render an ApprovalCard, `status` columns always render badges from `statusTones`, `pattern` decides the layout. The prop names follow `components/index.d.ts`.

## If the model must write code
- Ship a fixed component package and allow imports only from it.
- Lint generated code before rendering: reject raw hex values, arbitrary Tailwind values (`p-[13px]`), inline `style`, unknown components, and more than one primary button per page. Feed errors back and retry.
- Give 2–3 complete example pages per pattern as few-shot examples; examples steer layout better than rules.

## Visual QA loop (final builds)
Render each page headless at 390 and 1440px in both themes, run axe-core, then have a vision model check: alignment, one primary action, empty/error states present, nothing overflowing. Fix and re-render once.
