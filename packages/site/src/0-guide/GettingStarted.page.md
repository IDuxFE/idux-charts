---
index: 1
title: 快速上手
type: page
---

# 快速上手

## 安装

```bash
npm install @idux/charts echarts lodash-es
```

支持 Vue `^2.6.0 || ^3.2.5` 和 ECharts `^5.4.3 || ^6.0.0`。Vue 2.6 还需安装 `@vue/composition-api`（≥ 1.6.2），并在创建应用前注册。

```ts
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

在应用入口导入一次 `@idux/charts/dist/style.css`，加载内置 HTML 提示框样式。

## 绘制折线图

以下是 Vue 3 的完整组件。为图表提供非零宽高，`categories` 和 `data` 按索引对应。

```vue
<script setup lang="ts">
import { IxLineChart } from '@idux/charts'

const categories = ['周一', '周二', '周三']
const data = [123, 324, 156]
</script>

<template>
  <IxLineChart :categories="categories" :data="data" style="height: 300px" />
</template>
```

导入图表组件时会注册该组件内置的 ECharts 模块。Vue 3 可在 `<script setup>` 中直接使用，也可调用 `app.component('IxLineChart', IxLineChart)` 全局注册。Vue 2 可用组件的 `components: { IxLineChart }` 局部注册，或调用 `Vue.component('IxLineChart', IxLineChart)` 全局注册。

## 应用主题

| 配置                             | 用途                                                                                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `theme` / `CHART_THEME_TOKEN`    | ECharts 初始化主题。优先级为组件 `theme` → 注入主题 → 内置 `seer`。变更主题会重建实例并再次触发 `onReady`，实例内的缩放和图例状态可能重置。                                          |
| `plotTheme` / `PLOT_THEME_TOKEN` | 分类柱状图、分类折线图和面积图、饼图自动布局、雷达图、仪表盘及水波图的视觉默认值。各图表按需使用字段。局部字段覆盖注入值，`undefined` 继承，色板数组整体替换。更新该配置会保留实例。 |

在图表的父组件 `setup` 中提供响应式主题。Vue 2.6 从 `@vue/composition-api` 导入组合式 API。

```ts
import { computed, provide, ref } from 'vue'
import { CHART_THEME_TOKEN, PLOT_THEME_TOKEN, type PlotTheme } from '@idux/charts'

const dark = ref(false)
provide(
  CHART_THEME_TOKEN,
  computed(() => (dark.value ? 'dark' : 'seer')),
)
provide(
  PLOT_THEME_TOKEN,
  computed<PlotTheme>(() =>
    dark.value
      ? {
          textColor: '#F4F8FF',
          secondaryTextColor: '#88909F',
          borderColor: '#3C424D',
          splitLineColor: '#22262E',
          splitAreaColor: '#171A1F',
        }
      : {},
  ),
)
```

组件可用 `:plot-theme="{ textColor: '#eeeeee' }"` 覆盖所用字段。独立调用 `createRadarOption`、`createGaugeOption` 或 `createLiquidFillOption` 时，请直接传入 `plotTheme`。

| `PlotTheme` 字段                       | 用途                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| `color`、`palette`                     | 强调色和分类色板。仪表盘和水波图使用 `color`。       |
| `textColor`、`secondaryTextColor`      | 主文字和辅助文字颜色。                               |
| `fontFamily`、`numberFontFamily`       | 普通文字和数字的字体后备，字体文件由应用加载。       |
| `mutedColor`、`borderColor`            | 中性色和边框色，用于占位、轨道或轴线等元素。         |
| `splitLineColor`、`splitAreaColor`     | 分隔线和背景颜色。                                   |
| `errorColor`、`missingBackgroundColor` | 异常色，以及分类柱状图、折线图和面积图的缺报底纹色。 |

## TypeScript 配置类型

从 `@idux/charts` 导入 `BarChartProps`、`LineChartProps` 等类型来声明配置对象。编写二次封装时，可用对应的 `*ChartPublicProps` 提取具名属性类型。
