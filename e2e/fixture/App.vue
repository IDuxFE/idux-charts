<script setup lang="ts">
import { computed, ref } from 'vue'
import { IxBarChart, IxLineChart, IxPieChart, useTooltipsFormatter } from '@idux/charts'
import type { LineChartProps } from '@idux/charts'
import type { EChartsType } from 'echarts/core'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

use(CanvasRenderer)
const requestedKind = new URLSearchParams(location.search).get('kind')
const kind = requestedKind === 'pie' || requestedKind === 'line' ? requestedKind : 'bar'
const categoryArea = requestedKind === 'category-area'
const component = categoryArea
  ? IxLineChart
  : { bar: IxBarChart, line: IxLineChart, pie: IxPieChart }[kind]
const data = ref([20, 40, 60])
const areaSeriesCount = ref(2)
const areaSeries = [
  { id: 'base', name: 'Base', stack: 'total', data: [5, 5, 5, 5] },
  {
    id: 'visits',
    name: 'Visits',
    stack: 'total',
    data: [20, { value: null, missingReason: 'Offline' }, 60, 80],
  },
]
const visible = ref(true)
const loading = ref(false)
const autoResize = ref(true)
const customTooltip = ref(false)
const width = ref(600)
const height = ref(320)
const theme = ref('seer')
const renderer = ref<'svg' | 'canvas'>('svg')
const initOption = computed(() => ({ renderer: renderer.value }))
const readyCount = ref(0)
const clicks = ref(0)
const onceClicks = ref(0)
const lastClick = ref('')
const legendChange = ref('')
const instances: EChartsType[] = []
const lastInstance = () => instances.at(-1)!

const categoryAreaOption = computed<LineChartProps>(() => ({
  animation: false,
  categories: ['A', 'B', 'C', 'D'],
  area: 'striped',
  series: areaSeries.slice(0, areaSeriesCount.value),
  referenceLine: areaSeriesCount.value === 2 ? { value: 75, name: 'Threshold' } : undefined,
  setOptionOpts: { notMerge: false },
  tooltip: {
    formatter(params) {
      const items = Array.isArray(params) ? params : [params]
      const visits = items.find(param => param.seriesName === 'Visits')
      return visits ? JSON.stringify({ data: visits.data, value: visits.value }) : ''
    },
  },
}))

const option = computed(() => ({
  animation: false,
  ...(customTooltip.value
    ? {
        tooltip: {
          formatter: (params: any) => {
            const items = Array.isArray(params) ? params : [params]
            return useTooltipsFormatter(
              'Custom title',
              items.map(item => ({
                name: item.seriesName,
                value: `${item.value} 个`,
                color: item.color,
              })),
            )
          },
        },
      }
    : {}),
  title: kind === 'pie' ? undefined : { text: 'Browser chart' },
  ...(kind === 'pie'
    ? {
        data: data.value.map((value, i) => ({ name: ['A', 'B', 'C'][i], value })),
        name: 'Visits',
        radius: ['30%', '65%'],
      }
    : {
        data: data.value,
        name: 'Visits',
        xAxis: { data: ['A', 'B', 'C'] },
        yAxis: { name: '次' },
        legend: { data: ['Visits', 'Other'] },
        series: [
          { name: 'Visits', data: data.value },
          { name: 'Other', data: [10, 15, 20] },
        ],
      }),
}))
function resizeContainer() {
  width.value = width.value === 600 ? 450 : 600
  height.value = height.value === 320 ? 280 : 320
}
function ready(instance: EChartsType) {
  instances.push(instance)
  readyCount.value++
}
function click(params: { name: string; dataIndex: number; data: unknown; value: unknown }) {
  clicks.value++
  lastClick.value = JSON.stringify({
    name: params.name,
    dataIndex: params.dataIndex,
    data: params.data,
    value: params.value,
  })
}
// Read-only diagnostics let tests assert the actual ECharts state. Interaction stays in the UI.
Object.assign(window, {
  chartTest: {
    state: () => ({
      id: lastInstance().id,
      width: lastInstance().isDisposed() ? 0 : lastInstance().getWidth(),
      height: lastInstance().isDisposed() ? 0 : lastInstance().getHeight(),
      option: lastInstance().isDisposed() ? {} : lastInstance().getOption(),
      disposed: instances.slice(0, -1).map(instance => instance.isDisposed()),
      allDisposed: instances.every(instance => instance.isDisposed()),
    }),
    point: () => {
      const instance = lastInstance()
      const el = instance.getDom().getBoundingClientRect()
      if (categoryArea) {
        const [x, y] = instance.convertToPixel({ seriesId: 'visits' }, [1, 45]) as [number, number]
        return { x: el.left + x, y: el.top + y }
      }
      if (kind === 'pie') {
        const series = (instance.getOption().series as any[])[0]
        const coordinate = (value: number | string, length: number) =>
          typeof value === 'string' ? (parseFloat(value) / 100) * length : value
        const cx = coordinate(series.center[0], el.width)
        const cy = coordinate(series.center[1], el.height)
        const radius =
          (coordinate(series.radius[0], Math.min(el.width, el.height) / 2) +
            coordinate(series.radius[1], Math.min(el.width, el.height) / 2)) /
          2
        const angle =
          ((-90 + (180 * data.value[0]!) / data.value.reduce((sum, value) => sum + value, 0)) *
            Math.PI) /
          180
        return {
          x: el.left + cx + Math.cos(angle) * radius,
          y: el.top + cy + Math.sin(angle) * radius,
        }
      }
      const [x, y] = instance.convertToPixel({ seriesIndex: 0 }, [0, data.value[0]]) as [
        number,
        number,
      ]
      return { x: el.left + x - (kind === 'bar' ? 6 : 0), y: el.top + y + (kind === 'bar' ? 8 : 0) }
    },
  },
})
</script>
<template>
  <template v-if="categoryArea">
    <button @click="areaSeriesCount = 1">Shrink series</button>
    <button @click="areaSeriesCount = 0">Clear series</button>
    <button @click="areaSeriesCount = 2">Restore series</button>
  </template>
  <button @click="data = [30, 50, 70]">Replace data</button>
  <button @click="data[0] = 90">Mutate data</button>
  <button @click="data = []">Clear data</button>
  <button @click="visible = !visible">Toggle chart</button>
  <button @click="loading = !loading">Toggle loading</button>
  <button @click="customTooltip = !customTooltip">Custom tooltip</button>
  <button @click="autoResize = !autoResize">Toggle resize</button>
  <button @click="resizeContainer">Resize container</button>
  <button @click="theme = theme === 'seer' ? 'dark' : 'seer'">Change theme</button>
  <button @click="renderer = renderer === 'svg' ? 'canvas' : 'svg'">Change renderer</button>
  <div
    data-testid="container"
    :style="{ width: `${width}px`, height: `${height}px`, marginTop: '20px' }"
  >
    <component
      :is="component"
      v-if="visible"
      v-bind="categoryArea ? categoryAreaOption : option"
      :loading="loading"
      :auto-resize="autoResize"
      :theme="theme"
      :init-option="initOption"
      @ready="ready"
      @click="click"
      @click.once="onceClicks++"
      @legendselectchanged="legendChange = JSON.stringify($event.selected)"
    />
  </div>
  <output data-testid="ready">{{ readyCount }}</output>
  <output data-testid="clicks">{{ clicks }}</output>
  <output data-testid="once">{{ onceClicks }}</output>
  <output data-testid="payload">{{ lastClick }}</output>
  <output data-testid="legend">{{ legendChange }}</output>
</template>
