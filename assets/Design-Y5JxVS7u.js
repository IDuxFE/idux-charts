import { t as Ui } from "./client-C0Q2P4cx.js";
import { Kr as openBlock, Or as createElementBlock, bt as _plugin_vue_export_helper_default, kr as createStaticVNode } from "./app-default-K1ISpu3o.js";
JSON.parse("{\"title\":\"设计说明\",\"description\":\"\",\"frontmatter\":{\"title\":\"设计说明\"},\"headers\":[{\"level\":3,\"title\":\"选择合适的示例\",\"slug\":\"选择合适的示例\",\"link\":\"#选择合适的示例\",\"children\":[]},{\"level\":3,\"title\":\"尺寸与状态\",\"slug\":\"尺寸与状态\",\"link\":\"#尺寸与状态\",\"children\":[]}],\"relativePath\":\"src/components/gauge/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<p>仪表盘的绘图逻辑由 <code>packages/plots/gauge</code> 持有。组件复用 IxChart 的实例、响应式属性、事件与尺寸管理，不依赖 Vue 2 UI 组件。</p><h3 id=\"选择合适的示例\" tabindex=\"-1\">选择合适的示例 <a class=\"header-anchor\" href=\"#选择合适的示例\" aria-hidden=\"true\">#</a></h3><ul><li><strong>基础数值型</strong>：同一指标使用不同业务颜色，切换尺寸、零值、空态、加载和模拟重试。</li><li><strong>纯状态型</strong>：数值决定指示比例，<code>valueFormatter</code> 显示业务状态，状态文字不改变位置。</li><li><strong>分段仪表盘</strong>：切换存储与评分场景；阈值采用量程内的比例上界，精确边界属于前一段。</li><li><strong>自定义量程</strong>：展示 0–64 GB 及 80 GB 越界值，指示停在端点，文字保留实际值。</li></ul><h3 id=\"尺寸与状态\" tabindex=\"-1\">尺寸与状态 <a class=\"header-anchor\" href=\"#尺寸与状态\" aria-hidden=\"true\">#</a></h3><p>组件统一绘制 200° 轨道、刻度、渐变分段和带三角指示的内盘；调整容器时重算几何。推荐 lg 容器 180 × 110，md 容器 144 × 90，文字字号独立于轨道尺寸。</p><p>业务负责阈值、颜色、状态文案和多个指标的排列。<code>valueFormatter</code> 仅改变主文字，不改变指示比例；<code>label=&quot;&quot;</code> 可隐藏分段说明。示例通过条件渲染替换图表，提供空态、加载反馈与模拟重试；如需保留图表并显示原生加载遮罩，可使用 <code>loading</code>。重试计时器在状态切换及卸载时清理。</p>", 6)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/gauge/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-52",
	"filename": "Design.md",
	"relativePath": "components/gauge/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/gauge/Design.md"]]))
};
export { __archive_data__ as default };
