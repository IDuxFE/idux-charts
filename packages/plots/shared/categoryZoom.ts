import { convertArray } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'
import type { DataZoomComponentOption } from 'echarts/components'
import { isEqual } from 'lodash-es'

export function targetsCategoryZoomAxis(
  zoom: DataZoomComponentOption,
  axis: 'x' | 'y',
  id?: string | number,
) {
  const axisIndex = axis === 'x' ? zoom.xAxisIndex : zoom.yAxisIndex
  const axisId = axis === 'x' ? zoom.xAxisId : zoom.yAxisId
  if (axisIndex != null) return axisIndex === 'all' || convertArray(axisIndex).includes(0)
  return id != null && convertArray(axisId).some(target => String(target) === String(id))
}

export interface CategoryZoomConfig {
  categories?: string[]
  layout?: string
  axisId?: string | number
  dataZoom?: ChartProps['dataZoom']
}

export function categoryZoomUpdate(next?: CategoryZoomConfig, previous?: CategoryZoomConfig) {
  if (!next?.dataZoom || !previous) return
  const { categories, layout, axisId, dataZoom } = next
  if (
    layout !== previous.layout ||
    axisId !== previous.axisId ||
    !isEqual(dataZoom, previous.dataZoom)
  ) {
    return
  }

  const old = previous.categories
  if (isEqual(categories, old)) return (live: ChartProps['dataZoom']) => live
  if (
    !old?.length ||
    !categories ||
    categories.length <= old.length ||
    !old.every((label, index) => categories[index] === label)
  ) {
    return
  }

  const axis = layout?.startsWith('horizontal') ? 'y' : 'x'
  const last = old.length - 1
  const added = categories.length - old.length
  const indexOf = (value: unknown, percent: number) => {
    const index = typeof value === 'string' ? old.indexOf(value) : Number(value ?? NaN)
    return index >= 0 && index <= last ? Math.round(index) : Math.round((last * percent) / 100)
  }

  return (live: ChartProps['dataZoom']) =>
    convertArray(live).map(item => {
      if (!targetsCategoryZoomAxis(item, axis, axisId)) return item
      const start = indexOf(item.startValue, item.start ?? 0)
      const end = indexOf(item.endValue, item.end ?? 100)
      // Leave an unfiltered chart fully open as the domain grows.
      if (start === 0 && end === last) {
        return { ...item, start: 0, end: 100, startValue: undefined, endValue: undefined }
      }
      const shift = end === last ? added : 0
      return {
        ...item,
        start: undefined,
        end: undefined,
        startValue: start + shift,
        endValue: end + shift,
      }
    })
}
