<script setup lang="ts">
import type { LineChartProps } from '@idux/charts'

const categories = Array.from({ length: 15 }, (_, index) =>
  new Date(Date.UTC(2026, 6, 1, index * 12)).toISOString().slice(5, 16).replace('T', ' '),
)
const series = [
  {
    name: '迅雷',
    stack: 'total',
    data: [25, 30, 28, 48, 42, 39, 48, 46, 71, 69, 61, 86, 91, 104, 120],
  },
  {
    name: '爱奇艺',
    stack: 'total',
    data: [20, 27, 25, 45, 41, 37, 46, 44, 70, 68, 61, 85, 91, 107, 122],
  },
  {
    name: 'DIM',
    stack: 'total',
    data: [19, 23, 23, 69, 38, 83, 38, 36, 58, 58, 51, 72, 72, 84, 101],
  },
  {
    name: '微信',
    stack: 'total',
    data: [23, 28, 23, 15, 45, 37, 46, 48, 72, 53, 39, 40, 29, 30, 30],
  },
  {
    name: 'QQ',
    stack: 'total',
    data: [201, 126, 83, 58, 50, 36, 35, 78, 38, 22, 41, 19, 24, 39, 17],
  },
]

// 本例以各系列最后一个采样值计算占同期合计的比例。
const latest = new Map(series.map(({ name, data }) => [name, data.at(-1) ?? 0]))
const total = [...latest.values()].reduce((sum, value) => sum + value, 0)

const option: LineChartProps = {
  categories,
  series,
  area: 'striped',
  yAxis: {
    name: 'Kbps',
    min: 0,
    max: 400,
    interval: 100,
  },
  xAxis: {
    axisLabel: {
      interval: (_index, label) => label.endsWith('00:00'),
      formatter: (label: string) => label.slice(0, 5),
    },
  },
  dataZoom: { type: 'slider' },
  legend: {
    formatter: name => {
      const value = latest.get(name) ?? 0
      const share = total ? (100 * value) / total : 0
      return `${name}  ${value}（${share.toFixed(1)}%）`
    },
  },
}
</script>

<template>
  <div style="width: 100%">
    <IxLineChart v-bind="option" style="width: 100%; height: 320px" />
  </div>
</template>

<archive-meta lang="json">
{
  "title": "图例带数值与百分比（以堆叠面积图为例）",
  "description": "使用图例 formatter 展示各系列最后一个采样值以及占同期合计的比例。",
  "index": -7
}
</archive-meta>
