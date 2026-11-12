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
async function smokeRuntime(app) {
  writeFileSync(
    join(app, 'index.html'),
    '<div id="app"></div><script type="module" src="/main.js"></script>',
  )
  writeFileSync(
    join(app, 'main.js'),
    `
import { createApp, h, ref, isVue2 } from 'vue-demi';
import { IxChart, IxBarChart, IxLineChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart, PLOT_THEME_TOKEN } from '@idux/charts';
import { IxChart as Core } from '@idux/charts/core';
import { IxBarChart as Bar } from '@idux/charts/bar';
import { IxLineChart as Line, PLOT_THEME_TOKEN as LineTheme } from '@idux/charts/line';
import { IxPieChart as Pie } from '@idux/charts/pie';
import { IxRadarChart as Radar } from '@idux/charts/radar';
import { IxGaugeChart as Gauge } from '@idux/charts/gauge';
import { IxLiquidFillChart as LiquidFill } from '@idux/charts/liquid-fill';
import { getInstanceByDom } from 'echarts/core';
if ([Bar, Line, Pie, Radar, Gauge, LiquidFill].some((component, index) => component !==
    [IxBarChart, IxLineChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart][index]) ||
    Core !== IxChart || LineTheme !== PLOT_THEME_TOKEN) {
  throw new Error('Modular and aggregate imports must share the same component instances');
}
const revision = ref(0), dark = ref(false), mounted = ref(true);
const instances = [];
const kinds = [['core', IxChart], ['bar', IxBarChart], ['line', IxLineChart], ['area', IxLineChart], ['pie', IxPieChart], ['radar', IxRadarChart], ['gauge', IxGaugeChart], ['liquid-fill', IxLiquidFillChart]];
const button = (id, action) => h('button', isVue2 ? { attrs: {'data-testid': id}, on: {click: action} } : {'data-testid': id, onClick: action}, id);
const root = createApp({setup() { return () => h('main', {}, [
  button('update', () => revision.value++),
  button('theme', () => { dark.value = !dark.value }),
  button('mount', () => { mounted.value = !mounted.value }),
  ...(mounted.value ? kinds.map(([kind, component]) => {
    const data = [10 + revision.value, 20, 30];
    const props = {
      title: {text: kind + ' ' + revision.value}, animation: false, autoResize: true,
      initOption: {renderer: 'svg', width: 400, height: 240},
      setOptionOpts: {notMerge: kind !== 'area'},
      theme: dark.value ? 'dark' : 'seer', onReady: chart => instances.push(chart),
      ...(kind === 'core' ? {xAxis: {type: 'category', data: ['A', 'B', 'C']}, yAxis: {type: 'value'}, series: [{type: 'bar', data}]} :
        kind === 'radar' ? { indicator: ['A', 'B', 'C'].map(name => ({name, max: 100})), data: [{name: 'One', value: data}] } :
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
    return h('section', isVue2 ? {attrs: {'data-kind': kind}, style: {width: '400px', height: '240px'}} : {'data-kind': kind, style: {width: '400px', height: '240px'}},
      [h(component, isVue2 ? {attrs: props, ref: kind} : {...props, ref: kind})]);
  }) : []),
]) }}).mount('#app');
window.readCharts = () => Array.from(document.querySelectorAll('[data-kind]')).map(section => {
  const el = section.querySelector('[_echarts_instance_]');
  const chart = el && getInstanceByDom(el), option = chart?.getOption(), data = option?.series?.[0]?.data?.[0];
  return {id: chart?.id, title: option?.title?.[0]?.text, value: Array.isArray(data) ? data[0] : typeof data === 'object' ? (Array.isArray(data.value) ? data.value[0] : data.value) : data, paths: el?.querySelectorAll('svg path').length || 0, exposed: root.$refs[section.dataset.kind]?.getEChartsInstance() === chart};
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
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    const port = server.httpServer.address().port
    await page.goto(`http://127.0.0.1:${port}/`)
    const state = () => page.evaluate(() => window.readCharts())
    await expect
      .poll(async () => (await state()).map(chart => chart.paths > 0))
      .toEqual([true, true, true, true, true, true, true, true])
    expect((await state()).map(chart => chart.exposed)).toEqual(Array(8).fill(true))
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
    await page.getByTestId('update').click()
    await expect
      .poll(async () => (await state()).map(chart => chart.title))
      .toEqual([
        'core 1',
        'bar 1',
        'line 1',
        'area 1',
        'pie 1',
        'radar 1',
        'gauge 1',
        'liquid-fill 1',
      ])
    await expect
      .poll(async () => (await state()).map(chart => chart.value))
      .toEqual([11, 11, 11, 11, 11, 11, 0.11, 0.11])
    await expect.poll(() => page.evaluate(() => window.areaSeriesCount())).toBe(1)
    expect(await page.evaluate(() => window.areaZoom())).toBe(areaZoom)
    const before = await state()
    await page.getByTestId('theme').click()
    await expect
      .poll(async () => (await state()).every((chart, i) => chart.id && chart.id !== before[i].id))
      .toBe(true)
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
        'pie 1',
        'radar 1',
        'gauge 1',
        'liquid-fill 1',
      ])
    expect(errors).toEqual([])
  } finally {
    await browser.close()
    await new Promise((resolve, reject) =>
      server.httpServer.close(error => (error ? reject(error) : resolve())),
    )
  }
}

async function checkLineBundle(app) {
  const entry = join(app, 'line-entry.js')
  const sizes = {}
  for (const [label, path, imports] of [
    ['line', '@idux/charts/line', 'IxLineChart'],
    [
      'all',
      '@idux/charts',
      'IxBarChart, IxLineChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart',
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
    if (label === 'line') {
      const modules = chunks.flatMap(chunk => Object.keys(chunk.modules))
      assert.ok(modules.some(id => id.endsWith('/echarts/lib/chart/line/install.js')))
      assert.deepEqual(
        modules.filter(id => /\/echarts\/lib\/chart\/(bar|pie|radar|gauge)\/install\.js$/.test(id)),
        [],
        'The line subpath must exclude unrelated ECharts series',
      )
    }
  }
  assert.ok(sizes.line < sizes.all, 'The line subpath must produce a smaller JS bundle')
}

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
import { provide, ref } from 'vue-demi';
import { CHART_THEME_TOKEN, type ChartTheme } from '@idux/charts';
provide(CHART_THEME_TOKEN, ref<ChartTheme>('dark'));
provide(CHART_THEME_TOKEN, { darkMode: true, textStyle: { color: '#fff' } });
// @ts-expect-error themes must be names or objects, not numbers
provide(CHART_THEME_TOKEN, 42);
import type { ChartPublicProps, BarChartPublicProps, LineChartPublicProps, PieChartPublicProps, RadarChartPublicProps, GaugeChartPublicProps, LiquidFillChartPublicProps } from '@idux/charts';
import type { LineChartPublicProps as ModularLineProps } from '@idux/charts/line';
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
const targets = [
  ...['5.4.3', '6.0.0'].flatMap(echarts => [
    ['2.7.16', echarts, false],
    ['3.5.44', echarts, false],
  ]),
  ['2.6.14', '6.0.0', true],
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
          'lodash-es': '4.17.21',
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
import { IxChart, IxBarChart, IxLineChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart } from '@idux/charts';
import '@idux/charts/types';
import type { GlobalComponents } from 'vue';
import Fixture from './inferred-fixture';
import { defineComponent } from 'vue';
import type { VNode } from 'vue';
import type { EChartsType } from 'echarts/core';
${version.startsWith('2.') ? "import Vue from 'vue'; const app = Vue;" : "import { createApp } from 'vue'; const app = createApp({});"}
const chartComponents = [IxChart, IxBarChart, IxLineChart, IxPieChart, IxRadarChart, IxGaugeChart, IxLiquidFillChart] as const;
for (const component of chartComponents) app.use(component);
declare const chartInstance: InstanceType<(typeof chartComponents)[number]>;
const echartsInstance: EChartsType | undefined = chartInstance.getEChartsInstance();
type BarProps = InstanceType<typeof IxBarChart>['$props'];
const globalProps: InstanceType<GlobalComponents['IxBarChart']>['$props'] = { autoResize: true };
// @ts-expect-error global component props must remain typed
const invalidGlobalProps: InstanceType<GlobalComponents['IxBarChart']>['$props'] = { autoResize: 123 };
const good: BarProps = { autoResize: true, data: [1, 2] };
// @ts-expect-error configuration props must remain typed on the component
const bad: BarProps = { autoResize: 123 };
type Resize<C extends new (...args: any[]) => any> = InstanceType<C>['$props']['autoResize'];
const chartResize: Resize<typeof IxChart> = true;
const lineResize: Resize<typeof IxLineChart> = true;
const radarResize: Resize<typeof IxRadarChart> = true;
const gaugeResize: Resize<typeof IxGaugeChart> = true;
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
const nodes: VNode[] = instance.${scopedSlots}.default({ value: 1 });
// @ts-expect-error inferred scoped slot payload must remain numeric
instance.${scopedSlots}.default({ value: 'wrong' });
const result: 42 = instance.focus();
instance.count = 1;
const doubled: number = instance.doubled;
instance.increment(1);
// @ts-expect-error inferred method parameters must remain numeric
instance.increment('wrong');
defineComponent({ components: { Fixture, IxBarChart, IxLineChart, IxPieChart, IxChart } });
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
