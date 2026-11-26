import {
  color,
  graphic,
  helper,
  Model,
  PRIORITY,
  registerLayout,
  registerVisual,
} from 'echarts/core'
import { mergePlotOptions } from '../../shared/plotOptions'
import { pick } from 'lodash-es'
import { cloudSize, layoutCloud } from './layout'
import { motionAmplitude, reserveMotion } from './motion'
import type { Box, CloudNode } from './layout'
import type { WordCloudChartDataItem, WordCloudLabel, WordCloudSeries } from './types'

const measurementCaches = new WeakMap<
  object,
  { revision: number; boxes: Map<string, Box | undefined>; invalidSizes?: string }
>()
let fontRevision = 0
export function invalidateWordCloudFonts() {
  fontRevision++
}
const geometryKeys = [
  'show',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'width',
  'height',
  'padding',
  'borderWidth',
  'align',
  'verticalAlign',
  'position',
  'distance',
  'offset',
  'rotate',
  'overflow',
  'lineOverflow',
  'ellipsis',
] as const

function union(boxes: Box[]): Box {
  const left = Math.min(...boxes.map(box => box.x)),
    top = Math.min(...boxes.map(box => box.y))
  return {
    x: left,
    y: top,
    width: Math.max(...boxes.map(box => box.x + box.width)) - left,
    height: Math.max(...boxes.map(box => box.y + box.height)) - top,
  }
}

/** Measure using the same native text parser and host positioning as GraphView. */
function measureLabel(
  label: WordCloudLabel,
  text: string,
  width: number,
  height: number,
  context: Model,
): Box | undefined {
  if (label.show === false || !text) return
  const host = new graphic.Rect({ shape: { x: -width / 2, y: -height / 2, width, height } })
  // Without a background zrender's bounding box excludes padding; a transparent
  // measurement background includes the full native label box without painting it.
  const content = new graphic.Text({
    style: {
      ...helper.createTextStyle(new Model(label, undefined, context.ecModel)),
      backgroundColor: label.backgroundColor ?? 'transparent',
      text,
    },
  })
  host.setTextContent(content)
  host.setTextConfig({
    position: label.position ?? 'inside',
    distance: label.distance ?? 5,
    offset: label.offset,
    rotation: ((label.rotate ?? 0) * Math.PI) / 180,
  })
  host.updateInnerText()
  const box = content.getBoundingRect().clone()
  box.applyTransform(content.getComputedTransform())
  const border = (label.borderWidth ?? 0) / 2
  return {
    x: box.x - border,
    y: box.y - border,
    width: box.width + border * 2,
    height: box.height + border * 2,
  }
}

export function installWordCloudLayout() {
  // Graph category visuals replace absent category symbol sizes with undefined.
  // Keep the already evaluated native series callback result before that stage.
  registerVisual(PRIORITY.VISUAL.CHART - 1, {
    seriesType: 'graph',
    reset(seriesModel) {
      if (!(seriesModel.option as WordCloudSeries).__ixWordCloud) return
      const data = seriesModel.getData()
      const sizes: (number | number[] | undefined)[] = []
      data.each(index => {
        sizes[data.getRawIndex(index)] = data.getItemVisual(index, 'symbolSize')
      })
      data.setLayout('ixWordCloudSizes', sizes)
    },
  })
  registerLayout(PRIORITY.VISUAL.POST_CHART_LAYOUT + 10, {
    seriesType: 'graph',
    reset(seriesModel, _ecModel, api) {
      const option = seriesModel.option as WordCloudSeries
      const settings = option.__ixWordCloud
      if (!settings) return
      const data = seriesModel.getData()
      const frame = helper.getLayoutRect(option, { width: api.getWidth(), height: api.getHeight() })
      let cache = measurementCaches.get(seriesModel)
      if (!cache || cache.revision !== fontRevision) {
        cache = { revision: fontRevision, boxes: new Map() }
        measurementCaches.set(seriesModel, cache)
      }
      const measure = (label: WordCloudLabel, text: string, width: number, height: number) => {
        const rich = Object.fromEntries(
          Object.entries(label.rich ?? {}).map(([name, style]) => [
            name,
            pick(style, [...geometryKeys, 'backgroundColor']),
          ]),
        )
        const key = JSON.stringify([text, width, height, pick(label, geometryKeys), rich])
        if (cache.boxes.has(key)) return cache.boxes.get(key)
        if (cache.boxes.size >= 2048) cache.boxes.clear()
        const box = measureLabel(label, text, width, height, seriesModel)
        cache.boxes.set(key, box)
        return box
      }
      const nodes: CloudNode[] = []
      const invalidSizes: number[] = []
      data.each(index => {
        data.setItemLayout(index, [NaN, NaN])
        const rawIndex = data.getRawIndex(index)
        const row = settings.rows[rawIndex]
        if (!row?.valid || frame.width <= 0 || frame.height <= 0) return
        const itemModel = data.getItemModel(index) as Model<WordCloudChartDataItem>
        const itemOption = itemModel.option
        const value = Number(seriesModel.getRawValue(index))
        const size = cloudSize(
          value,
          settings.min,
          settings.max,
          settings.sizeRange,
          settings.shape === 'circle',
        )
        const visualSize = (data.getItemVisual(index, 'symbolSize') ??
          data.getLayout('ixWordCloudSizes')?.[rawIndex]) as number | number[]
        let width = row.explicitSize
          ? Number(Array.isArray(visualSize) ? visualSize[0] : visualSize)
          : settings.shape === 'circle'
            ? size
            : 0
        let height = row.explicitSize
          ? Number(Array.isArray(visualSize) ? visualSize[1] : visualSize)
          : settings.shape === 'circle'
            ? size
            : 0
        if (
          row.explicitSize &&
          (!(width > 0 && height > 0) ||
            !Number.isFinite(width + height) ||
            (settings.shape === 'circle' && width !== height))
        ) {
          invalidSizes.push(rawIndex)
          return
        }
        const label = mergePlotOptions<WordCloudLabel>(row.label)
        if (settings.shape === 'text') {
          const fill =
            label.color === 'inherit' || label.color == null
              ? data.getItemVisual(index, 'style').fill
              : label.color
          // Labels do not receive the native path color lift. Resolve it after palette visuals.
          itemOption.emphasis = {
            ...itemOption.emphasis,
            label: mergePlotOptions<WordCloudLabel>(
              { color: typeof fill === 'string' ? color.lift(fill, -0.1) : undefined, opacity: 1 },
              row.emphasisLabel,
            ),
          }
        }
        if (label.width == null) {
          label.width =
            settings.shape === 'circle' ? width * 0.7 : Math.max(0, Math.min(240, frame.width - 24))
          label.overflow ??= 'truncate'
          // A maximum width must not turn every short word into a 240px label.
          const natural = measure(
            { ...label, width: undefined },
            seriesModel.getFormattedLabel(index) ?? data.getName(index),
            width,
            height,
          )
          const padding = label.padding
          const horizontalPadding = Array.isArray(padding)
            ? (padding[1] ?? padding[0] ?? 0) + (padding[3] ?? padding[1] ?? padding[0] ?? 0)
            : (padding ?? 0) * 2
          label.width = Math.min(
            label.width,
            Math.max(0, Math.ceil((natural?.width ?? 0) - horizontalPadding) + 2),
          )
        }
        if (settings.shape === 'circle' && label.height == null) {
          label.height = height * 0.7
          label.overflow ??= 'truncate'
        }
        itemOption.label = label
        const normalText = seriesModel.getFormattedLabel(index) ?? data.getName(index)
        const initial = measure(label, normalText, width, height)
        if (!row.explicitSize) {
          if (settings.shape !== 'circle') {
            width = initial?.width ?? 1
            height = Math.max(initial?.height ?? 1, settings.shape === 'rect' ? size : 1)
          }
        } else if (settings.shape === 'text' && initial) {
          width = Math.max(width, initial.width)
          height = Math.max(height, initial.height)
        }
        const border = Math.max(
          Number(itemModel.getModel('itemStyle').getItemStyle().lineWidth ?? 0),
          ...(['emphasis', 'select', 'blur'] as const).map(state =>
            Number(itemOption[state]?.itemStyle?.borderWidth ?? 0),
          ),
        )
        const body = {
          x: -width / 2 - border / 2,
          y: -height / 2 - border / 2,
          width: width + border,
          height: height + border,
        }
        const labels: Box[] = []
        const normal = measure(label, normalText, width, height)
        if (normal) labels.push(normal)
        for (const state of ['emphasis', 'select', 'blur'] as const) {
          const stateLabel = mergePlotOptions<WordCloudLabel>(label, itemOption[state]?.label)
          const stateText = seriesModel.getFormattedLabel(index, state) ?? normalText
          const box = measure(stateLabel, stateText, width, height)
          if (box) labels.push(box)
        }
        const outsideLabels =
          settings.shape === 'circle'
            ? labels.filter(box =>
                [
                  [box.x, box.y],
                  [box.x + box.width, box.y],
                  [box.x, box.y + box.height],
                  [box.x + box.width, box.y + box.height],
                ].some(([x, y]) => Math.hypot(x!, y!) > body.width / 2),
              )
            : labels
        // Native graph symbols scale a normalized square. Use a square scale
        // with an aspect-preserving path so rectangular strokes stay uniform.
        const rect = settings.shape === 'rect'
        const extent = Math.max(width, height)
        data.setItemVisual(index, 'symbolSize', rect ? [extent, extent] : [width, height])
        data.setItemVisual(index, 'symbolKeepAspect', rect)
        const borderRadius = (
          itemModel.getModel('itemStyle') as Model<{ borderRadius?: number }>
        ).get('borderRadius')
        const radius =
          settings.shape === 'rect' &&
          typeof borderRadius === 'number' &&
          Number.isFinite(borderRadius)
            ? Math.max(0, Math.min(borderRadius, width / 2, height / 2))
            : 0
        // A dimensioned path preserves both the rectangle aspect and pixel radius.
        const symbol = radius
          ? `path://M${radius},0H${width - radius}A${radius},${radius} 0 0 1 ${width},${radius}V${height - radius}A${radius},${radius} 0 0 1 ${width - radius},${height}H${radius}A${radius},${radius} 0 0 1 0,${height - radius}V${radius}A${radius},${radius} 0 0 1 ${radius},0Z`
          : rect
            ? `path://M0,0H${width}V${height}H0Z`
            : settings.shape === 'circle'
              ? 'circle'
              : 'rect'
        data.setItemVisual(index, 'symbol', symbol)
        nodes.push(
          reserveMotion(
            {
              index,
              id: data.getId(index),
              value,
              body,
              labels: outsideLabels,
              bounds: union([body, ...labels]),
              circle: settings.shape === 'circle',
              rect: settings.shape === 'rect',
            },
            motionAmplitude(settings, value),
            settings.shape === 'rect' && settings.overlap > 0,
          ),
        )
      })
      const invalidSizeKey = JSON.stringify(invalidSizes)
      if (invalidSizes.length && cache.invalidSizes !== invalidSizeKey) {
        // oxlint-disable-next-line no-console -- Report malformed native callback results once per configuration.
        console.warn(
          `[IxWordCloudChart] Skipped invalid symbolSize at data indices ${invalidSizes.join(', ')}.`,
        )
      }
      cache.invalidSizes = invalidSizeKey
      const placed = layoutCloud(nodes, frame, settings.gap, settings.overlap)
      const coord = seriesModel.coordinateSystem as unknown as {
        pointToData(point: number[]): number[]
      }
      placed.forEach((node, priority) => {
        data.setItemLayout(node.index, coord.pointToData([node.x, node.y]))
        // Keep the native emphasis/select lift above every normal node.
        data.setItemVisual(
          node.index,
          'liftZ',
          (placed.length - priority) / Math.max(1, placed.length),
        )
      })
    },
  })
}
