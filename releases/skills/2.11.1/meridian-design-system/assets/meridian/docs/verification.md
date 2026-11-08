# Verification / Meridian 2.8.0

Checked November 8, 2026.

## Passed
- Node syntax checks for catalog and premium demo controllers.
- Three automated state-helper tests covering terminal run states, reversible pause, decision expiry, duplicate decisions, combined filtering, numeric sorting and non-mutating data operations.
- Standard-library validation of all 130 preview paths, local HTML links, duplicate HTML IDs, asset SVG XML, manifest entries and documentation paths.
- Chrome visual inspection of the catalog overview and the dark, RTL component listing.
- Invoice demo: search returned one Orbit row; Pending filter returned two rows; numeric ascending sort announced its state. A 390px embedded preview stacked the form controls and contained the wide table in its horizontal scroll region.
- Agent demo: start → pause → cancel; cancelled state disabled both run controls.
- Approval demo: approve announced a local-only result and disabled reject, preventing a second decision.
- Pricing demo: annual billing changed the three monthly-equivalent prices to 12, 28 and 60.
- Pipeline demo: a task moved from Planned to In progress to Done, with its final move control disabled.
- Catalog: matching search, zero-result search and the 20-item new-release filter.
- No application console errors were captured during the inspected invoice catalog flow.

## Limits
This is focused verification, not a full accessibility certification or exhaustive test of every inherited component. Screen-reader testing, all-browser coverage, full catalog mobile viewport testing and production adapter integration were not performed. CSV download, clipboard permissions, every form validation branch, and every inherited demo interaction were not exercised in the browser. Existing OpenUI code was preserved, not recompiled against a newly installed SDK. UI demos do not perform external writes or real agent execution.

The initial sandboxed server port was unreachable. A local HTTP server outside the sandbox on port 8765 enabled Chrome verification. No firewall or browser security settings were changed.
