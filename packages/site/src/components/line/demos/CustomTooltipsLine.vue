<script setup lang="ts">
import { IxLineChart, useTooltipsFormatter } from '@idux/charts'
import type { LineChartProps } from '@idux/charts'

const lineOption: LineChartProps = {
  title: { text: '自定义 tooltips' },
  // 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#FBFDFF',
    axisPointer: {
      lineStyle: {
        type: 'dashed',
        color: '#D3D7DE',
      },
    },
    formatter(params) {
      if (!Array.isArray(params) || !params.length) {
        return ''
      }

      const title = params[0].name
      const list = params.map(param => {
        return {
          name: param.seriesName ?? '',
          value: `${param.value} 个`,
          color: typeof param.color === 'string' ? param.color : '#458FFF',
        }
      })

      return useTooltipsFormatter(title, list)
    },
  },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      data: [100, 150, 300, 88, 200],
      name: '到店靓仔',
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
    },
  ],
}
</script>
<template>
  <IxLineChart style="height: 300px" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "自定义 tooltips",
  "description": "自定义 tooltips的配置与使用示例。",
  "index": 13
}
</archive-meta>
