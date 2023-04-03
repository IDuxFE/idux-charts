<script setup lang="ts">
import { type BarChartProps } from '@idux/charts'

const barOption: BarChartProps = {
  stack: 'Total',
  title: { text: '柱状图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      data: [100, 150, 300, 88, 200],
      name: '到店靓仔',
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
    },
  ],
}
</script>
<template>
  <IxBarChart v-bind="barOption" />
</template>

<archive-meta lang="json">
{
  "title": "堆叠柱状图",
  "description": "",
  "index": 10
}
</archive-meta>
