import { format, helper, Model } from 'echarts/core'
import type { BarSeriesOption, CustomSeriesOption } from 'echarts/charts'
import { mergePlotOptions } from '../../shared/plotOptions'
import type { BulletModel } from './resolveBulletModel'

type Label = NonNullable<BarSeriesOption['label']>
type Formatter = Exclude<NonNullable<Label['formatter']>, string>
type RenderItem = NonNullable<CustomSeriesOption['renderItem']>
type Group = Extract<NonNullable<ReturnType<RenderItem>>, { type: 'group' }>
type Rect = Extract<Group['children'][number], { type: 'rect' }>
interface BulletLabelRenderer {
  show: boolean
  render: (
    params: Parameters<RenderItem>[0],
  ) => Pick<Rect, 'textContent' | 'textConfig'> | undefined
}

function resolveLabelPosition(position: Label['position']) {
  switch (position) {
    case 'outside':
    case 'end':
      return 'right' as const
    case 'start':
      return 'left' as const
    case 'insideStart':
      return 'insideLeft' as const
    case 'insideEnd':
      return 'insideRight' as const
    case 'middle':
      return 'inside' as const
    default:
      return position
  }
}

/** Shared defaults for native bar labels and missing-value anchors. */
export function resolveBulletLabel(model: BulletModel): Label {
  const { props, theme, dark } = model
  return mergePlotOptions<Label>(
    {
      show: model.grouped && props.layout === 'horizontal-above',
      position: 'right',
      distance: 2,
      fontSize: 12,
      fontFamily: theme.numberFontFamily ?? theme.fontFamily,
      color: dark ? (theme.secondaryTextColor ?? '#A1A7B3') : (theme.textColor ?? '#454D61'),
    },
    props.label,
  )
}

/** Missing values have no native bar to attach text to. Only their anchor is custom. */
export function createBulletLabel(model: BulletModel): BulletLabelRenderer {
  const { props, rows } = model
  const defaults = resolveBulletLabel(model)
  const labels = rows.map(row => mergePlotOptions<Label>(defaults, row.label))
  return {
    show: labels.some(label => !!label.show),
    render: (params: Parameters<RenderItem>[0]) => {
      const row = rows[params.dataIndex]!
      const label = labels[params.dataIndex]!
      if (!label.show) return
      const textConfig = {
        position: resolveLabelPosition(label.position),
        distance: label.distance,
        offset: label.offset,
        rotation: label.rotate == null ? undefined : (label.rotate * Math.PI) / 180,
        outsideFill: 'auto',
      }
      const value = row.value ?? null
      const source = props.data?.[params.dataIndex] ?? { value: props.value, target: props.target }
      const data = { ...source, name: row.name, value }
      const context: Parameters<Formatter>[0] = {
        componentType: 'series',
        componentSubType: 'custom',
        componentIndex: params.seriesIndex,
        seriesType: 'custom',
        seriesIndex: params.seriesIndex,
        seriesId: params.seriesId,
        seriesName: String(props.name ?? '实际值'),
        name: row.name,
        dataIndex: params.dataIndex,
        data,
        value,
        color: row.actualColor,
        dimensionNames: ['value'],
        encode: { x: [0] },
        $vars: ['seriesName', 'name', 'value'],
      }
      const formatter = label.formatter
      const content =
        typeof formatter === 'function'
          ? formatter(context)
          : typeof formatter === 'string'
            ? format.formatTpl(formatter, context)
            : value === null
              ? '–'
              : String(value)
      return {
        textConfig,
        textContent: {
          type: 'text' as const,
          name: 'value-label',
          ignore: false,
          silent: label.silent,
          z2: 10,
          style: {
            ...helper.createTextStyle(
              new Model({
                ...label,
                color: label.color === 'inherit' ? row.actualColor : label.color,
              }),
              { state: 'normal' },
            ),
            text: content,
          },
        },
      }
    },
  }
}
