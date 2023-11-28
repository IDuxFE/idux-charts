import { type Component, computed, unref, ref, watch, type Ref, type UnwrapRef } from 'vue-demi'

import { getAlphaColor } from '@idux/charts-core'

type MaybeRef<T> = UnwrapRef<T> | Ref<UnwrapRef<T>>

export interface LineChartAreaStripeOption {
  /** 条纹颜色 */
  color?: string;
  /** 条纹宽度 */
  width?: number;
  /** 条纹高度 */
  height?: number;
}

export function useLineChartAreaStripe(el: MaybeRef<HTMLElement | Component | undefined>, color?: MaybeRef<LineChartAreaStripeOption['color']>) {
  const options = ref<LineChartAreaStripeOption>({})

  const disposes: (() => void)[] = []

  const elRef = computed(() => {
    const elIns = unref(el)
    if (elIns instanceof HTMLElement) {
      return elIns
    }

    if (elIns && '$el' in elIns && elIns.$el instanceof HTMLElement) {
      return elIns.$el
    }

    return elIns as undefined
  })

  const observer = new ResizeObserver(() => {
    options.value = getOptionsByDOM(unref(elRef), unref(color))
  })

  watch(elRef, () => {
    disposes.forEach(cb => cb())

    const el = unref(elRef)

    options.value = getOptionsByDOM(el, unref(color))

    if (el) {
      observer.observe(el)
      disposes.push(observer.disconnect)
    }
  })

  const lineChartAreaStripeConfig = computed(() => ({
    areaStyle: {
      color: {
        image: getLineChartAreaStripeImgEl(options.value),
        repeat: 'repeat-x' as const,
      },
    },
  }))

  return {
    lineChartAreaStripeConfig,
  }
}

function getOptionsByDOM(el?: HTMLElement, color?: LineChartAreaStripeOption['color']) {
  return {
    color,
    height: el?.getBoundingClientRect()?.height,
  }
}

/**
 * 生成条纹 area 背景图
 */
export function getLineChartAreaStripeImgEl(options: LineChartAreaStripeOption = {}) {
  const {
    color = '#458FFF',
    width: stripeWidth = 2,
    height: imgHeight = 90,
  } = options

  const imgEl = document.createElement('img')
  const imgWidth = stripeWidth * 2

  imgEl.src = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 ${imgWidth} ${imgHeight}">
  <defs>
    <linearGradient id="color" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="${getAlphaColor(color, 0.3)}" />
      <stop offset="50%" stop-color="${getAlphaColor(color, 0.2)}" />
      <stop offset="100%" stop-color="${getAlphaColor(color, 0)}" />
    </linearGradient>
  </defs>
  <g>
    <rect x="0" y="0" width="${stripeWidth}" height="${imgHeight}" rx="0" fill="url(#color)"/>
    <rect x="${stripeWidth}" y="0" width="${stripeWidth}" height="${imgHeight}" rx="0" fill="transparent"/>
  </g>
</svg>
`.trim())

  return imgEl
}

/**
 * svg 转 dataurl
 */
function encodeSvg(svgStr: string) {
  const encodedSvg = svgStr
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")

  return `data:image/svg+xml,${encodedSvg}`
};
