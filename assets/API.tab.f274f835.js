import { _ as _export_sfc, E as createElementBlock, o as openBlock, G as createStaticVNode, a as _ } from "./_plugin-vue_export-helper.eb5450ce.js";
JSON.parse('{"title":"API","description":"","frontmatter":{"title":"API"},"headers":[{"level":3,"title":"IxChart","slug":"ixchart","link":"#ixchart","children":[]},{"level":3,"title":"useChart","slug":"usechart","link":"#usechart","children":[]}],"relativePath":"src/components/core/API.tab.md"}');
const _sfc_main = { name: "API.tab.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h3 id="ixchart" tabindex="-1">IxChart <a class="header-anchor" href="#ixchart" aria-hidden="true">#</a></h3><p>\u57FA\u7840\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u6B64\u7EC4\u4EF6\u5B9E\u73B0\u6240\u6709 <code>ECharts</code> \u7684\u56FE\u8868\u3002</p><h4 id="chartprops" tabindex="-1">ChartProps <a class="header-anchor" href="#chartprops" aria-hidden="true">#</a></h4><p>\u652F\u6301 <code>ECharts</code> \u7684<a href="https://echarts.apache.org/zh/option.html" target="_blank" rel="noreferrer">\u6240\u6709\u914D\u7F6E</a>\u3002</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChartProps</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChartOption</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AdditionalChartOption</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChartOption</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComposeOption</span><span style="color:#89DDFF;">&lt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DatasetComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DataZoomComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GridComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LegendComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TitleComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TooltipComponentOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BarSeriesOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PieSeriesOption</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LineSeriesOption</span></span>\n<span class="line"><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h4 id="additionalchartoption" tabindex="-1">AdditionalChartOption <a class="header-anchor" href="#additionalchartoption" aria-hidden="true">#</a></h4><table><thead><tr><th>\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u7C7B\u578B</th><th>\u9ED8\u8BA4\u503C</th><th>\u5168\u5C40\u914D\u7F6E</th><th>\u5907\u6CE8</th></tr></thead><tbody><tr><td><code>autoResize</code></td><td>\u662F\u5426\u5F00\u542F\u81EA\u52A8 resize</td><td><code>boolean</code></td><td><code>true</code></td><td>\u2705</td><td>-</td></tr><tr><td><code>group</code></td><td>\u56FE\u8868\u7684\u5206\u7EC4</td><td><code>string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td><code>initOption</code></td><td>\u56FE\u8868\u7528\u4E8E\u521D\u59CB\u5316\u7684\u914D\u7F6E</td><td><code>ChartInitOption</code></td><td>-</td><td>\u2705</td><td>\u4E5F\u5C31\u662F <code>ECharts.init</code> \u7684\u7B2C\u4E09\u4E2A\u53C2\u6570\uFF0C\u53C2\u89C1 <a href="https://echarts.apache.org/zh/api.html#echarts.init" target="_blank" rel="noreferrer">echarts.init</a></td></tr><tr><td><code>loading</code></td><td>\u662F\u5426\u663E\u793A\u52A0\u8F7D\u4E2D\u72B6\u6001</td><td><code>boolean </code></td><td>-</td><td>-</td><td>-</td></tr><tr><td><code>setOptionOpts</code></td><td>\u56FE\u8868\u5B9E\u4F8B setOption \u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570</td><td><code>SetOptionOpts</code></td><td>-</td><td>-</td><td>\u53C2\u89C1 <a href="https://echarts.apache.org/zh/api.html#echartsInstance.setOption" target="_blank" rel="noreferrer">echartsInstance.setOption</a></td></tr><tr><td><code>theme</code></td><td>\u56FE\u8868\u7684\u4E3B\u9898</td><td><code>ChartTheme</code></td><td><code>&#39;seer&#39;</code></td><td>\u2705</td><td>-</td></tr><tr><td><code>onReady</code></td><td>\u56FE\u8868\u6E32\u67D3\u5B8C\u6210\u6267\u884C\u56DE\u8C03</td><td><code>(chart: EChartsType) =&gt; void</code></td><td>-</td><td>-</td><td>\u53EF\u4EE5\u901A\u8FC7\u8BE5\u56DE\u8C03\u51FD\u6570\u62FF\u83B7\u53D6\u5230\u56FE\u8868\u5B9E\u4F8B</td></tr></tbody></table><h3 id="usechart" tabindex="-1">useChart <a class="header-anchor" href="#usechart" aria-hidden="true">#</a></h3><p>\u521B\u5EFA\u56FE\u8868\u914D\u7F6E\u7684\u51FD\u6570\uFF0C\u53EF\u4EE5\u66F4\u52A0\u7075\u6D3B\u7684\u5904\u7406\u56FE\u8868\u7684\u914D\u7F6E</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useChart</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MaybeRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ChartProps</span><span style="color:#89DDFF;">&gt;):</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">containerRef</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShallowRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HTMLDivElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">chartRef</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShallowRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">EChartsType</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div>', 10);
const _hoisted_12 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_12);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/vm/workspace/vue/idux-charts/packages/site/src/components/core/API.tab.md"]]);
const API_tab = {
  "id": "archive-item-11",
  "filename": "API.tab.md",
  "relativePath": "components/core/API.tab.md",
  "query": {},
  instance: _("archive-vue-loader-0", Component)
};
export {
  API_tab as default
};
