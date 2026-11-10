import type { LineSeriesOption } from 'echarts/charts'

export interface ReferenceLine {
  value: number
  /** Optional legend entry. Use a name distinct from the data series. */
  name?: string
  color?: string
}

export const referenceLegendIcon = 'path://M0,0h3v1H0z M5,0h3v1H5z M10,0h3v1h-3z'

export function createReferenceSeries(
  reference: ReferenceLine,
  color: string,
  { axis, z, zlevel }: { axis: 'xAxis' | 'yAxis'; z: number; zlevel: number },
): LineSeriesOption {
  return {
    type: 'line',
    name: reference.name,
    data: [],
    silent: true,
    tooltip: { show: false },
    itemStyle: { color },
    lineStyle: { color },
    markLine: {
      silent: true,
      symbol: 'none',
      z,
      zlevel,
      label: { show: false },
      lineStyle: { color, type: 'dashed', width: 1 },
      data: [{ [axis]: reference.value }],
    },
  }
}
