---
'@idux/charts': minor
'@idux/charts-plots': minor
---

Add `IxBulletChart` and `createBulletOption` for comparing actual values, targets, and qualitative ranges.

- Import the component, option builder, and public types from `@idux/charts`, `@idux/charts/bullet`, or `@idux/charts-plots`. Include Vue global-component declarations for `IxBulletChart`.
- Use `value` and `target` for a single indicator, or supply `data` for grouped rows. Supplying `data` selects grouped mode even for an empty array or a single row. Support `horizontal` and `horizontal-above` grouped layouts, with full-name tooltips for truncated categories.
- Configure qualitative ranges with increasing numeric `upper` bounds, optional colors and labels, and an explicit scale through `xAxis.min` / `xAxis.max`. Keep actual bars, tracks, target markers, and range guides aligned with native axis direction and bar widths.
- Distinguish valid zero values from missing measurements. Missing actual values use a missing-data background while valid targets remain visible. `zeroText` is opt-in; the above-label layout suppresses zero-value labels while retaining tracks and targets.
- Support native bar labels, formatters, styles, emphasis, selection, marks, and tooltip overrides. Preserve the grouped zoom window during data refreshes, and follow appended categories when the current window is at the end.
- Integrate reactive plot themes, light/dark loading illustrations, default overlay slots, and the shared chart lifecycle. Export `getLinearColor` and `getLinearColors` through the aggregate plots entry for matching custom gradients.

Range bounds use measurement units rather than normalized ratios. Invalid scales or ranges emit actionable diagnostics and clear generated series. The built-in layout uses a horizontal value axis and vertical category axis; supply native `series` to replace the generated series for other arrangements. Add API guidance and single/grouped examples for Vue 2 and Vue 3 consumers.
