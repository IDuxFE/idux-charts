<script setup lang="ts">
import { useLinearGradient, getAlphaColor } from '@idux/charts'
import type { LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188, 287, 216]

const lineOption: LineChartProps = {
  name: '访问次数',
  smooth: true,
  lineStyle: {
    // 实现连线上的阴影效果
    shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)
    shadowBlur: 8,
  },
  areaStyle: {
    color: useLinearGradient(),
  },
  title: { text: '折线图标题' },
  xAxis: {
    boundaryGap: false,
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  },
  yAxis: {
    name: '次',
  },
}
</script>
<template>
  <IxLineChart
    class="area-shadow-chart"
    style="width: 100%; height: 300px"
    :data="data"
    v-bind="lineOption"
  />
</template>

<archive-meta lang="json">
{
  "title": "平滑面积图+阴影效果",
  "description": "平滑面积图+阴影效果的配置与使用示例。",
  "index": 6
}
</archive-meta>
