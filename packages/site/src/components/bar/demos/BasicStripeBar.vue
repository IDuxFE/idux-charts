<script setup lang="ts">
import { IxBarChart, seerColors, useStripeBarSeries, useStripeBarTooltip } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  label: { show: true },
  title: { text: '柱状图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  tooltip: useStripeBarTooltip('次'),
  series: [
    ...useStripeBarSeries({
      series: {
        name: '系列1',
        data,
      },
      color: seerColors[0],
      size: [7, 2],
    }),
  ],
}
</script>
<template>
  <IxBarChart style="height: 300px" :data="[]" v-bind="barOption" />
</template>

<archive-meta lang="json">
{
  "title": "简单的鼠标经过显示条纹",
  "description": "简单的鼠标经过显示条纹的配置与使用示例。",
  "index": 1
}
</archive-meta>
