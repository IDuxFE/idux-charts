<script setup lang="ts">
import {
  type BarChartProps,
  seerColors,
  useStripeBarTooltip,
  useStripeBarSeries,
} from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    name: '次',
  },
  yAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },

  tooltip: useStripeBarTooltip('次'),

  series: [
    ...useStripeBarSeries({
      series: {
        name: '系列1',
        data: data,
      },
      color: seerColors[0],
      offset: [0, -6],
    }),

    ...useStripeBarSeries({
      series: {
        name: '系列2',
        data: [120, 34, 136, 204, 198],
      },
      color: seerColors[1],
      offset: [0, 6],
    }),
  ],
}
</script>
<template>
  <IxBarChart style="height: 300px" :data="[]" v-bind="barOption" />
</template>

<archive-meta lang="json">
{
  "title": "多系列鼠标经过设置柱状图条纹",
  "description": "",
  "index": 3
}
</archive-meta>
