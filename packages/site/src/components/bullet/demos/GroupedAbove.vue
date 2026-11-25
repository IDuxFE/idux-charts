<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BulletChartDataItem, BulletChartProps, BulletRange } from '@idux/charts'
import { Empty, addIconDefinitions } from '@idux/components/icon'

addIconDefinitions([Empty])

const scenarios = [
  {
    key: 'normal',
    label: '正常',
    description: '分类名称显示在轨道上方，数值显示在实际值条右侧，细线表示目标值。',
  },
  {
    key: 'limit',
    label: '极限场景',
    description: '共有 50 个分类，默认显示前 5 个。拖动滑块浏览。',
  },
  {
    key: 'zero',
    label: '全部值为 0',
    description: '保留分类名称、轨道与目标线，隐藏零值数值标签，表示所有数据已上报且实际值均为零。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示组件内置的加载插图与提示，模拟数据请求中的状态。',
  },
  {
    key: 'missing',
    label: '数据缺失',
    description:
      '第 2、4 项实际值缺失，显示缺报底条，隐藏数值标签。悬停可查看缺报原因与已上报的目标值。',
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
  { name: '服务器终端（200.200.1.1）', value: 112, target: 122 },
  { name: '服务器终端（200.200.1.2）', value: 75, target: 88 },
  { name: '服务器终端（200.200.1.13）', value: 66, target: 130 },
  { name: 'PC终端（196.168.10.1）', value: 48, target: 103 },
  { name: 'PC终端（196.168.10.15）', value: 38, target: 88 },
]
const data = computed(() =>
  Array.from({ length: state.value === 'limit' ? 50 : source.length }, (_, index) => {
    const sourceRow = source[index % source.length]!
    const row = {
      ...sourceRow,
      name: index < source.length ? sourceRow.name : `服务器终端（200.200.2.${index + 1}）`,
    }
    if (state.value === 'missing' && index === 1)
      return { ...row, value: null, missingReason: '采集失败，暂无数据' }
    if (state.value === 'missing' && index === 3)
      return { ...row, value: null, missingReason: '实际值暂未上报' }
    return {
      ...row,
      value: state.value === 'zero' ? 0 : row.value,
    }
  }),
)
const options = computed<BulletChartProps>(() => ({
  layout: 'horizontal-above',
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
const ranges: BulletRange[] = [
  { upper: 50, label: '待提升' },
  { upper: 100, label: '良好' },
  { upper: 150, label: '优秀' },
]
</script>
<template>
  <IxSpace vertical block>
    <IxSpace wrap align="center">
      <IxRadioGroup v-model:value="state" buttoned size="sm" aria-label="上方标签的分组数据状态">
        <IxRadio v-for="scenario in scenarios" :key="scenario.key" :value="scenario.key">
          {{ scenario.label }}
        </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <p class="bullet-demo-description">{{ description }}</p>
    <IxBulletChart
      :data="data"
      :x-axis="{ max: 150 }"
      v-bind="options"
      :ranges="ranges"
      :loading="state === 'loading' && { text: '加载中...' }"
      style="height: 340px; width: 100%"
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
  "title": "分组子弹图——上方标签",
  "description": "参考柱状图的上方标签布局，适用于较长的分类名称。名称位于轨道上方，数值位于实际值条右侧，并保留目标线、阈值虚线与底部色轴。支持极限数据、零值、加载、缺失与空状态。",
  "index": 4
}
</archive-meta>
