import { _ as _export_sfc, o as openBlock, b as createElementBlock, e as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-ea9817b5.js";
JSON.parse('{"title":"API","description":"","frontmatter":{"title":"API"},"headers":[{"level":3,"title":"IxPieChart","slug":"ixpiechart","link":"#ixpiechart","children":[]},{"level":3,"title":"usePieOption","slug":"usepieoption","link":"#usepieoption","children":[]}],"relativePath":"src/components/pie/API.md"}');
const _sfc_main = { name: "API.md" };
const _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
    createStaticVNode('<h3 id="ixpiechart" tabindex="-1">IxPieChart <a class="header-anchor" href="#ixpiechart" aria-hidden="true">#</a></h3><p>折线图组件。</p><h4 id="piechartprops" tabindex="-1">PieChartProps <a class="header-anchor" href="#piechartprops" aria-hidden="true">#</a></h4><blockquote><p>除以下表格之外还支持 <code>ECharts</code> 的<a href="https://echarts.apache.org/zh/option.html" target="_blank" rel="noreferrer">所有配置</a>。 除以下表格之外还支持 <code>AdditionalChartOption</code> 的<a href="/common/idux-charts/components/core.html#additionalchartoption">所有配置</a>。 下表格中的配置，其实就是 <code>PieSeriesOption</code> 中的<a href="https://echarts.apache.org/zh/option.html#series-pie" target="_blank" rel="noreferrer">部分配置</a></p></blockquote><table><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th><th>全局配置</th><th>备注</th></tr></thead><tbody><tr><td><code>data</code></td><td>数据内容</td><td><code>Array</code></td><td>-</td><td>-</td><td>参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.data" target="_blank" rel="noreferrer">series-pie.data</a></td></tr><tr><td><code>center</code></td><td>饼图的中心（圆心）坐标</td><td><code>Array</code></td><td>-</td><td>-</td><td>数组的第一项是横坐标，第二项是纵坐标，参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.center" target="_blank" rel="noreferrer">series-pie.center</a></td></tr><tr><td><code>label</code></td><td>图形上的文本标签</td><td><code>SeriesLabelOption</code></td><td>-</td><td>-</td><td>可用于说明图形的一些数据信息，比如值，名称等, 参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.label" target="_blank" rel="noreferrer">series-pie.label</a></td></tr><tr><td><code>name</code></td><td>系列名称</td><td><code>string</code></td><td>-</td><td>-</td><td>用于 tooltip 的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列,参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.name" target="_blank" rel="noreferrer">series-pie.name</a></td></tr><tr><td><code>markArea</code></td><td>图表标域</td><td><code>MarkAreaOption </code></td><td>-</td><td>-</td><td>常用于标记图表中某个范围的数据，例如标出某段时间投放了广告, 参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.markArea" target="_blank" rel="noreferrer">series-pie.markArea</a></td></tr><tr><td><code>radius</code></td><td>饼图的半径</td><td><code>number | string | Array</code></td><td><code>[&#39;70%&#39;, &#39;80%&#39;]</code></td><td>-</td><td>参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.radius" target="_blank" rel="noreferrer">series-pie.radius</a></td></tr><tr><td><code>roseType</code></td><td>是否展示成南丁格尔图</td><td><code>boolean</code></td><td>-</td><td>-</td><td>参见 <a href="https://echarts.apache.org/zh/option.html#series-pie.roseType" target="_blank" rel="noreferrer">series-pie.roseType</a></td></tr></tbody></table><h3 id="usepieoption" tabindex="-1">usePieOption <a class="header-anchor" href="#usepieoption" aria-hidden="true">#</a></h3><p>创建折线图配置的函数</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">usePieOption</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PieSeriesOption</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">attrs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PieChartProps</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComputedRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">PieChartProps</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div>', 8)
  ]));
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/work/codes/idux-charts/packages/site/src/components/pie/API.md"]]);
const __archive_data__ = {
  "id": "archive-item-34",
  "filename": "API.md",
  "relativePath": "components/pie/API.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
