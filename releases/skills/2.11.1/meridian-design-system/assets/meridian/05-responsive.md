# Responsive design

Mobile-first: base styles target small screens, and layout changes happen only at the breakpoint tokens.

| Token | Min width | Device | Layout |
| --- | --- | --- | --- |
| (base) | 0 | Phones | Single column, sidebar in a drawer, 16px gutter |
| `bp-sm` | 640px | Large phones | Dialog footers go inline; short form fields may pair |
| `bp-md` | 768px | Tablets | Sidebar becomes a 56px icon rail; 2-column card grid |
| `bp-lg` | 1024px | Laptops | Full 240px sidebar; 24px gutter; 2–3 column grids |
| `bp-xl` | 1280px | Desktops | 4-up KPI row; agent panel docks beside content |
| `bp-2xl` | 1536px | Wide | Content caps at 1440px and centers |

## How each part adapts
| Part | < 768px | 768–1023px | ≥ 1024px |
| --- | --- | --- | --- |
| Sidebar | Drawer from a menu button | Icon rail with tooltips | Full sidebar |
| PageHeader | Title on its own line; primary action stays, others go into a "⋯" Menu | Actions wrap | One row |
| KPI row | 2 per row | 2 per row | 4 per row (≥1280) |
| Card grid | 1 column | 2 columns | 2–3 columns |
| DataTable | ID, name, status, amount; other columns `hide-sm`; row opens detail | Horizontal scroll if needed | All columns |
| Forms | Full width | Max 640px | Max 640px; drawers 480px |
| Dialog | Full-width bottom sheet, buttons stacked, action on top | Centered, 440px | Centered, 440px |
| Agent panel | Full-screen sheet | Overlay drawer 400px | Docked 400px at ≥1280 |
| ApprovalCard | Key-values stack | Two-column key-values | Two-column key-values |

## Rules
- **Never hide functionality** on small screens; move it (into a menu, a detail page or a sheet).
- Touch targets ≥ 44×44px on touch devices: use `control-lg` heights or extend the hit area with padding.
- Use container-friendly layouts (`grid-template-columns: repeat(auto-fit, minmax(…))`) so cards adapt inside panels too, not just to the viewport.
- Don't change font sizes between breakpoints; change layout.
- Hover-only affordances (row actions appearing on hover) must be always visible on touch (`@media (hover: none)`).
- Test every page at 390, 768, 1024 and 1440px wide.
