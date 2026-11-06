---
'@idux/charts-core': minor
'@idux/charts-plots': minor
'@idux/charts': minor
---

Add Radar, Gauge and LiquidFill components with pure option builders, public prop types and reactive plot theme/typography configuration. Extend core option types for the new series and coordinate systems.

Schedule automatic chart resizing on the next animation frame to avoid ResizeObserver delivery loops, and cancel pending resize work when auto-resize is disabled or the chart is disposed.
