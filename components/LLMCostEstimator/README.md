# LLMCostEstimator

Workload-based model spend estimates with dated pricing assumptions.

## When to use
Compare estimated AI spend during model selection.

## Anatomy
Workload inputs, pricing date, model comparison.

## Variants
| Variant | Use |
| --- | --- |
| Compare | Several models side by side for one workload (shown) |
| Single | One model: monthly, per-run and per-user cost |
| Budget | Adds a monthly cap and shows headroom with UsageMeter |

## States
Designed states: ready, recalculating, missing prices, stale.

| State | Treatment |
| --- | --- |
| ready | Costs recalculate as inputs change (debounced) |
| stale prices | Warning note when prices are older than 30 days |
| invalid input | Field-level error; table keeps the last valid result |

## Accessibility and Meridian rules
A real table with caption and column headers; numbers right-aligned and tabular; the cheapest row is labelled in text ("Lowest"), not only by colour; assumptions are always visible.
Use semantic landmarks, keyboard-reachable actions, plain-text state labels and polite announcements for meaningful changes. Respect reduced motion. Keep Meridian tokens, source and citation details, and the ApprovalCard rule for any external effect.

## Related components
Pairs with ModelCard (live cost per run) and UsageMeter (budget).

## OpenUI
`LLMCostEstimator(inputTokens, outputTokens, requestsPerDay, pricingUpdatedAt, models)`
