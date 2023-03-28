<script setup lang="ts">
import { IxLineChart, type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]
const axis = { data: ['星期一', '星期二', '星期三', '星期四', '星期五'] }

const lineOption: LineChartProps = {
  xAxis: axis,
  yAxis: { name: '次' },
  title: {
    text: '基础柱状图',
  },
  label: {
    show: true,
  },
}

const line3Option: LineChartProps = {
  xAxis: axis,
  yAxis: { name: '次' },
  series: [
    {
      data: [100, 150, 300, 88, 200],
      name: '到店靓仔',
    },
    {
      data: [80, 200, 150, 120, 65],
      name: '到店靓女',
    },
    {
      data: [80, 200, 150, 75, 88],
      name: '非人哉',
    },
  ],
  dataZoom: [
    {
      type: 'slider',
      bottom: 32,
    },
  ],
}
</script>
<template>
  <IxLineChart :data="data" name="日志数量" v-bind="lineOption" />

  <IxLineChart :data="data" :smooth="true" v-bind="lineOption" />

  <IxLineChart :data="data" v-bind="line3Option" />
</template>
