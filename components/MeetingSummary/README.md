# MeetingSummary

Source-linked meeting notes with decisions and follow-up actions.

## When to use
Review an AI generated meeting record.

## Anatomy
Meeting metadata, summary, decisions, actions, transcript citations.

## Variants
| Variant | Use |
| --- | --- |
| Full | Meeting page: summary, decisions, actions, transcript sources |
| Card | Dashboard or inbox: title, 2-line summary, action count |
| Email | Plain-text export of the same sections |

## States
Designed states: processing, ready, partial, failed.

| State | Treatment |
| --- | --- |
| processing | Header AgentStatus "Summarising…", sections as skeletons |
| ready | All sections; every claim cites a transcript timestamp |
| partial | Info Alert "Recording cut off at 24:10" above the summary |
| actions approved | Footer collapses to "2 tasks created by you · 10:42" |

## Accessibility and Meridian rules
Sections are headed regions; timestamps are links into the transcript; action checkboxes are labelled with the action text.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
Action creation goes through the footer (the ApprovalCard rule in compact form). Citations use the same chips as AgentMessage.

## OpenUI
`MeetingSummary(title, date, attendees, summary, decisions, actions, sources?)`
