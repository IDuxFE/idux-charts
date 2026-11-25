import type { EChartsType } from 'echarts/core'

const layers = ['bullet', 'bullet-decorations', 'bullet-targets']

/** Highlight the native bar when the pointer is over its track or target. */
export function bindBulletHover(chart: EChartsType) {
  const toggle = (
    type: 'highlight' | 'downplay',
    event: { seriesId?: string; dataIndex?: number },
  ) => {
    if (!event.seriesId || !layers.includes(event.seriesId) || event.dataIndex === undefined) return
    chart.dispatchAction({
      type,
      batch: layers
        .filter(id => id !== event.seriesId)
        .map(seriesId => ({ seriesId, dataIndex: event.dataIndex })),
    })
  }
  chart.on('mouseover', event => toggle('highlight', event))
  chart.on('mouseout', event => toggle('downplay', event))
}
