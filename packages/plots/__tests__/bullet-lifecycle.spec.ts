import { registerLayout, registerUpdateLifecycle, registerVisual } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'
import { installBulletDecal } from '../bullet/src/bulletDecal'
import { installBulletLayout } from '../bullet/src/bulletLayout'
import { installBulletVisual } from '../bullet/src/bulletVisual'

vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  registerLayout: vi.fn(),
  registerVisual: vi.fn(),
  registerUpdateLifecycle: vi.fn(),
}))

type Stage = { reset(series: any, model?: any): void }
function lastStage(register: typeof registerVisual | typeof registerLayout) {
  return (vi.mocked(register).mock.calls.at(-1) as unknown as [number, Stage])[1]
}

describe('Bullet lifecycle boundaries', () => {
  it('continues adapting later rows when a progressive row has no native layout yet', () => {
    installBulletLayout()
    const layout = { y: 20, height: 10, width: 50 }
    const data = {
      each: (visit: (index: number) => void) => [0, 1].forEach(visit),
      getItemLayout: (index: number) => (index === 1 ? layout : undefined),
      mapDimension: () => 'x',
      get: () => 0,
      setLayout: vi.fn(),
    }
    lastStage(registerLayout).reset({
      option: { __ixBulletLayout: { grouped: true, above: false, nativeWidth: false } },
      coordinateSystem: {
        type: 'cartesian2d',
        getBaseAxis: () => ({ getBandWidth: () => 100 }),
        getArea: () => ({ height: 200 }),
      },
      getData: () => data,
    })
    expect(layout).toEqual({ y: 17, height: 16, width: 0 })
    expect(data.setLayout).toHaveBeenCalledWith({ size: 16, offset: -8 })
  })

  it('preserves decoration colors when native rows are filtered independently or have no fill', () => {
    installBulletVisual()
    const styles = [{ fill: 'red' }, { fill: 'green' }, { fill: 'blue' }]
    const target = {
      each: (visit: (index: number) => void) => [0, 1, 2].forEach(visit),
      getRawIndex: (index: number) => index,
      ensureUniqueItemVisual: vi.fn((index: number) => styles[index]),
    }
    const source = {
      indexOfRawIndex: (index: number) => index - 1,
      getItemVisual: (index: number) => (index === 0 ? {} : { fill: '#123456' }),
    }
    lastStage(registerVisual).reset(
      { id: 'bullet-decorations', getData: () => target },
      {
        getSeries: () => [
          { id: 'bullet', option: { __ixBulletLayout: {} }, getData: () => source },
        ],
      },
    )
    expect(styles).toEqual([{ fill: 'red' }, { fill: 'green' }, { fill: '#123456' }])
    expect(target.ensureUniqueItemVisual).toHaveBeenCalledExactlyOnceWith(2, 'style')
  })

  it('does not attach an empty emphasis decal when the native visual stage produces no pattern', () => {
    const first = vi.mocked(registerVisual).mock.calls.length
    installBulletDecal()
    const stages = vi.mocked(registerVisual).mock.calls.slice(first) as unknown as [number, Stage][]
    const style = { fill: '#123456' }
    const bar = { ensureState: vi.fn() }
    const data = {
      each: (visit: (index: number) => void) => visit(0),
      getRawDataItem: () => ({}),
      getItemVisual: () => style,
      setItemVisual: vi.fn(),
      ensureUniqueItemVisual: () => style,
      getItemGraphicEl: () => bar,
    }
    const series = { option: { __ixBulletLayout: {} }, getData: () => data }
    stages[0]![1].reset(series)
    expect(data.setItemVisual).toHaveBeenCalledWith(
      0,
      'decal',
      expect.objectContaining({ symbol: 'rect' }),
    )
    stages[1]![1].reset(series)
    const afterUpdate = vi.mocked(registerUpdateLifecycle).mock.calls.at(-1)![1] as (
      model: any,
    ) => void
    afterUpdate({
      eachSeriesByType: (_type: string, visit: (series: unknown) => void) => visit(series),
    })
    expect(bar.ensureState).not.toHaveBeenCalled()
    expect(style).toEqual({ fill: '#123456' })
  })
})
