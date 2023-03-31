<script setup lang="ts">
import { type PieChartProps } from '@idux/charts'

const data = [
  { value: 145, name: '图例A' },
  { value: 124, name: '图例B' },
  { value: 118, name: '图例C' },
  { value: 110, name: '图例D' },
  { value: 104, name: '图例E' },
  { value: 92, name: '图例F' },
]

const pieOption: PieChartProps = {
  name: '基础饼图',
  radius: '80%',
  title: {
    top: 16,
    left: '50%',
  },
  legend: {
    height: 100,
    top: 80,
  },
}
</script>
<template>
  <IxPieChart :data="data" v-bind="pieOption" />
</template>

<archive-meta lang="json">
{
  "title": "基础饼图",
  "description": "",
  "index": 4
}
</archive-meta>
