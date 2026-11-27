<script setup lang="ts">
import { registerMap, type ChartProps } from '@idux/charts'
import china from '@idux/geo-areas/geojson/china.json'

// 注册地图边界，名称与 series.map 保持一致。
registerMap('china', china as Parameters<typeof registerMap>[1])

const option: ChartProps = {
  title: { text: '地图标题', left: 0 },
  tooltip: { trigger: 'item' },
  visualMap: { min: 0, max: 300, left: 0, bottom: 0 },
  series: [
    {
      type: 'map',
      map: 'china',
      name: '资产数量',
      data: [
        { name: '广东省', value: 260 },
        { name: '北京市', value: 180 },
        { name: '四川省', value: 100 },
      ],
    },
  ],
}
</script>
<template>
  <IxChart style="height: 400px" v-bind="option" />
</template>

<archive-meta lang="json">
{
  "title": "地图",
  "description": "注册地图边界后，通过 IxChart 配置原生地图系列，按数值展示区域颜色。",
  "index": 3
}
</archive-meta>
