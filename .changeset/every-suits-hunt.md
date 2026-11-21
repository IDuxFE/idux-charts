---
'@idux/charts-core': minor
'@idux/charts-plots': minor
---

Add default overlay slots to `IxChart` and all Plot components: `IxBarChart`, `IxLineChart`, `IxPieChart`, `IxRadarChart`, `IxGaugeChart`, `IxLiquidFillChart`, and `IxMapChart`.

- Place empty states, explanatory text, actions, or other custom content above a chart through its default slot. Slot content automatically fills the chart's content area and supports Vue 2 and Vue 3.
- Keep the chart mounted while displaying or updating slot content, preserving its instance and interaction state. Empty slots, conditional comments, and blank text do not create a blocking overlay.
- Preserve chart sizing with container padding, minimum heights, explicit dimensions, and responsive flex/grid layouts. The canvas and overlay stay within the same content box.
- Preserve the last viewport while a chart is hidden, preventing map transform errors when resizing or rebuilding for a theme change. Automatic resizing resumes when the chart becomes visible.

Update the chart examples to use overlay slots for empty states, and consolidate shared properties, slot usage, and chart lifecycle guidance in the base chart API documentation.
