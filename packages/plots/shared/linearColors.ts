import type { LinearGradientObject } from 'echarts'

export enum LinearDirection {
  horizontal,
  vertical,
  reverseHorizontal,
  reverseVertical,
}

type DirectionConfig = Omit<LinearGradientObject, 'colorStops'>

/**
 * Seer gradients as [start color, end color] pairs.
 *
 * @see https://seerdesignmg.sangfor.com/file/66349883742837?fileOpenFrom=search_result&page_id=728%3A5538
 */
const seerLinearGradientColors: [string, string][] = [
  ['#458FFF', '#8FBFFF'],
  ['#20CC94', '#6EE6B6'],
  ['#FFC145', '#FFE396'],
  ['#F5654F', '#FF957B'],
  ['#6A6AFD', '#9B9BFF'],
  ['#6ED1FF', '#9EE0FF'],
  ['#008787', '#10BBBB'],
  ['#FF9245', '#FFB783'],
  ['#F587B3', '#F7B1CD'],
  ['#8352CC', '#A77BEA'],
  ['#65779B', '#99ACD1'],
  ['#E1E5EB', '#E9ECF1'],
]

export const seerGradientStartColors = seerLinearGradientColors.map(([startColor]) => startColor)

export function getLinearColors(dir: LinearDirection | DirectionConfig): LinearGradientObject[] {
  const directionConfig = getLinearDirectionConfig(dir)

  return seerLinearGradientColors.map(([startColor, endColor]) => {
    return createLinearGradientColor(directionConfig, startColor, endColor)
  })
}

/**
 * Create a gradient for an individual series using the same format as {@link getLinearColors}.
 *
 * @param startColor Starting color, such as `#FFC145`.
 * @param endColor Ending color, such as `#FFE396`.
 * @param dir Gradient direction. Defaults to left to right.
 */
export function getLinearColor(
  startColor: string,
  endColor: string,
  dir: LinearDirection | DirectionConfig = LinearDirection.horizontal,
): LinearGradientObject {
  return createLinearGradientColor(getLinearDirectionConfig(dir), startColor, endColor)
}

function createLinearGradientColor(
  directionConfig: DirectionConfig,
  startColor: string,
  endColor: string,
): LinearGradientObject {
  return {
    ...directionConfig,
    colorStops: [
      {
        offset: 0,
        color: startColor,
      },
      {
        offset: 1,
        color: endColor,
      },
    ],
  }
}

function getLinearDirectionConfig(dir: LinearDirection | DirectionConfig): DirectionConfig {
  return typeof dir === 'object' ? dir : getPresetDirectionConfig(dir)
}

function getPresetDirectionConfig(dir: LinearDirection): DirectionConfig {
  if (dir === LinearDirection.horizontal) {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
    }
  }

  if (dir === LinearDirection.vertical) {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
    }
  }

  if (dir === LinearDirection.reverseHorizontal) {
    return {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0,
    }
  }

  return {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
  }
}
