import { t as Ui } from "./client-CMWdSpQf.js";
import { Ar as createElementBlock, Jr as openBlock, bt as _plugin_vue_export_helper_default, jr as createStaticVNode } from "./app-default-_3RnZ9LU.js";
JSON.parse("{\"title\":\"指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"指南\"},\"headers\":[],\"relativePath\":\"src/components/liquid-fill/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<p>水波图的绘图逻辑由 <code>packages/plots/liquid-fill</code> 持有。组件复用 IxChart 的实例、响应式属性、事件与尺寸管理，不依赖 Vue 2 UI 组件。</p><p>公共组件内聚可复用的视觉与几何逻辑：圆形裁剪、外环与浅色底图、左浅右深的固定渐变、反向双层相位动画、百分比富文本、底部指标名称，以及自适应半径。动画修改波形点位，不平移渐变；关闭动画时保留初始波形。</p><p>有效量程下的零水位显示中性底图且无波浪，满水位直接填满内圆。缺失值、非有限值及无效量程不绘制；有限越界值仅钳制几何比例。<code>radius</code> 控制最大半径，<code>zeroColor</code> 适配主题的中性色，自定义单位通过 <code>unit</code> 提供并沿用数字/单位的统一排版；<code>valueFormatter</code> 用于完全自定义整段文字。</p><p>调用方负责风险阈值、风险文案、主题颜色、请求状态、空态重试和多指标布局。这些内容取决于业务，组件不内置 CPU 阈值或请求定时器。示例分别展示以下能力：</p><ul><li><strong>基础型</strong>：0–100 使用率滑块、业务阈值颜色及状态文字，外层条件渲染空态、加载和模拟重试。</li><li><strong>多指标与风险颜色</strong>：多个单指标组件组合，业务分别配置颜色与标签。</li><li><strong>自定义量程与边界</strong>：48/64 GB、满水位及越界值；文字显示原值与单位，不自动转换为百分比。</li><li><strong>尺寸与静态模式</strong>：不同最大半径，以及关闭波动后保留初始双层波形。</li></ul><p>基础示例的加载占位会替换图表；需要保留图表实例时可使用 <code>loading</code> 显示原生遮罩。自定义量程的零水位指 <code>value &lt;= min</code>，不一定是数值 0。</p>", 6)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-66",
	"filename": "Design.md",
	"relativePath": "components/liquid-fill/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/Design.md"]]))
};
export { __archive_data__ as default };
