<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import {
  type PieChartProps,
  IxPieChart,
  getAlphaColor,
  getBarLinearColors,
  seerColors,
  seerTheme,
  useTooltipsFormatter,
} from '@idux/charts'
import { format } from 'echarts/core'

// 1. 展示状态与容器尺寸
type ChartStatus = 'normal' | 'allZero' | 'missing' | 'empty' | 'loading'
const fixtureProps = defineProps<{ status: ChartStatus; width: number; height: number }>()
const chartStatus = computed(() => fixtureProps.status)
const themeTokens = computed(() => ({
  fontFamily:
    'pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif',
  colorErrorText: '#cf171d',
  colorTextInfo: '#6f7785',
  colorInfoContainerBgDisabled: '#e1e5eb',
}))

const chartSize = computed(() => ({ width: fixtureProps.width, height: fixtureProps.height }))
// Frozen CLI drawing: only framework/theme imports and harness state are adapted.
const referenceSize = { width: 720, height: 240 }
const chartStyle = computed(() => ({
  width: `${chartSize.value.width}px`,
  height: `${chartSize.value.height}px`,
}))

// 2. 可调整的样式配置：半径统一缩放，左边距和图例间隔保持固定像素。
const pieConfig = {
  radius: 60,
  backgroundRadius: 72,
  zeroInnerRadius: 16,
  leftPadding: 0,
  legendGap: 28,
}
const legendConfig = {
  columns: 2,
  columnGap: 24, // 两列 legend 外框（含 padding）之间的空隙。
  labelMaxWidth: 120, // 名称按内容收窄，最多使用 120px；超过上限或剩余空间时省略。
  labelValueGap: 12, // 名称与数值区域之间保留固定间隙。
  labelFontSize: 12,
  valueMinWidth: 32, // 常见短数字仅预留 32px，将更多空间留给名称；长数字或缺失提示按内容撑宽。
  valueFontSize: 12,
  iconSize: 12,
  itemGap: 16,
}
const titleConfig = { labelFontSize: 12, valueFontSize: 24, legendGap: 8 }
const titleValueFontFamily = 'D-DIN-PRO' // 仅标题总数使用数字字体，图例沿用默认字体。
const seriesName = '分类统计'
const missingValueLabel = '数据缺失 ⓘ'
// 测量、渲染、截断使用同一字体；主题字体变化时自动重算宽度。
const legendLabelFont = computed(
  () => `${legendConfig.labelFontSize}px ${themeTokens.value.fontFamily}`,
)
const legendValueFont = computed(
  () => `${legendConfig.valueFontSize}px ${themeTokens.value.fontFamily}`,
)
const componentPadding = 5 // 显式指定 ECharts 标题、图例的四边内边距，参与位置计算。
const legendIconTextGap = 5 // ECharts 原生 legend 的色块到文字间距。

// 3. 示例数据与主题配色：扇区使用渐变，图例色块取渐变主色。
const gradientColors = getBarLinearColors({ type: 'linear', x: 1, y: 1, x2: 0, y2: 0 })
const categoryCount = ref(12)
// 前 8 项固定在前两列；第三列每页 4 项，页码从 0 开始且不在界面显示。
const legendPage = ref(0)
const pageSize = 4
const lastLegendPage = computed(() =>
  Math.max(0, Math.ceil((categoryCount.value - 8) / pageSize) - 1),
)
// 分类数量或数据状态改变后回到首页，避免保留越界页码。
watch([categoryCount, chartStatus], () => {
  legendPage.value = 0
})
// 1～4 项单列，5～8 项双列，9 项起三列；列数不由 legendConfig.columns 决定。
const columnCount = computed(() =>
  categoryCount.value <= 4 ? 1 : categoryCount.value <= 8 ? 2 : 3,
)
const values = [145, 124, 118, 92, 54, 21, 38, 42, 56, 68, 72, 83, 95, 106, 115]
// 名称必须唯一，ECharts 用名称关联图例与扇区；超过调色板数量后循环取色。
// null 表示缺失，0 表示有效零值；仅有效数据参与总数与比例计算。
const data = computed(() =>
  values.slice(0, categoryCount.value).map((value, index) => {
    const color = gradientColors[index % gradientColors.length]!
    const missing = chartStatus.value === 'missing' && index === 3
    return {
      value: missing ? null : chartStatus.value === 'allZero' ? 0 : value,
      name: `图例${index + 1}`,
      missingReason: missing ? '数据源未响应，请检查连接后重试。' : '',
      color,
      markerColor: color.colorStops[0]!.color,
    }
  }),
)
// 合计始终基于完整有效数据，不随图例隐藏扇区或翻页而变化。
const total = computed(() => data.value.reduce((sum, item) => sum + (item.value ?? 0), 0))
const isAllZero = computed(
  () => data.value.length > 0 && data.value.every(item => item.value === 0),
)

// 4. 布局计算：坐标以图表容器左上角为原点，单位为 CSS px，不含上方按钮与说明。
// 依次计算缩放、圆心与图例起点、文字宽度、列间距和垂直位置。
const chartLayout = computed(() => {
  // 4.1 宽高分别缩放，半径取较小比例，避免圆形超出容器。
  const { width, height } = chartSize.value
  const scaleX = width / referenceSize.width
  const scaleY = height / referenceSize.height
  const radiusScale = Math.min(scaleX, scaleY)
  const outerRadius = pieConfig.backgroundRadius * radiusScale

  // 4.2 用背景圆的预留半径确定圆心，使图形与图例之间保留稳定的间距。
  const centerX = pieConfig.leftPadding + outerRadius
  // 色块起点 = 圆心 + 外半径 + 图例间隔；left 是外框坐标，需扣掉图例左 padding。
  const summaryLeft = centerX + outerRadius + pieConfig.legendGap - componentPadding

  // 4.3 所有行共用最大名称/数值宽度，保证列内对齐；空数组以 0 兜底。
  const maxLabelWidth = Math.max(
    0,
    ...data.value.map(item => format.getTextRect(item.name, legendLabelFont.value).width),
  )
  const maxValueWidth = Math.max(
    0,
    ...data.value.map(
      item =>
        format.getTextRect(
          item.value === null ? missingValueLabel : String(item.value),
          legendValueFont.value,
        ).width,
    ),
  )
  // 数值与缺失提示不截断，向上取整避免小数像素不足，并保留最小宽度。
  const valueWidth = Math.max(legendConfig.valueMinWidth, Math.ceil(maxValueWidth))
  const columnGap = legendConfig.columnGap * scaleX
  // 将剩余容器宽度扣除列间隙后均分，得到单列预算；实际列宽仍按内容收窄。
  const availableColumnWidth =
    (width - summaryLeft - columnGap * (columnCount.value - 1)) / columnCount.value
  // 从列预算中扣除色块、数值、padding 和固定间距，剩余空间留给名称。
  const availableLabelWidth =
    availableColumnWidth -
    legendConfig.iconSize -
    legendIconTextGap -
    valueWidth -
    componentPadding * 2 -
    legendConfig.labelValueGap
  // 名称取实测宽度、配置上限和剩余空间中的最小值，再限制为非负数。
  // truncateText 会预留 1px，因此实测宽度向上取整后补 1px；空间不足时省略名称。
  const labelTextWidth = Math.max(
    0,
    Math.min(
      Math.ceil(maxLabelWidth) + 1,
      legendConfig.labelMaxWidth * scaleX,
      availableLabelWidth,
    ),
  )
  // 富文本名称块包含右侧留白；截断只使用 labelTextWidth，避免吃掉名称和数字间距。
  const labelWidth = labelTextWidth + legendConfig.labelValueGap

  // 4.4 实际列宽 = 色块 + 图标文字间隔 + 名称块 + 数值 + 左右 padding。
  const columnWidth =
    legendConfig.iconSize + legendIconTextGap + labelWidth + valueWidth + componentPadding * 2
  // 第 n 列外框 left = summaryLeft + n × columnStep，n 从 0 开始。
  const columnStep = columnWidth + columnGap

  // 4.5 纵向布局按最多四行计算；翻页不会改变前两列或第三列的顶部位置。
  // 超过 12 项时前两列各放 4 项，最后一列容纳其余项并独立翻页。
  const rowCount = Math.min(4, Math.ceil(data.value.length / columnCount.value))
  const itemGap = legendConfig.itemGap * scaleY
  // 每行高度取字号和色块尺寸的最大值，并传给 ECharts lineHeight，保持测量与显示一致。
  const legendLineHeight = Math.max(
    legendConfig.labelFontSize,
    legendConfig.valueFontSize,
    legendConfig.iconSize,
  )
  // 标题字号决定行高；下方保留外置标题布局参数，但本例的标题直接锚定圆心。
  const titleLineHeight = Math.max(titleConfig.labelFontSize, titleConfig.valueFontSize)
  const titleHeight = titleLineHeight + componentPadding * 2
  // 图例高度含上下 padding；N 行只有 N - 1 个间隙，空数据时不产生负间距。
  const legendHeight =
    rowCount * legendLineHeight + Math.max(0, rowCount - 1) * itemGap + componentPadding * 2
  const titleLegendGap = titleConfig.legendGap * scaleY
  const summaryHeight = titleHeight + titleLegendGap + legendHeight
  const titleTop = (height - summaryHeight) / 2

  return {
    center: [centerX, height / 2] as [number, number],
    radius: pieConfig.radius * radiusScale,
    backgroundRadius: outerRadius,
    zeroInnerRadius: pieConfig.zeroInnerRadius * radiusScale,
    summaryLeft,
    titleTop,
    titleLineHeight,
    legendTop: (height - legendHeight) / 2,
    // 翻页按钮外框覆盖第三列内容宽度，CSS 右对齐；放在第四行下方并保留 4px 间距。
    pagerStyle: {
      left: `${summaryLeft + 2 * columnStep + componentPadding}px`,
      top: `${(height - legendHeight) / 2 + legendHeight + 4}px`,
      width: `${columnWidth - componentPadding * 2}px`,
    },
    legendLineHeight,
    rowCount,
    itemGap,
    columnStep,
    labelTextWidth,
    labelWidth,
    valueWidth,
  }
})

// 图例与扇区共用提示内容；按名称回查原始数据，避免把缺失项在系列中的占位 0 当作真实值。
const formatItemTooltip = (name: string) => {
  const item = data.value.find(item => item.name === name)
  if (!item) return ''

  const missing = item.value === null
  const content = useTooltipsFormatter(format.encodeHTML(item.name), [
    {
      name: seriesName,
      value: missing
        ? `<span style="color: ${themeTokens.value.colorErrorText}">数据缺失</span>`
        : format.encodeHTML(String(item.value)),
      color: item.markerColor,
    },
  ])
  // 动态文案先转义再拼接 HTML；缺失原因另起一行，允许长文本换行。
  return missing
    ? `${content}<div style="max-width: 240px; white-space: normal; overflow-wrap: anywhere; margin-top: 8px; font-size: 12px; color: ${themeTokens.value.colorTextInfo};">${format.encodeHTML(item.missingReason)}</div>`
    : content
}

// 5. ECharts 配置：提示、标题、图例、装饰层与主系列分别控制。
const pieOption = computed<PieChartProps>(() => {
  const layout = chartLayout.value

  return {
    // 列数减少时替换图例集合，避免默认合并保留已移除的旧列。
    setOptionOpts: { replaceMerge: ['legend'] },
    // 公共 data 置空，避免装饰系列与主系列的数据被深合并。
    data: [],
    radius: [layout.radius * 0.88, layout.radius],
    center: layout.center,
    label: { show: false },
    // 扇区提示使用完整名称；背景与占位系列在各自配置中关闭提示。
    tooltip: {
      formatter: params => {
        const item = Array.isArray(params) ? params[0] : params
        if (!item) return ''
        return formatItemTooltip(item.name)
      },
    },
    // 居中标题与图例独立定位：标题锚定圆心，图例仅按自身高度居中。
    title: {
      left: layout.center[0],
      top: layout.center[1] - 25,
      textAlign: 'center',
      // left 已指向圆心，横向 padding 必须为 0，避免标题整体向右偏移。
      padding: [componentPadding, 0],
      text: `{value|${total.value}}`,
      subtext: '资产总数',
      subtextStyle: { fontSize: 12, color: seerTheme.title.subtextStyle.color },
      textStyle: {
        lineHeight: layout.titleLineHeight,
        rich: {
          label: { color: seerTheme.title.subtextStyle.color, fontSize: titleConfig.labelFontSize },
          value: {
            color: seerTheme.title.textStyle.color,
            fontSize: titleConfig.valueFontSize,
            fontFamily: titleValueFontFamily,
            fontWeight: 400,
          },
        },
      },
    },
    // 原生图例按列从上到下填充；只截断显示名称，悬浮仍可查看完整内容。
    legend: Array.from({ length: columnCount.value }, (_, column) => ({
      orient: 'vertical' as const,
      // 原生图例选择同时启用悬浮命中；统计值仍基于全量有效数据。
      selectedMode: true,
      inactiveBorderWidth: 0,
      tooltip: {
        show: true,
        confine: true,
        formatter: (params: { name: string }) => formatItemTooltip(params.name),
      },
      left: layout.summaryLeft + column * layout.columnStep,
      top: layout.legendTop,
      padding: componentPadding,
      right: 'auto',
      bottom: 'auto',
      height: 'auto',
      icon: 'roundRect',
      itemWidth: legendConfig.iconSize,
      itemHeight: legendConfig.iconSize,
      itemGap: layout.itemGap,
      // 前两列固定四项；第三列仅展示当前页，其余分类仍保留在主系列中。
      data: data.value
        .slice(
          column * layout.rowCount + (column === 2 ? legendPage.value * pageSize : 0),
          column === 2 ? 8 + (legendPage.value + 1) * pageSize : (column + 1) * layout.rowCount,
        )
        .map(item => ({ name: item.name, itemStyle: { color: item.markerColor, borderWidth: 0 } })),
      formatter: (name: string) => {
        const item = data.value.find(item => item.name === name)
        const label = format.truncateText(
          name,
          layout.labelTextWidth,
          legendLabelFont.value,
          '...',
          {},
        )
        return item?.value === null
          ? `{label|${label}}{missing|${missingValueLabel}}`
          : `{label|${label}}{value|${item?.value ?? ''}}`
      },
      textStyle: {
        lineHeight: layout.legendLineHeight,
        rich: {
          label: {
            fontSize: legendConfig.labelFontSize,
            fontFamily: themeTokens.value.fontFamily,
            width: layout.labelWidth,
          },
          missing: {
            color: themeTokens.value.colorErrorText,
            fontSize: legendConfig.valueFontSize,
            fontFamily: themeTokens.value.fontFamily,
            width: layout.valueWidth,
          },
          value: {
            color: seerTheme.pie.label.color,
            fontSize: legendConfig.valueFontSize,
            fontFamily: themeTokens.value.fontFamily,
            width: layout.valueWidth,
            align: 'right' as const,
          },
        },
      },
    })),
    // 虚线圈与内圈渐变只作装饰，与主图共享圆心；silent 避免遮挡扇区交互。
    graphic: [
      {
        type: 'circle',
        silent: true,
        z: 1,
        shape: { cx: layout.center[0], cy: layout.center[1], r: layout.radius * 0.78 },
        style: {
          fill: 'transparent',
          stroke: getAlphaColor(seerColors[0]!, 0.35),
          lineWidth: 1,
          lineDash: [2, 2],
        },
      },
      {
        type: 'circle',
        silent: true,
        z: 1,
        shape: { cx: layout.center[0], cy: layout.center[1], r: layout.radius * 0.65 },
        style: {
          fill: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: getAlphaColor(seerColors[0]!, 0.1) },
              { offset: 1, color: getAlphaColor(seerColors[0]!, 0) },
            ],
          },
          stroke: getAlphaColor(seerColors[0]!, 0.16),
          lineWidth: 1,
        },
      },
    ],
    // 系列层级：底层装饰 → 全零占位 → 主图；仅主图参与图例与 tooltip。
    series: [
      {
        type: 'pie',
        radius: layout.backgroundRadius,
        z: 0,
        silent: true,
        animation: false,
        tooltip: { show: false },
        emphasis: { disabled: true },
        labelLine: { show: false },
        data: [{ value: 1, name: '' }],
        itemStyle: {
          borderWidth: 0,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: getAlphaColor(seerColors[0]!, 0.08) },
              { offset: 1, color: getAlphaColor(seerColors[0]!, 0) },
            ],
          },
        },
      },
      {
        type: 'pie',
        // 全零时关闭主系列等分扇区，用单独灰色圆环占位，图例仍保留真实的 0。
        name: '零值占位',
        radius: [layout.radius * 0.88, layout.radius],
        z: 1,
        silent: true,
        animation: false,
        stillShowZeroSum: false,
        tooltip: { show: false },
        emphasis: { disabled: true },
        data: [{ value: isAllZero.value ? 1 : 0, name: '' }],
        itemStyle: { color: themeTokens.value.colorInfoContainerBgDisabled, borderWidth: 0 },
      },
      {
        type: 'pie',
        name: seriesName,
        z: 2,
        stillShowZeroSum: false,
        // 缺失项保留名称供图例查询，但使用 0 不绘制扇区，并关闭该项的扇区提示。
        data: data.value.map(item => ({
          name: item.name,
          value: item.value ?? 0,
          itemStyle: { color: item.color },
          tooltip: { show: item.value !== null },
        })),
        // 全零时连描边也关闭，避免零角度扇区在占位环上留下细线。
        itemStyle: { borderWidth: isAllZero.value ? 0 : 1.5 },
      },
    ],
  }
})
</script>
<template><IxPieChart :style="chartStyle" v-bind="pieOption" /></template>
