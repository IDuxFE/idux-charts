<script setup lang="ts">
import { 
  type LineChartProps,
   useLinearGradient,
   useLineStyleColor,
   useStripeArea,
   getAlphaColor
  } from '@idux/charts'
import { use } from 'echarts/core'
import { AriaComponent } from 'echarts/components'

use(AriaComponent)

/**
 * 条纹面积图的几个效果对应函数或引用：
 * 1.条纹效果：按需引入无障碍插件来实现条纹效果：use(AriaComponent) + 内置配置：useStripeArea
 * 2.线条两边透明中间不透明函数：series.lineStyle.color =>  useLineStyleColor
 * 3.区域渐变函数： series.areaStyle.color => useLinearGradient
*/

const lineOption: LineChartProps = {
  ...useStripeArea(), // 配置区域图的条纹效果。如果没有区域，则此项不生效。
  xAxis: {
    boundaryGap: false,
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      showSymbol: false,
      smooth: true,
      lineStyle: { // 实现连线上的阴影效果 shadowColor + shadowBlur
        shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)
        shadowBlur: 8,
        color: useLineStyleColor('#458FFF'), // 配置折线图的两边逐渐透明的效果。
      },
      areaStyle: {
        color: useLinearGradient('#458FFF'), // 区域面积图的渐变效果
      },
      data: [1, 30, 35, 65, 80, 70, 100]
    },
  ]
}
</script>
<template>
  <IxLineChart style="height: 300px" v-bind="lineOption" />
</template>

<archive-meta lang="json">
{
  "title": "条纹面积图",
  "description": "",
  "index": 6
}
</archive-meta>
