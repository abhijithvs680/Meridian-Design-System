# Page patterns

About 80% of business apps are a handful of screens. Each pattern is a fixed layout with named slots; an app is a set of these pages with their slots filled. See **DashboardShowcase** for pattern 4 built entirely from components.

## App shell
- Left: Sidebar (`sidebar-width`, rail at `bp-md`, drawer below). Optional 52px top bar with global search, notifications, user menu.
- Content: max 1440px, `--gutter` side padding, `gap-section` between sections.
- Optional right: agent panel (`agent-panel-width`), opened by "Ask agent" in the PageHeader; docks at `bp-xl`, overlays below.

## 1. List page
```
PageHeader   [title + count] [agent action] [primary: New <entity>]
Tabs?        saved views: All / Open / Overdue
DataTable    toolbar (search, filters, export) · rows · pagination
```
Slots: entity, columns (5–8; first is name/ID), filters (≤4 visible), status → tone map, row actions.

## 2. Detail page
```
PageHeader   breadcrumb › [record name] [status badge] [secondary] [primary]
Tabs         Overview / <related lists> / Activity / Agent log
Overview     8 cols: Card "Details" (2-column key-value)   4 cols: Card "Summary", Card "Related"
```

## 3. Form (drawer or page)
- ≤ 8 fields: right Drawer (480px) over the list. More: full page, single column, max 640px, grouped into Cards with `text-heading` titles.
- Sticky footer (`z-sticky`): Cancel (ghost), Save (primary). Validate on blur and on submit; on submit errors, focus an error summary at the top.

## 4. Dashboard
```
PageHeader   [title] [date range] [agent: Summarize] [Export / primary]
KPI row      3–4 StatCards
Insights     0–3 InsightCards (+ pending ApprovalCards)
Charts       Card grid, 6+6 or 8+4
Attention    "Needs attention" DataTable, top 10
```
Every chart answers one question in its title, every number shows its period, and every dashboard has a "Needs attention" list. A dashboard nobody can act on is a report.

## 5. Agent workspace
```
8 cols   conversation: AgentMessage turns, AgentRunSteps inline, composer pinned at bottom
4 cols   Card "Pending approvals" (ApprovalCards) · Card "Recent runs" (list + status badges)
```

## 6. Settings
Left sub-nav of sections. Each section is a Card with title, description, fields and its own Save (or Switches that apply instantly). Destructive settings go last in a "Danger zone" card behind a confirmation Dialog.

## States every page ships with
| State | Treatment |
| --- | --- |
| Loading | Skeletons shaped like the content after 300ms. No full-page spinners. |
| Empty | EmptyState with the first action, plus the agent path when an agent can do it. |
| Error | Alert (danger) with Retry in place of the failed section; the rest still works. |
| No permission | EmptyState: "You don't have access to Billing. Ask an admin." |
| Offline / stale | Info Alert "Showing data from 10:42 AM" with Refresh. |
