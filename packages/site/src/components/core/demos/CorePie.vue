<script setup lang="ts">
import type { ChartProps } from '@idux/charts'

// 饼图数据建议按数值从大到小排序后再展示。
const data = [
  { value: 145, name: '图例A' },
  { value: 124, name: '图例B' },
  { value: 118, name: '图例C' },
  { value: 110, name: '图例D' },
  { value: 104, name: '图例E' },
  { value: 92, name: '图例F' },
  { value: 80, name: '图例G' },
  { value: 72, name: '图例H' },
  { value: 60, name: '图例I' },
  { value: 52, name: '图例J' },
].sort((a, b) => b.value - a.value)

const option: ChartProps = {
  title: {
    text: `${data.reduce((curr, next) => curr + next.value, 0)}`,
    subtext: '统计数量',
    textStyle: {
      fontSize: 30,
    },
    top: 'center',
    left: 'center',
  },
  legend: {
    orient: 'vertical',
    itemGap: 16,
    bottom: '8%',
    right: '20%',
    height: '80%',
  },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      data: data,
    },
  ],
}
</script>
<template>
  <IxChart style="height: 300px" v-bind="option" />
</template>

<archive-meta lang="json">
{
  "title": "饼图",
  "description": "通过 IxChart 配置原生饼图，业务按数值降序传入数据；显式配置中心合计、说明文字和右侧纵向图例。",
  "index": 2
}
</archive-meta>
