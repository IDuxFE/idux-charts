<script setup lang="ts">
import {
  IxBarChart,
  IxLineChart,
  IxPieChart,
  IxRadarChart,
  IxGaugeChart,
  IxLiquidFillChart,
  IxMapChart,
  IxBulletChart,
  registerMap,
} from '@idux/charts'

const query = new URLSearchParams(location.search)
const kind = query.get('kind') ?? 'bar'
const dark = query.get('theme') === 'dark'
// Plot layouts consume PlotTheme separately from the native ECharts theme.
const plotTheme = {
  color: '#458FFF',
  palette: ['#458FFF', '#18C894', '#FFC343', '#F5654F'],
  textColor: dark ? '#C2C7D1' : '#454D61',
  secondaryTextColor: dark ? '#A1A7B3' : '#6F7785',
  borderColor: dark ? '#3C424D' : '#D8DDE5',
  splitLineColor: dark ? '#354052' : '#E1E5EB',
  splitAreaColor: dark ? '#171A1F' : '#F6F8FA',
  mapAreaColor: dark ? '#30445B' : '#E7EDF5',
  mapBorderColor: dark ? '#6A7D94' : '#FFFFFF',
}
const categories = ['East', 'West', 'North', 'South']
const data = [32, 68, 45, 81]
const ranges = [{ upper: 40 }, { upper: 70 }, { upper: 100 }]
registerMap('visual-regions', {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'East' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [10, 0],
            [10, 10],
            [0, 10],
            [0, 0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'West' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [10, 0],
            [20, 0],
            [20, 10],
            [10, 10],
            [10, 0],
          ],
        ],
      },
    },
  ],
})
const fixtures = {
  bar: { component: IxBarChart, props: { categories, series: [{ name: 'Current', data }] } },
  line: { component: IxLineChart, props: { categories, series: [{ name: 'Current', data }] } },
  area: {
    component: IxLineChart,
    props: { categories, area: 'striped' as const, series: [{ name: 'Current', data }] },
  },
  pie: {
    component: IxPieChart,
    props: {
      layoutMode: 'auto' as const,
      data: categories.map((name, index) => ({ name, value: data[index] })),
    },
  },
  radar: {
    component: IxRadarChart,
    props: {
      indicator: categories.map(name => ({ name, max: 100 })),
      data: [{ name: 'Current', value: data }],
      area: true,
    },
  },
  gauge: {
    component: IxGaugeChart,
    props: {
      value: 68,
      label: 'Score',
      segments: [
        { upper: 0.4, color: '#F5654F' },
        { upper: 0.7, color: '#FFC343' },
        { upper: 1, color: '#18C894' },
      ],
    },
  },
  'liquid-fill': {
    component: IxLiquidFillChart,
    props: { value: 68, label: 'Usage', waveAnimation: false },
  },
  map: {
    component: IxMapChart,
    props: {
      geo: { map: 'visual-regions' },
      series: [
        {
          type: 'map' as const,
          map: 'visual-regions',
          data: [
            { name: 'East', value: 32 },
            { name: 'West', value: 68 },
          ],
        },
      ],
      visualMap: { min: 0, max: 100, calculable: false },
    },
  },
  'bullet-single': {
    component: IxBulletChart,
    props: { value: 68, target: 85, ranges, xAxis: { max: 100 } },
  },
  'bullet-grouped': {
    component: IxBulletChart,
    props: {
      data: categories.map((name, index) => ({
        name,
        value: index === 1 ? null : data[index],
        target: 85,
      })),
      ranges,
      xAxis: { max: 100 },
    },
  },
  'bullet-above': {
    component: IxBulletChart,
    props: {
      layout: 'horizontal-above' as const,
      data: categories.map((name, index) => ({ name, value: data[index], target: 85 })),
      ranges,
      xAxis: { max: 100 },
    },
  },
}
const fixture = fixtures[kind as keyof typeof fixtures]
if (!fixture) throw new Error(`Unknown visual fixture: ${kind}`)
</script>

<template>
  <component
    :is="fixture.component"
    v-bind="fixture.props"
    :theme="dark ? 'dark' : 'seer'"
    :dark-mode="dark"
    :plot-theme="plotTheme"
    :animation="false"
    :init-option="{ renderer: 'svg' }"
    :style="{ width: '640px', height: '360px', background: dark ? '#0b0d10' : '#ffffff' }"
  />
</template>
