---
title: API
---

### 面积图

使用 <a href="./line">IxLineChart</a>，传入 `categories` 启用分类布局。设置 `area` 使用渐变填充，设置 `area="striped"` 使用条纹填充。用 `smooth` 平滑曲线，用 `series[].stack` 为各堆叠系列指定相同的组名。原生配置通过 `areaStyle` 添加填充。

使用 ESM 构建时，可从 `@idux/charts/line` 按需导入组件和类型。

```vue
<script setup lang="ts">
import { IxLineChart, type LineChartProps } from '@idux/charts'

const option: LineChartProps = {
  categories: ['周一', '周二', '周三'],
  area: 'striped',
  series: [
    { name: '上行', data: [24, 30, 36], stack: 'traffic' },
    { name: '下行', data: [16, 18, 29], stack: 'traffic' },
  ],
}
</script>

<template>
  <IxLineChart v-bind="option" style="height: 320px" />
</template>
```

用堆叠面积展示总量及各系列的贡献。希望比较各系列的走势时，可用折线减少填充区域的遮挡。数据、图例、缩略轴和缺报处理与折线图共用，包括末尾追加数据时的缩放窗口行为。

自定义内容和复用内置 HTML 排版的用法见<a href="./core">基础组件 API 的「自定义 Tooltip」</a>。
