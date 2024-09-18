<script setup lang="ts">
import { type BarChartProps } from '@idux/charts'

const barOption: BarChartProps = {
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
      itemStyle: {
        borderRadius: [1, 1, 0, 0],
      },
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
      itemStyle: {
        borderRadius: [1, 1, 0, 0],
      },
    },
  ],
}
</script>
<template>
  <IxBarChart style="height: 300px" v-bind="barOption" />
</template>

<archive-meta lang="json">
{
  "title": "分组柱状图",
  "description": "",
  "index": 4
}
</archive-meta>
