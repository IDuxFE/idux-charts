import { createApp, h, nextTick, shallowRef } from 'vue'
import { IxLineChart } from '@idux/charts'
import type { LineChartProps } from '@idux/charts'
import type { EChartsType } from 'echarts/core'

type Workload = 'line' | 'stacked-area-with-gaps'
type Operation = 'firstFrame' | 'refresh' | 'zoom'
type Samples = Record<Operation, number[]>

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

async function measure(action: () => void) {
  await nextFrame()
  const start = performance.now()
  action()
  await nextTick()
  await nextFrame()
  await nextFrame()
  return performance.now() - start
}

async function runChartBenchmark(workload: Workload, points: number, repetitions: number) {
  const stacked = workload === 'stacked-area-with-gaps'
  const categories = Array.from({ length: points }, (_, index) => String(index))
  const series = [0, 1].map(revision =>
    Array.from({ length: 3 }, (_, seriesIndex) => ({
      name: `Metric ${seriesIndex + 1}`,
      ...(stacked && { stack: 'total', connectNulls: false }),
      data: categories.map((_, index) =>
        stacked && seriesIndex === 1 && (index % 113 < 3 || index % 127 === 0)
          ? null
          : 20 + ((index * 7 + seriesIndex * 13 + revision * 3) % 150),
      ),
    })),
  )
  const samples: Samples = { firstFrame: [], refresh: [], zoom: [] }
  for (let run = 0; run <= repetitions; run++) {
    const data = shallowRef<LineChartProps['series']>(series[0])
    let chart: EChartsType | undefined
    const app = createApp({
      setup: () => () =>
        h(IxLineChart, {
          categories,
          series: data.value,
          ...(stacked && { area: 'striped' }),
          dataZoom: { id: 'window', type: 'inside', start: 75, end: 100 },
          autoResize: false,
          animation: false,
          onReady: (instance: EChartsType) => {
            chart = instance
          },
        }),
    })
    try {
      const firstFrame = await measure(() => {
        app.mount('#chart')
      })
      const instance = chart
      if (!instance || !instance.getDom().querySelector('svg path')) {
        throw new Error('The benchmark chart did not render')
      }
      const refresh = await measure(() => {
        data.value = series[1]
      })
      const zoom = await measure(() => {
        instance.dispatchAction({ type: 'dataZoom', dataZoomId: 'window', start: 85, end: 95 })
      })
      const state = instance.getOption() as LineChartProps
      const renderedSeries = Array.isArray(state.series) ? state.series : [state.series]
      if (renderedSeries[0]?.data?.[0] !== series[1]?.[0]?.data[0])
        throw new Error('The benchmark refresh was not applied')
      const window = Array.isArray(state.dataZoom) ? state.dataZoom[0] : state.dataZoom
      if (Math.abs((window?.start ?? 0) - 85) > 1)
        throw new Error('The benchmark zoom was not applied')
      if (run > 0) {
        samples.firstFrame.push(firstFrame)
        samples.refresh.push(refresh)
        samples.zoom.push(zoom)
      }
    } finally {
      app.unmount()
    }
  }
  return samples
}

Object.assign(window, { runChartBenchmark })
