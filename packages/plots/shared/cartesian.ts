import type { XAXisComponentOption, YAXisComponentOption } from 'echarts'
import type { TooltipComponentOption } from 'echarts/components'
import { version } from 'echarts/core'
import { convertArray, getTooltipsColor } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'
import { clearChartComponent, mergePlotOptions } from './plotOptions'
import { createPlotTooltipFormatter } from './plotTooltip'
import type { PlotTooltipParams } from './plotTooltip'

export const cartesianGridBounds =
  Number.parseInt(version, 10) < 6
    ? { containLabel: true }
    : { outerBoundsMode: 'same' as const, outerBoundsContain: 'axisLabel' as const }

export function reserveCartesianSpace(
  option: ChartProps,
  defaults: ChartProps,
  requested: ChartProps,
) {
  const { grid } = option
  if (!grid || Array.isArray(grid)) return
  const input = Array.isArray(requested.grid) ? undefined : requested.grid
  const base = Array.isArray(defaults.grid) ? undefined : defaults.grid
  const top = base?.top ?? 32
  const bottom = base?.bottom ?? 32
  if (option.title && input?.top == null && typeof top === 'number') grid.top = top + 24
  if (option.dataZoom && input?.bottom == null && typeof bottom === 'number')
    grid.bottom = bottom + 32
}

export function applyCartesianLegend(option: ChartProps, requested: ChartProps['legend'] | false) {
  if (requested === false) clearChartComponent(option, 'legend')
  else if (requested === undefined && convertArray(option.series).length <= 1)
    option.legend = undefined
}

type Axis = XAXisComponentOption | YAXisComponentOption
interface SeriesBinding {
  xAxisIndex?: number
  yAxisIndex?: number
  xAxisId?: string | number
  yAxisId?: string | number
}
interface CartesianOption {
  xAxis?: Axis | Axis[]
  yAxis?: Axis | Axis[]
  series?: SeriesBinding | SeriesBinding[]
}

/** Preserve array shape and caller-owned axes while applying defaults. */
export function mergeAxisOption<T extends Axis>(
  defaultAxis: Pick<Axis, 'type'>,
  axis?: T | T[],
): T | T[] {
  return Array.isArray(axis)
    ? axis.map(item => mergePlotOptions<T>(defaultAxis as Partial<T>, item))
    : mergePlotOptions<T>(defaultAxis as Partial<T>, axis)
}

/** Resolve each series independently, including horizontal charts and multiple grids. */
function resolveValueAxis(option: CartesianOption, binding?: SeriesBinding) {
  const boundAxis = (dimension: 'xAxis' | 'yAxis') => {
    const axes = convertArray(option[dimension])
    const id = binding?.[`${dimension}Id`]
    return id === undefined
      ? axes[binding?.[`${dimension}Index`] ?? 0]
      : axes.find(axis => String(axis.id) === String(id))
  }
  const xAxis = boundAxis('xAxis')
  const yAxis = boundAxis('yAxis')
  const isDomainAxis = (axis?: Axis) =>
    axis?.type === 'category' ||
    axis?.type === 'time' ||
    (axis?.type === undefined && axis && 'data' in axis && axis.data !== undefined)
  return isDomainAxis(yAxis) && !isDomainAxis(xAxis)
    ? { axis: xAxis, dimension: 'x' }
    : { axis: yAxis, dimension: 'y' }
}

/** Resolve units from the series binding, not the order of tooltip rows. */
function createCartesianTooltip(
  option: CartesianOption,
  valueFormatter?: TooltipComponentOption['valueFormatter'],
) {
  const series = convertArray(option.series)
  return createPlotTooltipFormatter((input: PlotTooltipParams) => {
    const params = convertArray(input)
    if (!params.length) return
    return {
      title: params[0]!.name,
      rows: params.map(param => {
        const { axis, dimension } = resolveValueAxis(option, series[param.seriesIndex ?? 0])
        const measurement = Array.isArray(param.value)
          ? param.value[
              param.encode?.[dimension]?.[0] ??
                (dimension === 'y' && param.value.length > 1 ? 1 : 0)
            ]
          : param.value
        const value =
          typeof valueFormatter === 'function'
            ? valueFormatter(measurement as Parameters<typeof valueFormatter>[0], param.dataIndex)
            : axis?.name
              ? `${measurement} ${axis.name}`
              : measurement
        return {
          name: param.seriesName ?? '',
          value: value as string | number,
          color: getTooltipsColor(param.color),
        }
      }),
    }
  })
}

export function applyCartesianTooltip(option: ChartProps) {
  const defaults = (tooltip: TooltipComponentOption = {}) =>
    tooltip.formatter
      ? tooltip
      : {
          ...tooltip,
          formatter: createCartesianTooltip(option as CartesianOption, tooltip.valueFormatter),
        }
  option.tooltip = Array.isArray(option.tooltip)
    ? option.tooltip.map(defaults)
    : defaults(option.tooltip ?? undefined)
}
