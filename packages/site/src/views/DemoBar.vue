<script setup lang="ts">
import { IxBarChart, type BarChartProps } from '@idux/charts'

const data = [100, 200, 300, 400, 500]
const axis = { data: ['星期一', '星期二', '星期三', '星期四', '星期五'] }

const barOption: BarChartProps = {
  xAxis: axis,
  yAxis: { name: '次' },
  title: {
    text: '基础柱状图',
  },
  label: {
    show: true,
    precision: 1,
    position: 'top',
  },
}

const bar2Option: BarChartProps = {
  yAxis: axis,
}

const bar3Option: BarChartProps = {
  xAxis: axis,
  yAxis: { name: '次' },

  legend: { bottom: 0, itemGap: 40 },
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
      bottom: 40,
    },
  ],
}
</script>
<template>
  <IxBarChart :data="data" name="日志数量" v-bind="barOption" />

  <IxBarChart :data="data" v-bind="bar2Option" />

  <IxBarChart :data="data" v-bind="bar3Option" />
</template>
