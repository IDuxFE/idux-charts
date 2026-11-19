---
'@idux/charts-plots': patch
'@idux/charts': patch
---

Add layout-aware default bar labels: top for vertical bars, right for horizontal bars, hidden for grouped bars, top totals for vertical stacks, and right totals for horizontal stacks. Preserve explicit label overrides and update stack totals when legend selection changes.

Use an opaque muted gray for horizontal-above value labels in dark mode to distinguish them from background tracks without making the text too bright.
