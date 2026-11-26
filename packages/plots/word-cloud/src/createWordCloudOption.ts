import { cloneDeep, pick } from 'lodash-es'
import { convertArray, getAlphaColor, getTooltipsColor, seerColors } from '@idux/charts-core'
import type { BaseChartOption } from '@idux/charts-core'
import { mergeNativePlotOptions, mergePlotOptions } from '../../shared/plotOptions'
import { createPlotTooltipFormatter } from '../../shared/plotTooltip'
import type { PlotTooltipParams } from '../../shared/plotTooltip'
import { cloudExtent, cloudSize } from './layout'
import { wordCloudProps, wordCloudSeriesProps } from './types'
import type { WordCloudChartProps, WordCloudSeries, WordCloudSettings } from './types'

function warn(message: string) {
  // oxlint-disable-next-line no-console -- Match the other plots' actionable diagnostics.
  console.warn(`[IxWordCloudChart] ${message}`)
}

function textOpacity(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || value < 0) return 0.35
  if (min === max) return 1
  return 0.35 + ((value - min) / (max - min)) * 0.65
}

export function createWordCloudOption(
  props: WordCloudChartProps,
): BaseChartOption<WordCloudSeries> {
  const finish = (series: WordCloudSeries[]) =>
    mergeNativePlotOptions({ series }, props, wordCloudProps)
  if (props.series !== undefined) return finish([])
  const shape = props.shape ?? 'text'
  const sizeRange =
    props.sizeRange ?? (shape === 'text' ? [12, 48] : shape === 'rect' ? [24, 40] : [48, 120])
  const gap = props.gap ?? (shape === 'text' ? 4 : 8)
  const overlap = props.overlap ?? 0
  if (
    !['text', 'rect', 'circle'].includes(shape) ||
    !Array.isArray(sizeRange) ||
    sizeRange.length !== 2 ||
    !Array.from(sizeRange).every(n => Number.isFinite(n) && n > 0) ||
    sizeRange[1]! < sizeRange[0]! ||
    !Number.isFinite(gap) ||
    gap < 0 ||
    !Number.isFinite(overlap) ||
    overlap < 0 ||
    overlap > 0.3
  ) {
    warn('Expected a valid shape, positive ordered sizeRange, gap >= 0 and overlap in [0, 0.3].')
    return finish([])
  }
  if (shape !== 'rect' && overlap) warn('overlap only applies to rect; using 0.')
  const source = props.data ?? []
  const explicitIds = source.flatMap(row => (row.id == null ? [] : [String(row.id)]))
  if (new Set(explicitIds).size !== explicitIds.length) {
    warn('data contains duplicate ids.')
    return finish([])
  }
  const valid = (row: (typeof source)[number]) =>
    typeof row.name === 'string' &&
    !!row.name.trim() &&
    typeof row.value === 'number' &&
    Number.isFinite(row.value) &&
    row.value >= 0
  const values = source.filter(valid).map(row => row.value)
  const [min, max] = cloudExtent(values)
  const dark = props.darkMode === true
  const theme = props.plotTheme ?? {}
  const primary = theme.color ?? seerColors[0]!
  const motionInput = typeof props.motion === 'object' ? props.motion : {}
  let motion =
    props.motion && props.animation !== false
      ? {
          amplitude: motionInput.amplitude ?? 12,
          amplitudeRatio: motionInput.amplitudeRatio ?? ([1, 1] as [number, number]),
          duration: motionInput.duration ?? 6000,
          pauseOnHover: motionInput.pauseOnHover ?? true,
        }
      : undefined
  if (
    motion &&
    (!Number.isFinite(motion.amplitude) ||
      motion.amplitude < 0 ||
      motion.amplitude > 20 ||
      !Array.isArray(motion.amplitudeRatio) ||
      motion.amplitudeRatio.length !== 2 ||
      !Array.from(motion.amplitudeRatio).every(value => Number.isFinite(value) && value >= 0) ||
      !Number.isFinite(motion.duration) ||
      motion.duration <= 0 ||
      typeof motion.pauseOnHover !== 'boolean')
  ) {
    warn(
      'Expected motion amplitude in [0, 20], non-negative finite amplitudeRatio [x, y], duration > 0 and boolean pauseOnHover; motion disabled.',
    )
    motion = undefined
  }
  const settings: WordCloudSettings = {
    shape,
    sizeRange: sizeRange as [number, number],
    gap: shape === 'rect' ? Math.max(8, gap) : gap,
    overlap: shape === 'rect' ? overlap : 0,
    min,
    max,
    motion,
    rows: [],
  }
  const categories = cloneDeep(props.categories ?? [])
  const occurrences = new Map<string, number>()
  const usedIds = new Set(explicitIds)
  let invalid = 0
  const data = source.map(row => {
    const item = cloneDeep(row)
    const occurrence = occurrences.get(row.name) ?? 0
    occurrences.set(row.name, occurrence + 1)
    if (item.id == null) {
      let id = `ix-word:${row.name}:${occurrence}`
      while (usedIds.has(id)) id += ':'
      item.id = id
      usedIds.add(id)
    }
    const categoryIndex =
      typeof row.category === 'string'
        ? categories.findIndex(category => category.name === row.category)
        : row.category
    const category = categoryIndex == null ? undefined : categories[categoryIndex]
    // Graph's inherited category models use numeric indices in ECharts 5 and 6.
    if (categoryIndex != null && categoryIndex >= 0) item.category = categoryIndex
    const label = mergePlotOptions<NonNullable<typeof item.label>>(
      {
        show: true,
        position: 'inside',
        formatter: '{b}',
        fontFamily: theme.fontFamily ?? 'sans-serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: shape === 'text' ? cloudSize(row.value, min, max, settings.sizeRange) : 14,
        color: shape === 'text' ? 'inherit' : (theme.textColor ?? (dark ? '#E7EDF7' : '#454D61')),
        opacity: shape === 'text' ? textOpacity(row.value, min, max) : 1,
        ...(shape === 'text'
          ? { padding: [2, 4], borderRadius: 2, backgroundColor: 'transparent' }
          : {}),
        ...(shape === 'rect' ? { padding: [4, 10] } : {}),
      },
      props.label,
      category?.label,
      row.label,
    )
    item.label = label
    for (const state of ['emphasis', 'blur', 'select'] as const)
      item[state] = mergePlotOptions(props[state], category?.[state], row[state])
    const isValid = valid(row)
    if (!isValid) invalid++
    settings.rows.push({
      valid: isValid,
      label: cloneDeep(label),
      emphasisLabel: cloneDeep(item.emphasis?.label),
      explicitSize:
        row.symbolSize != null || category?.symbolSize != null || props.symbolSize != null,
    })
    return item
  })
  if (invalid) warn(`Skipped ${invalid} item(s) with empty names or invalid non-negative weights.`)
  const series = mergePlotOptions<WordCloudSeries>(
    {
      id: 'word-cloud',
      type: 'graph',
      layout: 'none',
      edges: [],
      roam: false,
      draggable: false,
      left: 16,
      right: 16,
      top: 16,
      bottom: 16,
      // Native dark themes define graph.color, which takes precedence over global color.
      color: props.color ?? theme.palette,
      symbol: shape === 'circle' ? 'circle' : 'rect',
      itemStyle: {
        color:
          props.color === undefined && theme.palette === undefined
            ? shape !== 'circle'
              ? primary
              : getAlphaColor(primary, dark ? 0.2 : 0.12)
            : undefined,
        opacity: shape === 'text' ? 0 : shape === 'rect' ? 0.15 : 1,
        borderWidth: 0,
        ...(shape === 'rect' ? { borderRadius: 2 } : {}),
      },
      emphasis: {
        scale: false,
        ...(shape === 'rect'
          ? { itemStyle: { color: 'inherit', opacity: 1 }, label: { color: '#fff' } }
          : {}),
      },
      select: {
        itemStyle: { borderWidth: 0, ...(shape === 'rect' ? { opacity: 1 } : {}) },
        ...(shape === 'rect' ? { label: { color: '#fff' } } : {}),
      },
    },
    pick(props, wordCloudSeriesProps),
    { data, categories, __ixWordCloud: settings },
  )
  const tooltip = convertArray(props.tooltip)[0]
  return mergeNativePlotOptions(
    {
      animation: true,
      ...(shape === 'rect' ? { legend: { itemStyle: { opacity: 1 } } } : {}),
      ...(theme.palette ? { color: theme.palette } : {}),
      tooltip: {
        trigger: 'item',
        formatter: createPlotTooltipFormatter<PlotTooltipParams>(params => {
          const item = Array.isArray(params) ? params[0] : params
          if (!item || typeof item.value !== 'number' || !Number.isFinite(item.value)) return
          return {
            title: item.name,
            rows: [
              {
                name: String(props.name ?? '数值'),
                value: tooltip?.valueFormatter?.(item.value, item.dataIndex) ?? String(item.value),
                color: getTooltipsColor(item.color ?? primary),
              },
            ],
          }
        }),
      },
      series: [series],
    },
    props,
    wordCloudProps,
  )
}
