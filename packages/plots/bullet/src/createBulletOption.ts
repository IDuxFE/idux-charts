import type { XAXisComponentOption } from 'echarts'
import { version } from 'echarts/core'
import { convertArray, getTooltipsColor } from '@idux/charts-core'
import type { BaseChartOption } from '@idux/charts-core'
import { mergeNativePlotOptions } from '../../shared/plotOptions'
import { createCategorySlider } from '../../shared/categoryZoom'
import { mergeCartesianGrid } from '../../shared/cartesian'
import { categoryLabelDefaults } from '../../shared/categoryLabel'
import { createPlotTooltipFormatter } from '../../shared/plotTooltip'
import type { PlotTooltipParams } from '../../shared/plotTooltip'
import { bulletProps } from './types'
import type { BulletChartProps, BulletSeriesOption } from './types'
import { resolveBulletModel } from './resolveBulletModel'
import { createBulletSeries } from './renderBullet'
import { applyLegacyRangeLabels } from './legacyRangeLabels'

export { bulletProps } from './types'
export type {
  BulletChartProps,
  BulletChartPublicProps,
  BulletChartDataItem,
  BulletRange,
} from './types'

export function createBulletOption(props: BulletChartProps): BaseChartOption<BulletSeriesOption> {
  const { model, diagnostic } = resolveBulletModel(props)
  if (!model) {
    // oxlint-disable-next-line no-console -- Invalid configuration should be actionable without throwing.
    console.warn(`[IxBulletChart] ${diagnostic}`)
    // Native axes are partial overrides of our generated coordinate system.
    // Do not submit them on their own when that system cannot be generated.
    return mergeNativePlotOptions(
      { series: [] },
      props,
      props.series === undefined
        ? [...bulletProps, 'xAxis', 'yAxis', 'grid', 'dataZoom']
        : bulletProps,
    )
  }
  const { grouped, rows, ranges, min, max, theme, dark, text, allZero } = model
  const above = grouped && props.layout === 'horizontal-above'
  const nativeAxis = convertArray(props.xAxis)[0] as
    | Extract<XAXisComponentOption, { type?: 'value' }>
    | undefined
  const alignRangeLabels =
    grouped &&
    ranges.length > 0 &&
    nativeAxis?.interval == null &&
    nativeAxis?.splitNumber == null &&
    (nativeAxis?.min == null || typeof nativeAxis.min === 'number') &&
    (nativeAxis?.max == null || typeof nativeAxis.max === 'number')
  const labelMin = typeof nativeAxis?.min === 'number' ? nativeAxis.min : min
  const labelMax = typeof nativeAxis?.max === 'number' ? nativeAxis.max : max
  const tooltip = convertArray(props.tooltip)[0]
  const format = (value: number, index: number) =>
    tooltip?.valueFormatter?.(value, index) ?? String(value)
  const generated: BaseChartOption<BulletSeriesOption> = {
    animation: true,
    grid: mergeCartesianGrid(
      {
        top: grouped ? 16 : 0,
        bottom: grouped ? 24 : 0,
        left: grouped ? 16 : 0,
        right: above ? 72 : grouped ? 16 : 0,
      },
      props.grid,
    ),
    xAxis: {
      type: 'value',
      min,
      max,
      show: grouped && (!above || ranges.length > 0),
      splitNumber: 3,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: !ranges.length,
        lineStyle: { color: theme.splitLineColor ?? (dark ? '#354052' : '#E1E5EB') },
      },
      axisLabel: {
        hideOverlap: true,
        ...(grouped && ranges.length ? { showMinLabel: true, showMaxLabel: true } : {}),
        ...(alignRangeLabels
          ? {
              customValues: [...new Set([labelMin, ...ranges.map(range => range.upper), labelMax])],
            }
          : {}),
        color: theme.secondaryTextColor ?? (dark ? '#A1A7B3' : '#6F7785'),
        fontFamily: theme.numberFontFamily,
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      show: grouped && !above,
      data: rows.map(row => row.name),
      triggerEvent: true,
      tooltip: { show: false },
      axisLine: {
        show: true,
        lineStyle: { color: theme.borderColor ?? (dark ? '#354052' : '#E1E5EB') },
      },
      axisTick: { show: true },
      axisLabel: {
        ...categoryLabelDefaults,
        color: theme.secondaryTextColor ?? (dark ? '#A1A7B3' : '#6F7785'),
        margin: 16,
        fontFamily: theme.fontFamily,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: createPlotTooltipFormatter<PlotTooltipParams>(params => {
        const item = Array.isArray(params) ? params[0] : params
        const row = item && rows[item.dataIndex]
        if (!row || (grouped && allZero && !above)) return undefined
        return {
          title: row.name,
          rows: [
            ...(row.value !== undefined
              ? [
                  {
                    name: String(props.name ?? '实际值'),
                    value: format(row.value, item.dataIndex),
                    color: item.color ? getTooltipsColor(item.color) : row.actualColor,
                  },
                ]
              : []),
            ...(row.target !== undefined
              ? [
                  {
                    name: '目标值',
                    value: format(row.target, item.dataIndex),
                    color: row.targetColor,
                  },
                ]
              : []),
          ],
          notes: row.value === undefined ? [row.missingReason || '–'] : undefined,
        }
      }),
    },
    // dataZoom previews the first series on its axis, so keep the actual values first.
    series: createBulletSeries(model),
    // Keep a stable placeholder so clearing zero text does not restart series animations.
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        silent: true,
        style: {
          text: grouped && allZero ? (props.zeroText ?? '') : '',
          fill: text,
          fontSize: 12,
          fontFamily: theme.fontFamily,
        },
      },
    ],
  }
  const option = mergeNativePlotOptions(generated, props, bulletProps)
  if (grouped && ranges.length && props.series === undefined && Number.parseInt(version, 10) < 6) {
    applyLegacyRangeLabels(option)
  }
  if (grouped && option.dataZoom) {
    option.dataZoom = convertArray(option.dataZoom).map(item =>
      item.type && item.type !== 'slider'
        ? item
        : createCategorySlider(item, item.orient ?? 'vertical', theme, !!dark),
    )
  }
  return option
}
