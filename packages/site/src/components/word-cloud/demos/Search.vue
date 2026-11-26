<script setup lang="ts">
import { computed, ref } from 'vue'
import { seerColors } from '@idux/charts'
import type { WordCloudChartProps } from '@idux/charts'
const options: WordCloudChartProps = {
  name: '词频',
}

const query = ref('好吃')
const source = [
  '味道',
  '套餐',
  '难吃',
  '差评',
  '包子',
  '外卖',
  '餐具',
  '商家',
  '好吃',
  '时间',
  '晚上',
  '要求',
].map((name, index) => ({ id: name, name, value: 100 - index * 7 }))
const data = computed(() => {
  const keyword = query.value.trim()
  return source.map(row => ({
    ...row,
    ...(keyword && row.name.includes(keyword)
      ? { label: { color: '#fff', opacity: 1, backgroundColor: seerColors[0] } }
      : {}),
  }))
})
</script>
<template>
  <IxSpace vertical block>
    <IxInput
      v-model:value="query"
      placeholder="搜索关键词，例如：味道"
      aria-label="搜索词云关键词"
    />
    <IxWordCloudChart v-bind="options" :data="data" style="height: 320px" />
  </IxSpace>
</template>
<archive-meta lang="json">
{
  "title": "搜索高亮",
  "description": "适用于从评论关键词或热门话题中查找指定内容的场景。输入关键词后突出匹配词条，保留其他词条作为上下文，便于定位目标并了解它在整体词云中的位置。",
  "index": 3
}
</archive-meta>
