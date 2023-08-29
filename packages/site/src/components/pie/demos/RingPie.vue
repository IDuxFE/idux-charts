<script setup lang="ts">
import { type PieChartProps } from '@idux/charts'
import { graphic } from 'echarts/core'
import { PieSeriesOption } from 'echarts/charts'

type DataItem = PieSeriesOption['data']

const getLinearGradient = (start: string, end: string) => {
  return new graphic.LinearGradient(0, 0, 1, 1, [
    {
      offset: 0,
      color: start, // 渐变起始颜色
    },
    {
      offset: 1,
      color: end, // 渐变结束颜色
    },
  ])
}

const getDotData = () => {
  const dataArr: DataItem = []

  for (var i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 25,
        itemStyle: {
          color: 'rgb(126,190,255)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      })
    }
  }

  return dataArr
}

const data = [
  {
    value: 45,
    name: '高危',
    itemStyle: {
      color: getLinearGradient('rgba(104, 159, 255, 1)', 'rgba(104, 159, 255, 0.2)'),
    },
  },
  {
    value: 124,
    name: '中危',
    itemStyle: {
      color: getLinearGradient('rgba(255, 146, 69, 1)', 'rgba(255, 146, 69, 0.2)'),
    },
  },
  {
    value: 118,
    name: '低危',
    itemStyle: {
      color: getLinearGradient('rgba(219, 76, 53, 1)', 'rgba(219, 76, 53, 0.2)'),
    },
  },
]

const pieOption: PieChartProps = {
  legend: {
    data,
  },

  title: {
    // 总数
    text: String((data || []).reduce((acc, cur) => acc + cur.value, 0)),
    // 标题
    textStyle: {
      fontSize: 24,
      fontWeight: 500,
      color: '#2F3540',
      fontFamily: 'D-DIN-PRO',
    },
    subtextStyle: {
      fontSize: 12,
      fontWeight: 400,
      color: '#6A6D76',
    },
  },

  // 从外到内，一个pie表示一个图
  series: [
    // 最外层颜色
    {
      type: 'pie',
      zlevel: 1,
      radius: ['80%', '100%'],
      silent: true,
      itemStyle: {
        color: getLinearGradient('rgba(69, 143, 255, 0.08)', 'rgba(69, 143, 255, 0.01)'),
      },
      label: {
        show: false,
      },
      data: [1],
    },

    // 条纹
    {
      type: 'pie',
      radius: ['70%', '80%'],
      zlevel: 2,
      emphasis: {
        scaleSize: 10,
      },
      // 显示的数据
      data: data,
    },

    // 虚线圈
    {
      type: 'pie',
      zlevel: 3,
      silent: true,
      radius: ['64%', '65%'],
      data: getDotData(),
    },

    //最内圈
    {
      type: 'pie',
      zlevel: 4,
      center: ['center', 'center'],
      silent: true,
      radius: '55%',
      tooltip: {
        show: false,
      },
      itemStyle: {
        borderColor: getLinearGradient('rgba(69, 143, 255, 0.16)', 'rgba(69, 143, 255, 0)'),
        borderWidth: 1,
        color: getLinearGradient('rgba(69, 143, 255, 0.1)', 'rgba(69, 143, 255, 0)'),
      },
      data: [1],
    },
  ],
}
</script>

<template>
  <IxPieChart
    style="width: 600px; height: 300px"
    name="风险用户数"
    :data="[]"
    :label="[]"
    v-bind="pieOption"
  />
</template>

<archive-meta lang="json">
{
  "title": "风险用户数",
  "description": "",
  "index": 1
}
</archive-meta>
