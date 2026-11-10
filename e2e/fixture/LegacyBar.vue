<script setup lang="ts">
import { IxBarChart, seerColors, useStripeBarSeries, useStripeBarTooltip } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const striped = new URLSearchParams(location.search).has('legacy-bar-stripe')
const option: BarChartProps = {
  title: { text: '柱状图标题' },
  xAxis: { data: ['星期一', '星期二', '星期三', '星期四', '星期五'] },
  yAxis: { name: '次' },
  ...(striped
    ? {
        data: [],
        label: { show: true },
        tooltip: useStripeBarTooltip('次'),
        series: useStripeBarSeries({
          series: { name: '系列1', data: [123, 324, 156, 244, 188] },
          color: seerColors[0]!,
          size: [7, 2],
        }),
      }
    : {
        stack: 'Total',
        series: [
          { name: '到店靓仔', data: [100, 150, 300, 88, 200] },
          { name: '到店靓女', data: [55, 88, 150, 120, 65] },
        ],
      }),
}
</script>

<template>
  <IxBarChart style="width: 974px; height: 300px" v-bind="option" />
</template>
