<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LineChartProps } from '@idux/charts'
import { IxEmpty } from '@idux/components/empty'
import { addIconDefinitions, Empty, IxIcon, LineChart } from '@idux/components/icon'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'
import { useThemeToken } from '@idux/components/theme'

addIconDefinitions([Empty, LineChart])
const { themeTokens } = useThemeToken()
const scenarios = [
  {
    key: 'normal',
    label: '正常',
    description: '展示带颜色的折线、坐标轴及分类标签，鼠标悬浮展示具体数值。',
  },
  {
    key: 'zero',
    label: '数据已上报（全部值为0）',
    description:
      '坐标轴保留，折线完全贴合 X 轴（数值为 0），明确告知当前时间段已上报数据但数值均为零。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示灰色折线骨架图，配合“图表正在加载中”的提示，稳定页面布局。',
  },
  {
    key: 'point',
    label: '数据未上报（单点值缺失）',
    description:
      '某个时间点获取失败时，折线在该点处断开（不连续），悬浮提示该点“数据未上报”及原因。',
  },
  {
    key: 'range',
    label: '数据未上报（一段值缺失）',
    description: '连续多个时间点获取失败时，折线在缺失区间留空断开，两端保留端点。',
  },
  {
    key: 'reference',
    label: '带参考线',
    description:
      '支持在图表中增加水平参考线（如安全水位线、平均基线、告警阈值），帮助用户直观判断当前趋势是否长期超标。',
  },
  {
    key: 'empty',
    label: '空状态',
    description:
      '用于图表整体无数据或加载异常时，涵盖无权限、未配置、网络报错等情况，展示对应占位图与操作引导，避免图表区域完全空白。',
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
  { name: '服务器', itemStyle: { color: '#458FFF' }, data: [85, 62, 155, 210, 330, 380, 100, 214] },
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
        if (state === 'zero') return 0
        const offset = index - recentStart
        if (
          (state === 'point' && offset === 3 * samplesPerDay) ||
          (state === 'range' && (offset === 3 || offset === 4))
        ) {
          return { value: null, missingReason: '数据缺失，采集任务未返回结果，请检查采集配置' }
        }
        const value = offset < 0 ? recent[index % (recentCount - 1)]! * 0.7 : recent[offset]!
        return Math.round(value)
      }),
    }
  }),
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
      name="BasicTrend"
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
      <IxIcon
        name="line-chart"
        :size="60"
        :color="themeTokens.colorInfoContainerBgDisabled"
        aria-hidden="true"
      />
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
  "title": "基础折线图",
  "description": "用于展示单一数据系列随时间或连续维度的变化趋势，如展示过去 7 天的告警发生趋势、系统 CPU 使用率波动等。底部可配合缩略图进行时间轴的缩放与刷选。",
  "index": 0
}
</archive-meta>
