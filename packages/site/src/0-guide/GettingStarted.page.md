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
