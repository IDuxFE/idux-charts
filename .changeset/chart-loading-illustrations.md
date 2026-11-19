---
'@idux/charts-core': minor
'@idux/charts-plots': minor
'@idux/charts': minor
---

Add theme-aware loading illustrations to all chart components and `useChart`.

- Select illustrations for horizontal/vertical bars, lines/areas, pies/rings/roses, radar, gauge, and liquid fill. Core charts use the pie illustration for pie or unspecified series and a generic illustration for other series.
- Keep the chart instance, existing data, zoom window, and legend selection while loading. Update illustration colors and masks when the effective light/dark theme changes, and keep the overlay aligned during resize.
- Export `ChartLoadingOptions` with `text`, `textColor`, `maskColor`, `color`, `fontSize`, `fontFamily`, and `icon` options. Custom icons accept image URLs or SVG source; an undefined icon retains the plot-specific default. The default message is `Loading...`.
- Announce loading through a status region, mark the chart busy, hide active tooltips, and prevent legend wheel paging through the overlay. Remove the overlay on cleanup and restore container positioning and its prior busy state without overwriting positioning changed by the application.
- Replace demo placeholders with the shared loading state and document localized messages, custom icons, and reactive `useChart` options.

Migration: `loading` now renders a DOM illustration and message instead of the ECharts spinner. Native spinner-specific settings such as `showSpinner` and `spinnerRadius` no longer affect its appearance. Loading content is excluded from ECharts image exports. Use `icon` and the supported appearance options to customize the new state.
