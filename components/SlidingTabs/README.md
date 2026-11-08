# SlidingTabs

Segmented control and tabs whose selection indicator glides to the chosen item.

## When to use
Anywhere SegmentedControl or Tabs is used and the switch is frequent: chart ranges, dashboard views, record tabs.

## How it works
Same markup as the core components plus one `.x-tabs-ind` element. A small script measures the selected tab and moves the indicator with `transform`.

## Motion
380ms spring on transform and width. Reduced motion: the indicator jumps.

## Accessibility
Unchanged WAI-ARIA tabs/radio behaviour; the indicator is `aria-hidden`.

## Core equivalent
SegmentedControl, Tabs.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
