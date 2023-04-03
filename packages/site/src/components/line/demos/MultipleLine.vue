<script setup lang="ts">
import { type LineChartProps } from '@idux/charts'

const lineOption: LineChartProps = {
  title: { text: '折线图标题' },
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
  <IxLineChart v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "双轴折线图",
  "description": "",
  "index": 3
}
</archive-meta>
