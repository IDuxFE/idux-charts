<script setup lang="ts">
import { computed, ref } from 'vue'
import { Empty, addIconDefinitions } from '@idux/components/icon'
import type { WordCloudChartProps } from '@idux/charts'
import { seerColorsForRisk } from '@idux/charts'
addIconDefinitions([Empty])

const scenarios = [
  { key: 'normal', label: '正常', description: '按威胁分类展示标签，点击图例筛选，点击标签选中。' },
  {
    key: 'limit',
    label: '极限场景',
    description: '60 个分类标签，包含长名称；观察固定字号下的排布、避让和空间不足时的隐藏。',
  },
  {
    key: 'zero',
    label: '全部数据为 0',
    description: '所有标签的次数均为 0，保留分类和标签，并明确显示零值。',
  },
  { key: 'loading', label: '加载中', description: '由组件展示词云加载插图和文案，保留已有数据。' },
  { key: 'empty', label: '空状态', description: '数据为空时展示处理提示，与全部数据为 0 区分。' },
]
const selected = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === selected.value)?.description,
)

const options: WordCloudChartProps = {
  shape: 'rect',
  name: '次数',
  sizeRange: [28, 28],
  bottom: 56,
  categories: [
    {
      name: '受到威胁',
      itemStyle: { color: seerColorsForRisk[1] },
    },
    {
      name: '未受威胁',
      itemStyle: { color: seerColorsForRisk[5] },
    },
  ],
  legend: {
    bottom: 0,
  },
  label: {
    formatter: params =>
      `${params.name}${params.value || selected.value === 'zero' ? ` ${params.value}` : ''}`,
    padding: [5, 10],
  },
  selectedMode: 'single',
}

const source = [
  { name: 'WEBSHELL后门', value: 21, category: '受到威胁' },
  { name: '黑链', value: 132, category: '受到威胁' },
  { name: 'HTTP协议栈远程服务', value: 32, category: '受到威胁' },
  ...[
    'Apache Spark命令注入',
    'Apache APISIX远程注入',
    'Fortinet管理员接口',
    'Bisonal',
    'Leafminer',
    'Apache Commons',
    'Oracle Access Manager',
  ].map(name => ({ name, value: 0, category: '未受威胁' })),
]

const data = computed(() => {
  if (selected.value === 'empty') return []
  if (selected.value === 'limit') {
    return Array.from({ length: 60 }, (_, index) => {
      const row = source[index % source.length]!
      return {
        ...row,
        id: `limit-${index}`,
        name:
          index % 10 === 0
            ? `Apache HTTP Server 远程服务漏洞检测 ${index + 1}`
            : `${row.name} ${index + 1}`,
        value: index === 0 ? 10000 : Math.max(1, 100 - index * 2),
      }
    })
  }
  return source.map(row => ({ ...row, value: selected.value === 'zero' ? 0 : row.value }))
})
</script>
<template>
  <IxSpace vertical block align="stretch" :size="16">
    <IxRadioGroup
      v-model:value="selected"
      wrap
      aria-label="图表状态"
      name="WordCloudTags"
      buttoned
      size="sm"
    >
      <IxRadio v-for="scenario in scenarios" :key="scenario.key" :value="scenario.key">
        {{ scenario.label }}
      </IxRadio>
    </IxRadioGroup>
    <p class="word-cloud-demo-description">{{ description }}</p>
    <IxWordCloudChart
      v-bind="options"
      :data="data"
      :loading="selected === 'loading' && { text: '图表正在加载中，请稍后...' }"
      style="height: 360px"
    >
      <IxEmpty
        v-if="selected === 'empty'"
        class="chart-empty"
        simple
        description="暂无词云数据，请调整筛选条件或检查数据源"
      />
    </IxWordCloudChart>
  </IxSpace>
</template>

<style scoped>
.word-cloud-demo-description {
  margin: 0;
  color: var(--ix-color-text-info, #6a707d);
  line-height: 22px;
}
.chart-empty {
  margin: 0;
  background: var(--ix-color-container-bg);
}
</style>

<archive-meta lang="json">
{
  "title": "分类矩形标签",
  "description": "适用于安全运营中的威胁标签、事件类型等分类概览，便于同时识别类别和发生次数。本例区分受到威胁与未受威胁的条目，可按分类筛选或选中需要关注的标签。",
  "index": 1
}
</archive-meta>
