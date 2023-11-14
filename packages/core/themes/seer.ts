export const seerColors = [
  '#458FFF',
  '#45D9A3',
  '#FFC145',
  '#F5654F',
  '#6A6AFD',
  '#6ED1FF',
  '#008787',
  '#FF9245',
  '#F587B3',
  '#8352CC',
  '#65779B',
]

export const seerColorsForMore = [
  '#458FFF',
  '#C8DEFF',
  '#45D9A3',
  '#C8F4E4',
  '#FFC145',
  '#FFEDC8',
  '#F5654F',
  '#FCD1CB',
  '#6A6AFD',
  '#D3D3FE',
  '#6ED1FF',
  '#D3D3FE',
  '#008787',
  '#B3DBDB',
  '#FF9245',
  '#FFDFC8',
  '#F587B3',
  '#FCDBE8',
  '#8352CC',
  '#FCDBE8',
  '#65779B',
  '#65779B',
]

export const seerColorsForRisk = [
  '#8C1604',
  '#DB4C35',
  '#FF9245',
  '#FFC145',
  '#689FFF',
  '#45D9A3',
  '#99ACD1',
]

export const seerTheme = {
  color: seerColors,

  textStyle: {
    color: '#6F7785',
    fontSize: '12px',
  },

  bar: {
    barGap: 0.2,
    barWidth: 10,
    label: {
      color: '#6F7785',
      position: 'top',
    },
  },

  line: {
    label: {
      color: '#6F7785',
      position: 'top',
    },
  },

  pie: {
    avoidLabelOverlap: false,
    radius: ['70%', '80%'],
    itemStyle: {
      borderWidth: 1,
      borderColor: '#fff',
    },
    label: {
      show: false,
      color: '#2F3540',
      formatter: '{c}',
      position: 'inside',
    },
  },

  legend: {
    itemWidth: 12,
    itemHeight: 12,
    inactiveColor: '#BEC3CC',
    textStyle: {
      color: '#6F7785',
      fontSize: '12px',
    },
  },

  title: {
    itemGap: 4,
    textStyle: {
      color: '#2F3540',
      fontSize: '12px',
      fontWeight: 500,
    },
    subtextStyle: {
      color: '#6F7785',
      fontSize: '12px',
    },
  },

  tooltip: {
    borderWidth: 0,
    padding: 12,
    textStyle: {
      color: '#2F3540',
    },
    axisPointer: {
      z: 1,
      lineStyle: {
        type: 'solid',
        color: '#E1E5EB',
      },
    },
  },

  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#EDF1F7',
      },
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      lineStyle: {
        color: '#EDF1F7',
      },
    },
    axisLabel: {
      color: '#6F7785',
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },

  valueAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#6F7785',
    },
    splitLine: {
      lineStyle: {
        color: '#EDF1F7',
      },
    },
    splitArea: {
      show: false,
    },
    nameTextStyle: {
      color: '#6F7785',
      padding: [0, 30, -4, 0],
    },
  },

  dataZoom: {
    height: 16,
  },
}
