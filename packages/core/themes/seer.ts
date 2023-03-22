export const seerColors10 = [
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
]

export const seerColors20 = [
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
]

export const seerTheme = {
  color: seerColors10,

  textStyle: {
    color: '#2F3540',
    fontSize: '12px',
  },

  pie: {
    avoidLabelOverlap: false,
    center: ['25%', '50%'],
    itemStyle: {
      borderWidth: 1,
      borderColor: '#fff',
    },
    label: {
      show: false,
      formatter: '{c}',
      position: 'inside',
    },
  },

  legend: {
    textStyle: {
      color: '#2F3540',
      fontSize: '12px',
    },
  },

  title: {
    itemGap: 4,
    textStyle: {
      color: '#2F3540',
      fontSize: '30px',
    },
    subtextStyle: {
      color: '#6F7785',
      fontSize: '12px',
    },
  },

  tooltip: {
    borderWidth: 0,
    padding: 12,
  },
}
