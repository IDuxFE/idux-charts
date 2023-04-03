<script setup lang="ts">
import { type BarChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  label: { show: true },
  title: { text: '柱状图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  dataZoom: { type: 'slider' },
}
</script>
<template>
  <IxBarChart :data="data" v-bind="barOption" />
</template>

<archive-meta lang="json">
{
  "title": "基础柱状图",
  "description": "",
  "index": 1
}
</archive-meta>
