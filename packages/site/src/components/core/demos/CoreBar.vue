<script setup lang="ts">
import { type ChartProps } from '@idux/charts'

const option: ChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    type: 'category',
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
}
</script>
<template>
  <IxChart style="width: 100%; height: 300px" v-bind="option" />
</template>

<archive-meta lang="json">
{
  "title": "柱状图",
  "description": "",
  "index": 4
}
</archive-meta>
