<script setup lang="ts">
import { h, ref } from 'vue'
import {
  IxChart,
  IxBarChart,
  IxLineChart,
  IxPieChart,
  IxRadarChart,
  IxGaugeChart,
  IxLiquidFillChart,
} from '@idux/charts'
import { use } from 'echarts/core'
import type { EChartsType } from 'echarts/core'
import { ScatterChart } from 'echarts/charts'

use([ScatterChart])
const loading = ref(true)
const dark = ref(false)
const empty = ref(false)
const objectLoading = ref(false)
const loadingIcon = ref<string>()
const pagedLegend = ref(false)
const instances = new Map<string, EChartsType>()
const pieData = [
  { name: 'A', value: 20 },
  { name: 'B', value: 30 },
]
const cases = [
  { name: 'pie', component: IxPieChart, props: { data: pieData, align: 'center' } },
  {
    name: 'ring',
    component: IxPieChart,
    props: { data: pieData, align: 'center', radius: ['40%', '70%'] },
  },
  {
    name: 'rose',
    component: IxPieChart,
    props: { data: pieData, align: 'center', roseType: 'area' },
  },
  {
    name: 'horizontal',
    component: IxBarChart,
    props: { categories: ['A', 'B'], data: [20, 30], layout: 'horizontal' },
  },
  { name: 'vertical', component: IxBarChart, props: { categories: ['A', 'B'], data: [20, 30] } },
  {
    name: 'line',
    component: IxLineChart,
    props: {
      categories: ['A', 'B', 'C'],
      series: [{ name: 'One', data: [20, 30, 25] }],
      dataZoom: { type: 'slider', start: 10, end: 90 },
    },
  },
  {
    name: 'area',
    component: IxLineChart,
    props: { categories: ['A', 'B'], data: [20, 30], area: true },
  },
  { name: 'liquid', component: IxLiquidFillChart, props: { value: 40, waveAnimation: false } },
  {
    name: 'radar',
    component: IxRadarChart,
    props: {
      indicator: ['A', 'B', 'C'].map(name => ({ name, max: 100 })),
      data: [{ name: 'One', value: [20, 30, 40] }],
    },
  },
  { name: 'gauge', component: IxGaugeChart, props: { value: 40 } },
  { name: 'fallback', component: IxChart, props: {} },
  {
    name: 'other',
    component: IxChart,
    props: { xAxis: {}, yAxis: {}, series: [{ type: 'scatter', data: [[10, 20]] }] },
  },
]
const renderChart = (item: (typeof cases)[number]) =>
  h(item.component, {
    ...item.props,
    ...(pagedLegend.value && item.name === 'pie'
      ? {
          data: Array.from({ length: 16 }, (_, index) => ({
            name: `Legend ${index}`,
            value: index + 1,
          })),
          legend: { type: 'scroll' },
        }
      : {}),
    ...(empty.value ? { data: [], categories: 'categories' in item.props ? [] : undefined } : {}),
    loading: loading.value && (objectLoading.value ? { icon: loadingIcon.value } : true),
    darkMode: dark.value,
    animation: false,
    initOption: { renderer: 'svg' },
    style: { height: '210px', width: '100%' },
    onReady: (chart: EChartsType) => instances.set(item.name, chart),
  })
const ChartCase = (props: { item: (typeof cases)[number] }) => renderChart(props.item)
Object.assign(window, {
  setLoadingRegressionInputs: () => {
    objectLoading.value = true
    pagedLegend.value = true
  },
  setLoadingIcon: (icon: string | undefined) => {
    loadingIcon.value = icon
  },
  loadingLegendRow: () => (instances.get('pie')?.getOption().legend as any[])?.[0]?.scrollDataIndex,
  loadingState: () =>
    Object.fromEntries(
      [...instances].map(([name, chart]) => [
        name,
        {
          id: chart.id,
          zoom: (chart.getOption().dataZoom as any[])?.map(({ start, end }) => ({ start, end })),
          legend: (chart.getOption().legend as any[])?.map(item => item.selected),
        },
      ]),
    ),
  selectLoadingInteractions: () => {
    instances.get('line')!.dispatchAction({ type: 'dataZoom', start: 20, end: 70 })
    instances.get('line')!.dispatchAction({ type: 'legendUnSelect', name: 'One' })
  },
})
</script>
<template>
  <main :style="{ background: dark ? '#0A0C0F' : '#FFFFFF', color: dark ? '#F4F8FF' : '#333' }">
    <button data-testid="loading" @click="loading = !loading">Toggle loading</button>
    <button data-testid="dark" @click="dark = !dark">Toggle dark</button>
    <button data-testid="empty" @click="empty = !empty">Toggle empty data</button>
    <div class="loading-grid">
      <section v-for="item in cases" :key="item.name" :data-case="item.name">
        <h3>{{ item.name }}</h3><ChartCase :item="item" />
      </section>
    </div>
  </main>
</template>
<style scoped>
main {
  padding: 12px;
}
.loading-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
h3 {
  margin: 8px 0;
  font: 14px sans-serif;
}
</style>
