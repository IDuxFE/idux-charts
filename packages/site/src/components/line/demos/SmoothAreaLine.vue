<script setup lang="ts">
import { type LineChartProps, useLinearGradient } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  smooth: true,
  lineStyle: {
    shadowColor: 'rgba(69, 143, 255, 0.35)',
    shadowBlur: 10,
  },
  areaStyle: {
    color: useLinearGradient(),
  },
  title: { text: '折线图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  onReady (echartsInstance) {
    console.log('图彪实例：', echartsInstance);
  }
}

</script>
<template>
  <IxLineChart style="height: 300px" :data="data" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "平滑面积图",
  "description": "",
  "index": 9
}
</archive-meta>
