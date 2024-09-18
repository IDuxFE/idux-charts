import { _ as _export_sfc, o as openBlock, b as createElementBlock, e as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-ea9817b5.js";
JSON.parse('{"title":"API","description":"","frontmatter":{"title":"API"},"headers":[{"level":3,"title":"IxChart","slug":"ixchart","link":"#ixchart","children":[]},{"level":3,"title":"useChart","slug":"usechart","link":"#usechart","children":[]}],"relativePath":"src/components/core/API.tab.md"}');
const _sfc_main = { name: "API.tab.md" };
const _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
    createStaticVNode('<h3 id="ixchart" tabindex="-1">IxChart <a class="header-anchor" href="#ixchart" aria-hidden="true">#</a></h3><p>基础组件，可以使用此组件实现所有 <code>ECharts</code> 的图表。</p><h4 id="chartprops" tabindex="-1">ChartProps <a class="header-anchor" href="#chartprops" aria-hidden="true">#</a></h4><p>支持 <code>ECharts</code> 的<a href="https://echarts.apache.org/zh/option.html" target="_blank" rel="noreferrer">所有配置</a>。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChartProps</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChartOption</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AdditionalChartOption</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChartOption</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComposeOption</span><span style="color:#89DDFF;">&lt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DatasetComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DataZoomComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GridComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LegendComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TitleComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TooltipComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BarSeriesOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PieSeriesOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LineSeriesOption</span></span>\n<span class="line"><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h4 id="additionalchartoption" tabindex="-1">AdditionalChartOption <a class="header-anchor" href="#additionalchartoption" aria-hidden="true">#</a></h4><table><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th><th>全局配置</th><th>备注</th></tr></thead><tbody><tr><td><code>autoResize</code></td><td>是否开启自动 resize</td><td><code>boolean</code></td><td><code>true</code></td><td>✅</td><td>-</td></tr><tr><td><code>group</code></td><td>图表的分组</td><td><code>string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td><code>initOption</code></td><td>图表用于初始化的配置</td><td><code>ChartInitOption</code></td><td>-</td><td>✅</td><td>也就是 <code>ECharts.init</code> 的第三个参数，参见 <a href="https://echarts.apache.org/zh/api.html#echarts.init" target="_blank" rel="noreferrer">echarts.init</a></td></tr><tr><td><code>loading</code></td><td>是否显示加载中状态</td><td><code>boolean </code></td><td>-</td><td>-</td><td>-</td></tr><tr><td><code>setOptionOpts</code></td><td>图表实例 setOption 的第二个参数</td><td><code>SetOptionOpts</code></td><td>-</td><td>-</td><td>参见 <a href="https://echarts.apache.org/zh/api.html#echartsInstance.setOption" target="_blank" rel="noreferrer">echartsInstance.setOption</a></td></tr><tr><td><code>theme</code></td><td>图表的主题</td><td><code>ChartTheme</code></td><td><code>&#39;seer&#39;</code></td><td>✅</td><td>-</td></tr><tr><td><code>onReady</code></td><td>图表渲染完成执行回调</td><td><code>(chart: EChartsType) =&gt; void</code></td><td>-</td><td>-</td><td>可以通过该回调函数拿获取到图表实例</td></tr></tbody></table><h3 id="usechart" tabindex="-1">useChart <a class="header-anchor" href="#usechart" aria-hidden="true">#</a></h3><p>创建图表配置的函数，可以更加灵活的处理图表的配置</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useChart</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MaybeRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ChartProps</span><span style="color:#89DDFF;">&gt;):</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">containerRef</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShallowRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HTMLDivElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">chartRef</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShallowRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">EChartsType</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div>', 10)
  ]));
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/work/codes/idux-charts/packages/site/src/components/core/API.tab.md"]]);
const __archive_data__ = {
  "id": "archive-item-14",
  "filename": "API.tab.md",
  "relativePath": "components/core/API.tab.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};