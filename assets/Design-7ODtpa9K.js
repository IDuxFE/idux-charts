import { t as Ui } from "./client-DEcWQYNR.js";
import { Dn as createElementBlock, Gn as openBlock, On as createStaticVNode, c as _plugin_vue_export_helper_default } from "./app-default-CCjST5KB.js";
// src/components/word-cloud/assets/1.png
var _1_default = "/assets/1-C0M3MFk8.png";
// src/components/word-cloud/assets/2.png
var _2_default = "/assets/2-C22A_IFF.png";
// src/components/word-cloud/assets/3.png
var _3_default = "/assets/3-D5jFrYw-.png";
// src/components/word-cloud/assets/4.png
var _4_default = "/assets/4-CCGQInQn.png";
JSON.parse("{\"title\":\"设计指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"设计指南\"},\"headers\":[{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":3,\"title\":\"组件构成\",\"slug\":\"组件构成\",\"link\":\"#组件构成\",\"children\":[]},{\"level\":3,\"title\":\"组件类型\",\"slug\":\"组件类型\",\"link\":\"#组件类型\",\"children\":[]}],\"relativePath\":\"src/components/word-cloud/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<p data-v-5da7afb2>词云图是将词汇按照频率高低显示为不同大小而形成的可视化图表，适用于统计文本中出现词汇的规模大小，强调词汇的重要性和相关性。</p><h3 id=\"使用场景\" tabindex=\"-1\" data-v-5da7afb2>使用场景 <a class=\"header-anchor\" href=\"#使用场景\" aria-hidden=\"true\" data-v-5da7afb2>#</a></h3><p data-v-5da7afb2>用于对描述性文案做统计与展示，并支持搜索，可适用于以下场景：</p><ul data-v-5da7afb2><li data-v-5da7afb2>可视化统计：用于总览页、列表的可视化统计，通常统计某事件、对象的数量。</li><li data-v-5da7afb2>大屏展示：用于在可视化大屏中展示某事件、对象的数量。</li></ul><h3 id=\"组件构成\" tabindex=\"-1\" data-v-5da7afb2>组件构成 <a class=\"header-anchor\" href=\"#组件构成\" aria-hidden=\"true\" data-v-5da7afb2>#</a></h3><table data-v-5da7afb2><thead data-v-5da7afb2><tr data-v-5da7afb2><th data-v-5da7afb2>序号</th><th data-v-5da7afb2>名称</th><th data-v-5da7afb2>说明</th></tr></thead><tbody data-v-5da7afb2><tr data-v-5da7afb2><td data-v-5da7afb2>1</td><td data-v-5da7afb2>文字</td><td data-v-5da7afb2>展示具体的文字内容。</td></tr><tr data-v-5da7afb2><td data-v-5da7afb2>2</td><td data-v-5da7afb2>图形</td><td data-v-5da7afb2>一般为矩形，也可由其他形状组成。</td></tr><tr data-v-5da7afb2><td data-v-5da7afb2>3</td><td data-v-5da7afb2>图例（可选）</td><td data-v-5da7afb2>用于解释图表中的分类维度信息。</td></tr></tbody></table><p data-v-5da7afb2><img src=\"" + _1_default + "\" alt=\"词云图组件构成：文字、图形和图例\" data-v-5da7afb2></p><h3 id=\"组件类型\" tabindex=\"-1\" data-v-5da7afb2>组件类型 <a class=\"header-anchor\" href=\"#组件类型\" aria-hidden=\"true\" data-v-5da7afb2>#</a></h3><table data-v-5da7afb2><thead data-v-5da7afb2><tr data-v-5da7afb2><th data-v-5da7afb2>名称</th><th data-v-5da7afb2>说明</th></tr></thead><tbody data-v-5da7afb2><tr data-v-5da7afb2><td data-v-5da7afb2>基础型</td><td data-v-5da7afb2>展示词语的字体样式、字体粗细、最小字号、最大字号、词语距离组件的边距，以及图形形状等样式。</td></tr><tr data-v-5da7afb2><td data-v-5da7afb2>可搜索型</td><td data-v-5da7afb2>结合原话列表搜索关键词，并高亮匹配内容。</td></tr><tr data-v-5da7afb2><td data-v-5da7afb2>大屏专用型</td><td data-v-5da7afb2>通过词云气泡图或矩形图，在可视化大屏中展示事件、对象的数量。</td></tr></tbody></table><h4 id=\"基础型\" tabindex=\"-1\" data-v-5da7afb2>基础型 <a class=\"header-anchor\" href=\"#基础型\" aria-hidden=\"true\" data-v-5da7afb2>#</a></h4><p data-v-5da7afb2>有数字统计时，可按无等级和有危险等级状态两种方式展示。无等级时颜色可自定义；有危险等级状态时，可通过颜色及图例区分分类。</p><p data-v-5da7afb2><img src=\"" + _2_default + "\" alt=\"基础型词云图：无等级的高频访问页面，以及带危险等级状态的热点事件 TOP10\" data-v-5da7afb2></p><h4 id=\"可搜索型\" tabindex=\"-1\" data-v-5da7afb2>可搜索型 <a class=\"header-anchor\" href=\"#可搜索型\" aria-hidden=\"true\" data-v-5da7afb2>#</a></h4><p data-v-5da7afb2>默认展示词频图。需要展示原话时，可在词频图右侧增加原话列表和搜索框，支持关键词搜索；搜索后，关键词高亮展示。</p><p data-v-5da7afb2><img src=\"" + _3_default + "\" alt=\"可搜索型词云图：默认展示、带原话列表与搜索框，以及搜索后的关键词高亮\" data-v-5da7afb2></p><h4 id=\"大屏专用型\" tabindex=\"-1\" data-v-5da7afb2>大屏专用型 <a class=\"header-anchor\" href=\"#大屏专用型\" aria-hidden=\"true\" data-v-5da7afb2>#</a></h4><p data-v-5da7afb2><img src=\"" + _4_default + "\" alt=\"大屏词云图：展示当前登录地点分布 TOP20 的气泡图，以及展示热点事件 TOP10 的矩形图\" data-v-5da7afb2></p>", 17)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/word-cloud/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-74",
	"filename": "Design.md",
	"relativePath": "components/word-cloud/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [
		["render", _sfc_render],
		["__scopeId", "data-v-5da7afb2"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/word-cloud/Design.md"]
	]))
};
export { __archive_data__ as default };
