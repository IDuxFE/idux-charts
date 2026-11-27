<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
import { IxCascader, type CascaderData } from '@idux/components/cascader'
import { Down, Right, Empty, addIconDefinitions } from '@idux/components/icon'
import { chinaAreaTree, getChinaArea } from '@idux/geo-areas/china'
import { hasGeoJSON, loadGeoJSON } from '@idux/geo-areas/geojson'
import china from '@idux/geo-areas/geojson/china.json'
import type { ChinaArea, DeepReadonly, MapGeoJSON } from '@idux/geo-areas/types'
import {
  IxMapChart,
  PLOT_THEME_TOKEN,
  createMapNodes,
  createMapPieces,
  createMapRegions,
  createMapVisualMap,
  createMapTransition,
  getMapPieceColor,
  registerMap,
  seerColorsForRisk,
  type MapNodeItem,
  type ChartInstanceMethods,
} from '@idux/charts'

type Area = DeepReadonly<ChinaArea>
type Feature = MapGeoJSON['features'][number]
type StatusItem = { region: string; value: number; color: string; feature: Feature }

addIconDefinitions([Down, Right, Empty])
// 全国底图先注册，使首次加载和缺少区域边界时也能复用图表的 loading 与默认插槽。
registerMap('china', china as Parameters<typeof registerMap>[1])

// 直辖市下面的市级分组没有独立地图，导航时提升其区县，保留原始行政代码和数据。
// 同时处理重庆的「重庆市」「县」分组；普通省市、港澳的有效分组仍保留。
function isMunicipalityGroup(area: Area) {
  if (area.level !== 'city' || hasGeoJSON(area.adcode) || !area.parentCode) return false
  const parent = getChinaArea(area.parentCode)
  return (
    parent?.level === 'province' &&
    parent.children?.some(
      child =>
        child.level === 'city' &&
        child.name['zh-CN'] === parent.name['zh-CN'] &&
        !hasGeoJSON(child.adcode),
    )
  )
}
function navigationChildren(area: Area): Area[] {
  return (area.children ?? []).flatMap(child =>
    isMunicipalityGroup(child) ? navigationChildren(child) : [child],
  )
}

// 级联选择与路径、返回操作共用去除重复分组后的层级。
function toOption(area: Area): CascaderData<string> {
  const children = navigationChildren(area)
  return {
    key: area.adcode,
    label: area.level === 'country' ? '全国' : area.name['zh-CN'],
    children: children.length ? children.map(toOption) : undefined,
  }
}
const options = [toOption(chinaAreaTree)]
const selectedCode = ref(chinaAreaTree.adcode)
const selectedArea = computed(() => getChinaArea(selectedCode.value)!)
const plotTheme = inject(PLOT_THEME_TOKEN, {})
const loading = ref(false)
const transitioning = ref(false)
const mapChart = ref<ChartInstanceMethods>()
const error = ref(false)
const revision = ref(0)
const view = shallowRef<{ code: string; map: string; features: Feature[]; data: StatusItem[] }>()
let requestId = 0
const transition = createMapTransition(() => mapChart.value?.getEChartsInstance())
let loadingTimer: ReturnType<typeof setTimeout> | undefined
function clearLoadingTimer() {
  clearTimeout(loadingTimer)
  loadingTimer = undefined
}
function descendants(area: Area): Area[] {
  return [area, ...(area.children?.flatMap(descendants) ?? [])]
}

// 区县轮廓从父级地图中提取；直辖市的虚拟市级、港澳分组也按子区域匹配。
// 文字行政树与地图边界的覆盖不同：找不到边界时展示空状态，不借用别的区域。
async function loadAreaMap(area: Area): Promise<MapGeoJSON | undefined> {
  if (area.level === 'country') {
    return china as MapGeoJSON
  }
  let source = area
  while (!hasGeoJSON(source.adcode) && source.parentCode) {
    source = getChinaArea(source.parentCode)!
  }
  if (!hasGeoJSON(source.adcode)) return
  const geometry = await loadGeoJSON(source.adcode)
  if (source.adcode === area.adcode) return geometry
  const areas = descendants(area)
  const codes = new Set(areas.map(item => item.adcode))
  const names = new Set(areas.map(item => item.name['zh-CN']))
  const features = geometry.features.filter(
    ({ properties }) => codes.has(properties.code) || names.has(properties.names['zh-CN']),
  )
  return features.length ? { ...geometry, features } : undefined
}

const pieces = createMapPieces(
  [700, 500, 300, 200, 0].map((value, index) => ({
    value,
    color: seerColorsForRisk[index]!,
  })),
  { zeroColor: seerColorsForRisk[6] },
)

watch(
  [selectedCode, revision],
  async () => {
    const id = ++requestId
    transition.cancel()
    clearLoadingTimer()
    const area = selectedArea.value
    transitioning.value = !!view.value
    // 缓存命中时直接衔接动画，避免加载遮罩出现一帧后立即消失。
    loading.value = loading.value || !view.value
    if (view.value) {
      loadingTimer = setTimeout(() => {
        if (id === requestId) loading.value = true
      }, 200)
    }
    error.value = false
    try {
      // 只在切换时请求地图分块，先加载并注册，再把新配置交给 IxMapChart。
      const geometry = await loadAreaMap(area)
      if (id !== requestId) return
      clearLoadingTimer()
      if (!geometry) {
        view.value = undefined
        return
      }
      // ECharts 通过固定名称 china 识别中国地图，并自动绘制南海诸岛插图。
      const map = area.level === 'country' ? 'china' : `drilldown-${area.adcode}`
      registerMap(map, geometry as Parameters<typeof registerMap>[1])
      const changesMap = !!view.value && view.value.code !== area.adcode
      const returning =
        changesMap && descendants(area).some(item => item.adcode === view.value!.code)
      const features = geometry.features.filter(feature => feature.properties.level)
      // 每一级随机挑选约三分之一区域生成状态数据，其余区域保留底色，也支持点击下钻。
      const sampled = features
        .map(feature => ({ feature, order: Math.random() }))
        .sort((left, right) => left.order - right.order)
        .slice(0, Math.ceil(features.length / 3))
      const nextView = {
        code: area.adcode,
        map,
        features,
        data: sampled.map(({ feature }) => {
          const value = Math.floor(Math.random() * 901)
          return {
            region: feature.properties.name,
            value,
            color: getMapPieceColor(value, pieces),
            feature,
          }
        }),
      }
      const applyMap = async () => {
        view.value = nextView
        await nextTick()
        // 慢请求已显示遮罩时，等新地图应用后再关闭，避免旧地图在退场阶段闪回。
        if (id === requestId) loading.value = false
        await nextTick()
      }
      if (changesMap) {
        // 只声明前进或返回；缩放、淡入淡出与资源清理由可选 helper 处理。
        const completed = await transition.run(returning ? 'back' : 'drilldown', applyMap)
        // Theme changes can replace the chart during motion; keep the latest
        // prepared selection while still rejecting older requests and unmounts.
        if (!completed && id === requestId) await applyMap()
      } else {
        await applyMap()
      }
    } catch {
      if (id !== requestId) return
      error.value = true
      view.value = undefined
    } finally {
      // 快速切换时，较早完成的请求不能覆盖当前地图或提前关闭加载状态。
      if (id === requestId) {
        clearLoadingTimer()
        loading.value = false
        transitioning.value = false
      }
    }
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  requestId++
  transition.dispose()
  clearLoadingTimer()
})

const geo = computed(() => ({
  map: view.value?.map ?? 'china',
  emphasis: { label: { show: true, color: unref(plotTheme).textColor } },
  regions: createMapRegions(view.value?.data ?? [], {
    plotTheme: unref(plotTheme),
    label: { show: false },
    itemStyle: { opacity: 0.45 },
    emphasis: { itemStyle: { opacity: 0.65 } },
    metricName: '攻击次数',
    unit: '次',
  }).map(region => ({
    ...region,
    emphasis: {
      ...region.emphasis,
      itemStyle: { ...region.emphasis?.itemStyle, areaColor: region.itemStyle?.areaColor },
    },
  })),
}))
const series = computed(() => {
  const nodes: MapNodeItem[] = (view.value?.data ?? []).flatMap(item => {
    const area = getChinaArea(item.feature.properties.code)
    const coordinate =
      item.feature.properties.centroid ??
      item.feature.properties.center ??
      area?.centroid ??
      area?.center
    return coordinate
      ? [
          {
            id: item.feature.properties.code,
            name: item.region,
            coordinate,
            value: item.value,
            color: item.color,
          },
        ]
      : []
  })
  return [
    createMapNodes(nodes, {
      id: 'drilldown-status',
      plotTheme: unref(plotTheme),
      symbol: 'pin',
      label: { show: false },
      metricName: '攻击次数',
      unit: '次',
    }),
  ]
})
const visualMap = computed(() =>
  createMapVisualMap(pieces, { plotTheme: unref(plotTheme), inverse: false }),
)
const areaPath = computed(() => {
  const path: ChinaArea[] = []
  let area: ChinaArea | undefined = selectedArea.value
  while (area) {
    if (!isMunicipalityGroup(area)) path.unshift(area)
    area = area.parentCode ? getChinaArea(area.parentCode) : undefined
  }
  return path
})
const parentCode = computed(() => areaPath.value[areaPath.value.length - 2]?.adcode)
const cascaderValue = computed({
  get: () => areaPath.value.map(area => area.adcode),
  set: (codes: string[]) => {
    selectedCode.value = codes[codes.length - 1] ?? chinaAreaTree.adcode
  },
})
const breadcrumb = computed(() =>
  areaPath.value.map(area => (area.level === 'country' ? '全国' : area.name['zh-CN'])).join(' / '),
)
const hint = computed(() =>
  selectedArea.value.level === 'district'
    ? '已到区县级，可通过级联选择查看其他地区。'
    : view.value?.features.some(feature => feature.properties.code !== selectedCode.value)
      ? '点击区域或标记下钻，也可通过级联选择切换地区。'
      : '当前仅提供本级轮廓，可通过级联选择查看其他地区。',
)

function drilldown(params: { name?: string }) {
  if (loading.value || transitioning.value) return
  const feature = view.value?.features.find(feature => feature.properties.name === params.name)
  if (!feature) return
  const areas = descendants(selectedArea.value)
  const next =
    areas.find(area => area.adcode === feature.properties.code) ??
    areas.find(area => area.name['zh-CN'] === feature.properties.names['zh-CN'])
  if (next && next.adcode !== selectedCode.value) selectedCode.value = next.adcode
}
</script>

<template>
  <IxSpace vertical block :size="16">
    <IxSpace wrap align="center">
      <IxCascader
        v-model:value="cascaderValue"
        :dataSource="options"
        fullPath
        separator=" / "
        strategy="off"
        expandTrigger="hover"
        searchable
        placeholder="选择行政区域"
        aria-label="行政区域"
        style="width: 360px; max-width: 100%"
      />
      <IxButton :disabled="!parentCode" @click="selectedCode = parentCode!"> 返回上级 </IxButton>
      <IxButton :disabled="selectedCode === '100000'" @click="selectedCode = '100000'"
        >返回全国</IxButton
      >
      <IxButton :disabled="loading" @click="revision++">重新生成数据</IxButton>
    </IxSpace>
    <div class="map-drilldown-demo">
      <div class="map-drilldown-heading">
        <strong aria-label="当前区域">{{ breadcrumb }}</strong>
        <span>模拟攻击数据，每次切换区域重新生成</span>
      </div>
      <div class="map-drilldown-chart" :aria-busy="loading || transitioning">
        <IxMapChart
          ref="mapChart"
          :geo="geo"
          :series="series"
          :visualMap="visualMap"
          :loading="loading && { text: '正在加载区域地图...' }"
          style="height: 100%; width: 100%"
          @click="drilldown"
        >
          <IxEmpty v-if="!view && !loading" class="map-drilldown-placeholder" simple>
            <template #description>
              <IxSpace align="center">
                <span>{{ error ? '地图加载失败' : '该地区暂无可用地图边界，请选择其他地区' }}</span>
                <IxButton v-if="error" mode="link" size="sm" @click="revision++">重新加载</IxButton>
              </IxSpace>
            </template>
          </IxEmpty>
        </IxMapChart>
      </div>
      <p v-if="view" class="map-drilldown-hint">{{ hint }}</p>
    </div>
  </IxSpace>
</template>

<style scoped>
.map-drilldown-demo {
  padding: 20px;
  background: var(--map-demo-background, #f6f8fa);
}
.map-drilldown-heading {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
}
.map-drilldown-heading span,
.map-drilldown-hint {
  color: var(--site-color-text-info, #6f7785);
  font-size: 12px;
}
.map-drilldown-chart {
  position: relative;
  overflow: hidden;
  height: 520px;
  width: 100%;
}
.map-drilldown-placeholder {
  margin: 0;
  background: var(--map-demo-background, #f6f8fa);
}
.map-drilldown-hint {
  margin: 8px 0 0;
}
</style>

<archive-meta lang="json">
{
  "title": "行政区域下钻",
  "description": "全国行政区级联选择与地图点击双向联动，按需加载并注册地图边界，每次切换重新生成状态型攻击数据。区县轮廓从父级地图中提取，缺少边界时显示提示。",
  "index": 3
}
</archive-meta>
