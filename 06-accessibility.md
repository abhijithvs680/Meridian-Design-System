# Accessibility

Target: **WCAG 2.2 Level AA** for every component, in both themes, in left-to-right and right-to-left layouts, and in Windows high-contrast mode. Accessibility is part of the definition of done, not a later pass.

## Standards
| Area | Standard | How Meridian meets it |
| --- | --- | --- |
| Text contrast (1.4.3) | 4.5:1 body, 3:1 for 18px+ / 14px bold | All semantic text pairs are checked in both themes; usage notes name the surfaces each token passes on |
| Non-text contrast (1.4.11) | 3:1 for control borders, focus rings, icons that carry meaning | `border-strong` and `focus` ≥ 3:1 |
| Use of color (1.4.1) | Never color alone | Badges have words, deltas arrows, tabs underlines, agent content a label and icon, chart series differ in lightness |
| Focus visible (2.4.7, 2.4.11) | Always visible, not obscured | 2px `focus-ring` + 2px offset on `:focus-visible`; sticky headers don't cover focused rows |
| Keyboard (2.1.1) | Everything works without a mouse | Native elements first; composite widgets follow WAI-ARIA patterns (menu button, tabs, dialog, combobox) |
| Target size (2.5.8) | ≥ 24×24px | Smallest control is 28px; touch layouts use 44px |
| Reflow (1.4.10) | No 2D scrolling at 320px | Responsive rules; tables scroll inside their own container |
| Text spacing / zoom (1.4.4, 1.4.12) | 200% zoom, user spacing | rem-friendly sizes, no fixed heights on text containers |
| Motion (2.3.3) | Respect reduced motion | All transitions and the agent pulse stop under `prefers-reduced-motion` |
| Status messages (4.1.3) | Announced without focus | Toasts `role="status"`, errors `role="alert"`, agent stream in a polite live region |
| Hover content (1.4.13) | Dismissable, hoverable, persistent | Tooltip rules |
| Labels (1.3.1, 3.3.2) | Every input labelled | Visible `<label>`; helper and errors linked with `aria-describedby` |
| Error handling (3.3.1, 3.3.3) | Identify and suggest | Error text names the fix ("Tax ID must be 15 characters") |

## AI-specific accessibility
- Streaming agent text is announced by sentence or on completion, never token by token.
- Generated content is labelled as generated (agent name, "Agent insight") for everyone, including screen-reader users.
- Agent-generated charts include a text summary and a "View as table" option.
- Approvals never default to the destructive action on Enter; time limits on approvals are shown and extendable.

## Component checklist (definition of done)
- [ ] Works with keyboard only; logical tab order; Esc closes overlays and returns focus.
- [ ] Correct roles, names and states (check with a screen reader: VoiceOver + Safari, NVDA + Firefox).
- [ ] Visible focus in both themes.
- [ ] Contrast checked in both themes for every state, including disabled-adjacent text.
- [ ] No information by color alone.
- [ ] Works at 200% zoom and 320px width.
- [ ] Reduced motion respected.
- [ ] Automated checks pass (axe-core in CI on every preview and generated page).

## Testing in CI
Run `axe-core` (via Playwright) against every component preview and every page an AI builder generates, in light and dark. Fail the build on serious or critical violations and feed them back to the generating model as correction input.
