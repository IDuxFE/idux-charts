---
'@idux/charts-core': patch
'@idux/charts-plots': patch
'@idux/charts': patch
---

Refine chart visual defaults and preserve explicit customization.

- Use category legend swatches with 1px rounded corners in built-in plots and the Seer theme. Export `createLegendIcon(width, height)` for matching custom legend dimensions; custom native icons and category legend data remain configurable.
- Give category Bar and Line/Area multi-row legends a 16px row gap while keeping columns aligned and paging controls within the reserved legend region.
- Make automatic Pie legend spacing depend on the initial rows per column: 20px for up to three rows and 16px for more rows, scaled with the layout height. Preserve explicit `legend.itemGap` without scaling. Use normal weight for summary captions and align paging icons with the value column.
- Soften bar shadows on every side and adapt the blur to the rendered bar geometry, including thin and short bars. Preserve explicit shadow overrides.
- Keep native bar hover backgrounds below data series and hover stripes above their bars. `useStripeBarSeries` defaults to bar `z: 2`, places stripes one level above the configured bar `z`, and propagates `zlevel`; explicit axis-pointer layers take precedence.
- Align horizontal names at the top of right Line/Area Y axes with their tick labels, respecting axis grids, label margins, and explicit name styles. Use `#A1A7B3` / `#808999` for light/dark category zero-state text unless the plot theme overrides it.
- Reduce Seer light tooltip background opacity to 0.72 and add 4px backdrop blur through the shared HTML tooltip stylesheet. Preserve explicit tooltip backgrounds and existing tooltip classes.
- Align demo titles and grids, use a shared left axis for same-unit trend comparisons, and update pie sorting examples while preserving missing-category positions and semantic risk ordering. Refresh API guides, English/Chinese package documentation, and demo metadata; retain explicit legacy-style pie comparisons and add regression coverage for the new defaults.

Verify legend columns and paging alignment with SVG layout anchors across Chromium, Firefox, and WebKit, avoiding false regressions from glyph overhang and browser screen-transform differences.
