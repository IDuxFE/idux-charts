<script setup lang="ts">
import { type LineChartProps, useLinearGradient, getAlphaColor } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  smooth: true,
  lineStyle: { // 实现连线上的阴影效果
    shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)
    shadowBlur: 8,
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
  }
}

</script>
<template>
  <IxLineChart style="height: 300px" :data="data" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "平滑面积图+阴影效果",
  "description": "",
  "index": 4
}
</archive-meta>
