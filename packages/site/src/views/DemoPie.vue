<script setup lang="ts">
import { IxPieChart, type PieChartProps } from '@idux/charts'

const data = [
  { value: 145, name: '图例A' },
  { value: 124, name: '图例B' },
  { value: 118, name: '图例C' },
  { value: 118, name: '图例D' },
  { value: 118, name: '图例E' },
  { value: 92, name: '图例F' },
  { value: 54, name: '图例G' },
  { value: 45, name: '图例H' },
  { value: 34, name: '图例I' },
  { value: 22, name: '图例J' },
]

const pieOption: PieChartProps = {
  title: {
    subtext: '资产总数',
    top: 16,
    right: 88,
  },
  legend: {
    height: 100,
    top: 72,
    textStyle: {
      width: '120px',
    },
  },
}
const pie2Option: PieChartProps = {
  name: '资产总数',
  radius: ['50%', '80%'],
  title: {
    subtext: '资产总数',
    top: '40%',
    left: '17%',
  },
  legend: {
    height: 100,
    top: 72,
  },
}

const pie3Option: PieChartProps = {
  radius: ['20%', '80%'],
  roseType: 'area',
  title: {
    subtext: '资产总数',
    top: 16,
    right: 88,
  },
  legend: {
    height: 100,
    top: 72,
  },
}
</script>
<template>
  <IxPieChart :data="data" v-bind="pieOption" />

  <IxPieChart :data="data" v-bind="pie2Option" />

  <IxPieChart :data="data" v-bind="pie3Option" />
</template>
