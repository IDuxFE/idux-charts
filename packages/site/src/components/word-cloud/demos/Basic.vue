<script setup lang="ts">
import { computed, ref } from 'vue'
import { Empty, addIconDefinitions } from '@idux/components/icon'
import type { WordCloudChartProps } from '@idux/charts'

addIconDefinitions([Empty])

const scenarios = [
  {
    key: 'normal',
    label: '正常',
    description: '展示词频对应的字号和透明度，悬浮词条查看具体数值。',
  },
  {
    key: 'limit',
    label: '极限场景',
    description: '80 个词条，包含长文本和悬殊词频；空间不足时隐藏无法放下的词条。',
  },
  {
    key: 'zero',
    label: '全部数据为 0',
    description: '所有词条均已上报且词频为 0，保留词条并使用最小字号。',
  },
  { key: 'loading', label: '加载中', description: '由组件展示词云加载插图和文案，保留已有数据。' },
  { key: 'empty', label: '空状态', description: '数据为空时展示处理提示，与全部数据为 0 区分。' },
]
const selected = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === selected.value)?.description,
)

const options: WordCloudChartProps = { name: '词频', sizeRange: [14, 60] }

const source = [
  ['味道', 100],
  ['招牌套餐', 78],
  ['口感', 72],
  ['回头客', 60],
  ['小笼包', 57],
  ['外卖配送', 51],
  ['性价比', 48],
  ['餐具', 44],
  ['新鲜食材', 42],
  ['商家服务', 40],
  ['分量足', 32],
  ['午餐', 29],
  ['香辣味', 28],
  ['干净卫生', 25],
  ['等待时间', 20],
  ['晚餐', 18],
  ['包装', 16],
  ['热乎乎', 15],
  ['优惠活动', 12],
  ['推荐', 10],
].map(([name, value]) => ({ name: String(name), value: Number(value) }))

const data = computed(() => {
  if (selected.value === 'empty') return []
  if (selected.value === 'limit') {
    return Array.from({ length: 80 }, (_, index) => {
      const row = source[index % source.length]!
      return {
        ...row,
        id: `limit-${index}`,
        name:
          index % 10 === 0
            ? `用户反馈中的超长关键词与完整服务体验描述 ${index + 1}`
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
      name="WordCloudBasic"
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
  "title": "文字词云",
  "description": "适用于用户评论、问卷反馈和热门搜索词的概览，通过词条大小突出高频内容，帮助快速发现用户关注的话题。本例展示餐饮评价中的常见关键词。",
  "index": 0
}
</archive-meta>
