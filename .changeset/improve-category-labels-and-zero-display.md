---
'@idux/charts': patch
'@idux/charts-plots': patch
---

Improve horizontal category labels and zero-value presentation in built-in Bar layouts.

- Show full category names on label hover, including rows with missing or all-zero measurements. Keep default truncation within the category label width, escape HTML label content, and support native rich-text tooltips. Honor custom axis tooltips and allow opting out with `yAxis.triggerEvent: false`.
- Constrain shared HTML tooltip titles and category text to the viewport and wrap long names, with an 18px title line height. Import `@idux/charts/dist/style.css` to apply these shared tooltip styles.
- In `horizontal-above`, hide numeric labels for zero values and suppress the central all-zero message so the category rows remain readable. Preserve missing-value styling and the existing `zeroText` behavior in other category layouts.

The same category-label tooltip behavior is available in the new grouped Bullet chart. Update API guidance and add regression coverage for long labels, missing values, all-zero data, and tooltip overrides.
