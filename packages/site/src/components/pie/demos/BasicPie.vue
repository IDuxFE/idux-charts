<script setup lang="ts">
import { type PieChartProps } from '@idux/charts'

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
]

const pieOption: PieChartProps = {}
</script>
<template>
  <IxPieChart style="width: 600px; height: 300px" :data="data" name="环形饼图" v-bind="pieOption" />
</template>

<archive-meta lang="json">
{
  "title": "环形饼图",
  "description": "",
  "index": 1
}
</archive-meta>
