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
  name: '南丁格尔玫瑰图',
  radius: '80%',
  roseType: 'area',
  title: {
    top: '8%',
    left: '80%',
  },
  legend: {
    top: '30%',
    left: '80%',
  },
}
</script>
<template>
  <IxPieChart style="width: 600px; height: 300px" :data="data" v-bind="pieOption" />
</template>

<archive-meta lang="json">
{
  "title": "南丁格尔玫瑰图",
  "description": "",
  "index": 7
}
</archive-meta>
