<script setup lang="ts">
import { computed } from 'vue'

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
const referenceSize = { width: 480, height: 180 }
// 2. 可调整的样式配置
// 主图半径、背景半径、零值圆孔半径使用同一缩放比；左边距和饼图到图例的距离保持固定像素。
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
const titleConfig = { labelFontSize: 12, valueFontSize: 16, legendGap: 8 }
const titleValueFontFamily = 'D-DIN-PRO' // 仅标题总数使用数字字体，图例沿用默认字体。
const seriesName = '基础饼图'
const missingValueLabel = '数据缺失 ⓘ'
// 渲染、测量和截断统一使用 IDux 默认字体；主题字体变化时同步重新计算布局。
const legendLabelFont = computed(
  () => `${legendConfig.labelFontSize}px ${themeTokens.value.fontFamily}`,
)
const legendValueFont = computed(
  () => `${legendConfig.valueFontSize}px ${themeTokens.value.fontFamily}`,
)
const componentPadding = 5 // 显式指定 ECharts 标题、图例的四边内边距，参与位置计算。
const legendIconTextGap = 5 // ECharts 原生 legend 的色块到文字间距。

// 3. 示例数据与主题配色
// 渐变从左上浅色过渡到右下主色，图例色块取同一渐变的主色。
const gradientColors = getBarLinearColors({ type: 'linear', x: 1, y: 1, x2: 0, y2: 0 })
const values = [145, 124, 118, 92, 54, 21]
// 名称需唯一，ECharts 用它关联扇区与图例；新增分类时循环使用主题色。
// 缺失值使用 null，与有效的 0 区分；原因供图例 tooltip 展示。
const data = computed(() =>
  values.map((value, index) => {
    const color = gradientColors[index % gradientColors.length]!
    const missing = chartStatus.value === 'missing' && index === 3
    return {
      value: missing ? null : chartStatus.value === 'allZero' ? 0 : value,
      name: `图例${index + 1}`,
      missingReason: missing ? '数据缺失，xxxxxxxx缺失原因，请进行xxx解决方案' : '',
      color,
      markerColor: color.colorStops[0]!.color,
    }
  }),
)
const total = computed(() => data.value.reduce((sum, item) => sum + (item.value ?? 0), 0))
const isAllZero = computed(
  () => data.value.length > 0 && data.value.every(item => item.value === 0),
)

// 4. 布局计算：坐标原点为图表容器左上角，尺寸单位均为 CSS px，不含上方状态切换区。
// 计算顺序：缩放 → 饼图与图例的横向锚点 → 图例内容宽度 → 标题和图例整体纵向居中。
const chartLayout = computed(() => {
  // 4.1 缩放：宽、高独立求比例，三个圆半径统一使用较小比例。
  const { width, height } = chartSize.value
  const scaleX = width / referenceSize.width
  const scaleY = height / referenceSize.height
  // 宽高不同比例变化时，半径跟随缩放更小的一侧，避免仅按宽度放大后挤占纵向空间。
  const radiusScale = Math.min(scaleX, scaleY)
  const outerRadius = pieConfig.backgroundRadius * radiusScale

  // 4.2 横向锚点：以最外层背景圆为边界，而不是以主饼图为边界。
  // 圆心 X = 左边距 + 背景半径；Y = 容器高度 / 2，使饼图始终上下居中。
  const centerX = pieConfig.leftPadding + outerRadius
  // 背景右边缘 + legendGap = 图例色块起点。
  // ECharts 的 left 定位外框，可见色块从 left + padding 开始，因此这里减去 padding。
  const summaryLeft = centerX + outerRadius + pieConfig.legendGap - componentPadding

  // 4.3 内容宽度：使用与渲染一致的字体测量，所有列、所有行共用最大值，保证名称和数值对齐。
  // 图例名称、数字和缺失提示使用同一默认字体；空数据时 Math.max 中的 0 避免得到 -Infinity。
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
  // 数值不省略：向上取整避免小数像素不足，并保留配置的最小宽度。
  const valueWidth = Math.max(legendConfig.valueMinWidth, Math.ceil(maxValueWidth))
  const columnGap = legendConfig.columnGap * scaleX
  // 可用总宽度 = 容器右边缘 - 第一列外框 left；扣除「列数 - 1」个列间隙后均分。
  // 这是每列的宽度预算，不是实际宽度：短名称仍按内容收窄，不会强行铺满容器。
  const availableColumnWidth =
    (width - summaryLeft - columnGap * (legendConfig.columns - 1)) / legendConfig.columns
  // 从单列预算扣除色块、色块到文字的间距、数值、左右 padding 和名称到数值的间距。
  // 剩余部分才是名称文字可用宽度；数字变长时优先压缩名称，并由后面的 truncateText 省略。
  const availableLabelWidth =
    availableColumnWidth -
    legendConfig.iconSize -
    legendIconTextGap -
    valueWidth -
    componentPadding * 2 -
    legendConfig.labelValueGap
  // 名称宽度取「实际文字宽度、配置上限、剩余预算」三者最小值，再限制为非负数。
  // truncateText 内部会预留 1px；测量结果向上取整后再补 1px，避免短名称被误省略。
  // 若容器连色块、数值等固定部分都放不下，名称缩到 0 也无法保证不溢出，需要增大容器或减少列数。
  const labelTextWidth = Math.max(
    0,
    Math.min(
      Math.ceil(maxLabelWidth) + 1,
      legendConfig.labelMaxWidth * scaleX,
      availableLabelWidth,
    ),
  )
  // labelTextWidth 只用于截断文字；富文本 labelWidth 额外包含右侧留白，隔开名称和数值。
  const labelWidth = labelTextWidth + legendConfig.labelValueGap

  // 4.4 实际列宽：色块 + 原生文字间距 + 名称（含数值前间隙）+ 数值 + 左右 padding。
  const columnWidth =
    legendConfig.iconSize + legendIconTextGap + labelWidth + valueWidth + componentPadding * 2
  // 相邻列起点相差「实际列宽 + 列间隙」；第 n 列 left = summaryLeft + n × columnStep（n 从 0 开始）。
  // columnGap 是外框之间的距离；两列可见内容之间还包含前一列右 padding 和后一列左 padding。
  const columnStep = columnWidth + columnGap

  // 4.5 纵向布局：数据先从上到下填满一列，再填下一列，因此最大行数为 ceil(数据量 / 列数)。
  // 最后一列不足时保持顶部对齐，整体高度仍按最大行数计算。
  const rowCount = Math.ceil(data.value.length / legendConfig.columns)
  const itemGap = legendConfig.itemGap * scaleY
  // 每行取名称、数值、色块的最大高度；对应值也传给 ECharts lineHeight，确保测算与渲染一致。
  const legendLineHeight = Math.max(
    legendConfig.labelFontSize,
    legendConfig.valueFontSize,
    legendConfig.iconSize,
  )
  const titleLineHeight = Math.max(titleConfig.labelFontSize, titleConfig.valueFontSize)
  const titleHeight = titleLineHeight + componentPadding * 2
  // 标题、图例高度都包含上下 padding；N 行只有 N - 1 个行间隙，空数据时将间隙数量限制为 0。
  // 图例高度 = 行数 × 单行高度 + 行间隙数量 × itemGap + 上下 padding。
  const legendHeight =
    rowCount * legendLineHeight + Math.max(0, rowCount - 1) * itemGap + componentPadding * 2
  // 标题间距指两个外框之间的距离，可见文字之间还包含标题下 padding 和图例上 padding。
  const titleLegendGap = titleConfig.legendGap * scaleY
  // 标题与图例共用一个整体高度；(容器高度 - 整体高度) / 2 就是上下两侧各自的留白。
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
    legendTop: titleTop + titleHeight + titleLegendGap,
    legendLineHeight,
    rowCount,
    itemGap,
    columnStep,
    labelTextWidth,
    labelWidth,
    valueWidth,
  }
})

// 图例和扇区共用同一 tooltip 内容；按完整名称查找原始数据，避免缺失值被系列中的占位 0 替代。
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
  // 原因另起一行并允许换行；所有动态文案均转义，长名称仍在标题中完整展示。
  return missing
    ? `${content}<div style="max-width: 240px; white-space: normal; overflow-wrap: anywhere; margin-top: 8px; font-size: 12px; color: ${themeTokens.value.colorTextInfo};">${format.encodeHTML(item.missingReason)}</div>`
    : content
}

// 5. ECharts 配置：通用选项、提示、标题、图例、背景和主饼图。
const pieOption = computed<PieChartProps>(() => {
  const layout = chartLayout.value

  return {
    // IxPieChart 会把公共 data 深合并到每个系列；置空后由各系列独立提供数据。
    data: [],
    radius: layout.radius,
    center: layout.center,
    label: { show: false },
    // 扇区 tooltip：保留完整名称，使用库内置样式，并转义动态文字。
    tooltip: {
      formatter: params => {
        const item = Array.isArray(params) ? params[0] : params
        if (!item) return ''
        return formatItemTooltip(item.name)
      },
    },
    // 统计标题与第一列图例共用左边界。
    title: {
      left: layout.summaryLeft,
      top: layout.titleTop,
      padding: componentPadding,
      text: `{label|统计总数}  {value|${total.value}}`,
      subtext: '',
      textStyle: {
        lineHeight: layout.titleLineHeight,
        rich: {
          label: { color: seerTheme.title.subtextStyle.color, fontSize: titleConfig.labelFontSize },
          value: {
            color: seerTheme.title.textStyle.color,
            fontSize: titleConfig.valueFontSize,
            fontFamily: titleValueFontFamily,
          },
        },
      },
    },
    // 原生图例按列填充；名称按像素截断，悬停时显示原始名称。
    legend: Array.from({ length: legendConfig.columns }, (_, column) => ({
      orient: 'vertical' as const,
      selectedMode: true,
      // 取消选中时也关闭描边，避免默认 auto 从饼图继承边框。
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
      data: data.value
        .slice(column * layout.rowCount, (column + 1) * layout.rowCount)
        .map(item => ({
          name: item.name,
          itemStyle: { color: item.markerColor, borderWidth: 0 },
        })),
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
    series: [
      // 背景圆与主图共享圆心，仅装饰，不参与提示和点击。
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
      // 全零时不绘制等分扇区，单独显示中心留空的灰色占位圆；图例仍来自主系列的六项数据。
      {
        type: 'pie',
        name: '零值占位',
        radius: [layout.zeroInnerRadius, layout.radius],
        z: 1,
        silent: true,
        animation: false,
        stillShowZeroSum: false,
        tooltip: { show: false },
        emphasis: { disabled: true },
        data: [{ value: isAllZero.value ? 1 : 0, name: '' }],
        itemStyle: { color: themeTokens.value.colorInfoContainerBgDisabled, borderWidth: 0 },
      },
      // 主饼图绘制在背景之上；缺失项保留图例身份，但不产生扇区或数值提示。
      {
        type: 'pie',
        name: seriesName,
        z: 2,
        stillShowZeroSum: false,
        data: data.value.map(item => ({
          name: item.name,
          value: item.value ?? 0,
          itemStyle: { color: item.color },
          tooltip: { show: item.value !== null },
        })),
        // 全零时零角度扇区仍可能绘制描边，关闭描边以保持占位圆完整。
        itemStyle: { borderWidth: isAllZero.value ? 0 : 1.5 },
      },
    ],
  }
})
</script>

<template>
  <IxPieChart
    :style="{ width: `${fixtureProps.width}px`, height: `${fixtureProps.height}px` }"
    v-bind="pieOption"
    :animation="false"
  />
</template>
