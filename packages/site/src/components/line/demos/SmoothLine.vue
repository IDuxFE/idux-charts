<script setup lang="ts">
import { type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  smooth: true,
  title: { text: '折线图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
}
</script>
<template>
  <IxLineChart style="height: 300px" :data="data" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "平滑折线图",
  "description": "",
  "index": 9
}
</archive-meta>
