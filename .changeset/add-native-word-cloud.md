---
'@idux/charts': minor
'@idux/charts-plots': minor
'@idux/charts-core': minor
---

Add `IxWordCloudChart` and `createWordCloudOption`, built on native ECharts graph series without an additional word-cloud plugin.

- Export the component, builder, public props, data-item, shape, and motion types from `@idux/charts`, `@idux/charts/word-cloud`, and `@idux/charts-plots`. Add Vue global-component declarations and include `GraphSeriesOption` in the core `ChartOption` series union.
- Render weighted horizontal text, rectangular tags, or circles with configurable `sizeRange`, `gap`, and rectangular background `overlap`. Measure labels and state geometry, prioritize higher weights in crowded containers, and omit items that do not fit without silently shrinking explicit sizes.
- Support native categories, palettes, labels, item styles, tooltips, emphasis, selection, and graph-node events. Keep event indices tied to the original input. Preserve selection by stable item identity and retain positions for appearance-only changes; remeasure after container or asynchronous font changes.
- Add opt-in floating `motion`, with amplitude, axis ratio, duration, and pause-on-hover controls. Reserve movement space and respect reduced-motion preferences and disabled animation. Native entry/update transitions remain separately configurable.
- Integrate reactive plot themes, light/dark loading illustrations, default overlay slots, and shared instance methods. Add examples for text, tags, circles, motion, search highlighting, and native options.

Use finite non-negative weights and non-empty names; zero is valid. Invalid items are skipped, invalid layout settings or duplicate explicit IDs clear generated series, and invalid motion settings disable floating. Empty or unplaceable data leaves an empty canvas for caller-provided slot content. Native selection uses names, so duplicate names share selection; provide distinct names when independent selection is required.

The built-in layout supports horizontal labels rather than pixel-level glyph packing, image masks, arbitrary outlines, or force layouts. It does not support dataset/encode, axes, dataZoom, links, dragging, or roaming. `createWordCloudOption` requires the extensions registered by the component entry; direct builder consumers should resize after fonts load. Supplying native `series` replaces all generated series.
