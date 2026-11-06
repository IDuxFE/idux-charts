---
'@idux/charts-plots': patch
'@idux/charts': patch
---

Preserve the built-in Pie radius when a wider legend still fits beside the chart. Reserve the standalone chart inset only when the legend is hidden, avoiding unnecessary shrinking with platform-dependent font widths.
