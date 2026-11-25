<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BulletChartDataItem, BulletChartProps, BulletRange } from '@idux/charts'
import { Empty, addIconDefinitions } from '@idux/components/icon'

addIconDefinitions([Empty])

const scenarios = [
  {
    key: 'normal',
    label: '正常',
    description:
      '展示 5 个分类的实际值与目标值，悬停可查看具体数值。拖动区间分界点可调整范围区间。',
  },
  {
    key: 'limit',
    label: '极限场景',
    description: '共有 50 个分类，默认显示前 5 个。拖动滑块浏览。',
  },
  {
    key: 'zero',
    label: '全部值为 0',
    description: '所有分类的实际值均为 0，保留坐标轴并显示「暂无数据」，表示数据已上报且数值为零。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示组件内置的加载插图与提示，模拟数据请求中的状态。',
  },
  {
    key: 'missing',
    label: '数据缺失',
    description: '类别2和类别4的实际值缺失，显示缺报底条。悬停可查看缺报原因与已上报的目标值。',
  },
  {
    key: 'empty',
    label: '空状态',
    description: '模拟未配置数据源的场景，展示业务提示「未配置数据源，请先配置采集任务」。',
  },
]
const state = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === state.value)?.description,
)
const source: BulletChartDataItem[] = [
  { name: '类别1', value: 112, target: 122 },
  { name: '类别2', value: 75, target: 88 },
  { name: '类别3', value: 66, target: 130 },
  { name: '类别4', value: 48, target: 103 },
  { name: '类别5', value: 38, target: 88 },
]
const data = computed(() =>
  Array.from({ length: state.value === 'limit' ? 50 : source.length }, (_, index) => {
    const row = source[index % source.length]!
    if (state.value === 'missing' && index === 1)
      return { name: `类别${index + 1}`, value: null, missingReason: '采集失败，暂无数据' }
    if (state.value === 'missing' && index === 3)
      return { ...row, value: null, missingReason: '实际值暂未上报' }
    return {
      ...row,
      name: `类别${index + 1}`,
      value: state.value === 'zero' ? 0 : row.value,
    }
  }),
)
const options = computed<BulletChartProps>(() => ({
  dataZoom:
    state.value === 'limit'
      ? {
          type: 'slider',
          yAxisIndex: 0,
          startValue: 0,
          endValue: 4,
          filterMode: 'filter',
        }
      : undefined,
  grid: { right: state.value === 'limit' ? 44 : 16 },
}))
const rangeBounds = ref([50, 100])
// Keep all three intervals at least one step wide, including when thumbs meet.
const updateRangeBounds = (next: number | number[]) => {
  if (!Array.isArray(next) || next.length !== 2) return
  const [lower, upper] = [...next].sort((a, b) => a - b)
  const first = Math.max(1, Math.min(148, lower!))
  rangeBounds.value = [first, Math.max(first + 1, Math.min(149, upper!))]
}
const ranges = computed<BulletRange[]>(() => [
  { upper: rangeBounds.value[0]!, label: '待提升' },
  { upper: rangeBounds.value[1]!, label: '良好' },
  { upper: 150, label: '优秀' },
])
</script>
<template>
  <IxSpace vertical block>
    <IxSpace wrap align="center">
      <div class="bullet-slider-control">
        <span id="bullet-grouped-range-label">区间分界点</span>
        <IxSlider
          class="chart-demo-slider"
          :value="rangeBounds"
          range
          :min="0"
          :max="150"
          :step="1"
          aria-labelledby="bullet-grouped-range-label"
          @update:value="updateRangeBounds"
        />
      </div>
      <span>
        待提升：0–{{ rangeBounds[0] }}；良好：{{ rangeBounds[0] }}–{{ rangeBounds[1] }}；优秀：{{
          rangeBounds[1]
        }}–150
      </span>
    </IxSpace>
    <IxSpace wrap align="center">
      <IxRadioGroup
        v-model:value="state"
        buttoned
        size="sm"
        aria-label="有特定范围区间的分组数据状态"
      >
        <IxRadio v-for="scenario in scenarios" :key="scenario.key" :value="scenario.key">
          {{ scenario.label }}
        </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <p class="bullet-demo-description">{{ description }}</p>
    <IxBulletChart
      zero-text="暂无数据"
      :data="data"
      :x-axis="{ max: 150 }"
      v-bind="options"
      :ranges="ranges"
      :loading="state === 'loading' && { text: '加载中...' }"
      style="height: 280px; width: 100%"
    >
      <IxEmpty
        v-if="state === 'empty'"
        class="chart-empty"
        simple
        description="未配置数据源，请先配置采集任务"
      />
    </IxBulletChart>
  </IxSpace>
</template>
<style scoped>
.bullet-slider-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bullet-slider-control .chart-demo-slider {
  width: 160px;
}

.chart-empty {
  margin: 0;
  background: var(--ix-color-container-bg);
}

.bullet-demo-description {
  margin: 0;
  color: var(--ix-color-text-info);
}
</style>
<archive-meta lang="json">
{
  "title": "分组子弹图——有特定范围区间",
  "description": "在统一量程下比较类别，支持阈值虚线与底部色轴。拖动范围滑块调整两处分界点，将 0–150 划分为三段。悬停查看实际值和目标值，切换空状态查看默认插槽中的业务提示。",
  "index": 3
}
</archive-meta>
