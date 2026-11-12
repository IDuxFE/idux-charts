import { t as Ui } from "./client-D2zkqFpb.js";
import { Ir as createBaseVNode, Vr as createTextVNode, bt as _plugin_vue_export_helper_default, ri as openBlock, zr as createElementBlock } from "./app-default-DCCQUDkm.js";
JSON.parse("{\"title\":\"指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"指南\"},\"headers\":[{\"level\":3,\"title\":\"数据与量程\",\"slug\":\"数据与量程\",\"link\":\"#数据与量程\",\"children\":[]},{\"level\":3,\"title\":\"布局\",\"slug\":\"布局\",\"link\":\"#布局\",\"children\":[]}],\"relativePath\":\"src/components/radar/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [
		createBaseVNode("h3", {
			id: "数据与量程",
			tabindex: "-1"
		}, [createTextVNode("数据与量程 "), createBaseVNode("a", {
			class: "header-anchor",
			href: "#数据与量程",
			"aria-hidden": "true"
		}, "#")], -1),
		createBaseVNode("ul", null, [
			createBaseVNode("li", null, "对比对象须使用同一维度顺序和同一维度量程。在轴名称或提示框中标明单位。"),
			createBaseVNode("li", null, "轮廓展示各维度在自身量程中的相对位置。需要综合评分时，先定义指标方向、权重和评分规则。"),
			createBaseVNode("li", null, "给每个对象独立命名。轮廓重叠时可通过图例筛选，或减少填充以保留线条辨识度。")
		], -1),
		createBaseVNode("h3", {
			id: "布局",
			tabindex: "-1"
		}, [createTextVNode("布局 "), createBaseVNode("a", {
			class: "header-anchor",
			href: "#布局",
			"aria-hidden": "true"
		}, "#")], -1),
		createBaseVNode("p", null, "常规卡片可用百分比半径，为轴名称和底部图例预留空间。各维度量程独立时，在提示框中逐项呈现数值。空数据提示由页面提供。", -1)
	])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/radar/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-67",
	"filename": "Design.md",
	"relativePath": "components/radar/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/radar/Design.md"]]))
};
export { __archive_data__ as default };
