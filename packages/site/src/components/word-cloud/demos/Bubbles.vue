<script setup lang="ts">
import { computed, ref } from 'vue'
import { Empty, addIconDefinitions } from '@idux/components/icon'
import type { WordCloudChartProps } from '@idux/charts'
import { getLinearColors, LinearDirection } from '@idux/charts'

addIconDefinitions([Empty])

const scenarios = [
  { key: 'normal', label: '正常', description: '以气泡面积映射登录次数，悬浮查看具体数值。' },
  {
    key: 'limit',
    label: '极限场景',
    description: '50 个地点，包含悬殊数值和长名称；观察气泡避让与空间不足时的隐藏。',
  },
  {
    key: 'zero',
    label: '全部数据为 0',
    description: '所有地点的登录次数均为 0，保留气泡并统一使用最小直径。',
  },
  { key: 'loading', label: '加载中', description: '由组件展示词云加载插图和文案，保留已有数据。' },
  { key: 'empty', label: '空状态', description: '数据为空时展示处理提示，与全部数据为 0 区分。' },
]
const selected = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === selected.value)?.description,
)

const options: WordCloudChartProps = {
  shape: 'circle',
  name: '登录次数',
  sizeRange: [60, 126],
  label: { formatter: '{b}\n{c}', lineHeight: 22 },
  color: getLinearColors(LinearDirection.vertical)[1],
}

const source = [
  ['广东 深圳', 234],
  ['广东 广州', 136],
  ['湖南 长沙', 112],
  ['上海', 56],
  ['北京', 90],
  ['四川 成都', 76],
  ['浙江 杭州', 65],
  ['福建 厦门', 42],
  ['内网', 168],
  ['未识别', 30],
].map(([name, value]) => ({ name: String(name), value: Number(value) }))

const data = computed(() => {
  if (selected.value === 'empty') return []
  if (selected.value === 'limit') {
    return Array.from({ length: 50 }, (_, index) => {
      const row = source[index % source.length]!
      return {
        ...row,
        id: `limit-${index}`,
        name:
          index % 10 === 0 ? `广东省深圳市南山区办公终端 ${index + 1}` : `${row.name} ${index + 1}`,
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
      name="WordCloudBubbles"
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
      style="height: 380px"
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
  "title": "气泡云",
  "description": "适用于登录来源、热点区域等数据概览，通过气泡大小突出数量较多的地点。本例展示各地登录次数，帮助快速识别主要访问来源。",
  "index": 2
}
</archive-meta>
