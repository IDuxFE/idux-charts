<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, unref, watch } from 'vue'
import {
  IxMapChart,
  seerColorsForRisk,
  PLOT_THEME_TOKEN,
  useTooltipsFormatter,
  registerMap,
  type MapNodeItem,
  createMapPieces,
  getMapPieceColor,
  createMapNodes,
  createMapRegions,
  createMapVisualMap,
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

type StatusLocation = Omit<MapNodeItem, 'id'> & { region?: string }

const chinaStatus: StatusLocation[] = [
  { name: '北京三里屯', region: '北京', coordinate: [116.46, 39.92], value: 770 },
  { name: '上海BFC', region: '上海', coordinate: [121.48, 31.22], value: 666 },
  { name: '深圳华润中心', region: '广东', coordinate: [114.06, 22.55], value: 332 },
  { name: '长沙IFS', region: '湖南', coordinate: [112.98, 28.19], value: 222 },
  { name: '成都太古里', region: '四川', coordinate: [104.06, 30.67], value: 112 },
]

const worldStatus: StatusLocation[] = [
  { name: '美国', coordinate: [-100, 39], value: 770 },
  { name: '澳大利亚', coordinate: [134, -25], value: 666 },
  { name: '秘鲁', coordinate: [-75, -10], value: 332 },
  { name: '哈萨克斯坦', coordinate: [68, 48], value: 222 },
  { name: '中国', coordinate: [104, 35], value: 112 },
]

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
// 复用 seer 风险色板：前五档从高风险到低风险，第七色表示零攻击。
// 业务只定义「超过多少」对应的颜色；生成函数自动排序、补上区间上界和图例文案。
// 例如 value: 700 表示 >700，value: 500 表示 (500, 700]；阈值处使用较低风险级别。
const attackPieces = createMapPieces(
  [
    { value: 700, color: seerColorsForRisk[0]! },
    { value: 500, color: seerColorsForRisk[1]! },
    { value: 300, color: seerColorsForRisk[2]! },
    { value: 200, color: seerColorsForRisk[3]! },
    { value: 0, color: seerColorsForRisk[4]! },
  ],
  { zeroColor: seerColorsForRisk[6] }, // 可选：零攻击使用中性色；省略时沿用 >0 的颜色。
)
const data = computed(() =>
  (scope.value === 'china' ? chinaStatus : worldStatus).map(item => {
    const value = isZero.value ? 0 : item.value
    // 区域、站点标记和图例引用同一个计算结果；数值变化时颜色也会自动更新。
    return { ...item, value, color: getMapPieceColor(value, attackPieces) }
  }),
)
// geo 管理地图底图；regions 为指定区域设置填色、名称和悬停提示，不需要额外的 map 系列。
const geo = computed(() => ({
  map: scope.value,
  // 未提供数据的区域显示「-」，与真实数值 0 区分；已有数据使用 regions 自己的提示。
  tooltip: {
    formatter: (params: { name?: string }) =>
      useTooltipsFormatter('攻击次数', [
        { name: params.name ?? '', value: '-', color: unref(plotTheme).color ?? '#4089FF' },
      ]),
  },
  // nameMap 将 GeoJSON 的英文区域名映射到中文，regions.region 使用映射后的名称。
  emphasis: { label: { show: true, color: unref(plotTheme).textColor ?? '#1C4EFF' } },
  ...(scope.value === 'world' ? { nameMap: worldNames } : {}),
  regions: createMapRegions(
    data.value.map(item => ({
      region: item.region ?? item.name,
      name: item.name,
      value: item.value,
      color: item.color,
    })),
    {
      plotTheme: unref(plotTheme),
      label: { show: false }, // 平时隐藏区域名，悬停时显示。
      itemStyle: { opacity: 0.45 }, // 区域使用浅色，突出上方的站点标记。
      emphasis: {
        label: { show: true, color: unref(plotTheme).textColor ?? '#1C4EFF' },
        itemStyle: { opacity: 0.65 },
      },
      metricName: '攻击次数', // 提示框标题。
      unit: '次', // 提示框数值单位。
    },
  ).map(region => ({
    ...region,
    // 状态图悬停只加深透明度，保持业务颜色；覆盖生成函数默认的蓝色混合效果。
    emphasis: {
      ...region.emphasis,
      itemStyle: { ...region.emphasis?.itemStyle, areaColor: region.itemStyle?.areaColor },
    },
  })),
}))
// series 是 ECharts 原生数组；createMapNodes 返回一个 scatter 系列，负责经纬度位置标记。
const series = computed(() => [
  createMapNodes(
    data.value.map(item => ({
      id: item.name,
      name: item.name,
      value: item.value,
      coordinate: item.coordinate,
      color: item.color,
    })),
    {
      plotTheme: unref(plotTheme),
      id: 'locations', // 系列唯一标识，便于更新或通过 ECharts action 定位。
      symbol: 'pin', // 使用内部提供的默认水滴标记样式。
      label: { show: false }, // 名称在提示框和左下角图例展示，地图上不重复显示。
      metricName: '攻击次数',
      unit: '次',
    },
  ),
])
// 此处 visualMap 只展示业务颜色和数值，不参与区域／标记的着色，也不提供筛选交互。
const visualMap = computed(() =>
  createMapVisualMap(
    data.value.map((item, index) => ({
      value: index, // 图例条目的唯一值，不是攻击次数。
      color: item.color,
      label: `{name|${item.name}}{value|${item.value ?? '-'}}`,
    })),
    {
      plotTheme: unref(plotTheme),
      inverse: true, // 从上到下保持业务数据的排列顺序。
      // ECharts 富文本将名称与右对齐数值排成两列。
      textStyle: {
        rich: {
          name: { width: 84, color: unref(plotTheme).secondaryTextColor ?? '#6F7785' },
          value: { width: 32, align: 'right', color: unref(plotTheme).textColor ?? '#2F3540' },
        },
      },
    },
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
      <div class="map-status-chart">
        <!-- geo.map 选择已注册的边界，默认开启拖动和滚轮缩放；loading 只控制加载遮罩。-->
        <IxMapChart
          :geo="geo"
          :series="series"
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
    </div>
  </IxSpace>
</template>
<style scoped>
.chart-empty {
  margin: 0;
  background: var(--ix-color-container-bg);
}

.map-status-demo {
  background: var(--map-demo-background, #f6f8fa);
  padding: 20px;
}
.map-status-chart {
  width: 100%;
  height: 520px;
}
</style>

<archive-meta lang="json">
{
  "title": "状态型",
  "description": "按攻击次数区间自动选择风险颜色，区域、位置标记与图例保持一致。坐标用于定位，region 用于匹配区域边界。",
  "index": 0
}
</archive-meta>
