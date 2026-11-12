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

导入图表组件时会注册该组件内置的 ECharts 模块。Vue 3 可在 `<script setup>` 中直接使用，或通过 `app.use(IxLineChart)` 全局注册。Vue 2 可用 `components: { IxLineChart }` 局部注册，或通过 `Vue.use(IxLineChart)` 全局注册。`app.component` 和 `Vue.component` 也可以用于全局注册。

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

## 自定义提示框

只改柱状图、折线图或面积图的数值格式时，使用 `tooltip.valueFormatter`。需要自定义标题和数据行时，可在 `tooltip.formatter` 中调用 `useTooltipsFormatter` 复用内置排版。工具参数和完整用法见<a href="../components/core">基础组件 API 的「自定义 Tooltip」</a>。

## TypeScript 配置类型

从 `@idux/charts` 导入 `BarChartProps`、`LineChartProps` 等类型来声明配置对象。编写二次封装时，可用对应的 `*ChartPublicProps` 提取具名属性类型。

## 升级注意事项

常用的组件导入、`v-bind` 和 `onReady` 用法可直接沿用。使用以下自定义配置时，按对应规则检查。

- **数据和分类轴**。对象按字段合并，数组整体替换。传入 `series[].data` 时，每个系列应提供完整数据。分类 Bar 和 Line / Area 的分类标签由 `categories` 决定。原生 Pie 的默认合计按最终生效的系列数据计算，可用 `title: null` 清除标题。
- **Tooltip**。调用 `useTooltipsFormatter` 时传原始文本，由工具统一转义。需要渲染自定义 HTML 时，可直接提供 `tooltip.formatter`。Bar 和 Line 原生布局的默认 Tooltip 向 `tooltip.valueFormatter` 传入数值轴上的测量值。时间轴数据如 `['2026-01-01', 10]` 会传入 `10`。
- **默认配置和更新**。`BAR_CHART_TOKEN` 和 `LINE_CHART_TOKEN` 也会作用于分类布局。内置布局在删除配置时会应用完整配置清理旧图形。即使显式设置 `notMerge: false`，需要清理时仍会替换更新。单独修改 `setOptionOpts` 也会应用到当前配置。
- **背景色和实例**。Gauge 和 LiquidFill 兼容旧的 `backgroundColor`。新代码可分别使用 `trackColor` 和 `containerColor`，整张图的背景使用 `chartBackgroundColor`。组件挂载后可通过模板 ref 调用 `getEChartsInstance()`。切换主题或初始化配置后，使用 `onReady` 回调或模板 ref 获取新实例。
