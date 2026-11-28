/**
 * Validate published tarballs as real, isolated Vue/ECharts consumer applications.
 * Entry: pnpm test:declarations [--runtime], after pnpm build:lib.
 * IDUX_DECLARATION_TARGET selects one supported Vue/ECharts pair; unset checks all.
 * Checks public declarations and inferred APIs; --runtime adds Chromium lifecycle,
 * composable-only registration and bundle/tree-shaking checks. Fixture paths are logged
 * and retained in the OS temp directory for diagnosis; runtime browsers close in finally.
 */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import ts from 'typescript'
import { chromium, expect } from '@playwright/test'
import { build, preview } from 'vite'

import { normalizeChartDeclarations } from '../build/declarations.ts'
import { smokeWordCloud } from './word-cloud-consumer.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const work = mkdtempSync(join(tmpdir(), 'idux-chart-declarations-'))
console.log(`Declaration consumer fixtures: ${work}`)
const run = (args, cwd = root) => execFileSync('pnpm', args, { cwd, stdio: 'inherit' })
const options = {
  strict: true,
  skipLibCheck: false,
  esModuleInterop: true,
  types: [],
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
}
function check(program) {
  const diagnostics = ts.getPreEmitDiagnostics(program)
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => root,
      getCanonicalFileName: file => file,
      getNewLine: () => '\n',
    }),
  )
}

// Compile a representative component with the same compiler and declaration
// normalizer as the library. Its inferred contracts are consumed in every runtime.
const fixturePath = join(root, 'packages/plots/.declaration-fixture.ts')
const fixtureSource = `
import { defineComponent } from 'vue';
import type { SlotsType, VNode } from 'vue';
import { withChartProps } from '@idux/charts-core';
export default withChartProps<{ autoResize?: boolean }>()(defineComponent({
  props: { label: { type: String, required: true } },
  emits: { change: (value: number) => Number.isFinite(value) },
  slots: Object as SlotsType<{ default: (props: { value: number }) => VNode[] }>,
  setup: () => ({ focus: () => 42 as const }),
  data: () => ({ count: 0 }),
  computed: { doubled() { return this.count * 2 } },
  methods: { increment(delta: number) { this.count += delta } },
}));
`
const emitOptions = { ...options, declaration: true, emitDeclarationOnly: true }
const host = ts.createCompilerHost(emitOptions)
const getSourceFile = host.getSourceFile.bind(host)
host.getSourceFile = (file, ...args) =>
  file === fixturePath
    ? ts.createSourceFile(file, fixtureSource, ts.ScriptTarget.Latest, true)
    : getSourceFile(file, ...args)
const fixtureProgram = ts.createProgram([fixturePath], emitOptions, host)
check(fixtureProgram)
let fixtureDeclaration
fixtureProgram.emit(undefined, (file, text) => {
  if (file.endsWith('.d.ts')) {
    writeFileSync(join(work, 'inferred-source.d.ts'), text)
    fixtureDeclaration = normalizeChartDeclarations(text, file)
  }
})
assert.ok(fixtureDeclaration, 'The inference fixture must emit a declaration')

const tarballs = {}
for (const name of ['core', 'plots', 'charts']) {
  const tarball = join(work, `${name}.tgz`)
  run(['pack', '--out', tarball], join(root, 'packages', name))
  tarballs[name] = `file:${tarball}`
}
// Exercise packed components through render, reactive updates, theme and remount.
// The generated app deliberately imports public entries rather than workspace aliases.
async function smokeRuntime(app) {
  writeFileSync(
    join(app, 'index.html'),
    '<div id="app"></div><script type="module" src="/main.js"></script>',
  )
  writeFileSync(
    join(app, 'main.js'),
    `
import { createApp, h, ref, isVue2 } from 'vue-demi';
import { IxChart, IxBarChart, IxLineChart, IxAreaChart, IxPieChart, IxRadarChart, IxGaugeChart, IxBulletChart, IxLiquidFillChart, IxMapChart, PLOT_THEME_TOKEN, createMapTransition as aggregateTransition } from '@idux/charts';
import { IxChart as Core } from '@idux/charts/core';
import { IxBarChart as Bar } from '@idux/charts/bar';
import { IxLineChart as Line, PLOT_THEME_TOKEN as LineTheme } from '@idux/charts/line';
import { IxAreaChart as Area, PLOT_THEME_TOKEN as AreaTheme } from '@idux/charts/area';
import { IxPieChart as Pie } from '@idux/charts/pie';
import { IxRadarChart as Radar } from '@idux/charts/radar';
import { IxGaugeChart as Gauge } from '@idux/charts/gauge';
import { IxBulletChart as Bullet, createBulletOption } from '@idux/charts/bullet';
import { IxLiquidFillChart as LiquidFill } from '@idux/charts/liquid-fill';
import { IxMapChart as MapChart, registerMap, createMapNodes, createMapTransition } from '@idux/charts/map';
import { getInstanceByDom } from 'echarts/core';
registerMap('consumer-map', {type: 'FeatureCollection', features: [{type: 'Feature', properties: {name: 'A'}, geometry: {type: 'Polygon', coordinates: [[[0,0], [30,0], [30,30], [0,30], [0,0]]]}}]});
if ([Bar, Line, Area, Pie, Radar, Gauge, Bullet, LiquidFill, MapChart].some((component, index) => component !==
    [IxBarChart, IxLineChart, IxAreaChart, IxPieChart, IxRadarChart, IxGaugeChart, IxBulletChart, IxLiquidFillChart, IxMapChart][index]) ||
    Core !== IxChart || LineTheme !== PLOT_THEME_TOKEN || AreaTheme !== PLOT_THEME_TOKEN || aggregateTransition !== createMapTransition) {
  throw new Error('Modular and aggregate imports must share the same component instances');
}
const revision = ref(0), dark = ref(false), mounted = ref(true), slotVisible = ref(false);
const instances = [];
const kinds = [['core', IxChart], ['bar', IxBarChart], ['line', IxLineChart], ['area', IxAreaChart], ['area-default', IxAreaChart], ['pie', IxPieChart], ['radar', IxRadarChart], ['gauge', IxGaugeChart], ['bullet', IxBulletChart], ['bullet-grouped', IxBulletChart], ['liquid-fill', IxLiquidFillChart], ['map', IxMapChart]];
const button = (id, action) => h('button', isVue2 ? { attrs: {'data-testid': id}, on: {click: action} } : {'data-testid': id, onClick: action}, id);
const root = createApp({setup() { return () => h('main', {}, [
  button('update', () => revision.value++),
  button('theme', () => { dark.value = !dark.value }),
  button('mount', () => { mounted.value = !mounted.value }),
  button('slot', () => { slotVisible.value = !slotVisible.value }),
  ...(mounted.value ? kinds.map(([kind, component]) => {
    const data = [10 + revision.value, 20, 30];
    const props = {
      title: {text: kind + ' ' + revision.value}, animation: false, autoResize: true,
      role: 'img', 'aria-label': kind + ' chart', tabindex: 0,
      initOption: {renderer: 'svg', width: 400, height: 240},
      setOptionOpts: {notMerge: !['area', 'bullet', 'bullet-grouped'].includes(kind)},
      theme: dark.value ? 'dark' : 'seer', onReady: chart => instances.push(chart),
      ...(kind === 'core' ? {xAxis: {type: 'category', data: ['A', 'B', 'C']}, yAxis: {type: 'value'}, series: [{type: 'bar', data}]} :
        kind === 'map' ? {geo: {id: 'base', map: 'consumer-map'}, series: [createMapNodes([{id: 'a', name: 'A', coordinate: [10, 10], value: data[0]}])]} :
        kind === 'radar' ? { indicator: ['A', 'B', 'C'].map(name => ({name, max: 100})), data: [{name: 'One', value: data}] } :
        kind === 'bullet' ? {value: data[0], target: 80, barWidth: '25%', xAxis: {max: 100}, ranges: [{upper: 30}, {upper: 100}]} :
        kind === 'bullet-grouped' ? {data: ['A','B','C','D','E'].map((name,i) => ({name, value: i === 2 ? NaN : i === 3 ? null : data[0], target: 80, missingReason: 'Offline',
          label: i === 2 ? {show: true, formatter: params => {
            if (params.value !== null || params.data.value !== null) throw new Error('Missing label data must be normalized');
            return 'Offline';
          }} : i === 3 ? {show: false} : undefined,
        })), label:{show:true}, itemStyle:{color:params => params.dataIndex === 0 ? '#ff0000' : '#00ff00'},
          xAxis:{max:100}, ranges: [{upper:30}, {upper:100}], dataZoom:{id:'bullet-zoom', type:'slider', yAxisIndex:0, startValue:0,endValue:1}} :
        kind === 'gauge' || kind === 'liquid-fill' ? {value: data[0]} :
        kind === 'pie' ? {data: data.map((value, i) => ({name: String(i), value}))} :
        kind === 'area' ? {categories: ['A', 'B', 'C', 'D', 'E', 'F'], area: 'striped',
          dataZoom: {id: 'area-zoom', type: 'inside'}, series: [
          {name: 'Area', stack: 'total', data: revision.value ? [...data, 40, 50, 60] : [data[0], null, null, 40, {value: null, missingReason: 'Offline'}, 60]},
          ...(revision.value ? [] : [{name: 'Comparison', data: [...data, 40, 50, 60]}]),
        ], tooltip: {formatter: params => {
          const sample = params.find(param => param.seriesName === 'Area');
          return sample ? JSON.stringify({data: sample.data, value: sample.value}) : '';
        }}} : {data, xAxis: {data: ['A', 'B', 'C']}}),
    };
    const slots = {default: () => slotVisible.value ? [h('button', {}, 'Slot action')] : []};
    return h('section', isVue2 ? {attrs: {'data-kind': kind}, style: {width: '400px', height: '240px'}} : {'data-kind': kind, style: {width: '400px', height: '240px'}},
      [h(component, isVue2 ? {attrs: props, ref: kind, scopedSlots: slots} : {...props, ref: kind}, isVue2 ? undefined : slots)]);
  }) : []),
]) }}).mount('#app');
window.readCharts = () => Array.from(document.querySelectorAll('[data-kind]')).map(section => {
  const el = section.querySelector('[_echarts_instance_]');
  const chart = el && getInstanceByDom(el), option = chart?.getOption(), data = option?.series?.[0]?.data?.[0];
  return {kind: section.dataset.kind, filled: !!option?.series?.[0]?.areaStyle, id: chart?.id, title: option?.title?.[0]?.text, value: section.dataset.kind === 'map' ? data?.value?.[2] : Array.isArray(data) ? data[0] : typeof data === 'object' ? (Array.isArray(data.value) ? data.value[0] : data.value) : data, paths: el?.querySelectorAll('svg path').length || 0, exposed: root.$refs[section.dataset.kind]?.getEChartsInstance() === chart, domAttrs: el?.getAttribute('role') === 'img' && el?.getAttribute('aria-label') === section.dataset.kind + ' chart' && el?.getAttribute('tabindex') === '0' && option?.role === undefined};
});
window.allDisposed = () => instances.length > 0 && instances.every(chart => chart.isDisposed());
const areaChart = () => {
  const el = document.querySelector('[data-kind="area"] [_echarts_instance_]');
  return getInstanceByDom(el);
};
window.areaSeriesCount = () => areaChart()?.getOption().series?.length;
window.showAreaGap = () => areaChart().dispatchAction({type: 'showTip', seriesIndex: 0, dataIndex: 4});
window.zoomArea = () => areaChart().dispatchAction({type: 'dataZoom', dataZoomId: 'area-zoom', start: 0, end: 80});
window.areaZoom = () => areaChart().getOption().dataZoom[0].end;
const mapChart = () => getInstanceByDom(document.querySelector('[data-kind="map"] [_echarts_instance_]'));
window.transitionMap = async () => {
  const chart = mapChart(), original = chart.getOption();
  const transition = createMapTransition(() => chart, {duration: 1});
  chart.setOption({animation: true, geo: {animation: true}});
  try {
    const completed = await transition.run('drilldown', () => chart.setOption({geo: {zoom: 1.3, center: [12, 12]}}));
    const {zoom, center} = chart.getOption().geo[0];
    return {completed, viewport: {zoom, center}};
  } finally {
    transition.dispose();
    chart.setOption({animation: original.animation, geo: {animation: original.geo[0].animation, zoom: original.geo[0].zoom, center: original.geo[0].center}});
  }
};
window.roamMap = () => mapChart().dispatchAction({type: 'geoRoam', componentType: 'geo', geoId: 'base', zoom: 2, dx: 10, dy: 10, originX: 200, originY: 120});
window.mapViewport = () => {const geo = mapChart().getOption().geo[0]; return {zoom: geo.zoom, center: geo.center};};
const bulletChart = () => getInstanceByDom(document.querySelector('[data-kind="bullet-grouped"] [_echarts_instance_]'));
window.invalidBullet = () => createBulletOption({xAxis: {min: 10, max: 5}}).series.length;
window.zoomBullet = () => bulletChart().dispatchAction({type:'dataZoom', dataZoomId:'bullet-zoom', startValue:2, endValue:3});
window.bulletTooltipColors = () => {
  const chart = bulletChart(), option = chart.getOption(), model = chart.getModel();
  return [0,1,2].map(index => {
    const host = document.createElement('div');
    host.innerHTML = option.tooltip[0].formatter(model.getSeriesByIndex(index).getDataParams(0));
    return host.querySelector('.charts-tooltips-item-border').style.background;
  });
};
window.bulletMissingLabels = () => {
  const data = bulletChart().getModel().getSeriesByIndex(1).getData();
  return Array.from({length:data.count()}, (_,index) => data.getItemGraphicEl(index)?.children()
    .find(child=>child.name === 'value-label-anchor')?.getTextContent()?.style.text ?? null);
};
window.bulletState = () => {
  const chart = bulletChart(), option = chart.getOption();
  const elements = chart.getZr().storage.getDisplayList();
  return { start: option.dataZoom[0].startValue, end: option.dataZoom[0].endValue,
    missing: elements.filter(item => item.name === 'missing').length,
    targets: elements.filter(item => item.name === 'target').length,
    guides: elements.filter(item => item.name === 'range-0-boundary').length };
};
`,
  )
  await build({ root: app, configFile: false, logLevel: 'error' })
  const server = await preview({
    root: app,
    configFile: false,
    logLevel: 'error',
    preview: { host: '127.0.0.1', port: 0 },
  })
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    const errors = [],
      warnings = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
      if (message.type() === 'warning') warnings.push(message.text())
    })
    const port = server.httpServer.address().port
    await page.goto(`http://127.0.0.1:${port}/`)
    expect(await page.evaluate(() => window.invalidBullet())).toBe(0)
    expect(warnings).toContain(
      '[IxBulletChart] xAxis.max must be greater than xAxis.min (10); received 5.',
    )
    expect(errors, 'initial chart render errors').toEqual([])
    const state = () => page.evaluate(() => window.readCharts())
    await expect
      .poll(async () => (await state()).map(chart => chart.paths > 0))
      .toEqual(Array(12).fill(true))
    expect((await state()).map(chart => chart.exposed)).toEqual(Array(12).fill(true))
    expect((await state()).map(chart => chart.domAttrs)).toEqual(Array(12).fill(true))
    expect((await state()).find(chart => chart.kind === 'area-default').filled).toBe(true)
    const beforeSlots = await state()
    await page.getByTestId('slot').click()
    await expect(page.locator('.ix-chart-overlay')).toHaveCount(12)
    const firstSlot = await page.locator('.ix-chart-overlay button').first().elementHandle()
    expect((await state()).map(chart => chart.id)).toEqual(beforeSlots.map(chart => chart.id))
    await page.getByTestId('theme').click()
    await expect
      .poll(async () => (await state()).every((chart, index) => chart.id !== beforeSlots[index].id))
      .toBe(true)
    expect(
      await page
        .locator('.ix-chart-overlay button')
        .first()
        .evaluate((element, old) => element === old, firstSlot),
    ).toBe(true)
    await page.getByTestId('theme').click()
    await page.getByTestId('slot').click()
    await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)

    const area = page.locator('[data-kind="area"]')
    await expect(area.locator('svg pattern[width="4"][height="240"]').first()).toBeAttached()
    await expect.poll(() => page.evaluate(() => window.areaSeriesCount())).toBe(3)
    await page.evaluate(() => window.showAreaGap())
    await expect(area).toContainText(
      '{"data":{"value":null,"missingReason":"Offline"},"value":null}',
    )
    await page.evaluate(() => window.zoomArea())
    const areaZoom = await page.evaluate(() => window.areaZoom())
    expect(areaZoom).toBeLessThan(100)
    expect(await page.evaluate(() => window.transitionMap())).toEqual({
      completed: true,
      viewport: { zoom: 1.3, center: [12, 12] },
    })
    await page.evaluate(() => window.roamMap())
    const mapViewport = await page.evaluate(() => window.mapViewport())
    expect(mapViewport.zoom).toBeCloseTo(2, 10)
    const expectMapViewport = async () => {
      const current = await page.evaluate(() => window.mapViewport())
      expect(current.zoom).toBeCloseTo(mapViewport.zoom, 10)
      current.center.forEach((value, index) =>
        expect(value).toBeCloseTo(mapViewport.center[index], 10),
      )
    }
    await expect
      .poll(() => page.evaluate(() => window.bulletTooltipColors()))
      .toEqual(Array(3).fill('rgb(255, 0, 0)'))
    await page.evaluate(() => window.zoomBullet())
    const bulletState = () => page.evaluate(() => window.bulletState())
    await expect
      .poll(bulletState)
      .toMatchObject({ start: 2, end: 3, missing: 2, targets: 2, guides: 1 })
    await expect
      .poll(() => page.evaluate(() => window.bulletMissingLabels()))
      .toEqual(['Offline', null])
    await page.getByTestId('update').click()
    await expect
      .poll(async () => (await state()).map(chart => chart.title))
      .toEqual([
        'core 1',
        'bar 1',
        'line 1',
        'area 1',
        'area-default 1',
        'pie 1',
        'radar 1',
        'gauge 1',
        'bullet 1',
        'bullet-grouped 1',
        'liquid-fill 1',
        'map 1',
      ])
    await expect
      .poll(async () => (await state()).map(chart => chart.value))
      .toEqual([11, 11, 11, 11, 11, 11, 11, 0.11, 11, 11, 0.11, 11])
    await expect.poll(() => page.evaluate(() => window.areaSeriesCount())).toBe(1)
    expect(await page.evaluate(() => window.areaZoom())).toBe(areaZoom)
    await expectMapViewport()
    await expect
      .poll(bulletState)
      .toMatchObject({ start: 2, end: 3, missing: 2, targets: 2, guides: 1 })
    await expect
      .poll(() => page.evaluate(() => window.bulletMissingLabels()))
      .toEqual(['Offline', null])
    const before = await state()
    await page.getByTestId('theme').click()
    await expect
      .poll(async () => (await state()).map((chart, i) => !!chart.id && chart.id !== before[i].id))
      .toEqual(Array(12).fill(true))
    expect(await page.evaluate(() => window.areaZoom())).toBe(areaZoom)
    await expectMapViewport()
    await page.getByTestId('mount').click()
    await expect.poll(state).toEqual([])
    await expect.poll(() => page.evaluate(() => window.allDisposed())).toBe(true)
    await page.getByTestId('mount').click()
    await expect
      .poll(async () => (await state()).map(chart => chart.title))
      .toEqual([
        'core 1',
        'bar 1',
        'line 1',
        'area 1',
        'area-default 1',
        'pie 1',
        'radar 1',
        'gauge 1',
        'bullet 1',
        'bullet-grouped 1',
        'liquid-fill 1',
        'map 1',
      ])
    expect(errors).toEqual([])
  } finally {
    await browser.close()
    await new Promise((resolve, reject) =>
      server.httpServer.close(error => (error ? reject(error) : resolve())),
    )
  }
}

// Compare production bundles and inspect module identities, not a brittle byte budget.
// A smaller line entry alone would not prove unrelated series were excluded.
async function checkLineBundle(app) {
  const entry = join(app, 'line-entry.js')
  const sizes = {}
  for (const [label, path, imports] of [
    ['line', '@idux/charts/line', 'IxLineChart'],
    ['area', '@idux/charts/area', 'IxAreaChart'],
    [
      'all',
      '@idux/charts',
      'IxBarChart, IxLineChart, IxAreaChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart, IxMapChart',
    ],
  ]) {
    writeFileSync(
      entry,
      `import { createApp, h } from 'vue-demi';
import { ${imports} } from '${path}';
createApp({render: () => h('div', [${imports}].map(component => h(component)))}).mount('#app');`,
    )
    const output = await build({
      root: app,
      configFile: false,
      logLevel: 'error',
      build: { write: false, rollupOptions: { input: entry } },
    })
    const chunks = [output]
      .flat()
      .flatMap(result => result.output)
      .filter(item => item.type === 'chunk')
    const size = chunks.reduce((bytes, chunk) => bytes + gzipSync(chunk.code).length, 0)
    sizes[label] = size
    console.log(`Bundle ${label}: ${(size / 1024).toFixed(1)} KiB gzip (JS including Vue)`)
    if (label === 'line' || label === 'area') {
      const modules = chunks.flatMap(chunk => Object.keys(chunk.modules))
      assert.ok(modules.some(id => id.endsWith('/echarts/lib/chart/line/install.js')))
      assert.deepEqual(
        modules.filter(id => /\/echarts\/lib\/chart\/(bar|pie|radar|gauge)\/install\.js$/.test(id)),
        [],
        'The line subpath must exclude unrelated ECharts series',
      )
    }
  }
  assert.ok(sizes.area < sizes.all, 'The area subpath must produce a smaller JS bundle')
  assert.ok(sizes.line < sizes.all, 'The line subpath must produce a smaller JS bundle')
}

// A composable-only consumer catches registration accidentally retained by components.
async function smokeHooks(app) {
  writeFileSync(
    join(app, 'hook-only.html'),
    '<div id="app"></div><script type="module" src="/hook-only.js"></script>',
  )
  writeFileSync(
    join(app, 'hook-only.js'),
    `
import { createApp, h, ref } from 'vue-demi';
import { useChart } from '@idux/charts';
createApp({
  setup() { return useChart(ref({
    initOption: {renderer: 'svg', width: 400, height: 240}, animation: false,
    xAxis: {type: 'category', data: ['A', 'B']}, yAxis: {type: 'value'},
    series: [{type: 'bar', data: [10, 20]}],
  })) },
  render() { return h('div', {ref: 'containerRef', style: {width: '400px', height: '240px'}}) },
}).mount('#app');
`,
  )
  // A separate build prevents the component entry from retaining registration
  // code in a shared chunk and masking a composable-only tree-shaking failure.
  await build({
    root: app,
    configFile: false,
    logLevel: 'error',
    build: { outDir: 'hook-dist', rollupOptions: { input: join(app, 'hook-only.html') } },
  })
  const server = await preview({
    root: app,
    configFile: false,
    logLevel: 'error',
    build: { outDir: 'hook-dist' },
    preview: { host: '127.0.0.1', port: 0 },
  })
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage(),
      errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/hook-only.html`)
    await expect
      .poll(() => page.locator('[_echarts_instance_] svg path').count())
      .toBeGreaterThan(0)
    expect(errors).toEqual([])
  } finally {
    await browser.close()
    await new Promise((resolve, reject) =>
      server.httpServer.close(error => (error ? reject(error) : resolve())),
    )
  }
}

const adapterConsumer = `
import { IxWordCloudChart, createWordCloudOption, type WordCloudChartPublicProps, type WordCloudMotion } from '@idux/charts/word-cloud';
const cloudMotion: WordCloudMotion = {amplitude:12,duration:6000,pauseOnHover:true};
const movingCloud: WordCloudChartPublicProps = {motion:cloudMotion,animation:true};
createWordCloudOption(movingCloud);
// @ts-expect-error native animation retains its boolean contract
const invalidCloudAnimation: WordCloudChartPublicProps = {animation:{duration:6000}};
// @ts-expect-error continuous motion amplitude uses pixel numbers
const invalidCloudMotion: WordCloudChartPublicProps = {motion:{amplitude:'4px'}};
const cloud: WordCloudChartPublicProps = {shape: 'rect', title:null, plotTheme:{palette:['#123456']}, data: [{id:'a',name:'Analysis',value:1,category:'Risk',selected:true}], categories:[{name:'Risk'}], label:{formatter:'{b} {c}'}, symbolSize:value=>[100,32], selectedMode:'multiple', gap:8};
createWordCloudOption(cloud);
// @ts-expect-error cloud weights must be numeric
const invalidCloudValue: WordCloudChartPublicProps = {data:[{name:'A',value:'1'}]};
// @ts-expect-error shapes are a finite union
const invalidCloudShape: WordCloudChartPublicProps = {shape:'star'};
// @ts-expect-error public props reject misspelled options
const invalidCloudField: WordCloudChartPublicProps = {hoverColor:'red'};
import { provide, ref } from 'vue-demi';
import { CHART_THEME_TOKEN, type ChartTheme } from '@idux/charts';
provide(CHART_THEME_TOKEN, ref<ChartTheme>('dark'));
provide(CHART_THEME_TOKEN, { darkMode: true, textStyle: { color: '#fff' } });
// @ts-expect-error themes must be names or objects, not numbers
provide(CHART_THEME_TOKEN, 42);
import type { ChartPublicProps, BarChartPublicProps, LineChartPublicProps, PieChartPublicProps, RadarChartPublicProps, GaugeChartPublicProps, LiquidFillChartPublicProps, MapChartPublicProps } from '@idux/charts';
import type { AreaChartProps, AreaChartPublicProps, AreaChartDataItem } from '@idux/charts';
import type { AreaChartProps as ModularAreaProps, AreaChartPublicProps as ModularAreaPublicProps, AreaChartDataItem as ModularAreaDataItem } from '@idux/charts/area';
import type { LineChartPublicProps as ModularLineProps } from '@idux/charts/line';
import { IxBulletChart, createBulletOption, type BulletChartPublicProps } from '@idux/charts/bullet';
const bullet: BulletChartPublicProps = { data: [{name: 'A', value: 75, target: 85}], ranges: [{upper: 100, color: 'red'}], barWidth: '20%', color: ['blue'], name: 'Actual', xAxis: {min: 0, max: 100} };
createBulletOption(bullet);
// @ts-expect-error bullet values must be numeric
const badBullet: BulletChartPublicProps = {value: '75'};
// @ts-expect-error grouped bullet rows require a category name
const badBulletRow: BulletChartPublicProps = {data: [{value: 20}]};

const areaItem: AreaChartDataItem = {missingReason: 'Offline'};
const modularAreaItem: ModularAreaDataItem = areaItem;
const area: AreaChartProps = {categories: ['A'], data: [areaItem], area: 'striped'};
const publicArea: AreaChartPublicProps = area;
const modularArea: ModularAreaProps = publicArea;
const modularPublicArea: ModularAreaPublicProps = publicArea;
// @ts-expect-error Area public types preserve the fill union
const badAreaFill: AreaChartPublicProps = {area: 'solid'};
// @ts-expect-error Area props preserve numeric data
const badAreaData: AreaChartPublicProps = {data: [true]};
const modularLine: ModularLineProps = { categories: ['A', 'B'], data: [1, 2] };
const radar: RadarChartPublicProps = { indicator: [{name: 'A', max: 100}], data: [{name: 'One', value: [25]}], area: true };
const gauge: GaugeChartPublicProps = { value: 20, segments: [{upper: 1, color: 'red'}], plotTheme: { textColor: 'red' }, valueTextStyle: { fontSize: 24 } };
const themedPie: PieChartPublicProps = { layoutMode: 'auto', plotTheme: { palette: ['red'] }, seriesStyle: { emphasis: { scale: false } } };
const themedLiquid: LiquidFillChartPublicProps = { unitTextStyle: { fontSize: 12 }, labelTextStyle: { color: 'blue' } };
// @ts-expect-error modes must remain a finite union
const badMode: PieChartPublicProps = { layoutMode: 'custom' };
// @ts-expect-error local series styles cannot replace geometry
const badSeriesStyle: PieChartPublicProps = { seriesStyle: { radius: 100 } };
// @ts-expect-error text sizing uses numeric pixels
const badTextStyle: GaugeChartPublicProps = { valueTextStyle: { fontSize: 'big' } };
import { createMapLines, validateMapData, createMapTransition, type MapNodeItem, type MapTransition, type MapTransitionDirection } from '@idux/charts/map';
const transition: MapTransition = createMapTransition(() => undefined, {duration: 0});
const direction: MapTransitionDirection = 'drilldown';
const completed: Promise<boolean> = transition.run(direction, async () => {});
transition.cancel();
transition.dispose();
// @ts-expect-error transition directions are a finite union
transition.run('sideways', () => {});
const map: MapChartPublicProps = {geo: {map: 'consumer-map'}, series: []};
const mapNodes: MapNodeItem[] = [{id: 'a', name: 'A', coordinate: [0, 0]}];
createMapLines([{source: 'a', target: 'a'}], {nodes: mapNodes});
validateMapData({nodes: mapNodes});
// @ts-expect-error map nodes must have a pair of numeric coordinates
const invalidMapNode: MapNodeItem = {id: 'a', name: 'A', coordinate: ['0', 0]};
// @ts-expect-error route references and standalone coordinates cannot be mixed
createMapLines([{source: 'a', target: 'a', coords: [[0, 0], [1, 1]]}]);
const liquid: LiquidFillChartPublicProps = { value: 20, waveAnimation: false };
// @ts-expect-error value must be numeric
const invalidGauge: GaugeChartPublicProps = { value: '20' };
// @ts-expect-error waveAnimation must be boolean
const invalidLiquid: LiquidFillChartPublicProps = { waveAnimation: 'yes' };
// @ts-expect-error gridStyle accepts only line or area
const invalidRadar: RadarChartPublicProps = { gridStyle: 'dotted' };
const chart: ChartPublicProps = { autoResize: true };
const bar: BarChartPublicProps = { data: [1, 2], barWidth: 10 };
const line: LineChartPublicProps = { autoResize: true, smooth: true, data: [1, 2] };
const pie: PieChartPublicProps = { data: [{ value: 1 }], roseType: 'radius', align: 'top-end' };
const hiddenPie: PieChartPublicProps = { title: null };
// @ts-expect-error align only accepts nine named positions
const badAlign: PieChartPublicProps = { align: 'left' };
// @ts-expect-error autoResize must retain its boolean type
const invalidChart: ChartPublicProps = { autoResize: 1 };
// @ts-expect-error smooth must retain its boolean/number type
const invalidLine: LineChartPublicProps = { smooth: 'yes' };
// @ts-expect-error named public types must reject unknown fields
const unknownField: BarChartPublicProps = { unknownOption: true };
`
// Supported consumers are pinned independently of the workspace development Vue.
// Keep this list synchronized with the compatibility matrix in ci.yml.
const targets = [
  ...['5.4.3', '6.1.0'].flatMap(echarts => [
    ['2.7.16', echarts, false],
    ['3.5.44', echarts, false],
  ]),
  ['2.6.14', '6.1.0', true],
]
// CI isolates each consumer in its own job; local runs still cover the complete matrix.
const target = process.env.IDUX_DECLARATION_TARGET
const selectedTargets = target
  ? targets.filter(([vue, echarts]) => `${vue}/${echarts}` === target)
  : targets
assert.ok(selectedTargets.length, `Unknown declaration target: ${target}`)
for (const [version, echartsVersion, adapter] of selectedTargets) {
  const app = join(work, `vue-${version}-echarts-${echartsVersion}`)
  mkdirSync(app)
  writeFileSync(
    join(app, 'package.json'),
    JSON.stringify(
      {
        private: true,
        type: 'module',
        dependencies: {
          '@idux/charts': tarballs.charts,
          '@idux/charts-core': tarballs.core,
          '@idux/charts-plots': tarballs.plots,
          echarts: echartsVersion,
          'lodash-es': '4.18.1',
          vue: version,
          'vue-demi': '0.14.10',
          ...(adapter ? { '@vue/composition-api': '1.7.2' } : {}),
        },
      },
      null,
      2,
    ),
  )
  writeFileSync(
    join(app, 'pnpm-workspace.yaml'),
    JSON.stringify(
      {
        packages: ['.'],
        autoInstallPeers: false,
        strictPeerDependencies: true,
        allowBuilds: { 'vue-demi': true },
        overrides: {
          '@idux/charts>@idux/charts-core': tarballs.core,
          '@idux/charts>@idux/charts-plots': tarballs.plots,
          '@idux/charts-plots>@idux/charts-core': tarballs.core,
        },
      },
      null,
      2,
    ),
  )
  run(['install', '--no-lockfile', '--no-frozen-lockfile'], app)
  writeFileSync(join(app, 'inferred-fixture.d.ts'), fixtureDeclaration)
  const scopedSlots = version.startsWith('2.') ? '$scopedSlots' : '$slots'
  const consumer = adapter
    ? adapterConsumer
    : `${adapterConsumer}
import { IxChart, IxBarChart, IxLineChart, IxAreaChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart, IxMapChart } from '@idux/charts';
import '@idux/charts/types';
import type { GlobalComponents } from 'vue';
import Fixture from './inferred-fixture';
import { defineComponent } from 'vue';
import type { VNode } from 'vue';
import type { EChartsType } from 'echarts/core';
${version.startsWith('2.') ? "import Vue from 'vue'; const app = Vue;" : "import { createApp } from 'vue'; const app = createApp({});"}
const chartComponents = [IxChart, IxBarChart, IxLineChart, IxAreaChart, IxPieChart, IxRadarChart, IxGaugeChart, IxBulletChart, IxLiquidFillChart, IxMapChart] as const;
for (const component of chartComponents) app.use(component);
declare const chartInstance: InstanceType<(typeof chartComponents)[number]>;
const echartsInstance: EChartsType | undefined = chartInstance.getEChartsInstance();
type BarProps = InstanceType<typeof IxBarChart>['$props'];
const globalBulletProps: InstanceType<GlobalComponents['IxBulletChart']>['$props'] = {value: 30, target: 80};
const globalProps: InstanceType<GlobalComponents['IxBarChart']>['$props'] = { autoResize: true };
// @ts-expect-error global component props must remain typed
const invalidGlobalProps: InstanceType<GlobalComponents['IxBarChart']>['$props'] = { autoResize: 123 };
const good: BarProps = { autoResize: true, data: [1, 2] };
// @ts-expect-error configuration props must remain typed on the component
const bad: BarProps = { autoResize: 123 };
type Resize<C extends new (...args: any[]) => any> = InstanceType<C>['$props']['autoResize'];
const chartResize: Resize<typeof IxChart> = true;
const lineResize: Resize<typeof IxLineChart> = true;
const areaResize: Resize<typeof IxAreaChart> = true;
const areaFill: InstanceType<typeof IxAreaChart>['$props']['area'] = 'striped';
// @ts-expect-error Area component fill must preserve the finite union
const badAreaComponentFill: InstanceType<typeof IxAreaChart>['$props']['area'] = 'solid';
const globalArea: InstanceType<GlobalComponents['IxAreaChart']>['$props'] = {categories:['A'],data:[1]};
// @ts-expect-error Area component resize remains boolean
const badAreaResize: Resize<typeof IxAreaChart> = 'yes';
const radarResize: Resize<typeof IxRadarChart> = true;
const gaugeResize: Resize<typeof IxGaugeChart> = true;
const bulletResize: Resize<typeof IxBulletChart> = true;
const cloudResize: Resize<typeof IxWordCloudChart> = true;
const globalCloudProps: InstanceType<GlobalComponents['IxWordCloudChart']>['$props'] = {shape:'circle',title:null,plotTheme:{palette:['#123456']},data:[{name:'A',value:1}]};
// @ts-expect-error cloud component props must remain typed
const invalidCloudComponent: InstanceType<typeof IxWordCloudChart>['$props'] = {shape:'star'};
// @ts-expect-error inferred component props must remain typed
const badBulletComponent: InstanceType<typeof IxBulletChart>['$props'] = {target: '85'};

const liquidResize: Resize<typeof IxLiquidFillChart> = true;
const pieResize: Resize<typeof IxPieChart> = true;
const pieAlign: InstanceType<typeof IxPieChart>['$props']['align'] = 'center';
const pieMode: InstanceType<typeof IxPieChart>['$props']['layoutMode'] = 'auto';
// @ts-expect-error component props must preserve the mode union
const invalidPieMode: InstanceType<typeof IxPieChart>['$props']['layoutMode'] = 'custom';
const gaugeText: InstanceType<typeof IxGaugeChart>['$props']['valueTextStyle'] = { fontSize: 24 };
// @ts-expect-error runtime declarations must not widen styles to any
const badGaugeText: InstanceType<typeof IxGaugeChart>['$props']['valueTextStyle'] = { fontSize: 'big' };
// @ts-expect-error liquid text sizes must remain numeric on the component
const badLiquidText: InstanceType<typeof IxLiquidFillChart>['$props']['unitTextStyle'] = { fontSize: 'big' };

// @ts-expect-error center is the canonical name for the middle position
const obsoletePieAlign: InstanceType<typeof IxPieChart>['$props']['align'] = 'center-center';
// @ts-expect-error align only accepts nine named positions
const badPieAlign: InstanceType<typeof IxPieChart>['$props']['align'] = 'left';
// @ts-expect-error line props must remain typed
const badLineResize: Resize<typeof IxLineChart> = 'yes';
// @ts-expect-error pie props must remain typed
const badPieResize: Resize<typeof IxPieChart> = 'yes';
const fixtureProps: InstanceType<typeof Fixture>['$props'] = { label: 'chart', autoResize: true };
// @ts-expect-error required runtime props must remain required
const missingLabel: InstanceType<typeof Fixture>['$props'] = { autoResize: true };
declare const instance: InstanceType<typeof Fixture>;
instance.$emit('change', 1);
// @ts-expect-error inferred event payload must remain numeric
instance.$emit('change', 'wrong');
// @ts-expect-error undeclared events must be rejected
instance.$emit('missing', 1);
declare const coreInstance: InstanceType<typeof IxChart>;
const coreSlotNodes: VNode[] | undefined = coreInstance.${scopedSlots}.default?.();
for (const component of chartComponents) {
  declareSlot(component);
}
function declareSlot(component: (typeof chartComponents)[number]) {
  const slots = (null! as InstanceType<typeof component>).${scopedSlots};
  const nodes: VNode[] | undefined = slots.default?.();
}
const nodes: VNode[] = instance.${scopedSlots}.default({ value: 1 });
// @ts-expect-error inferred scoped slot payload must remain numeric
instance.${scopedSlots}.default({ value: 'wrong' });
const result: 42 = instance.focus();
instance.count = 1;
const doubled: number = instance.doubled;
instance.increment(1);
// @ts-expect-error inferred method parameters must remain numeric
instance.increment('wrong');
defineComponent({ components: { Fixture, IxBarChart, IxLineChart, IxAreaChart, IxPieChart, IxChart } });
`
  const entry = join(app, 'consumer.ts')
  writeFileSync(entry, consumer)
  // Vue 2.6 consumes the standalone prop aliases through its existing adapter;
  // the default component declarations intentionally target Vue 2.7 and Vue 3.
  const program = ts.createProgram([entry], { ...options, noEmit: true, skipLibCheck: adapter })
  check(program)
  if (process.argv.includes('--runtime')) {
    await smokeRuntime(app)
    await smokeHooks(app)
    await smokeWordCloud(app)
    await checkLineBundle(app)
    console.log(
      `PASS Vue ${version} / ECharts ${echartsVersion}: packed JS render/update/theme/unmount/remount and composable-only tree shaking`,
    )
  }
  const demi = readFileSync(join(app, 'node_modules/vue-demi/lib/index.d.ts'), 'utf8')
  assert.ok(demi.includes(adapter ? '@vue/composition-api' : "from 'vue'"))
  console.log(
    `PASS Vue ${version} / ECharts ${echartsVersion}: ${adapter ? 'Vue 2.6 adapter prop aliases' : 'packed declarations, inferred props/events/slots/instance API (skipLibCheck=false)'}`,
  )
}
console.log(`Declaration consumer fixtures: ${work}`)
