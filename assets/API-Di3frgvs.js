import { t as Ui } from "./client-CMWdSpQf.js";
import { Ar as createElementBlock, Jr as openBlock, bt as _plugin_vue_export_helper_default, jr as createStaticVNode } from "./app-default-_3RnZ9LU.js";
JSON.parse("{\"title\":\"API\",\"description\":\"\",\"frontmatter\":{\"title\":\"API\"},\"headers\":[],\"relativePath\":\"src/components/area/API.md\"}");
var _sfc_main = { name: "API.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<p>面积图使用 <a href=\"/components/line.html\">IxLineChart</a> 的 <code>area</code>、<code>smooth</code> 和 <code>stack</code>，与折线图共用数据、缩略轴、图例和缺失点处理。传入 <code>area</code> 使用渐变填充，传入 <code>area=&quot;striped&quot;</code> 使用条纹填充。多条系列使用相同的 <code>stack</code> 名称即可堆叠。</p><p>面积图的深浅条纹各宽 2 px。堆叠面积的填充从层顶延续到层底，单系列面积的填充从面积顶部渐隐至底边。</p><div class=\"language-vue\"><button title=\"Copy Code\" class=\"copy\"></button><span class=\"lang\">vue</span><pre class=\"shiki\"><code><span class=\"line\"><span style=\"color:#A6ACCD;\">&lt;IxLineChart</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">  :categories=&quot;[&#39;07-01&#39;, &#39;07-02&#39;, &#39;07-03&#39;]&quot;</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">  :series=&quot;[</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">    { name: &#39;迅雷&#39;, data: [24, 30, 36], stack: &#39;total&#39; },</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">    { name: &#39;微信&#39;, data: [16, 18, 29], stack: &#39;total&#39; },</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">  ]&quot;</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">  area=&quot;striped&quot;</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">  :data-zoom=&quot;{ type: &#39;slider&#39; }&quot;</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">  style=&quot;height: 320px&quot;</span></span>\n<span class=\"line\"><span style=\"color:#A6ACCD;\">/&gt;</span></span>\n<span class=\"line\"></span></code></pre></div>", 3)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/area/API.md__resolved
var __archive_data__ = {
	"id": "archive-item-32",
	"filename": "API.md",
	"relativePath": "components/area/API.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/area/API.md"]]))
};
export { __archive_data__ as default };
