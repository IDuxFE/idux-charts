<script setup lang="ts">
import { IxChart } from '@idux/charts'
import type { ChartProps } from '@idux/charts'

const option: ChartProps = {
  title: { text: '折线图标题' },
  xAxis: {
    type: 'category',
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      name: '流量',
      data: [123, 324, 156, 244, 188],
    },
  ],
}
</script>
<template>
  <IxChart style="height: 300px" v-bind="option" />
</template>

<archive-meta lang="json">
{
  "title": "折线图",
  "description": "折线图的配置与使用示例。",
  "index": 1
}
</archive-meta>
