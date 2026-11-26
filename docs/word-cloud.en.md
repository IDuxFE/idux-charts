# Word cloud charts

`IxWordCloudChart` uses native ECharts graph nodes with deterministic cloud placement. It does not require `echarts-wordcloud` or another layout dependency.

```vue
<script setup lang="ts">
import { IxWordCloudChart } from '@idux/charts/word-cloud'
const data = [
  { id: 'analysis', name: 'Analysis', value: 100 },
  { id: 'experience', name: 'Experience', value: 60 },
]
</script>
<template>
  <IxWordCloudChart :data="data" :size-range="[14, 56]" style="height: 320px" />
</template>
```

## Layout options

| Property  | Default                                     | Meaning                                                                                                                                                                                      |
| --------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shape     | text                                        | text, rect or circle                                                                                                                                                                         |
| sizeRange | text [12,48], rect [24,40], circle [48,120] | Font size, suggested minimum tag height or bubble diameter in pixels                                                                                                                         |
| gap       | text 4, circle 8, rect 8 (minimum 8)        | Minimum separation between non-overlapping collision bounds; smaller rect gaps are clamped to 8px                                                                                            |
| overlap   | 0                                           | Allowed rectangular background intersection as a fraction of the smaller background area, at most 0.3; intersection width and height must each be at least 6px; backgrounds may cover labels |

Equal range endpoints produce a fixed size. Text and tag sizes use linear weight interpolation; bubble areas interpolate between the squared diameter endpoints. Nonzero equal weights use the range midpoint; zero weights use the minimum. Bubble area is a relative encoding with a minimum size, not an exact ratio of the raw values.

Rectangles either remain at least `max(8, gap)` pixels apart or overlap with at least 6px of intersection on **both axes**. Touching edges, narrow slivers and corner-only intersections below 6px are rejected. The intersection area must not exceed `overlap × smaller background area`, and backgrounds may cover other tags’ labels; use translucent fills to control readability. Each rectangle may overlap at most two other rectangles, limiting dense stacks. If no valid overlap fits, placement searches for a separated position; it never relaxes the rules to fit more tags.

## Continuous motion

Set `motion: true` for gentle, staggered floating, or pass
`motion: { amplitude: 12, amplitudeRatio: [1, 1], duration: 6000, pauseOnHover: true }`.
`WordCloudMotion` is exported from the aggregate and word-cloud entries.

`amplitude` is the maximum displacement in pixels (default 12, finite, between 0 and 20); larger words move slightly less.
`amplitudeRatio: [x, y]` sets non-negative, finite relative axis amplitudes (default `[1, 1]`). Ratios are normalized so displacement remains within `amplitude`: `[2, 1]` makes horizontal travel twice vertical travel; `[1, 0]` is horizontal only, `[0, 1]` vertical only, and `[0, 0]` disables floating.

`duration` is the base cycle in milliseconds (finite, positive), with stable per-word variation of ±20%.
`pauseOnHover` pauses all words in place while the pointer hits a word or its background, and resumes over blank canvas or on exit; legends do not trigger pausing.
Direction and phase derive from stable item IDs. Text, backgrounds and hit targets move together;
font sizes, colors and opacity stay unchanged. Zero amplitude does not start a loop.

In Vue templates, `<IxWordCloudChart motion />` is shorthand for `:motion="true"`; use `:motion="false"` to disable it.

`motion: false` disables continuous motion while retaining native entry/update transitions.
Native `animation: false` disables both. Invalid motion settings disable floating with a diagnostic,
without discarding the cloud. Without overlap, layout reserves swept bounds to maintain separation, so enabling motion may fit fewer words. With rectangular overlap enabled, each tag floats independently: only viewport margins are reserved, and static gap, intersection size, area and neighbor limits do not constrain the motion. Native transitions between updated layouts can still cross.

Motion pauses while the document is hidden or the component is loading. The system's reduced-motion
preference disables floating dynamically. Resize, font loading and data updates retain or resume motion;
SSR remains static. Disposal releases animators and environment listeners. The same registered extension
also supports `createWordCloudOption` consumers and leaves ordinary graph series untouched.
Native emphasis scaling, labelLayout and rotated text retain their existing collision limitations.

## Native configuration

Use native graph `label`, `itemStyle`, `symbolSize`, `categories`, `emphasis`, `blur`, `select`, `selectedMode`, `labelLayout`, `silent`, `cursor`, `legendHoverLink`, box layout fields, `z` and `zlevel` on the component. Native chart `tooltip`, `legend`, `title`, `color`, `animation*`, themes, loading and instance methods follow the common chart API.

The default tooltip uses the shared chart title, color strip and value row, following the global light/dark theme. It shows the full item name as its title and the series `name` as its row label (defaults to “数值”). Use `tooltip.valueFormatter` to format values or `tooltip.formatter` to replace the content.

`symbolSize` supports native callbacks and overrides automatic node dimensions. Text font sizes use `label.fontSize` or `sizeRange`; changing a text node's background size does not change its font size. Circle sizes must have equal width and height.

Labels default to `{b}`. Use `{b} {c}` for inline counts and `{b}\n{c}` for multiline bubbles. Callbacks retain the scalar raw value and business fields. Item options override category and series defaults. `label.width` controls content width, with padding added separately. Long labels truncate by default; tooltips retain full names. Rectangular tags default to a 2px corner radius. Override it with numeric `itemStyle.borderRadius`, or use 0 for square corners; the component adds this rendering support to graph nodes. Rectangular tags only need `itemStyle.color`: normal backgrounds default to `opacity: 0.15`, while emphasis and selection use `opacity: 1` and white labels. Emphasis preserves the original color. Override these defaults through each state’s `itemStyle` and `label`; text and circle shapes retain their existing behavior. Legend names and colors are derived from `categories` without explicit `legend.data`. Rectangular tag legends default to opaque icons; override with `legend.itemStyle.opacity`. Normal and selected states default to `borderWidth: 0`; override these with `itemStyle.borderWidth` and `select.itemStyle.borderWidth`.

Background opacity uses itemStyle.opacity; text opacity uses label.opacity. Text nodes inherit native palette colors while their background opacity is zero and label opacity maps linearly from 0.35 for the minimum valid value to 1 for the maximum. Equal values use opacity 1. Override label.opacity explicitly; set it to 1 for uniformly opaque text. Explicit label.color takes precedence.

The default primary color uses the shared Seer palette. Tag backgrounds use a translucent tint of that color. Site examples reuse the bar gradient palette, Seer risk/neutral colors, and global container/text theme tokens.

`plotTheme.palette` feeds the native color pipeline, with explicit `color` taking precedence. `plotTheme.color` supplies the single-color default when no palette is set. Categories use palette colors; uncategorized nodes retain native single-series coloring. Native series, category and item color overrides remain effective. Set `title: null` to remove an existing title through the shared chart lifecycle.

Use native categories and data[].category with legend filtering. Category names are resolved to numeric category indices in the generated option. Filtering repacks visible nodes without rescaling their weights. Reserve space for titles and legends with top/bottom.

The search demo updates matching items’ label color, opacity and background independently of native hover emphasis, without enabling selection. Search changes colors and backgrounds without changing font sizes or padding, keeping positions stable. Native highlight/downplay actions share the emphasis state with hover and are disabled by emphasis.disabled. Native selectedMode, select and item.selected implement persistent selection. Click and selectchanged events retain native graph/node semantics and raw data indices.

## Data and boundaries

Each item requires a nonempty name and a finite nonnegative numeric value. Zero is valid. Invalid items are skipped without renumbering raw indices. Stable unique ids are recommended; absent ids are generated from name and duplicate occurrence. Duplicate explicit ids invalidate the generated series. Source arrays and objects are not mutated.

Placement prioritizes higher weights. Items that cannot fit are neither rendered nor clickable; explicit sizes and gaps are not silently reduced. Select an appropriate TOP count before passing data. Empty states belong in the default slot.

Identical inputs and font environments produce identical layouts. Data, weights, label geometry, category filtering and container size changes can repack the cloud. Color changes, highlight and selection do not move nodes. State label geometry is reserved ahead of time. Explicit emphasis scaling, rotated labels or labelLayout movement can exceed collision guarantees.

Text uses rectangular bounds rather than glyph-pixel packing. The built-in layout does not support dataset/encode, axes, dataZoom, markers, graph links/force, roaming, dragging, progressive/large rendering, image masks or arbitrary silhouettes. visualMap is not a stable first-version contract.

Passing series replaces the generated series entirely. `createWordCloudOption` returns a native graph option that requires registration from the word-cloud component entry; it is not an independent ECharts wordCloud series type.

Text nodes default to the native ECharts color lift and full label opacity on hover, restoring their normal color and weighted opacity on mouseout. Override these defaults with `emphasis.label.color` and `emphasis.label.opacity`.

Text labels default to `padding: [2, 4]`, `borderRadius: 2` and `backgroundColor: 'transparent'`, reserving space for search backgrounds without extra caller configuration. Series, category and item label options can override these defaults.

## Validation and troubleshooting

Invalid shape, ordered positive size range (including sparse tuples), gap, overlap or duplicate explicit IDs emit an `[IxWordCloudChart]` warning and clear the generated series. Invalid rows and native symbol sizes skip individual items without changing raw indices. Invalid motion only disables floating. Inputs must follow the TypeScript contract; arbitrary JSON is not coerced into rows.

For missing words, check actual container dimensions, title/legend margins, label/state geometry, native size callback results and reserved motion space, then reduce the input count. Use `getEChartsInstance().getOption()` to inspect supplied options and `resize()` to verify container recovery. Private `__ixWordCloud` metadata is not an API. Placement candidates and spatial bucket allocation are bounded; extreme sizes/gaps use a finite scan fallback and may fit only one item.

The Vue component refreshes geometry when web fonts finish loading. Direct option consumers must call `chart.resize()` after fonts are ready. Selection follows stable IDs; removing an item clears its remembered selection, so re-adding it uses its initial `selected` value. Supply explicit IDs when reordering duplicate names.

Maintainers can read the [architecture review](design/component-architecture-review.md) and [validation record](design/word-cloud-validation.md) for module boundaries, native adapter risks and reproducible checks.

The component resets options when IDs, names or explicit selection change, avoiding stale native selection indices; weight updates retain node reuse where possible. Reordering, renaming and selection configuration changes can restart entry effects. Native ECharts selection is keyed by name, so duplicate names share selection even with different IDs. Use distinct names when independent selection is required.
