<script setup lang="ts">
import type { RadarChartProps } from '@idux/charts'
import { seerColors } from '@idux/charts'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useThemeToken } from '@idux/components/theme'
import { Empty, Down, Loading, addIconDefinitions } from '@idux/components/icon'
import { GraphicComponent } from 'echarts/components'
import { use } from 'echarts/core'

use([GraphicComponent])
addIconDefinitions([Empty, Down, Loading])
const { themeTokens } = useThemeToken()
const objectCount = ref(2)
const dimensionCount = ref(5)
const gridStyle = ref<'area' | 'line'>('area')
const gridSpacing = ref(30)
const shapeStyle = ref('line')
type ChartStatus = 'normal' | 'allZero' | 'empty' | 'loading'
const chartStatus = ref<ChartStatus>('normal')
const objectOptions = [1, 2, 3, 4].map(value => ({ key: value, label: String(value) }))
const dimensionOptions = Array.from({ length: 10 }, (_, index) => ({
  key: index + 3,
  label: String(index + 3),
}))

// 五等分、固定 0–25 刻度。间距为沿径向的 CSS px，改变间距同步改变半径。
const splitNumber = 5
const radius = computed(() => gridSpacing.value * splitNumber)
const chartHeight = computed(() => radius.value * 2 + 130)
const chartStyle = computed(() => ({
  minWidth: `${radius.value * 2 + 280}px`,
  height: `${chartHeight.value}px`,
}))
const dimensions = [
  '攻击路径',
  '可用性影响',
  '影响范围',
  '权限要求',
  '攻击难度',
  '攻击手法',
  '扩散风险',
  '攻击坦度',
  '保密性影响',
  '完整性影响',
  '用户交互',
  '修复成本',
]
// 三维、五维和八维使用设计稿的维度顺序，其余数量沿用完整的业务顺序。
const dimensionIndices = computed(() => {
  if (dimensionCount.value === 3) return [0, 5, 4]
  if (dimensionCount.value === 5) return [0, 1, 2, 3, 4]
  return [0, 5, 1, 2, 6, 3, 4, 7, 8, 9, 10, 11].slice(0, dimensionCount.value)
})
const indicators = computed(() => dimensionIndices.value.map(index => dimensions[index]))
const values = [
  [12, 21, 17, 23, 10, 14, 18, 20, 16, 13, 19, 22],
  [14, 17, 21, 17, 22, 19, 12, 16, 20, 18, 15, 11],
  [18, 13, 16, 19, 15, 22, 20, 12, 14, 23, 17, 21],
  [21, 19, 12, 15, 18, 16, 23, 14, 11, 20, 22, 17],
]
const data = computed(() =>
  chartStatus.value === 'empty' || chartStatus.value === 'loading'
    ? []
    : values.slice(0, objectCount.value).map((row, index) => ({
        name: `攻击${String.fromCharCode(65 + index)}`,
        value: dimensionIndices.value.map(index =>
          chartStatus.value === 'allZero' ? 0 : row[index],
        ),
        itemStyle: {
          color: seerColors[index],
          borderColor: themeTokens.value.colorContainerBg,
          borderWidth: 1.5,
        },
      })),
)
// 通用绘制与顺时针排列由 IxRadarChart 负责；业务量程和布局由示例提供。
const chartBindings = computed<RadarChartProps>(() => ({
  indicator: indicators.value.map(name => ({ name, min: 0, max: 25 })),
  data: data.value,
  clockwise: true,
  area: shapeStyle.value === 'area',
  gridStyle: gridStyle.value,
  splitNumber,
  radius: radius.value,
  center: ['50%', radius.value + 45],
  animationDurationUpdate: 200,
  textStyle: { fontFamily: themeTokens.value.fontFamily },
  legend: {
    bottom: 8,
    left: 'center',
    icon: 'roundRect',
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 32,
    data: data.value.map(item => item.name),
  },
  // 刻度只显示在顶部轴，避免每条轴都显示刻度而相互遮挡。
  graphic: Array.from({ length: splitNumber }, (_, index) => ({
    type: 'text',
    left: 'center',
    top: radius.value + 45 - (index + 1) * gridSpacing.value - 7,
    silent: true,
    z: 10,
    style: {
      text: String((index + 1) * 5),
      fill: themeTokens.value.colorTextInfo,
      font: `12px ${themeTokens.value.fontFamily}`,
    },
  })),
}))

let reloadTimer: ReturnType<typeof setTimeout> | undefined
const cancelReload = () => {
  clearTimeout(reloadTimer)
  reloadTimer = undefined
}
const reloadChart = () => {
  cancelReload()
  chartStatus.value = 'loading'
  reloadTimer = setTimeout(() => {
    chartStatus.value = 'normal'
    reloadTimer = undefined
  }, 800)
}
watch(chartStatus, status => {
  if (status !== 'loading') cancelReload()
})
onBeforeUnmount(cancelReload)
</script>

<template>
  <IxSpace vertical block class="radar-demo" :size="20">
    <IxSpace wrap :size="24" align="center">
      <IxSpace align="center" role="group" aria-label="对象个数"
        ><span>对象个数</span>
        <IxSelect
          v-model:value="objectCount"
          :dataSource="objectOptions"
          :style="{ width: '80px' }"
          aria-label="对象个数"
        />
      </IxSpace>
      <IxSpace align="center" role="group" aria-label="变量个数"
        ><span>变量个数</span>
        <IxSelect
          v-model:value="dimensionCount"
          :dataSource="dimensionOptions"
          :style="{ width: '80px' }"
          aria-label="变量个数"
        />
      </IxSpace>
      <IxSpace align="center"
        ><span>网格线样式</span>
        <IxRadioGroup v-model:value="gridStyle" buttoned>
          <IxRadio key="area">线面</IxRadio>
          <IxRadio key="line">线框</IxRadio>
        </IxRadioGroup>
      </IxSpace>
      <IxSpace align="center"
        ><span>网格线间距</span>
        <IxRadioGroup v-model:value="gridSpacing" buttoned>
          <IxRadio :key="20">紧凑</IxRadio>
          <IxRadio :key="30">适中</IxRadio>
          <IxRadio :key="40">宽松</IxRadio>
        </IxRadioGroup>
      </IxSpace>
      <IxSpace align="center"
        ><span>图形样式</span>
        <IxRadioGroup v-model:value="shapeStyle" buttoned>
          <IxRadio key="line">线性</IxRadio>
          <IxRadio key="area">面性</IxRadio>
        </IxRadioGroup>
      </IxSpace>
    </IxSpace>
    <IxRadioGroup v-model:value="chartStatus" buttoned aria-label="图表状态">
      <IxRadio key="normal">正常</IxRadio>
      <IxRadio key="allZero">全部数值为 0</IxRadio>
      <IxRadio key="empty">空状态</IxRadio>
      <IxRadio key="loading">加载中</IxRadio>
    </IxRadioGroup>
    <div class="radar-demo-scroll">
      <div :style="chartStyle">
        <div v-if="chartStatus === 'empty'" class="radar-demo-placeholder">
          <IxEmpty simple
            ><template #description>
              <IxSpace align="center"
                ><span>暂无数据</span>
                <IxButton mode="link" @click="reloadChart">重新加载</IxButton>
              </IxSpace>
            </template></IxEmpty
          >
        </div>
        <div
          v-else-if="chartStatus === 'loading'"
          class="radar-demo-placeholder"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
            <g fill="none" stroke="currentColor">
              <path d="M40 4 74 29 61 69 19 69 6 29Z" />
              <path d="M40 16 63 33 54 60 26 60 17 33Z" />
              <path d="M40 28 51 36 47 50 33 50 29 36Z" />
              <path d="M40 40V4M40 40 74 29M40 40 61 69M40 40 19 69M40 40 6 29" />
            </g>
          </svg>
          <span>图表正在加载中，请稍后...</span>
        </div>
        <IxRadarChart v-else style="width: 100%; height: 100%" v-bind="chartBindings" />
      </div>
    </div>
  </IxSpace>
</template>

<style scoped lang="less">
.radar-demo {
  &-scroll {
    width: 100%;
    overflow-x: auto;
  }

  &-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 100%;
    color: var(--ix-color-text-info);
  }
}
</style>

<archive-meta lang="json">
{
  "title": "基础型",
  "description": "支持 1–4 个对象、3–12 个维度、线面/线框网格、20/30/40px 径向间距及线性/面性图形切换。固定五等分与 0–25 量程，支持正常、全零、空状态、加载中及模拟重试，窄容器可横向滚动。",
  "index": 1
}
</archive-meta>
