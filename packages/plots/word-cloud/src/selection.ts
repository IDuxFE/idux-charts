import type { EChartsType } from 'echarts/core'
import type { WordCloudChartDataItem, WordCloudSeries } from './types'

/** Keep native item selection across option resets and theme instance rebuilds. */
export function createWordCloudSelection() {
  const selected = new Map<string, boolean>()
  let previousExplicit = new Map<string, boolean | undefined>()
  const rows = (option: { series?: unknown }) => {
    const series = (Array.isArray(option.series) ? option.series : [option.series]) as (
      | WordCloudSeries
      | undefined
    )[]
    return series.flatMap((item, seriesIndex) =>
      item?.__ixWordCloud ? [{ seriesIndex, data: item.data as WordCloudChartDataItem[] }] : [],
    )
  }
  return {
    apply(option: { series?: unknown }) {
      const next = new Map<string, boolean | undefined>()
      for (const { data } of rows(option))
        for (const item of data) {
          const id = String(item.id)
          next.set(id, item.selected)
          if (!previousExplicit.has(id) || previousExplicit.get(id) !== item.selected) {
            if (item.selected !== undefined) selected.set(id, item.selected)
          }
          if (selected.has(id)) item.selected = selected.get(id)
        }
      for (const id of selected.keys()) if (!next.has(id)) selected.delete(id)
      previousExplicit = next
      return option
    },
    bind(chart: EChartsType) {
      const snapshot = rows(chart.getOption() as { series?: unknown })
      const batch = snapshot.flatMap(({ seriesIndex, data }) =>
        data.flatMap((item, dataIndex) =>
          selected.get(String(item.id)) ? [{ seriesIndex, dataType: 'node', dataIndex }] : [],
        ),
      )
      if (batch.length) chart.dispatchAction({ type: 'select', batch }, { silent: true })
      chart.on('selectchanged', (event: unknown) => {
        const payload = event as {
          selected?: { seriesIndex: number; dataType?: string; dataIndex: number[] }[]
        }
        for (const { seriesIndex, data } of rows(chart.getOption() as { series?: unknown })) {
          const indices = new Set(
            payload.selected?.find(
              item => item.seriesIndex === seriesIndex && item.dataType !== 'edge',
            )?.dataIndex ?? [],
          )
          data.forEach((item, index) => selected.set(String(item.id), indices.has(index)))
        }
      })
    },
  }
}
