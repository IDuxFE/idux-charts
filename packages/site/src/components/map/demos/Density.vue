<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, unref, watch } from 'vue'
import {
  IxMapChart,
  PLOT_THEME_TOKEN,
  useTooltipsFormatter,
  registerMap,
  defaultMapPieces,
  createMapRegions,
  createMapVisualMap,
  type MapRegionItem,
} from '@idux/charts'
import china from '../assets/china.json'
// 世界地图来源：https://echarts.apache.org/examples/data/asset/geo/world.json
import world from '../assets/world.json'

// 注册 GeoJSON 地图边界；名称必须与模板中的 map 一致。通常在应用初始化时注册一次。
registerMap('china', china as Parameters<typeof registerMap>[1])
registerMap('world', world as Parameters<typeof registerMap>[1])

const worldNames = {
  'United States': '美国',
  Australia: '澳大利亚',
  Peru: '秘鲁',
  Kazakhstan: '哈萨克斯坦',
  China: '中国',
}

// 仅为部分区域提供数据；未列出的区域显示缺失底色，value: 0 的区域仍使用零值色阶。
const chinaDensity: MapRegionItem[] = Object.entries({
  北京: 920,
  河北: 180,
  山西: 0,
  内蒙古: 240,
  黑龙江: 300,
  上海: 860,
  江苏: 780,
  浙江: 650,
  福建: 580,
  山东: 620,
  湖北: 460,
  广东: 720,
  四川: 560,
  云南: 450,
  甘肃: 90,
  青海: 0,
  新疆: 267,
}).map(([name, value]) => ({ region: name, value }))

const worldDensity: MapRegionItem[] = Object.entries({
  美国: 330,
  澳大利亚: 530,
  秘鲁: 720,
  哈萨克斯坦: 550,
  中国: 1670,
  Canada: 0,
  Brazil: 610,
  Colombia: 890,
  Bolivia: 120,
  'United Kingdom': 860,
  France: 580,
  Germany: 720,
  Norway: 0,
  Russia: 0,
  'Saudi Arabia': 420,
  Iran: 160,
  Egypt: 310,
  'South Africa': 690,
  Kenya: 180,
  Morocco: 0,
  India: 180,
  Japan: 760,
  Mongolia: 0,
  Indonesia: 320,
  'New Zealand': 630,
}).map(([name, value]) => ({ region: name, value }))

// 内置蓝色色阶同样由 createMapPieces 根据阈值自动生成，无需手写区间和图例文案。
// 区域填色和图例共用这份配置；0 与缺失数据使用不同颜色。
const pieces = defaultMapPieces

// 配置生成函数是纯函数：显式传入当前主题，并用 computed 在主题或数据变化时重新生成配置。
const plotTheme = inject(PLOT_THEME_TOKEN, {})
const scope = ref('china')
const state = ref('normal')
let reloadTimer: ReturnType<typeof setTimeout> | undefined
const cancelReload = () => {
  clearTimeout(reloadTimer)
  reloadTimer = undefined
}
const reload = () => {
  cancelReload()
  state.value = 'loading'
  reloadTimer = setTimeout(() => {
    state.value = 'normal'
    reloadTimer = undefined
  }, 800)
}
watch(state, next => {
  if (next !== 'loading') cancelReload()
})
onBeforeUnmount(cancelReload)
// 仅零值状态改变业务数据；切换加载状态时保持配置稳定，避免重置用户缩放和拖动的位置。
const isZero = computed(() => state.value === 'zero')
// geo 管理地图底图；regions 为指定区域设置填色、名称和悬停提示，不需要额外的 map 系列。
const geo = computed(() => ({
  map: scope.value,
  // 未提供数据的区域显示「-」，与真实数值 0 区分；已有数据使用 regions 自己的提示。
  tooltip: {
    formatter: (params: { name?: string }) =>
      useTooltipsFormatter('资产总数', [
        { name: params.name ?? '', value: '-', color: unref(plotTheme).color ?? '#4089FF' },
      ]),
  },
  // 密度图使用平面底图：无数据区域为中性色，并关闭地图边缘阴影。
  itemStyle: {
    areaColor: unref(plotTheme).mapEmptyColor ?? '#F0F3F7',
    shadowBlur: 0,
    shadowOffsetY: 0,
  },
  // 底图也设置标签规则，保证未提供业务数据的区域与其他区域一致。
  label: { show: scope.value === 'china' },
  emphasis: {
    label: { show: scope.value === 'china', color: unref(plotTheme).textColor ?? '#1C4EFF' },
  },
  ...(scope.value === 'world' ? { nameMap: worldNames } : {}),
  regions: createMapRegions(
    (scope.value === 'china' ? chinaDensity : worldDensity).map(item =>
      isZero.value ? { ...item, value: 0 } : item,
    ),
    {
      plotTheme: unref(plotTheme),
      pieces, // 生成函数根据 value 匹配区间，写入各区域的原生 itemStyle。
      label: { show: scope.value === 'china' }, // 世界地图区域密集，隐藏名称。
      metricName: '资产总数',
      unit: '台',
    },
  ),
}))
// 区域颜色已由 regions 设置；此原生 visualMap 仅展示色阶，默认不关联任何 series。
const visualMap = computed(() => createMapVisualMap(pieces, { plotTheme: unref(plotTheme) }))
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
    <div class="map-density-chart">
      <!-- 密度通过 geo.regions 填色即可，无需提供 series；默认开启拖动和滚轮缩放。-->
      <IxMapChart
        :geo="geo"
        :visualMap="visualMap"
        :loading="state === 'loading' && { text: '图表正在加载中，请稍后...' }"
        style="height: 100%; width: 100%"
      >
        <IxEmpty v-if="state === 'empty'" class="chart-empty" simple>
          <template #description>
            <IxSpace align="center">
              <span>暂无数据</span>
              <IxButton mode="link" size="sm" @click="reload" style="display: flex"
                >重新加载</IxButton
              >
            </IxSpace>
          </template>
        </IxEmpty>
      </IxMapChart>
    </div>
  </IxSpace>
</template>

<style scoped>
.chart-empty {
  margin: 0;
  background: var(--ix-color-container-bg);
}

.map-density-chart {
  width: 100%;
  height: 560px;
}
</style>

<archive-meta lang="json">
{
  "title": "密度型",
  "description": "连续且互不重叠的区间。悬停在原填色上叠加 20% 的 #1C4EFF；缺失值和零值使用不同颜色。",
  "index": 1
}
</archive-meta>
