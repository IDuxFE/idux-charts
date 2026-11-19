---
'@idux/charts-plots': patch
'@idux/charts': patch
---

Provide layout-aware default value labels in category and native bar charts.

- Show basic vertical values at `top` and horizontal values at `right`, including `horizontal-above`. Hide labels for grouped bars and multiple side-by-side stack groups.
- Show one total per category for a single stack, above vertical stacks and at the right of horizontal stacks. Recalculate totals and move the label to the last valid visible segment when legend selection changes. Include valid zero values, ignore missing/non-finite measurements, and omit labels when the entire category is missing.
- Preserve top-level, series, and data-item label overrides. Exclude non-bar helper series, including stripe overlays, from group detection and stack totals, and leave their labels unchanged.
- Use opaque `#B2B8C2` for dark `horizontal-above` value labels unless an explicit label color is supplied.
- Allow direct `useBarOption` consumers to provide an optional third `getChart` callback so stack totals can read live legend selection. Automatic totals read series data; dataset users should supply a custom `label.formatter`.

Update the demos, metadata, design/API guidance, and English/Chinese READMEs to describe these defaults, with unit and browser coverage for labels, missing values, legend selection, and loading transitions.
