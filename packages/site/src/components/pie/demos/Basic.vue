<script setup lang="ts">
import type { PieChartProps } from '@idux/charts'
import { PieChart, Empty, addIconDefinitions } from '@idux/components/icon'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useThemeToken } from '@idux/components/theme'

addIconDefinitions([PieChart, Empty])

type ChartStatus = 'normal' | 'allZero' | 'missing' | 'empty' | 'loading'
const chartStatus = ref<ChartStatus>('normal')
const totalWeight = ref<'light' | 'heavy'>('light')
const statusDescriptions: Record<ChartStatus, string> = {
  normal: '展示正常的实心饼图及图例。',
  allZero: '展示中心留空的灰色占位圆，图例数值为 0。',
  missing: '文字标红，按有效数据渲染，悬浮提示原因。',
  empty:
    '用于图表无数据或加载异常时，涵盖无权限、未配置、报错等情况，展示对应占位图与操作引导，避免页面空白。',
  loading: '展示灰色饼图图标及加载文案。',
}
const { themeTokens } = useThemeToken()

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
const chartSize = ref({ width: 480, height: 180 })
const chartStyle = computed(() => ({
  width: `${chartSize.value.width}px`,
  height: `${chartSize.value.height}px`,
}))

const values = [145, 124, 118, 92, 54, 21]
const data = computed(() =>
  values.map((value, index) => ({
    name: `图例${index + 1}`,
    value:
      chartStatus.value === 'missing' && index === 3
        ? null
        : chartStatus.value === 'allZero'
          ? 0
          : value,
    missingReason: '数据缺失，xxxxxxxx缺失原因，请进行xxx解决方案',
  })),
)

// 统计口径和缺失文案由业务提供；零值参与统计，缺失值不参与。
const total = computed(() => data.value.reduce((sum, item) => sum + (item.value ?? 0), 0))
const title = computed<PieChartProps['title']>(() =>
  totalWeight.value === 'light'
    ? {
        text: `{label|统计总数}  {value|${total.value}}`,
        subtext: '',
        textStyle: {
          fontSize: 30,
          lineHeight: 16,
          rich: {
            value: { fontSize: 16, fontWeight: 500, fontFamily: 'IDuxChartDemoDIN, D-DIN-PRO' },
          },
        },
      }
    : {
        text: `{value|${total.value}}`,
        subtext: '统计总数',
        itemGap: 8,
        textStyle: {
          lineHeight: 28,
          rich: {
            value: { fontSize: 28, fontWeight: 700, fontFamily: 'IDuxChartDemoDIN, D-DIN-PRO' },
          },
        },
      },
)
const legend = computed<PieChartProps['legend']>(() => ({
  formatter: (name: string) => {
    const item = data.value.find(item => item.name === name)
    return item?.value == null
      ? `{label|${name}}{missing|数据缺失 ⓘ}`
      : `{label|${name}}{value|${item.value}}`
  },
  textStyle: {
    rich: {
      label: { fontSize: 12 },
      value: { fontSize: 12 },
      missing: { fontSize: 12 },
    },
  },
}))
</script>
<template>
  <IxSpace vertical class="basic-pie-demo">
    <div class="basic-pie-demo-controls">
      <IxRadioGroup v-model:value="totalWeight" buttoned aria-label="总数展示">
        <IxRadio key="light">轻总数</IxRadio>
        <IxRadio key="heavy">重总数</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="chartStatus" buttoned>
        <IxRadio key="normal">正常</IxRadio>
        <IxRadio key="allZero">全部数值为 0</IxRadio>
        <IxRadio key="missing">数据缺失</IxRadio>
        <IxRadio key="empty">空状态</IxRadio>
        <IxRadio key="loading">加载中</IxRadio>
      </IxRadioGroup>
    </div>
    <span class="basic-pie-demo-text">{{ statusDescriptions[chartStatus] }}</span>
    <div class="basic-pie-demo-chart" :style="chartStyle">
      <div v-if="chartStatus === 'empty'" class="basic-pie-demo-placeholder">
        <IxEmpty simple>
          <template #description>
            <IxSpace :size="0">
              <span class="basic-pie-demo-empty-label">加载失败，</span>
              <IxButton mode="link" @click="reloadChart" style="display: flex">重新加载</IxButton>
            </IxSpace>
          </template>
        </IxEmpty>
      </div>
      <div
        v-else-if="chartStatus === 'loading'"
        class="basic-pie-demo-placeholder"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <IxIcon name="pie-chart" :size="60" :color="themeTokens.colorInfoContainerBgDisabled" />
        <span>图表正在加载中，请稍后...</span>
      </div>
      <IxPieChart
        v-else
        style="width: 100%; height: 100%"
        :data="data"
        align="center-start"
        name="基础饼图"
        :title="title"
        :legend="legend"
      />
    </div>
  </IxSpace>
</template>

<style scoped lang="less">
.basic-pie-demo {
  &-controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px 24px;
  }

  &-empty-label {
    font-size: 12px;
  }

  &-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    height: 100%;
    color: var(--ix-color-text-info);
  }

  &-text {
    color: var(--ix-color-text-info);
    font-size: 14px;
    line-height: 24px;
  }
}
</style>

<archive-meta lang="json">
{
  "title": "实心饼图",
  "description": "切换轻总数和重总数；业务明确配置标题字号、合计及缺失文案，组件负责绘制和布局。",
  "index": 0
}
</archive-meta>
