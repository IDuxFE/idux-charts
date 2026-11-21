<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, unref, watch } from 'vue'
import {
  IxMapChart,
  PLOT_THEME_TOKEN,
  useTooltipsFormatter,
  registerMap,
  type MapNodeItem,
  type MapRouteItem,
  createMapNodes,
  createMapLines,
} from '@idux/charts'
import china from '../assets/china.json'
// 世界地图来源：https://echarts.apache.org/examples/data/asset/geo/world.json
import world from '../assets/world.json'

// 注册 GeoJSON 地图边界；名称必须与模板中的 map 一致。通常在应用初始化时注册一次。
registerMap('china', china as Parameters<typeof registerMap>[1])
registerMap('world', world as Parameters<typeof registerMap>[1])

// 节点 id 用于线路引用，name 用于展示；coordinate 的顺序固定为 [经度, 纬度]。
const nodes: MapNodeItem[] = [
  { id: '纽约', name: '纽约', coordinate: [-74, 40.71] },
  { id: '法兰克福', name: '法兰克福', coordinate: [8.68, 50.11] },
  { id: '约翰内斯堡', name: '约翰内斯堡', coordinate: [28.04, -26.2] },
  { id: '北京市', name: '北京市', coordinate: [116.46, 39.92] },
  { id: '日本', name: '日本', coordinate: [139.69, 35.69] },
  {
    id: '10.23.22.4',
    name: '10.23.22.4',
    symbol: 'pin',
    coordinate: [116.46, 52],
    color: '#12A679',
  },
]

// source / target 引用节点 id；metrics 为线路悬停提示框中的多行指标。
const routes: MapRouteItem[] = nodes
  .slice(0, 3)
  .concat(nodes.slice(4, 5))
  .map(node => ({
    source: node.id,
    target: '北京市',
    metrics: [
      { name: '时延', value: 185, unit: 'ms' },
      { name: '丢包', value: 0.01, unit: '%' },
      { name: '抖动', value: 2, unit: 'ms' },
    ],
  }))

const chinaNodes: MapNodeItem[] = [
  { id: '上海市', name: '上海市', coordinate: [121.48, 31.22] },
  { id: '深圳市', name: '深圳市', coordinate: [114.06, 22.55] },
  { id: '成都市', name: '成都市', coordinate: [104.06, 30.67] },
  { id: '北京市', name: '北京市', coordinate: [116.46, 39.92] },
  { id: '乌鲁木齐市', name: '乌鲁木齐市', coordinate: [87.62, 43.82] },
  {
    id: '10.23.22.4',
    name: '10.23.22.4',
    symbol: 'pin',
    coordinate: [116.46, 44],
    color: '#12A679',
  },
]

const chinaRoutes: MapRouteItem[] = chinaNodes
  .slice(0, 3)
  .concat(chinaNodes.slice(4, 5))
  .map((node, index) => ({
    source: node.id,
    target: '北京市',
    metrics: [
      { name: '时延', value: [35, 48, 42, 68][index]!, unit: 'ms' },
      { name: '丢包', value: 0.01, unit: '%' },
      { name: '抖动', value: 2, unit: 'ms' },
    ],
  }))

// 配置生成函数是纯函数：显式传入当前主题，并用 computed 在主题或数据变化时重新生成配置。
const plotTheme = inject(PLOT_THEME_TOKEN, {})
const scope = ref('world')
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
const data = computed(() =>
  (scope.value === 'china' ? chinaNodes : nodes).map(item =>
    isZero.value ? { ...item, value: 0 } : item,
  ),
)
const lines = computed(() =>
  (scope.value === 'china' ? chinaRoutes : routes).map(item =>
    isZero.value
      ? { ...item, value: 0, metrics: item.metrics?.map(metric => ({ ...metric, value: 0 })) }
      : item,
  ),
)
// geo 控制底图布局与区域悬停；线路和标记共用这一个地理坐标系。
const geo = computed(() => ({
  map: scope.value,
  left: 24,
  right: 24,
  emphasis: { label: { show: true, color: unref(plotTheme).textColor ?? '#1C4EFF' } },
  tooltip: {
    formatter: (params: { name?: string }) =>
      useTooltipsFormatter('', [
        { name: params.name ?? '', value: '-', color: unref(plotTheme).color ?? '#4089FF' },
      ]),
  },
}))
// 一个原生 lines 系列 + 两个 scatter 系列，分别绘制线路、圆点站点和设备标记。
const series = computed(() => [
  createMapLines(lines.value, {
    plotTheme: unref(plotTheme),
    id: 'connections',
    nodes: data.value, // 生成函数根据节点 id 解析线路两端的经纬度。
    animated: true, // 开启动点沿线路移动的效果。
    lineStyle: { curveness: 0.5 }, // 弧度绝对值；生成函数按经度方向自动调整正负号。
  }),
  createMapNodes(
    data.value.filter(item => item.symbol !== 'pin'),
    {
      plotTheme: unref(plotTheme),
      id: 'sites',
      symbolSize: 10, // 标记大小，单位为像素，不随地图缩放。
      itemStyle: { color: '#FFFFFF', borderColor: '#006EFF', borderWidth: 4 },
      label: { distance: 2 },
    },
  ),
  createMapNodes(
    data.value.filter(item => item.symbol === 'pin'),
    {
      plotTheme: unref(plotTheme),
      id: 'device',
      symbol: 'pin',
      symbolSize: 28,
      label: { position: 'top', distance: 2 }, // 设备名称放在水滴标记上方，距离 2px。
      itemStyle: { borderWidth: 0 }, // 设备标记不使用站点的白色描边。
    },
  ),
])
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
      <div class="map-lines-chart">
        <!-- geo.map 选择已注册的边界，默认开启拖动和滚轮缩放；loading 只控制加载遮罩。-->
        <IxMapChart
          :series="series"
          :loading="state === 'loading' && { text: '图表正在加载中，请稍后...' }"
          :geo="geo"
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

.map-lines-demo {
  background: var(--map-demo-background, #f6f8fa);
}
.map-lines-chart {
  width: 100%;
  height: 500px;
}
</style>

<archive-meta lang="json">
{
  "title": "飞线型",
  "description": "虚线弧线与动态飞线连接节点，悬停线路查看时延、丢包和抖动。支持拖拽、缩放及原生选项覆盖。",
  "index": 2
}
</archive-meta>
