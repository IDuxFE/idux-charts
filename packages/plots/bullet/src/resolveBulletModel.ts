import type { XAXisComponentOption } from 'echarts'
import { convertArray, getAlphaColor, getTooltipsColor } from '@idux/charts-core'
import { defaultDarkMissingBackgroundColor } from '../../shared/plotTheme'
import type { PlotTheme } from '../../shared/plotTheme'
import { seerGradientStartColors } from '../../shared/linearColors'
import type { BulletChartProps, BulletChartDataItem, BulletRange } from './types'

const rangeColors = [3, 2, 1].map(index => seerGradientStartColors[index]!)

export const isFiniteBulletValue = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value)

interface BulletRow extends Omit<BulletChartDataItem, 'value' | 'target'> {
  value?: number
  target?: number
  actualColor: string
  targetColor: string
}

/** Shared state for geometry and tooltip content; missing values are normalized once. */
export interface BulletModel {
  props: BulletChartProps
  grouped: boolean
  rows: BulletRow[]
  ranges: (BulletRange & { color: string })[]
  min: number
  max: number
  theme: PlotTheme
  dark: boolean
  track: string
  missingColor: string
  text: string
  allZero: boolean
}

type BulletResolution =
  | { model: BulletModel; diagnostic?: never }
  | { model?: never; diagnostic: string }

export function resolveBulletModel(props: BulletChartProps): BulletResolution {
  const grouped = props.data !== undefined
  const source = props.data ?? [{ name: '', value: props.value, target: props.target }]
  const ranges = (props.ranges ?? []).map((range, index) => ({
    ...range,
    color: range.color ?? rangeColors[index % rangeColors.length]!,
  }))
  const axis = convertArray(props.xAxis)[0] as
    | Extract<XAXisComponentOption, { type?: 'value' }>
    | undefined
  const nativeMin = typeof axis?.min === 'number' ? axis.min : undefined
  const nativeMax = typeof axis?.max === 'number' ? axis.max : undefined
  const min = nativeMin ?? 0
  if (!isFiniteBulletValue(min)) return { diagnostic: `xAxis.min must be finite; received ${min}.` }
  // Validate range values before inferring max, so a bad upper bound is diagnosed at its source.
  for (const [index, range] of ranges.entries()) {
    if (!isFiniteBulletValue(range.upper))
      return { diagnostic: `ranges[${index}].upper must be finite; received ${range.upper}.` }
    const previous = ranges[index - 1]?.upper ?? min
    if (range.upper <= previous)
      return {
        diagnostic: `ranges[${index}].upper must be greater than ${previous}; received ${range.upper}.`,
      }
  }
  const max =
    nativeMax ??
    source.reduce(
      (upper, row) =>
        Math.max(
          upper,
          isFiniteBulletValue(row.value) ? row.value : upper,
          isFiniteBulletValue(row.target) ? row.target : upper,
        ),
      ranges.reduce((upper, range) => Math.max(upper, range.upper), Math.max(100, min + 1)),
    )
  if (!isFiniteBulletValue(max)) return { diagnostic: `xAxis.max must be finite; received ${max}.` }
  if (max <= min)
    return { diagnostic: `xAxis.max must be greater than xAxis.min (${min}); received ${max}.` }
  const overflowingRange = ranges.findIndex(range => range.upper > max)
  if (overflowingRange >= 0)
    return {
      diagnostic: `ranges[${overflowingRange}].upper must not exceed xAxis.max (${max}); received ${ranges[overflowingRange]!.upper}.`,
    }

  const theme = props.plotTheme ?? {}
  const dark = !!(props.darkMode ?? props.theme === 'dark')
  const color = getTooltipsColor(convertArray(props.color)[0]) || theme.color || '#458FFF'
  const colorAt = (value: number | undefined) =>
    value === undefined ? color : (ranges.find(range => value <= range.upper)?.color ?? color)
  const rows = source.map(row => {
    const value = isFiniteBulletValue(row.value) ? row.value : undefined
    const target = isFiniteBulletValue(row.target) ? row.target : undefined
    const styleColor = row.itemStyle?.color ?? props.itemStyle?.color
    return {
      ...row,
      value,
      target,
      actualColor:
        (typeof styleColor !== 'function' && getTooltipsColor(styleColor)) ||
        (grouped ? color : colorAt(value)),
      targetColor: props.targetColor ?? (grouped ? color : colorAt(target)),
    }
  })
  return {
    model: {
      props,
      grouped,
      rows,
      ranges,
      min,
      max,
      theme,
      dark,
      track: props.trackColor ?? getAlphaColor(color, dark ? 0.16 : 0.1),
      missingColor:
        theme.missingBackgroundColor ??
        (dark
          ? defaultDarkMissingBackgroundColor
          : getAlphaColor(theme.errorColor ?? '#F5654F', 0.12)),
      text: theme.secondaryTextColor ?? (dark ? '#808999' : '#A1A7B3'),
      allZero: rows.length > 0 && rows.every(row => row.value === 0),
    },
  }
}
