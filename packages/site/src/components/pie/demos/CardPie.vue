<script setup lang="ts">
import type { PieChartProps } from '@idux/charts'
import { PieChart, Empty, addIconDefinitions } from '@idux/components/icon'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useThemeToken } from '@idux/components/theme'

addIconDefinitions([PieChart, Empty])

type ChartStatus = 'normal' | 'allZero' | 'missing' | 'empty' | 'loading'
const chartStatus = ref<ChartStatus>('normal')
const statusDescriptions: Record<ChartStatus, string> = {
  normal: '展示卡片环形图及图例。',
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

const total = computed(() => data.value.reduce((sum, item) => sum + (item.value ?? 0), 0))
// 标题、汇总口径和缺失文案归业务；图形与图例的布局由组件计算。
const presentation = computed<PieChartProps>(() => ({
  name: '分类统计',
  legend: {
    formatter: name => {
      const item = data.value.find(item => item.name === name)
      return item?.value == null
        ? `{label|${name}}{missing|数据缺失 ⓘ}`
        : `{label|${name}}{value|${item.value}}`
    },
  },
  radius: ['88%', '100%'],
  title: { show: false },
  label: {
    show: true,
    position: 'center',
    formatter: () => `{total|${total.value}}\n{gap| }\n{caption|资产总数}`,
    rich: {
      total: {
        fontSize: 24,
        fontFamily: 'D-DIN-PRO',
        fontWeight: 400,
        lineHeight: 24,
        color: themeTokens.value.colorTextTitle,
      },
      gap: { lineHeight: 4 },
      caption: { fontSize: 12, lineHeight: 12, color: themeTokens.value.colorTextInfo },
    },
  },
}))
</script>
<template>
  <IxSpace vertical block class="basic-pie-demo">
    <IxRadioGroup v-model:value="chartStatus" buttoned size="sm">
      <IxRadio key="normal">正常</IxRadio>
      <IxRadio key="allZero">全部数值为 0</IxRadio>
      <IxRadio key="missing">数据缺失</IxRadio>
      <IxRadio key="empty">空状态</IxRadio>
      <IxRadio key="loading">加载中</IxRadio>
    </IxRadioGroup>
    <span class="basic-pie-demo-text">{{ statusDescriptions[chartStatus] }}</span>
    <!-- 卡片仅提供标题、操作区与外观，图表仍使用自身坐标；刷新共用可取消的模拟请求。 -->
    <IxCard shadow class="basic-pie-demo-card">
      <template #header>
        <IxHeader title="资产概览" size="sm">
          <template #suffix
            ><IxButton mode="link" size="sm" @click="reloadChart">刷新</IxButton></template
          >
        </IxHeader>
      </template>
      <div class="basic-pie-demo-chart" :style="chartStyle">
        <div v-if="chartStatus === 'empty'" class="basic-pie-demo-placeholder">
          <IxEmpty simple>
            <template #description>
              <IxSpace :size="0">
                <span class="basic-pie-demo-empty-label">加载失败，</span>
                <IxButton mode="link" size="sm" @click="reloadChart" style="display: flex"
                  >重新加载</IxButton
                >
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
          <span class="basic-pie-demo-loading-ring" />
          <span>图表正在加载中，请稍后...</span>
        </div>
        <IxPieChart
          v-else
          style="width: 100%; height: 100%"
          :data="data"
          align="center-start"
          v-bind="presentation"
        />
      </div>
    </IxCard>
  </IxSpace>
</template>

<style scoped lang="less">
.basic-pie-demo {
  overflow-x: auto;

  &-loading-ring {
    width: 60px;
    height: 60px;
    border: 5px dashed var(--ix-color-info-container-bg-disabled);
    border-radius: 50%;
  }

  &-card {
    margin: 8px;
    width: 640px;
  }

  &-chart {
    margin: 0 auto;
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
  "title": "卡片环形图",
  "description": "业务声明数据和展示文案，组件内置图形装饰、自适应尺寸和图例布局。",
  "index": 5
}
</archive-meta>
