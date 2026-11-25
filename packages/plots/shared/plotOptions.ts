import { cloneDeep, isPlainObject, mergeWith, omit, pick } from 'lodash-es'

import { convertArray, replaceChartComponent, splitChartOptions } from '@idux/charts-core'
import type { ChartOption, ChartProps } from '@idux/charts-core'

/** Merge option objects while keeping each supplied array or scalar intact. */
export function mergePlotOptions<T extends object>(
  ...sources: (Partial<T> | null | undefined)[]
): T {
  return mergeWith({}, ...sources, (previous: unknown, next: unknown) => {
    if (Array.isArray(next) || (Array.isArray(previous) && isPlainObject(next))) {
      return cloneDeep(next)
    }
  }) as T
}

export function resolvePlotInput<Props extends ChartProps>(
  defaults: Props | null | undefined,
  props: Partial<Props>,
  attrs: Props,
  propKeys: readonly string[],
) {
  return {
    props: mergePlotOptions<Props>(
      pick(defaults, propKeys) as Partial<Props>,
      pick(attrs, propKeys) as Partial<Props>,
      props,
    ),
    attrs: mergePlotOptions<Props>(
      omit(defaults, propKeys) as Partial<Props>,
      omit(attrs, propKeys) as Partial<Props>,
    ),
  }
}

export function mergeNativePlotOptions<T extends ChartOption>(
  generated: T,
  props: ChartProps,
  ownedProps: readonly string[],
): T {
  const { option } = splitChartOptions(omit(props, ownedProps))
  const { series, ...native } = option
  return {
    ...mergePlotOptions<T>(generated, native as Partial<T>),
    ...(series !== undefined && { series: cloneDeep(series) }),
  } as T
}

export function clearChartComponent(option: ChartProps, key: 'legend' | 'title') {
  option[key] = undefined
  option.setOptionOpts = replaceChartComponent(option.setOptionOpts, key)
}

function removesOption(previous: unknown, next: unknown): boolean {
  if (previous == null) return false
  if (next == null) return true
  if (Array.isArray(previous) && Array.isArray(next)) {
    return previous.some((item, index) => removesOption(item, next[index]))
  }
  if (isPlainObject(previous) && isPlainObject(next)) {
    const before = previous as Record<string, unknown>
    const after = next as Record<string, unknown>
    return (
      before.id !== after.id ||
      before.map !== after.map ||
      Object.keys(before).some(key => removesOption(before[key], after[key]))
    )
  }
  return (
    (Array.isArray(previous) && isPlainObject(next)) ||
    (isPlainObject(previous) && Array.isArray(next))
  )
}

/** Built-in layouts submit snapshots. A merge is safe while it cannot retain removed options. */
export function createPlotUpdater(mergeDataUpdates = false) {
  let previous: ChartProps | undefined
  return (option?: ChartProps): ChartProps | undefined => {
    const { option: snapshot } = splitChartOptions(option ?? {})
    const setOptionOpts = option?.setOptionOpts
    const merge =
      setOptionOpts?.notMerge === false || (mergeDataUpdates && !setOptionOpts?.notMerge)
    // Custom plots can retain data elements while still resetting removed layout options.
    const layout = (value: ChartProps | undefined) =>
      mergeDataUpdates && value
        ? {
            ...omit(value, 'dataZoom'),
            series: convertArray(value.series).map(series => omit(series, 'data')),
            yAxis: convertArray(value.yAxis).map(axis => omit(axis, 'data')),
          }
        : value
    const notMerge = !merge || removesOption(layout(previous), layout(snapshot))
    const replaceZoom = mergeDataUpdates && removesOption(previous?.dataZoom, snapshot.dataZoom)
    previous = option && cloneDeep(snapshot)
    return (
      option && {
        ...option,
        ...(replaceZoom && { dataZoom: snapshot.dataZoom ?? [] }),
        setOptionOpts: {
          ...setOptionOpts,
          notMerge,
          ...(replaceZoom && {
            replaceMerge: [...new Set([...convertArray(setOptionOpts?.replaceMerge), 'dataZoom'])],
          }),
        },
      }
    )
  }
}
