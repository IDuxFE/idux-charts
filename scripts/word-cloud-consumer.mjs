import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { build, preview } from 'vite'
import { chromium, expect } from '@playwright/test'

/** Exercise packed word-cloud entries in each isolated Vue/ECharts consumer. */
export async function smokeWordCloud(app) {
  writeFileSync(
    join(app, 'index.html'),
    '<div id="app"></div><script type="module" src="/main.js"></script>',
  )
  writeFileSync(
    join(app, 'main.js'),
    `
import {createApp,h,ref,isVue2} from 'vue-demi';
import {IxWordCloudChart as Aggregate, getAlphaColor, seerColors} from '@idux/charts';
import {IxWordCloudChart} from '@idux/charts/word-cloud';
import {getInstanceByDom} from 'echarts/core';
if (Aggregate !== IxWordCloudChart) throw new Error('Word-cloud entry identities differ');
const revision=ref(0), dark=ref(false), mounted=ref(true), appearance=ref(false), floating=ref(false), instances=[];
const button=(name,fn)=>h('button',isVue2?{attrs:{'data-testid':name},on:{click:fn}}:{'data-testid':name,onClick:fn},name);
createApp({setup:()=>()=>h('main',{},[
  button('update',()=>revision.value++),button('theme',()=>dark.value=!dark.value),button('mount',()=>mounted.value=!mounted.value),
  button('appearance',()=>appearance.value=!appearance.value),
  button('motion',()=>floating.value=!floating.value),
  ...(mounted.value?['text','rect','circle'].map(shape=>{
    const props={shape,animation:floating.value,animationDuration:0,animationDurationUpdate:0,
      motion:floating.value&&{pauseOnHover:false},selectedMode:'multiple',top:16,bottom:40,
      title:appearance.value?null:{text:'Cloud title'},
      plotTheme:appearance.value?{palette:['#123456','#abcdef'],color:'#ff0000'}:undefined,
      theme:dark.value?'dark':'seer',initOption:{renderer:'svg',width:500,height:300},onReady:c=>instances.push(c),
      data:[{id:'a',name:'Analysis',value:100+revision.value,category:0,business:'raw'},
        {id:'b',name:'Experience',value:60,category:1},{id:'c',name:'Zero',value:0,category:1}],
      categories:[{name:'Risk'},{name:'Safe'}],legend:{bottom:0,data:['Risk','Safe']},
      label:{formatter:p=>{if(Array.isArray(p.value)||p.data.business&&p.data.business!=='raw')throw new Error('Raw data lost');return p.name;}},
      emphasis:{scale:false,label:{color:'#fff',backgroundColor:'#1F6BFF',padding:[2,4]}},
    };
    return h('section',isVue2?{attrs:{'data-shape':shape}}:{'data-shape':shape},[
      h(IxWordCloudChart,isVue2?{attrs:props}:props)
    ]);
  }):[])
])}).mount('#app');
const chart=shape=>getInstanceByDom(document.querySelector('[data-shape="'+shape+'"] [_echarts_instance_]'));
window.cloudState=()=>['text','rect','circle'].map(shape=>{
 const c=chart(shape),s=c.getModel().getSeriesByIndex(0),d=s.getData();
 return {shape,id:c.id,value:c.getOption().series[0].data[0].value,background:c.getOption().series[0].itemStyle.color,backgroundOpacity:c.getOption().series[0].itemStyle.opacity,selected:s.isSelected(1),count:d.count(),
   titles:c.getOption().title?.length??0,
   fills:Array.from({length:d.count()},(_,i)=>d.getItemVisual(i,'style').fill),
   positions:Array.from({length:d.count()},(_,i)=>d.getItemLayout(i)),
   drawn:Array.from({length:d.count()},(_,i)=>!!d.getItemGraphicEl(i)),
   text:document.querySelector('[data-shape="'+shape+'"]').textContent};
});
window.cloudHighlight=()=>chart('text').dispatchAction({type:'highlight',seriesIndex:0,dataIndex:0});
window.cloudSelect=()=>['text','rect','circle'].forEach(shape=>chart(shape).dispatchAction({type:'select',seriesIndex:0,dataIndex:1}));
window.cloudFilter=()=>chart('rect').dispatchAction({type:'legendUnSelect',name:'Risk'});
window.cloudResize=()=>['text','rect','circle'].forEach(shape=>chart(shape).resize({width:300,height:220}));
window.cloudDisposed=()=>instances.every(c=>c.isDisposed());
window.cloudMotion=()=>['text','rect','circle'].map(shape=>{
 const d=chart(shape).getModel().getSeriesByIndex(0).getData();
 return Array.from({length:d.count()},(_,i)=>{
   const p=d.getItemGraphicEl(i)?.childAt(0);
   return p?{offset:[p.x,p.y],loop:p.animators.some(a=>a.scope==='ix-word-cloud-motion'&&a.getLoop())}:null;
 });
});
window.cloudDarkFill=getAlphaColor(seerColors[0],0.2);
window.cloudPrimary=seerColors[0];
window.cloudShowTooltip=()=>chart('text').dispatchAction({type:'showTip',seriesIndex:0,dataIndex:0});
window.cloudTooltip=()=>{
 const el=document.querySelector('[data-shape="text"] .ix-chart-tooltip');
 return {title:el?.querySelector('.charts-tooltips-title')?.textContent,
   value:el?.querySelector('.charts-tooltips-item-value')?.textContent,
   theme:el?.dataset.ixChartTheme};
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
  let browser
  try {
    browser = await chromium.launch()
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/`)
    const state = () => page.evaluate(() => window.cloudState())
    await expect
      .poll(async () => (await state()).map(item => item.drawn))
      .toEqual(Array.from({ length: 3 }, () => [true, true, true]))
    expect((await state()).every(item => item.text.includes('Analysis'))).toBe(true)
    expect((await state()).every(item => item.text.includes('Cloud title'))).toBe(true)
    await page.evaluate(() => window.cloudShowTooltip())
    await expect
      .poll(() => page.evaluate(() => window.cloudTooltip()))
      .toMatchObject({ title: 'Analysis', value: '100', theme: 'light' })
    const before = await state()
    await page.evaluate(() => window.cloudHighlight())
    expect((await state()).map(item => item.positions)).toEqual(before.map(item => item.positions))
    await page.evaluate(() => window.cloudSelect())
    await expect
      .poll(async () => (await state()).map(item => item.selected))
      .toEqual([true, true, true])
    await page.getByTestId('update').click()
    await expect.poll(async () => (await state()).map(item => item.value)).toEqual([101, 101, 101])
    expect((await state()).map(item => item.selected)).toEqual([true, true, true])
    const old = await state()
    await page.getByTestId('theme').click()
    await expect
      .poll(async () => (await state()).map((item, index) => item.id !== old[index].id))
      .toEqual([true, true, true])
    expect((await state()).map(item => item.selected)).toEqual([true, true, true])
    expect((await state()).find(item => item.shape === 'rect')).toMatchObject({
      background: await page.evaluate(() => window.cloudPrimary),
      backgroundOpacity: 0.15,
    })
    expect((await state()).find(item => item.shape === 'circle').background).toBe(
      await page.evaluate(() => window.cloudDarkFill),
    )
    await page.evaluate(() => window.cloudShowTooltip())
    await expect
      .poll(() => page.evaluate(() => window.cloudTooltip()))
      .toMatchObject({ title: 'Analysis', value: '101', theme: 'dark' })
    const themed = await state()
    await page.getByTestId('appearance').click()
    await expect
      .poll(async () => (await state()).map(item => ({ titles: item.titles, fills: item.fills })))
      .toEqual(
        Array.from({ length: 3 }, () => ({
          titles: 0,
          fills: ['#123456', '#abcdef', '#abcdef'],
        })),
      )
    expect((await state()).every(item => !item.text.includes('Cloud title'))).toBe(true)
    expect((await state()).map(item => item.selected)).toEqual([true, true, true])
    await page.getByTestId('appearance').click()
    await expect.poll(async () => (await state()).map(item => item.titles)).toEqual([1, 1, 1])
    expect((await state()).every(item => item.text.includes('Cloud title'))).toBe(true)
    expect((await state()).map(item => item.fills)).toEqual(themed.map(item => item.fills))
    expect((await state()).find(item => item.shape === 'rect')).toMatchObject({
      background: await page.evaluate(() => window.cloudPrimary),
      backgroundOpacity: 0.15,
    })
    expect((await state()).find(item => item.shape === 'circle').background).toBe(
      await page.evaluate(() => window.cloudDarkFill),
    )
    await page.evaluate(() => window.cloudFilter())
    await expect.poll(async () => (await state())[1].count).toBe(2)
    await page.evaluate(() => window.cloudResize())
    expect(
      (await state()).every(item =>
        item.positions.every((point, index) =>
          item.drawn[index] ? point.every(Number.isFinite) : !point.every(Number.isFinite),
        ),
      ),
    ).toBe(true)
    await page.getByTestId('mount').click()
    await expect.poll(() => page.evaluate(() => window.cloudDisposed())).toBe(true)
    await page.getByTestId('mount').click()
    await expect
      .poll(async () => (await state()).map(item => item.drawn))
      .toEqual(Array.from({ length: 3 }, () => [true, true, true]))
    await page.getByTestId('motion').click()
    await expect
      .poll(() =>
        page.evaluate(() => window.cloudMotion().every(rows => rows.every(row => row?.loop))),
      )
      .toBe(true)
    const offsets = await page.evaluate(() => window.cloudMotion().map(rows => rows[0].offset))
    await expect
      .poll(() =>
        page.evaluate(
          before =>
            window
              .cloudMotion()
              .every(
                (rows, index) =>
                  Math.hypot(
                    rows[0].offset[0] - before[index][0],
                    rows[0].offset[1] - before[index][1],
                  ) > 0.1,
              ),
          offsets,
        ),
      )
      .toBe(true)
    await page.evaluate(() => window.cloudResize())
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.cloudMotion().every(rows => rows.filter(Boolean).every(row => row.loop)),
        ),
      )
      .toBe(true)
    await page.getByTestId('mount').click()
    await expect.poll(() => page.evaluate(() => window.cloudDisposed())).toBe(true)
    await page.getByTestId('mount').click()
    await expect
      .poll(() =>
        page.evaluate(() => window.cloudMotion().every(rows => rows.every(row => row?.loop))),
      )
      .toBe(true)
    expect(errors).toEqual([])
  } finally {
    await browser?.close()
    await new Promise((resolve, reject) =>
      server.httpServer.close(error => (error ? reject(error) : resolve())),
    )
  }
}
