---
title: API
---

### IxAreaChart

`IxAreaChart` 默认开启面积填充；传入 `categories` 启用分类布局和渐变填充。设置 `area="striped"` 使用条纹填充。用 `smooth` 平滑曲线，用 `series[].stack` 为各堆叠系列指定相同的组名。原生填充样式通过 `areaStyle` 自定义。

使用 ESM 构建时，可从 `@idux/charts/area` 按需导入组件和类型。

```vue
<script setup lang="ts">
import { IxAreaChart, type AreaChartProps } from '@idux/charts'

const option: AreaChartProps = {
  categories: ['周一', '周二', '周三'],
  area: 'striped',
  series: [
    { name: '上行', data: [24, 30, 36], stack: 'traffic' },
    { name: '下行', data: [16, 18, 29], stack: 'traffic' },
  ],
}
</script>

<template>
  <IxAreaChart v-bind="option" style="height: 320px" />
</template>
```

支持默认插槽，公共配置和用法见<a href="./core">IxChart API</a>。

用堆叠面积展示总量及各系列的贡献。希望比较各系列的走势时，可用折线减少填充区域的遮挡。数据、图例、缩略轴和缺报处理与折线图共用，包括末尾追加数据时的缩放窗口行为。

### AreaChartProps

属性与[折线图](./line)一致，`area` 默认为 `true`。`AreaChartProps`、`AreaChartPublicProps` 和 `AreaChartDataItem` 分别复用对应的 Line 类型。
