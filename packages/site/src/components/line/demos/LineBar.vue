<script setup lang="ts">
/**
 * @file 折线图，带条纹
 */

import { type LineChartProps, useLinearGradient, useTooltipsFormatter } from '@idux/charts'
import { graphic } from 'echarts/core'

type LineItemValue = number | string

interface DataItem {
  name: string
  value: LineItemValue
}

// 初始数据
const oriData = [820, 932, 901, 934, 1290]

// 加上条纹，这里的n是点数，目前没有自适应，先酌情设置
const getChartData = (data: number[] = [], n = 75) => {
  const lineData: DataItem[] = []
  const barData: DataItem[] = []

  for (let i = 0; i < data.length - 1; i++) {
    lineData.push({
      name: `星期${i + 1}`,
      value: data[i],
    })

    barData.push({ name: '', value: data[i] })

    const diff = data[i + 1] - data[i]
    const step = diff / (n + 1)

    for (let j = 1; j < n; j++) {
      barData.push({
        name: '',
        value: Math.round(data[i] + step * j),
      })

      // 填充假数据，不显示
      lineData.push({
        name: '',
        value: '',
      })
    }
  }

  lineData.push({
    name: `星期${data.length}`,
    value: data[data.length - 1],
  })

  barData.push({
    name: '',
    value: data[data.length - 1],
  })

  return {
    barData,
    lineData,
  }
}

// @ts-ignore
const { barData, lineData } = getChartData(oriData)
const xAxisLabelData = lineData.map(item => item.name)
const xAxisData = lineData.map(item => item.value)

const lineOption: LineChartProps = {
  title: { text: '面积图标题' },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: xAxisLabelData,
    axisLabel: {
      interval: (index: number, value: LineItemValue) => {
        // value为空是填充假数据，不显示
        return value !== ''
      },
      // @ts-ignore
      formatter: function (value: LineItemValue, index) {
        // 获取该系列的 data 数组
        const dataItem = lineData[index]

        if (value === '' || !dataItem) {
          // 如果值为 null，则返回空字符串，不显示标签
          return ''
        } else {
          // 否则返回原始值，显示标签
          return dataItem.name || dataItem.value
        }
      },
    },
  },
  yAxis: {
    name: '次',
    type: 'value',
  },
  axisPointer: {
    type: 'none',
  },
  tooltip: {
    trigger: 'axis', // 设置触发方式为坐标轴触发
    formatter: function (params) {
      if (!params?.length) {
        return ''
      }

      const title = params[0].name

      // 假的数据，不显示
      if (!title) {
        return ''
      }

      const list = params.map(param => {
        return {
          name: param.seriesName,
          value: `${param.value} 个`,
          color: param.color,
        }
      })

      return useTooltipsFormatter(title, list)
    },
  },
  series: [
    {
      name: '真实数据',
      data: xAxisData,
      type: 'line',
      areaStyle: {
        color: useLinearGradient(),
      },
      connectNulls: true, // 将相邻的线段连成一条线
      showSymbol: false, // 不显示折线点，鼠标经过再显示
      xAxisIndex: 0,
    },
    {
      name: '',
      data: barData,
      // @ts-ignore
      type: 'bar',
      barWidth: 2,
      label: {
        show: false,
      },
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(69, 143, 255, 0.12)', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(69, 143, 255, 0)', // 100% 处的颜色
          },
        ]),
      },
      tooltip: {
        trigger: false,
      },
    },
  ],
}
</script>
<template>
  <IxLineChart style="height: 300px" v-bind="lineOption" :data="[]" />
</template>

<archive-meta lang="json">
{
  "title": "面积图配置条纹",
  "description": "",
  "index": 1
}
</archive-meta>
