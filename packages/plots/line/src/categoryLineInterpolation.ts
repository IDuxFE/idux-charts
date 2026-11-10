import type { LineSeriesOption } from 'echarts/charts'
import { PRIORITY, registerProcessor } from 'echarts/core'

type Sample = NonNullable<LineSeriesOption['data']>[number] | undefined

interface Interpolation {
  sample: Sample
  coordinate: number
}

export interface InterpolatedLineItem {
  ixLineInterpolation: Interpolation
}

export interface InterpolatedLineSeries extends LineSeriesOption {
  ixLineHasInterpolation?: true
}

export function getLineSampleValue(sample: Sample) {
  return sample && typeof sample === 'object' && !Array.isArray(sample) && !(sample instanceof Date)
    ? sample.value
    : sample
}

export function installCategoryLineInterpolation() {
  // Supply the drawing coordinate before ECharts computes stacks and zoom extents.
  const adaptedSeries = new WeakSet<object>()
  registerProcessor(PRIORITY.PROCESSOR.SERIES_FILTER + 1, {
    seriesType: 'line',
    reset(series) {
      if (!(series.option as InterpolatedLineSeries).ixLineHasInterpolation) return

      const data = series.getData()
      const dimension = data.mapDimension('y')
      if (dimension == null) return
      series.setData(
        data.map(dimension, (value, index) => {
          const item = data.getRawDataItem(index) as InterpolatedLineItem | null
          return item?.ixLineInterpolation?.coordinate ?? value
        }),
      )

      if (adaptedSeries.has(series)) return
      adaptedSeries.add(series)
      const getDataParams = series.getDataParams.bind(series)
      series.getDataParams = (...args) => {
        const params = getDataParams(...args)
        const interpolation = (params.data as InterpolatedLineItem | null)?.ixLineInterpolation
        // The raw item also holds marker styling. Expose the original sample to consumers.
        return interpolation
          ? {
              ...params,
              data: interpolation.sample,
              value: getLineSampleValue(interpolation.sample),
            }
          : params
      }
    },
  })
}
