<script setup lang="ts">
import { computed, ref } from 'vue'
import { IxMapChart, registerMap, type MapDataItem, type MapLineItem } from '@idux/charts'
import china from '../assets/china.json'
// 世界地图来源：https://echarts.apache.org/examples/data/asset/geo/world.json
import world from '../assets/world.json'

registerMap('china', china as Parameters<typeof registerMap>[1])
registerMap('world', world as unknown as Parameters<typeof registerMap>[1])

const nodes: MapDataItem[] = [
  { name: '纽约', coordinate: [-74, 40.71] },
  { name: '法兰克福', coordinate: [8.68, 50.11] },
  { name: '约翰内斯堡', coordinate: [28.04, -26.2] },
  { name: '北京市', coordinate: [116.46, 39.92] },
  { name: '日本', coordinate: [139.69, 35.69] },
  { name: '10.23.22.4', symbol: 'pin', coordinate: [116.46, 52], color: '#12A679' },
]

const routes: MapLineItem[] = nodes
  .slice(0, 3)
  .concat(nodes.slice(4, 5))
  .map(node => ({
    from: node.name,
    to: '北京市',
    coords: [node.coordinate!, [116.46, 39.92]],
    metrics: [
      { name: '时延', value: 185, unit: 'ms' },
      { name: '丢包', value: 0.01, unit: '%' },
      { name: '抖动', value: 2, unit: 'ms' },
    ],
  }))

const chinaNodes: MapDataItem[] = [
  { name: '上海市', coordinate: [121.48, 31.22] },
  { name: '深圳市', coordinate: [114.06, 22.55] },
  { name: '成都市', coordinate: [104.06, 30.67] },
  { name: '北京市', coordinate: [116.46, 39.92] },
  { name: '乌鲁木齐市', coordinate: [87.62, 43.82] },
  { name: '10.23.22.4', symbol: 'pin', coordinate: [116.46, 44], color: '#12A679' },
]

const chinaRoutes: MapLineItem[] = chinaNodes
  .slice(0, 3)
  .concat(chinaNodes.slice(4, 5))
  .map((node, index) => ({
    from: node.name,
    to: '北京市',
    coords: [node.coordinate!, [116.46, 39.92]],
    metrics: [
      { name: '时延', value: [35, 48, 42, 68][index]!, unit: 'ms' },
      { name: '丢包', value: 0.01, unit: '%' },
      { name: '抖动', value: 2, unit: 'ms' },
    ],
  }))

const scope = ref('world')
const state = ref('normal')
const data = computed(() =>
  (scope.value === 'china' ? chinaNodes : nodes).map(item =>
    state.value === 'zero' ? { ...item, value: 0 } : item,
  ),
)
const lines = computed(() =>
  (scope.value === 'china' ? chinaRoutes : routes).map(item =>
    state.value === 'zero'
      ? { ...item, value: 0, metrics: item.metrics?.map(metric => ({ ...metric, value: 0 })) }
      : item,
  ),
)
</script>
<template>
  <IxSpace vertical block :size="16">
    <IxSpace wrap>
      <IxRadioGroup v-model:value="scope" buttoned size="sm" aria-label="地图范围">
        <IxRadio key="china">中国地图</IxRadio><IxRadio key="world">世界地图</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="state" buttoned size="sm" aria-label="数据状态">
        <IxRadio key="normal">正常</IxRadio><IxRadio key="zero">数值为 0</IxRadio>
        <IxRadio key="empty">空状态</IxRadio><IxRadio key="loading">加载中</IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <div class="map-lines-demo">
      <IxEmpty simple v-if="state === 'empty'" description="暂无数据" class="map-lines-empty" />
      <IxMapChart
        v-else
        :map="scope"
        mode="lines"
        :data="data"
        :lines="lines"
        :loading="state === 'loading' && { text: '图表正在加载中，请稍后...' }"
        roam
        :geo="{ left: 24, right: 24 }"
        style="height: 500px; width: 100%"
      />
    </div>
  </IxSpace>
</template>
<style scoped>
.map-lines-demo {
  background: var(--map-demo-background, #f6f8fa);
}
.map-lines-empty {
  height: 500px;
  display: grid;
  place-content: center;
}
</style>

<archive-meta lang="json">
{
  "title": "飞线型",
  "description": "虚线弧线与动态飞线连接节点，悬停线路查看时延、丢包和抖动。支持拖拽、缩放及原生选项覆盖。",
  "index": 2
}
</archive-meta>
