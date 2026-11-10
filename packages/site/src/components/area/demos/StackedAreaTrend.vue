<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LineChartProps } from '@idux/charts'
import { IxEmpty } from '@idux/components/empty'
import { addIconDefinitions, Empty } from '@idux/components/icon'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'
import { useThemeToken } from '@idux/components/theme'

addIconDefinitions([Empty])
const { themeTokens } = useThemeToken()
const scenarios = [
  {
    key: 'normal',
    label: '正常',
    description: '悬浮查看数值，也可拖动底部缩略图的选区，查看历史区间里已上报的零值。',
  },
  {
    key: 'zero',
    label: '数据已上报（全部值为0）',
    description: '坐标轴保留，所有分类均已上报且数值为 0。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示灰色骨架和加载文案，保持图表区域的高度。',
  },
  {
    key: 'point',
    label: '数据未上报（单点值缺失）',
    description: '07-03 00:00 仅微信和 QQ 缺报，07-06 00:00 全部系列缺报。',
  },
  {
    key: 'range',
    label: '数据未上报（一段值缺失）',
    description:
      '07-02 12:00 至 07-03 00:00 仅微信和 QQ 缺报，07-05 00:00 至 07-05 12:00 全部系列缺报。',
  },
  {
    key: 'reference',
    label: '带参考线',
    description: '水平虚线表示阈值，点击「异常」图例可切换显示。',
  },
  {
    key: 'empty',
    label: '空状态',
    description: '数据源未配置或不可用时，展示处理提示。',
  },
]
const selected = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === selected.value)?.description,
)

const samplesPerDay = 2
const recentStart = 28 * samplesPerDay
const recentCount = 6 * samplesPerDay + 1
const categories = Array.from({ length: recentStart + recentCount }, (_, index) => {
  const day = Math.floor((index - recentStart) / samplesPerDay)
  const hour = (index % samplesPerDay) * (24 / samplesPerDay)
  return new Date(Date.UTC(2026, 6, 1 + day, hour)).toISOString().slice(5, 16).replace('T', ' ')
})
const samples = [
  {
    name: '迅雷',
    itemStyle: { color: '#458FFF' },
    stack: 'total',
    data: [25, 30, 28, 48, 42, 39, 48, 46, 71, 69, 61, 86, 91, 104, 120],
  },
  {
    name: '爱奇艺',
    itemStyle: { color: '#20CC94' },
    stack: 'total',
    data: [20, 27, 25, 45, 41, 37, 46, 44, 70, 68, 61, 85, 91, 107, 122],
  },
  {
    name: 'DIM',
    itemStyle: { color: '#65779B' },
    stack: 'total',
    data: [19, 23, 23, 69, 38, 83, 38, 36, 58, 58, 51, 72, 72, 84, 101],
  },
  {
    name: '微信',
    itemStyle: { color: '#FFC145' },
    stack: 'total',
    data: [23, 28, 23, 15, 45, 37, 46, 48, 72, 53, 39, 40, 29, 30, 30],
  },
  {
    name: 'QQ',
    itemStyle: { color: '#F5654F' },
    stack: 'total',
    data: [201, 126, 83, 58, 50, 36, 35, 78, 38, 22, 41, 19, 24, 39, 17],
  },
]

const option = computed<LineChartProps>(() => ({
  categories,
  series: samples.map(({ data, ...series }) => {
    const recent = Array.from({ length: recentCount }, (_, index) => {
      const position = (index / (recentCount - 1)) * (data.length - 1)
      const before = Math.floor(position)
      const left = data[before]!
      const right = data[before + 1] ?? left
      const fraction = position - before
      return left + (right - left) * fraction
    })
    return {
      ...series,
      data: categories.map((_, index) => {
        const state = selected.value
        if (state === 'zero' || (index >= 10 * samplesPerDay && index < 13 * samplesPerDay)) {
          return 0
        }
        const offset = index - recentStart
        const partial = series.name === '微信' || series.name === 'QQ'
        const missingPoint = offset === 10 || (partial && offset === 4)
        const missingRange = (offset >= 8 && offset <= 9) || (partial && offset >= 3 && offset <= 4)
        if ((state === 'point' && missingPoint) || (state === 'range' && missingRange)) {
          return { value: null, missingReason: '数据缺失，采集任务未返回结果，请检查采集配置' }
        }
        const value = offset < 0 ? recent[index % (recentCount - 1)]! * 0.7 : recent[offset]!
        return Math.round(value)
      }),
    }
  }),
  area: 'striped',
  xAxis: {
    axisLabel: {
      interval: (_index, label) => label.endsWith('00:00'),
      formatter: (label: string) => label.slice(0, 5),
    },
  },
  yAxis: {
    name: 'Kbps',
    min: 0,
    max: 400,
    interval: 100,
  },
  dataZoom: { type: 'slider', startValue: recentStart, endValue: categories.length - 1 },
  zeroText: '暂无数据',
  referenceLine: selected.value === 'reference' ? { name: '异常', value: 275 } : undefined,
}))
</script>

<template>
  <div class="trend-demo">
    <IxRadioGroup
      v-model:value="selected"
      class="trend-switcher"
      name="StackedAreaTrend"
      role="radiogroup"
      aria-label="图表状态"
      buttoned
      size="sm"
    >
      <IxRadio v-for="scenario in scenarios" :key="scenario.key" :value="scenario.key">{{
        scenario.label
      }}</IxRadio>
    </IxRadioGroup>
    <p class="trend-description">{{ description }}</p>
    <div
      v-if="selected === 'loading'"
      class="trend-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <svg
        viewBox="0 0 80 56"
        width="80"
        height="56"
        aria-hidden="true"
        :fill="themeTokens.colorInfoContainerBgDisabled"
      >
        <path d="M2 18l12 10 10-4 12-1 11-9 12 6 9-3 10-10v40H2z" opacity=".55" />
        <path d="M2 41l12-1 10-4 12-1 11-7 12 3 9-5 10-9v30H2z" />
      </svg>
      <span>图表正在加载中，请稍后...</span>
    </div>
    <IxEmpty
      v-else-if="selected === 'empty'"
      simple
      class="trend-empty"
      description="未配置数据源，请先配置采集任务"
    />
    <IxLineChart v-else v-bind="option" style="width: 100%; height: 320px" />
  </div>
</template>

<style scoped>
.trend-demo {
  width: 100%;
  min-width: 0;
}
.trend-switcher {
  max-width: 100%;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.trend-description {
  margin: 0 0 16px;
  color: var(--ix-color-text-info, #6a707d);
  line-height: 22px;
}
.trend-loading,
.trend-empty {
  width: 100%;
  height: 320px;
  margin: 0;
}
.trend-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  color: var(--ix-color-text-info, #6a707d);
  font-size: 12px;
}
</style>

<archive-meta lang="json">
{
  "title": "堆叠面积图（状态示例）",
  "description": "展示总量变化和各应用的构成，也可查看单点和连续区间缺报。",
  "index": -13
}
</archive-meta>
