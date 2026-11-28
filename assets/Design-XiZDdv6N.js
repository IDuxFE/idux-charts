import { t as Ui } from "./client-siJeFvOn.js";
import { Dn as createElementBlock, Gn as openBlock, On as createStaticVNode, c as _plugin_vue_export_helper_default } from "./app-default-T1OuoY14.js";
// src/components/pie/assets/1.png
var _1_default = "/assets/1-DOH0fB-m.png";
// src/components/pie/assets/2.png
var _2_default = "/assets/2-BGRHySp7.png";
// src/components/pie/assets/3.png
var _3_default = "/assets/3-DqUCsfEg.png";
// src/components/pie/assets/4.png
var _4_default = "/assets/4-DTClgNoF.png";
// src/components/pie/assets/5.png
var _5_default = "/assets/5-DG8Qfoof.png";
// src/components/pie/assets/6.png
var _6_default = "/assets/6-BRiXtysg.png";
JSON.parse("{\"title\":\"设计指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"设计指南\"},\"headers\":[{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":3,\"title\":\"组件构成\",\"slug\":\"组件构成\",\"link\":\"#组件构成\",\"children\":[]},{\"level\":3,\"title\":\"组件类型\",\"slug\":\"组件类型\",\"link\":\"#组件类型\",\"children\":[]},{\"level\":3,\"title\":\"异常情况说明\",\"slug\":\"异常情况说明\",\"link\":\"#异常情况说明\",\"children\":[]},{\"level\":3,\"title\":\"色彩建议\",\"slug\":\"色彩建议\",\"link\":\"#色彩建议\",\"children\":[]}],\"relativePath\":\"src/components/pie/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<h3 id=\"使用场景\" tabindex=\"-1\" data-v-54b152e6>使用场景 <a class=\"header-anchor\" href=\"#使用场景\" aria-hidden=\"true\" data-v-54b152e6>#</a></h3><p data-v-54b152e6>常用于不超过 10 种分类，且总和为 100% 的分类对比，如安全事件、风险业务、资产分布等。</p><h3 id=\"组件构成\" tabindex=\"-1\" data-v-54b152e6>组件构成 <a class=\"header-anchor\" href=\"#组件构成\" aria-hidden=\"true\" data-v-54b152e6>#</a></h3><table data-v-54b152e6><thead data-v-54b152e6><tr data-v-54b152e6><th data-v-54b152e6>序号</th><th data-v-54b152e6>名称</th><th data-v-54b152e6>说明</th></tr></thead><tbody data-v-54b152e6><tr data-v-54b152e6><td data-v-54b152e6>1</td><td data-v-54b152e6>图形</td><td data-v-54b152e6>分为饼图、环形饼图、南丁格尔玫瑰图，根据场景需求选择饼图类型。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>2</td><td data-v-54b152e6>图例</td><td data-v-54b152e6>用于解释图表中的分类维度信息。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>3</td><td data-v-54b152e6>提示信息</td><td data-v-54b152e6>当鼠标悬停在图形上时，以提示框的形式展示该点的数据，帮助用户快速获取图形的关键数据。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>4</td><td data-v-54b152e6>统计总数（可选）</td><td data-v-54b152e6>数据总数，可根据场景放置。</td></tr></tbody></table><p data-v-54b152e6><img src=\"" + _1_default + "\" alt=\"饼图组件构成：图形、图例、提示信息和统计总数\" data-v-54b152e6></p><h3 id=\"组件类型\" tabindex=\"-1\" data-v-54b152e6>组件类型 <a class=\"header-anchor\" href=\"#组件类型\" aria-hidden=\"true\" data-v-54b152e6>#</a></h3><table data-v-54b152e6><thead data-v-54b152e6><tr data-v-54b152e6><th data-v-54b152e6>名称</th><th data-v-54b152e6>说明</th></tr></thead><tbody data-v-54b152e6><tr data-v-54b152e6><td data-v-54b152e6>基础饼图</td><td data-v-54b152e6>饼图通过弧度的大小来对比数据。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>环形饼图</td><td data-v-54b152e6>由饼图将中间区域挖空，视觉上比饼图更加轻量，通过区块弧长对比数据。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>南丁格尔玫瑰图</td><td data-v-54b152e6>通过圆弧的半径长短表示数据的大小，比基础饼图和环形饼图展示更多的分类数据。</td></tr></tbody></table><h4 id=\"基础饼图\" tabindex=\"-1\" data-v-54b152e6>基础饼图 <a class=\"header-anchor\" href=\"#基础饼图\" aria-hidden=\"true\" data-v-54b152e6>#</a></h4><p data-v-54b152e6><img src=\"" + _2_default + "\" alt=\"基础饼图：轻总数、重总数以及 5 个和 10 个图例的样式示例\" data-v-54b152e6></p><h4 id=\"环形饼图\" tabindex=\"-1\" data-v-54b152e6>环形饼图 <a class=\"header-anchor\" href=\"#环形饼图\" aria-hidden=\"true\" data-v-54b152e6>#</a></h4><p data-v-54b152e6><img src=\"" + _3_default + "\" alt=\"环形饼图：外圆和内圆比为 1:0.88，总数可放在里层或外层\" data-v-54b152e6></p><h4 id=\"南丁格尔玫瑰图\" tabindex=\"-1\" data-v-54b152e6>南丁格尔玫瑰图 <a class=\"header-anchor\" href=\"#南丁格尔玫瑰图\" aria-hidden=\"true\" data-v-54b152e6>#</a></h4><p data-v-54b152e6><img src=\"" + _4_default + "\" alt=\"南丁格尔玫瑰图：轻总数、重总数以及 5 个和 10 个图例的样式示例\" data-v-54b152e6></p><h3 id=\"异常情况说明\" tabindex=\"-1\" data-v-54b152e6>异常情况说明 <a class=\"header-anchor\" href=\"#异常情况说明\" aria-hidden=\"true\" data-v-54b152e6>#</a></h3><table data-v-54b152e6><thead data-v-54b152e6><tr data-v-54b152e6><th data-v-54b152e6>异常情况</th><th data-v-54b152e6>展示与处理说明</th></tr></thead><tbody data-v-54b152e6><tr data-v-54b152e6><td data-v-54b152e6>功能无权限</td><td data-v-54b152e6>展示无权限提示：“暂无权限，请先联系管理员开通 xxx 模块使用权限”。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>未配置内容</td><td data-v-54b152e6>展示未配置提示：“暂未配置数据，请先前往 xxx 模块配置”，并提供前往对应模块的入口。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>数据未上报（全部值缺失）</td><td data-v-54b152e6>展示数据缺失提示，说明缺失原因和处理方式。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>网络异常</td><td data-v-54b152e6>展示“加载失败”，并提供“重新加载”操作。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>数据未上报（单点值缺失）</td><td data-v-54b152e6>保留图形和其他分类数据，在对应图例处标记“数据缺失”；悬停时通过提示信息说明缺失原因及解决方案。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>数据已上报（全部值为 0）</td><td data-v-54b152e6>使用灰色环形展示，总数与各图例数值均显示为 0。</td></tr><tr data-v-54b152e6><td data-v-54b152e6>数据已上报（极限值：数据差距非常大）</td><td data-v-54b152e6>默认按比例显示区块宽度，最小宽度为 1px，保证极小值仍可见。</td></tr></tbody></table><h3 id=\"色彩建议\" tabindex=\"-1\" data-v-54b152e6>色彩建议 <a class=\"header-anchor\" href=\"#色彩建议\" aria-hidden=\"true\" data-v-54b152e6>#</a></h3><h4 id=\"分类色板\" tabindex=\"-1\" data-v-54b152e6>分类色板 <a class=\"header-anchor\" href=\"#分类色板\" aria-hidden=\"true\" data-v-54b152e6>#</a></h4><p data-v-54b152e6>灰色可作为“其他”色使用，或者正常搭配使用。</p><p data-v-54b152e6><img src=\"" + _5_default + "\" alt=\"分类色板：浅色与深色背景下的常用色、基础色和扩展色\" data-v-54b152e6></p><h4 id=\"语义色板\" tabindex=\"-1\" data-v-54b152e6>语义色板 <a class=\"header-anchor\" href=\"#语义色板\" aria-hidden=\"true\" data-v-54b152e6>#</a></h4><p data-v-54b152e6>用于风险等级的配色等。</p><p data-v-54b152e6><img src=\"" + _6_default + "\" alt=\"语义色板：风险等级色阶、各类等级的颜色映射及饼图用法示例\" data-v-54b152e6></p>", 22)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/pie/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-38",
	"filename": "Design.md",
	"relativePath": "components/pie/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [
		["render", _sfc_render],
		["__scopeId", "data-v-54b152e6"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/pie/Design.md"]
	]))
};
export { __archive_data__ as default };
