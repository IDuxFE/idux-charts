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
    yAxisIndex: 1,
    data: [1.18, 2.23, 2.14, 2.29, 2.08, 2.81, 2.92, 3.59],
  },
]

const option: LineChartProps = {
  categories,
  series,
  yAxis: [
    {
      name: 'Kbps',
      min: 0,
      max: 400,
      interval: 100,
    },
    {
      name: 'Mbps',
      min: 0,
      max: 4,
      interval: 1,
      splitLine: {
        show: false,
      },
    },
  ],
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
  "description": "用于仪表盘的数据概览。将图表封装在卡片容器内（可含标题与操作区），图表与图例在卡片内自适应排布，适合大屏或工作台中并排展示多个核心指标趋势。",
  "index": -6
}
</archive-meta>
