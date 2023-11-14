<script setup lang="ts">
import { type LineChartProps, useLineStyleColor, getAlphaColor } from '@idux/charts'

const lineOption: LineChartProps = {
  // smooth: true,
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
      showSymbol: false,
      lineStyle: {
        shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)
        shadowBlur: 8,
        color: useLineStyleColor('#458FFF'),
      },
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
      showSymbol: false,
      lineStyle: {
        shadowColor: getAlphaColor('#20cc94', 0.9), // 等同 rgba(69, 143, 255, 0.9)
        shadowBlur: 8,
        color: useLineStyleColor('#20cc94')
      }
    },
  ],
}
</script>
<template>
  <IxLineChart style="height: 300px" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "双轴折线图",
  "description": "",
  "index": 2
}
</archive-meta>
