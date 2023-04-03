<script setup lang="ts">
import { type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  name: '流量',
  title: { text: '折线图标题' },
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
  <IxLineChart :data="data" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "基础折线图",
  "description": "",
  "index": 1
}
</archive-meta>
