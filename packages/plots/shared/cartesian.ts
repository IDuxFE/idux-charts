import type {
  DefaultLabelFormatterCallbackParams,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts'
import { cloneDeep, merge } from 'lodash-es'
import { convertArray, getTooltipsColor, useTooltipsFormatter } from '@idux/charts-core'

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
  tooltip?: unknown
}

/** Preserve array shape and caller-owned axes while applying defaults. */
export function mergeAxisOption<T extends Axis>(
  defaultAxis: Pick<Axis, 'type'>,
  axis?: T | T[],
): T | T[] {
  return Array.isArray(axis)
    ? axis.map(item => merge(cloneDeep(defaultAxis), item) as T)
    : (merge(cloneDeep(defaultAxis), axis) as T)
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
export function createCartesianTooltip(option: CartesianOption) {
  const series = convertArray(option.series)
  const valueFormatter = (
    option.tooltip as { valueFormatter?: (value: unknown, dataIndex?: number) => unknown }
  )?.valueFormatter
  return (input: DefaultLabelFormatterCallbackParams | DefaultLabelFormatterCallbackParams[]) => {
    const params = convertArray(input)
    if (!params.length) return ''
    return useTooltipsFormatter(
      params[0]!.name,
      params.map(param => {
        const { axis, dimension } = resolveValueAxis(option, series[param.seriesIndex ?? 0])
        const valueIndex = param.encode?.[dimension]?.[0]
        const measurement =
          Array.isArray(param.value) && typeof valueIndex === 'number'
            ? param.value[valueIndex]
            : param.value
        const value =
          typeof valueFormatter === 'function'
            ? valueFormatter(param.value, param.dataIndex)
            : axis?.name
              ? `${measurement} ${axis.name}`
              : measurement
        return {
          name: param.seriesName ?? '',
          value: value as string | number,
          color: getTooltipsColor(param.color),
        }
      }),
    )
  }
}
