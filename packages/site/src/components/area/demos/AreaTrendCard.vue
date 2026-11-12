<script setup lang="ts">
import type { LineChartProps } from '@idux/charts'
import { IxCard } from '@idux/components/card'
import { IxHeader } from '@idux/components/header'

const categories = Array.from({ length: 15 }, (_, index) =>
  new Date(Date.UTC(2026, 6, 1, index * 12)).toISOString().slice(5, 16).replace('T', ' '),
)
const series = [
  {
    name: '服务器',
    itemStyle: { color: '#458FFF' },
    data: [330, 281, 292, 267, 313, 301, 163, 185, 282, 236, 240, 204, 230, 199, 153],
  },
]

const option: LineChartProps = {
  categories,
  series,
  area: 'striped',
  yAxis: {
    name: '次',
    min: 0,
    max: 400,
    interval: 100,
  },
  xAxis: {
    axisLabel: {
      interval: (_index, label) => label.endsWith('00:00'),
      formatter: (label: string) => label.slice(0, 5),
    },
  },
  dataZoom: { type: 'slider' },
}
</script>

<template>
  <IxCard shadow class="area-trend-card">
    <template #header>
      <IxHeader title="近七天趋势" size="sm" />
    </template>
    <IxLineChart v-bind="option" style="width: 100%; height: 300px" />
  </IxCard>
</template>

<style scoped>
.area-trend-card {
  width: 640px;
  max-width: 100%;
}
</style>

<archive-meta lang="json">
{
  "title": "卡片化展示",
  "description": "将趋势图嵌入仪表盘卡片，图表和图例随卡片宽度调整。",
  "index": 5
}
</archive-meta>
