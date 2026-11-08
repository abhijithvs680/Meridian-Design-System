# InsightCard

An agent-generated finding on a dashboard: a headline, the evidence, and how sure it is.

## When to use
Proactive findings on dashboards. Max 3 per dashboard, between the KPI row and the charts.

## Anatomy
`.m-insight` → `.m-insight-label` ("Agent insight") → `h4` finding with a number → evidence + citation → `.m-insight-foot` (meter + confidence text + freshness + one action).

## Variants
| Variant | Markup | Use for |
| --- | --- | --- |
| high/medium | default | Confident findings |
| low | `is-low` | Says what data would raise confidence |

## States
| State | How it looks / how to set it |
| --- | --- |
| Loading | Skeleton card with label |
| Dismissed | "Not useful" in a Menu; removes and records feedback |

## Accessibility
Confidence is text ("High confidence"); the meter is decorative. The label marks content as generated.

## Do and don't
- Do: make the headline a sentence with a number.
- Don't: style generated insights like computed KPIs.

## OpenUI
`InsightCard(title, body, confidence, asOf, action?)`
