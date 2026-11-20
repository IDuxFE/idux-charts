<script setup lang="ts">
import { computed, ref } from 'vue'
import { IxMapChart, registerMap, type MapDataItem } from '@idux/charts'
import china from '../assets/china.json'
// 世界地图来源：https://echarts.apache.org/examples/data/asset/geo/world.json
import world from '../assets/world.json'

registerMap('china', china as Parameters<typeof registerMap>[1])
registerMap('world', world as unknown as Parameters<typeof registerMap>[1])

const worldNames = {
  'United States': '美国',
  Australia: '澳大利亚',
  Peru: '秘鲁',
  Kazakhstan: '哈萨克斯坦',
  China: '中国',
}

const chinaStatus: MapDataItem[] = [
  { name: '北京三里屯', region: '北京', coordinate: [116.46, 39.92], value: 770 },
  { name: '上海BFC', region: '上海', coordinate: [121.48, 31.22], value: 666 },
  { name: '深圳华润中心', region: '广东', coordinate: [114.06, 22.55], value: 332 },
  { name: '长沙IFS', region: '湖南', coordinate: [112.98, 28.19], value: 222 },
  { name: '成都太古里', region: '四川', coordinate: [104.06, 30.67], value: 112 },
]

const worldStatus: MapDataItem[] = [
  { name: '美国', coordinate: [-100, 39], value: 770 },
  { name: '澳大利亚', coordinate: [134, -25], value: 666 },
  { name: '秘鲁', coordinate: [-75, -10], value: 332 },
  { name: '哈萨克斯坦', coordinate: [68, 48], value: 222 },
  { name: '中国', coordinate: [104, 35], value: 112 },
]

const scope = ref('china')
const state = ref('normal')
const data = computed(() =>
  (scope.value === 'china' ? chinaStatus : worldStatus).map(item =>
    state.value === 'zero' ? { ...item, value: 0 } : item,
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
    <div class="map-status-demo">
      <IxEmpty simple v-if="state === 'empty'" description="暂无数据" class="map-status-empty" />
      <IxMapChart
        v-else
        roam
        :map="scope"
        :geo="scope === 'world' ? { nameMap: worldNames } : {}"
        :data="data"
        :loading="state === 'loading' && { text: '图表正在加载中，请稍后...' }"
        metricName="攻击次数"
        unit="次"
        style="height: 520px; width: 100%"
      />
    </div>
  </IxSpace>
</template>
<style scoped>
.map-status-demo {
  background: var(--map-demo-background, #f6f8fa);
  padding: 20px;
}
.map-status-empty {
  height: 520px;
  display: grid;
  place-content: center;
}
</style>

<archive-meta lang="json">
{
  "title": "状态型",
  "description": "区域着色、位置标记与数据图例。坐标用于定位，region 用于匹配区域边界。",
  "index": 0
}
</archive-meta>
