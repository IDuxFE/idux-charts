import type { EChartsType } from 'echarts/core'
import { isEqual, pick } from 'lodash-es'

import type { ChartProps } from '../types'
import { convertArray } from '.'

const zoomConfig = [
  'type',
  'xAxisId',
  'xAxisIndex',
  'yAxisId',
  'yAxisIndex',
  'radiusAxisIndex',
  'angleAxisIndex',
  'singleAxisIndex',
  'start',
  'end',
  'startValue',
  'endValue',
  'rangeMode',
  'orient',
  'filterMode',
  'minSpan',
  'maxSpan',
  'minValueSpan',
  'maxValueSpan',
] as const

function findComponent<T extends { id?: string | number }>(
  items: readonly T[],
  item: T,
  index: number,
): T | undefined {
  if (item.id == null) return items[index]?.id == null ? items[index] : undefined
  return items.find(candidate => candidate.id != null && String(candidate.id) === String(item.id))
}

const axes = ['xAxis', 'yAxis', 'radiusAxis', 'angleAxis', 'singleAxis'] as const
const axisIdentity = (option: ChartProps) =>
  axes.map(key => convertArray(option[key]).map(axis => pick(axis, ['id', 'type', 'data'])))

/** Carry user interaction across a theme rebuild while honoring new caller settings. */
export function restoreChartInteraction(
  instance: EChartsType,
  previous: ChartProps | undefined,
  next: ChartProps,
): ChartProps {
  if (!previous || (!next.dataZoom && !next.legend)) return next
  const current = instance.getOption() as ChartProps
  const zoomAxesMatch = next.dataZoom && isEqual(axisIdentity(previous), axisIdentity(next))
  const restore = <T extends { id?: string | number }>(
    nextItems: T | T[] | undefined,
    previousItems: T | T[] | undefined,
    liveItems: T | T[] | undefined,
    merge: (next: T, previous: T, live: T) => T,
  ) => {
    const before = convertArray(previousItems)
    const live = convertArray(liveItems)
    const items = convertArray(nextItems).map((item, index) => {
      const previousItem = findComponent(before, item, index)
      // ECharts leaves anonymous IDs out of getOption().
      const liveItem = findComponent(live, item, index)
      return previousItem && liveItem ? merge(item, previousItem, liveItem) : item
    })
    return Array.isArray(nextItems) ? items : items[0]
  }

  return {
    ...next,
    ...(next.legend && {
      legend: restore(next.legend, previous.legend, current.legend, (item, before, live) =>
        item.type === before.type &&
        item.selectedMode === before.selectedMode &&
        isEqual(item.selected, before.selected) &&
        live.selected
          ? { ...item, selected: live.selected }
          : item,
      ),
    }),
    ...(zoomAxesMatch && {
      dataZoom: restore(
        next.dataZoom,
        previous.dataZoom,
        current.dataZoom,
        (item, before, live) => {
          if (!isEqual(pick(item, zoomConfig), pick(before, zoomConfig))) return item
          const startByValue =
            item.rangeMode?.[0] === 'value' || (item.start == null && item.startValue != null)
          const endByValue =
            item.rangeMode?.[1] === 'value' || (item.end == null && item.endValue != null)
          return {
            ...item,
            ...(startByValue && live.startValue != null
              ? { start: undefined, startValue: live.startValue }
              : live.start != null && { start: live.start, startValue: undefined }),
            ...(endByValue && live.endValue != null
              ? { end: undefined, endValue: live.endValue }
              : live.end != null && { end: live.end, endValue: undefined }),
          }
        },
      ),
    }),
  }
}
