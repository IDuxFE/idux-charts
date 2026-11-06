<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import {
  type PieChartProps,
  IxPieChart,
  getAlphaColor,
  getBarLinearColors,
  seerColors,
  seerTheme,
  useTooltipsFormatter,
} from '@idux/charts'
import { format } from 'echarts/core'

// 1. 展示状态与容器尺寸
type ChartStatus = 'normal' | 'allZero' | 'missing' | 'empty' | 'loading'
const fixtureProps = defineProps<{ status: ChartStatus; width: number; height: number }>()
const chartStatus = computed(() => fixtureProps.status)
const themeTokens = computed(() => ({
  fontFamily:
    'pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif',
  colorErrorText: '#cf171d',
  colorText: '#2F3540',
  colorTextInfo: '#6f7785',
  colorInfoContainerBgDisabled: '#e1e5eb',
}))

const chartSize = computed(() => ({ width: fixtureProps.width, height: fixtureProps.height }))
const colors = getBarLinearColors({ type: 'linear', x: 1, y: 1, x2: 0, y2: 0 })
const data = [145, 124, 118, 92, 54, 21].map((value, index) => ({
  name: `图例${index + 1}`,
  value,
  itemStyle: { color: colors[index % colors.length] },
}))

// 2. 轻量配置：关闭组件默认标题、图例和标签，保留 Basic 的半透明渐变背景圆。
// 主体直径为 72px，背景直径为 84px；两层共享圆心，悬浮主体仍可查看具体数据。
const pieOption = computed<PieChartProps>(() => ({
  name: '资产分布',
  // 公共 data 置空，避免组件将主图数据深合并到背景系列。
  data: [],
  center: ['50%', '50%'],
  radius: [0, 36],
  title: { show: false },
  legend: { show: false },
  label: { show: false },
  labelLine: { show: false },
  // 轻量提示仅展示「图例: 数值」，转义名称以避免被当作 HTML 渲染。
  tooltip: {
    // 与其他图表统一使用 12px 和 IDux 主题字体，主题切换时同步更新。
    textStyle: {
      fontSize: 12,
      fontFamily: themeTokens.value.fontFamily,
      fontWeight: 400,
      color: themeTokens.value.colorText,
    },
    formatter: params => {
      const item = Array.isArray(params) ? params[0] : params
      return item ? format.encodeHTML(`${item.name}: ${item.value}`) : ''
    },
  },
  series: [
    // 背景仅作装饰，沿用 Basic 从上到下逐渐透明的配色，不响应鼠标交互。
    {
      type: 'pie',
      radius: 42,
      z: 0,
      silent: true,
      animation: false,
      tooltip: { show: false },
      emphasis: { disabled: true },
      data: [{ value: 1, name: '' }],
      itemStyle: {
        borderWidth: 0,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: getAlphaColor(seerColors[0]!, 0.08) },
            { offset: 1, color: getAlphaColor(seerColors[0]!, 0) },
          ],
        },
      },
    },
    // 实心主体覆盖在背景上方，禁用悬浮放大以保持紧凑尺寸。
    {
      type: 'pie',
      name: '资产分布',
      z: 2,
      data,
      itemStyle: { borderWidth: 1.5 },
      emphasis: { scale: false },
    },
  ],
}))
</script>
<template><IxPieChart style="width: 84px; height: 84px" v-bind="pieOption" /></template>
