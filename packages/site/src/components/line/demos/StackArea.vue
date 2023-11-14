<script setup lang="ts">
import { type LineChartProps } from '@idux/charts'

const lineOption: LineChartProps = {
  areaStyle: {},
  stack: 'Total',
  title: { text: '面积图标题' },
  xAxis: {
    boundaryGap: false,
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      name: 'Email',
      data: [120, 132, 101, 134, 90, 230, 210],
      areaStyle: {
        opacity: 0.3
      },
    },
    {
      name: 'Union Ads',
      data: [220, 182, 191, 234, 290, 330, 310],
      areaStyle: {
        opacity: 0.3
      },
    },
    {
      name: 'Video Ads',
      data: [150, 232, 201, 154, 190, 330, 410],
      areaStyle: {
        opacity: 0.3
      },
    },
    {
      name: 'Direct',
      data: [320, 332, 301, 334, 390, 330, 320],
      areaStyle: {
        opacity: 0.3
      },
    },
    {
      name: 'Search Engine',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      areaStyle: {
        opacity: 0.3
      },
    },
  ],
}
</script>
<template>
  <IxLineChart style="width: 100%; height: 600px" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "堆叠面积图",
  "description": "",
  "index": 1
}
</archive-meta>
