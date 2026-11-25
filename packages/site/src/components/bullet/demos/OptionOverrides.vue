<script setup lang="ts">
import type { BulletChartDataItem, BulletChartProps } from '@idux/charts'

const data: BulletChartDataItem[] = [
  { name: '华东', value: 72, target: 85 },
  { name: '华南', value: 58, target: 75 },
  { name: '华北', value: 91, target: 90, itemStyle: { color: '#8399BF' } },
  { name: '西南', value: 66, target: 80 },
]
const options: BulletChartProps = {
  label: { show: true },
  itemStyle: { opacity: 0.85 },
  emphasis: { itemStyle: { opacity: 1 } },
  selectedMode: 'single',
  select: { itemStyle: { color: '#91ADDD' } },
  markLine: { data: [{ xAxis: 80 }] },
  xAxis: { axisLabel: { formatter: '{value}%' } },
  tooltip: { valueFormatter: value => `${value}%` },
}
</script>

<template>
  <IxBulletChart :data="data" v-bind="options" style="width: 100%; height: 260px" />
</template>

<archive-meta lang="json">
{
  "title": "自定义 ECharts 配置",
  "description": "可覆盖 label、itemStyle、emphasis、select、markLine、xAxis、yAxis、tooltip 等 ECharts 原生配置。",
  "index": 5
}
</archive-meta>
