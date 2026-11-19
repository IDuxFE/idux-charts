<script setup lang="ts">
import type { LineChartProps } from '@idux/charts'
import { IxCard } from '@idux/components/card'
import { IxHeader } from '@idux/components/header'

const categories = Array.from({ length: 8 }, (_, index) =>
  new Date(Date.UTC(2026, 6, 1, index * 24)).toISOString().slice(5, 16).replace('T', ' '),
)
const series = [
  {
    name: '上行流量',
    itemStyle: { color: '#458FFF' },
    data: [85, 62, 155, 210, 330, 380, 100, 214],
  },
  {
    name: '下行流量',
    itemStyle: { color: '#20CC94' },
    data: [118, 223, 214, 229, 208, 281, 292, 359],
  },
]

const option: LineChartProps = {
  categories,
  series,
  yAxis: {
    name: 'Kbps',
    min: 0,
    max: 400,
    interval: 100,
  },
  xAxis: {
    axisLabel: {
      formatter: (label: string) => label.slice(0, 5),
    },
  },
  dataZoom: { type: 'slider' },
}
</script>

<template>
  <IxCard shadow class="trend-card">
    <template #header>
      <IxHeader title="近七天趋势" size="sm" />
    </template>
    <IxLineChart v-bind="option" style="width: 100%; height: 300px" />
  </IxCard>
</template>

<style scoped>
.trend-card {
  width: 640px;
  max-width: 100%;
}
</style>

<archive-meta lang="json">
{
  "title": "卡片化展示",
  "description": "在带标题的卡片中对比上行与下行流量，共用左侧数值轴及 Kbps 单位；缩略轴支持缩放与刷选，图表随卡片宽度调整。",
  "index": 7
}
</archive-meta>
