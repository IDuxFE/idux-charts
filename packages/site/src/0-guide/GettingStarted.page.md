---
index: 1
title: 快速上手
type: page
---

# 快速上手

本章节默认你已经掌握 `Vue` + `TypeScript` 的相关知识，帮助你在已有的 `Vue` 项目中安装 `@idux-charts` 用以图表的展示。

## 安装

```bash
npm install echarts @idux/charts
```

如果你使用的 `Vue` 版本低于 `2.7`, 那么请确保 `@vue/composition-api` 已经被安装。

```sh
npm install @vue/composition-api
```

## 使用

### 初始化

参考下面的代码，新建一个 `charts.ts` 文件, 对 `@idux-charts` 进行初始化。

主要是注册组件，在组件注册的同时，会自动将 `ECharts` 的依赖按需加载进来。

```ts
import { type App, type Plugin } from 'vue'
import { IxBarChart, IxChart, IxLineChart, IxPieChart } from '@idux/charts'

const plugins = [IxChart, IxBarChart, IxLineChart, IxPieChart] as unknown as Plugin[]

const install = (app: App) => {
  plugins.forEach(plugin => app.use(plugin))
}

export default { install }
```

在 `main.ts` 中引入 `charts.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import charts from './charts'

const app = createApp(App)

app.use(charts)
```

### 创建一个图表

在初始化完成后，我们就可以简单的创建一个图表了，下面是一个基础的折线图为例。

```vue
<script setup lang="ts">
import { type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
}
</script>
<template>
  <IxLineChart :data="data" v-bind="lineOption" />
</template>
```

### 主题与文字样式

`theme` 是 ECharts 初始化主题，所有图表均支持；修改它会重新创建图表实例。`plotTheme` 是 Pie 自动布局、Radar、Gauge、LiquidFill 的视觉默认值，不创建实例，也不会改变数据。Bar、Line 和基础 IxChart 继续使用 ECharts 的 `theme`、`color`、`textStyle` 及各系列样式，不消费 `plotTheme`。

```ts
import { provide, ref } from 'vue' // Vue 2.6 使用 @vue/composition-api
import { PLOT_THEME_TOKEN, type PlotTheme } from '@idux/charts'

const plotTheme = ref<PlotTheme>({
  color: '#8754cc',
  palette: ['#8754cc', '#20cc94'],
  textColor: '#1f2329',
  secondaryTextColor: '#6f7785',
  fontFamily: 'Arial, sans-serif',
})
provide(PLOT_THEME_TOKEN, plotTheme)
// 替换 ref.value 或修改 reactive 对象字段都会更新后代图表。
```

组件可传 `:plot-theme="{ textColor: '#eeeeee' }"` 局部覆盖。未定义字段继承全局值；数组整段替换；移除局部配置恢复继承。纯 `create*Option` 函数不读取 Vue 注入，需显式传入 `plotTheme`。

| PlotTheme 字段                  | 用途                                                                    |
| ------------------------------- | ----------------------------------------------------------------------- |
| color                           | 强调色：Pie 装饰及未指定 palette 时的数据色、测量图主色、Radar 单色后备 |
| palette                         | Pie、Radar 分类色板；测量图使用 color                                   |
| textColor / secondaryTextColor  | 主文字 / 辅助文字（包括 Radar 轴名称与 Pie 分页按钮）                   |
| mutedColor                      | Pie 全零占位、禁用分页；LiquidFill 零水位                               |
| borderColor                     | Gauge 轨道、Radar 轴线                                                  |
| splitLineColor / splitAreaColor | Radar 分隔线 / 交替背景                                                 |
| errorColor                      | Pie 缺失值文字                                                          |
| fontFamily / numberFontFamily   | 普通字体 / 数字字体后备                                                 |

每个图表保留自己的原有默认颜色与字号；未传配置时不改变外观。普通文字优先级为角色样式（如 `valueTextStyle`）→ `textStyle` → `plotTheme` → 原有默认值。已有 `textColor`、`labelColor`、`valueFontSize`、`valueFontFamily` 等显式属性保持最高优先级。字体资源仍由应用加载。

Gauge、LiquidFill 的 `valueTextStyle` 和 `labelTextStyle` 支持 `{ color, fontFamily, fontSize, fontWeight, lineHeight }`；LiquidFill 还支持 `unitTextStyle`。字号单位为 px，使用数值。单位默认保留小号排版，需要单独改变时使用 `unitTextStyle`。

`plotTheme` 不会读取通过 `registerTheme` 注册的命名主题，也不自动监听页面祖先 CSS class。应用切换明暗主题时应同步更新 `theme` 与上述响应式 `plotTheme`，或仅更新 `plotTheme` 以保留实例。Pie 原有 CSS token 后备仍保留。
