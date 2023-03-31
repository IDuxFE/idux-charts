<script setup lang="ts">
import { graphic } from 'echarts/core'

import { type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  areaStyle: {
    color: new graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#458FFF',
      },
      {
        offset: 1,
        color: 'rgba(69,143,255,0.00)',
      },
    ]),
  },
  stack: 'Total',
  title: { text: '面积图标题' },
  xAxis: {
    boundaryGap: false,
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
}
</script>
<template>
  <IxLineChart :data="data" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "基础面积图",
  "description": "",
  "index": 1
}
</archive-meta>
