import { _ as _export_sfc, E as createElementBlock, o as openBlock, G as createStaticVNode, a as _ } from "./_plugin-vue_export-helper.eb5450ce.js";
JSON.parse('{"title":"API","description":"","frontmatter":{"title":"API"},"headers":[{"level":3,"title":"IxLineChart","slug":"ixlinechart","link":"#ixlinechart","children":[]},{"level":3,"title":"useLineOption","slug":"uselineoption","link":"#uselineoption","children":[]}],"relativePath":"src/components/line/API.md"}');
const _sfc_main = { name: "API.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h3 id="ixlinechart" tabindex="-1">IxLineChart <a class="header-anchor" href="#ixlinechart" aria-hidden="true">#</a></h3><p>\u6298\u7EBF\u56FE\u7EC4\u4EF6\u3002</p><h4 id="linechartprops" tabindex="-1">LineChartProps <a class="header-anchor" href="#linechartprops" aria-hidden="true">#</a></h4><blockquote><p>\u9664\u4EE5\u4E0B\u8868\u683C\u4E4B\u5916\u8FD8\u652F\u6301 <code>ECharts</code> \u7684<a href="https://echarts.apache.org/zh/option.html" target="_blank" rel="noreferrer">\u6240\u6709\u914D\u7F6E</a>\u3002 \u9664\u4EE5\u4E0B\u8868\u683C\u4E4B\u5916\u8FD8\u652F\u6301 <code>AdditionalChartOption</code> \u7684<a href="/components/core.html#additionalchartoption">\u6240\u6709\u914D\u7F6E</a>\u3002 \u4E0B\u8868\u683C\u4E2D\u7684\u914D\u7F6E\uFF0C\u5176\u5B9E\u5C31\u662F <code>LineSeriesOption</code> \u4E2D\u7684<a href="https://echarts.apache.org/zh/option.html#series-line" target="_blank" rel="noreferrer">\u90E8\u5206\u914D\u7F6E</a></p></blockquote><table><thead><tr><th>\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u7C7B\u578B</th><th>\u9ED8\u8BA4\u503C</th><th>\u5168\u5C40\u914D\u7F6E</th><th>\u5907\u6CE8</th></tr></thead><tbody><tr><td><code>data</code></td><td>\u6570\u636E\u5185\u5BB9</td><td><code>Array</code></td><td>-</td><td>-</td><td>\u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.data" target="_blank" rel="noreferrer">series-line.data</a></td></tr><tr><td><code>areaStyle</code></td><td>\u533A\u57DF\u586B\u5145\u6837\u5F0F</td><td><code>AreaStyleOption</code></td><td>-</td><td>-</td><td>\u8BBE\u7F6E\u540E\u663E\u793A\u6210\u533A\u57DF\u9762\u79EF\u56FE,\u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.areaStyle" target="_blank" rel="noreferrer">series-line.areaStyle</a></td></tr><tr><td><code>label</code></td><td>\u56FE\u5F62\u4E0A\u7684\u6587\u672C\u6807\u7B7E</td><td><code>SeriesLabelOption</code></td><td>-</td><td>-</td><td>\u53EF\u7528\u4E8E\u8BF4\u660E\u56FE\u5F62\u7684\u4E00\u4E9B\u6570\u636E\u4FE1\u606F\uFF0C\u6BD4\u5982\u503C\uFF0C\u540D\u79F0\u7B49, \u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.label" target="_blank" rel="noreferrer">series-line.label</a></td></tr><tr><td><code>name</code></td><td>\u7CFB\u5217\u540D\u79F0</td><td><code>string</code></td><td>-</td><td>-</td><td>\u7528\u4E8E tooltip \u7684\u663E\u793A\uFF0Clegend \u7684\u56FE\u4F8B\u7B5B\u9009\uFF0C\u5728 setOption \u66F4\u65B0\u6570\u636E\u548C\u914D\u7F6E\u9879\u65F6\u7528\u4E8E\u6307\u5B9A\u5BF9\u5E94\u7684\u7CFB\u5217,\u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.name" target="_blank" rel="noreferrer">series-line.name</a></td></tr><tr><td><code>markArea</code></td><td>\u56FE\u8868\u6807\u57DF</td><td><code>MarkAreaOption </code></td><td>-</td><td>-</td><td>\u5E38\u7528\u4E8E\u6807\u8BB0\u56FE\u8868\u4E2D\u67D0\u4E2A\u8303\u56F4\u7684\u6570\u636E\uFF0C\u4F8B\u5982\u6807\u51FA\u67D0\u6BB5\u65F6\u95F4\u6295\u653E\u4E86\u5E7F\u544A, \u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.markArea" target="_blank" rel="noreferrer">series-line.markArea</a></td></tr><tr><td><code>smooth</code></td><td>\u662F\u5426\u5E73\u6ED1\u66F2\u7EBF\u663E\u793A</td><td><code>boolean</code></td><td>-</td><td>-</td><td>\u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.smooth" target="_blank" rel="noreferrer">series-line.smooth</a></td></tr><tr><td><code>stack</code></td><td>\u6570\u636E\u5806\u53E0</td><td><code>string</code></td><td>-</td><td>-</td><td>\u53C2\u89C1 <a href="https://echarts.apache.org/zh/option.html#series-line.stack" target="_blank" rel="noreferrer">series-line.stack</a></td></tr></tbody></table><h3 id="uselineoption" tabindex="-1">useLineOption <a class="header-anchor" href="#uselineoption" aria-hidden="true">#</a></h3><p>\u521B\u5EFA\u6298\u7EBF\u56FE\u914D\u7F6E\u7684\u51FD\u6570</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useLineOption</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LineSeriesOption</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">attrs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LineChartProps</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComputedRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">LineChartProps</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div>', 8);
const _hoisted_10 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_10);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/vm/workspace/vue/idux-charts/packages/site/src/components/line/API.md"]]);
const API = {
  "id": "archive-item-18",
  "filename": "API.md",
  "relativePath": "components/line/API.md",
  "query": {},
  instance: _("archive-vue-loader-0", Component)
};
export {
  API as default
};
