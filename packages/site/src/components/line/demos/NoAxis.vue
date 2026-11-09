<script setup lang="ts">
import { IxLineChart, useLinearGradient, useLineStyleColor, getAlphaColor } from '@idux/charts'
import type { LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  name: '访问次数',
  smooth: true,
  areaStyle: {
    color: useLinearGradient(),
  },
  title: { text: '折线图标题' },
  xAxis: {
    show: false,
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    show: false,
    name: '次',
  },
  series: [
    {
      data: [123, 324, 156, 244, 188],
      showSymbol: false,
      lineStyle: {
        // 实现连线上的阴影效果
        shadowColor: getAlphaColor('#458FFF', 0.9),
        shadowBlur: 8,
        color: useLineStyleColor('#1c6eff'),
      },
    },
  ],
}
</script>
<template>
  <IxLineChart style="height: 300px" :data="data" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "无坐标轴+阴影效果",
  "description": "无坐标轴+阴影效果的配置与使用示例。",
  "index": 5
}
</archive-meta>
