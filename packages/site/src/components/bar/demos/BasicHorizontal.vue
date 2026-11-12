<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBarLinearColors, LinearDirection } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'
import { BarChart, Empty, addIconDefinitions } from '@idux/components/icon'
import { useThemeToken } from '@idux/components/theme'

addIconDefinitions([BarChart, Empty])
const { themeTokens } = useThemeToken()

const scenarios = [
  { key: 'normal', label: '正常', description: '展示柱体与分类标签，鼠标悬浮可查看具体数值。' },
  {
    key: 'limit',
    label: '极限场景',
    description:
      '共有 50 个分类，默认显示前 5 个。拖动滑块浏览，调整选区可改变柱体厚度：不超过 3 个为 20px，4–5 个为 10px，超过 5 个为 6px。',
  },
  {
    key: 'zero',
    label: '全部值为 0',
    description: '坐标轴保留，柱条长度为 0，表示所有分类均已上报且数值为零。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示灰色柱状骨架和加载文案，保持图表区域的高度。',
  },
  {
    key: 'missing',
    label: '数据未上报（单点值缺失）',
    description: '首个分类未上报，显示随主题切换的缺报底条。悬浮可查看缺报原因。',
  },
  {
    key: 'reference',
    label: '带参考线',
    description: '在柱体下方绘制异常阈值，点击「异常」图例可切换显示。',
  },
  {
    key: 'empty',
    label: '空状态',
    description: '当数据源未配置、无权限或请求失败时，可展示空状态及对应的处理提示。',
  },
]
const selected = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === selected.value)?.description,
)
const categories = [
  '服务器终端（200.200.1.1）',
  '服务器终端（200.200.1.2）',
  '服务器终端（200.200.1.13）',
  'PC终端（196.168.10.1）',
  'PC终端（196.168.10.15）',
]
const values = [180, 140, 120, 70, 50]

const palette = getBarLinearColors(LinearDirection.reverseHorizontal)
const color = [palette[2]!]

const labels = computed(() =>
  selected.value === 'limit'
    ? [...categories, ...Array.from({ length: 45 }, (_, i) => `服务器终端（200.200.2.${i + 1}）`)]
    : categories,
)

const data = computed(() => {
  const state = selected.value
  return labels.value.map((_, index) => {
    if (state === 'zero') return 0
    if (state === 'missing' && index === 0) {
      return { value: null, missingReason: '数据缺失，采集任务未返回结果，请检查采集配置' }
    }
    return (
      values[index] ??
      Math.round(values[index % values.length]! * (0.75 + ((index * 13) % 25) / 100))
    )
  })
})

const options = computed<BarChartProps>(() => {
  const state = selected.value
  return {
    layout: 'horizontal',
    color,
    name: '次数',
    xAxis: { min: 0, max: 200, interval: 50 },
    dataZoom: state === 'limit' ? { type: 'slider', startValue: 0, endValue: 4 } : undefined,
    zeroText: '暂无数据',
    referenceLine: state === 'reference' ? { name: '异常', value: 130 } : undefined,
  }
})
</script>

<template>
  <div class="bar-demo">
    <IxRadioGroup
      v-model:value="selected"
      class="bar-demo-switcher"
      role="radiogroup"
      aria-label="图表状态"
      name="BasicHorizontal"
      buttoned
      size="sm"
    >
      <IxRadio v-for="scenario in scenarios" :key="scenario.key" :value="scenario.key">
        {{ scenario.label }}
      </IxRadio>
    </IxRadioGroup>
    <p class="bar-demo-description">{{ description }}</p>
    <div
      v-if="selected === 'loading'"
      class="bar-demo-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <IxIcon
        name="bar-chart"
        :size="60"
        :rotate="90"
        :color="themeTokens.colorInfoContainerBgDisabled"
        aria-hidden="true"
      />
      <span>图表正在加载中，请稍后...</span>
    </div>
    <IxEmpty
      v-else-if="selected === 'empty'"
      simple
      class="bar-demo-empty"
      description="未配置数据源，请先配置采集任务"
    />
    <IxBarChart
      v-else
      :categories="labels"
      :data="data"
      v-bind="options"
      style="width: 100%; height: 300px"
    />
  </div>
</template>

<style scoped>
.bar-demo {
  width: 100%;
  min-width: 0;
}
.bar-demo-switcher {
  max-width: 100%;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.bar-demo-description {
  margin: 0 0 16px;
  color: var(--ix-color-text-info, #6a707d);
  line-height: 22px;
}
.bar-demo-loading,
.bar-demo-empty {
  width: 100%;
  height: 300px;
  margin: 0;
}
.bar-demo-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--ix-color-text-info, #6a707d);
  font-size: 12px;
}
</style>

<archive-meta lang="json">
{
  "title": "基础柱状图-横向",
  "description": "用于分类名称较长（如完整的资产IP地址、长路径或长资产名）的场景。横向排布能提供充足的标签展示空间，避免文字被截断或折叠。",
  "index": 1
}
</archive-meta>
