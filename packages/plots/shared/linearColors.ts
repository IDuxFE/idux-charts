import type { LinearGradientObject } from 'echarts'

export enum LinearDirection {
  horizontal,
  vertical,
  reverseHorizontal,
  reverseVertical,
}

type DirectionConfig = Omit<LinearGradientObject, 'colorStops'>

/**
 * seer 支持的渐变的颜色列表
 *
 * @see https://seerdesignmg.sangfor.com/file/66349883742837?fileOpenFrom=search_result&page_id=728%3A5538
 *
 * 格式为：
 *
 * `[起始颜色, 终止颜色]`
 */
const seerLinearGradientColors: [string, string][] = [
  ['#458FFF', '#8FBFFF'], // 蓝
  ['#20CC94', '#6EE6B6'], // 绿
  ['#FFC145', '#FFE396'], // 黄
  ['#F5654F', '#FF957B'], // 红
  ['#6A6AFD', '#9B9BFF'], // 钻蓝
  ['#6ED1FF', '#9EE0FF'], // 湖蓝
  ['#008787', '#10BBBB'], // 墨绿
  ['#FF9245', '#FFB783'], // 橘黄
  ['#F587B3', '#F7B1CD'], // 粉
  ['#8352CC', '#A77BEA'], // 紫
  ['#65779B', '#99ACD1'], // 灰
  ['#E1E5EB', '#E9ECF1'], // 置灰
]

export function getLinearColors(dir: LinearDirection | DirectionConfig): LinearGradientObject[] {
  const directionConfig = getLinearDirectionConfig(dir)

  return seerLinearGradientColors.map(([startColor, endColor]) => {
    return createLinearGradientColor(directionConfig, startColor, endColor)
  })
}

/**
 * 根据起始颜色与终止颜色生成单个渐变颜色对象。
 *
 * 返回值与 {@link getLinearColors} 返回数组中的元素结构一致，
 * 便于在 option 中单独为一个系列指定自定义渐变。
 *
 * @param startColor 渐变的起始颜色，如 `#FFC145`
 * @param endColor 渐变的终止颜色，如 `#FFE396`
 * @param dir 渐变方向，默认为水平方向（从左到右）
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
