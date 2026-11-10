<script setup lang="ts">
import { computed, ref } from 'vue'
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
      '共有 50 个分类，默认显示前 10 个。拖动滑块浏览，调整选区可改变柱体厚度：不超过 3 个为 20px，4–5 个为 10px，超过 5 个为 6px。',
  },
  {
    key: 'zero',
    label: '全部值为 0',
    description: '坐标轴保留，柱体高度为 0，表示所有分类均已上报且数值为零。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示灰色柱状骨架和加载文案，保持图表区域的高度。',
  },
  {
    key: 'missing',
    label: '数据未上报（单点值缺失）',
    description:
      '首个分类整组缺报，第三个分类部分缺报，两处均显示浅红色底条。悬浮可查看缺报原因与其余数值。',
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
const categories = ['2022', '2023', '2024', '2025', '2026']
const series = [
  { name: '服务器', data: [200, 150, 240, 100, 150] },
  { name: '终端', data: [70, 30, 40, 250, 100] },
]

const chart = computed<BarChartProps>(() => {
  const state = selected.value
  const labels =
    state === 'limit'
      ? [...categories, ...Array.from({ length: 45 }, (_, i) => String(2027 + i))]
      : categories
  const pointValues = (source: number[], seriesIndex: number) =>
    labels.map((_, index) => {
      if (state === 'zero') return 0
      if (state === 'missing' && (index === 0 || (seriesIndex === 0 && index === 2))) {
        return {
          value: null,
          missingReason:
            index === 2
              ? '数据缺失，采集结果未包含此系列，请检查采集配置'
              : seriesIndex === 0
                ? '数据缺失，采集任务未执行，请检查调度配置'
                : '数据缺失，采集请求超时，请检查数据源连接',
        }
      }
      return (
        source[index] ??
        Math.round(source[index % source.length]! * (0.75 + ((index * 13) % 25) / 100))
      )
    })

  return {
    categories: labels,
    series: series.map((item, i) => ({
      ...item,
      data: pointValues(item.data, i),
    })),
    dataZoom:
      state === 'limit' ? { type: 'slider', startValue: 0, endValue: 9 } : { type: 'slider' },
    stack: '合计',
    yAxis: { name: '次', min: 0, max: 400, interval: 100 },
    zeroText: '暂无数据',
    referenceLine: state === 'reference' ? { name: '异常', value: 280 } : undefined,
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
      name="StackedVertical"
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
    <IxBarChart v-else v-bind="chart" style="width: 100%; height: 300px" />
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
  "title": "堆叠柱状图-竖向",
  "description": "用于展示同一时间维度下各子系列的累加总量与内部构成比例的场景。例如展示每日的总告警数（高度代表总量），同时观察其中包含的“严重/高危/中危”各级别告警的堆叠构成。",
  "index": 6
}
</archive-meta>
