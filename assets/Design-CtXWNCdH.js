import { M as openBlock, h as createStaticVNode, m as createElementBlock, n as Ui, t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DL5t6dEv.js";
// src/components/pie/assets/1.png
var _1_default = "/assets/1-DOH0fB-m.png";
// src/components/pie/assets/2.png
var _2_default = "/assets/2-BGRHySp7.png";
// src/components/pie/assets/3.png
var _3_default = "/assets/3-DqUCsfEg.png";
// src/components/pie/assets/4.png
var _4_default = "/assets/4-DTClgNoF.png";
// src/components/pie/assets/6.png
var _6_default = "/assets/6-BRiXtysg.png";
JSON.parse("{\"title\":\"指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"指南\"},\"headers\":[{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":3,\"title\":\"选择合适的示例\",\"slug\":\"选择合适的示例\",\"link\":\"#选择合适的示例\",\"children\":[]},{\"level\":3,\"title\":\"组件构成\",\"slug\":\"组件构成\",\"link\":\"#组件构成\",\"children\":[]},{\"level\":3,\"title\":\"组件类型\",\"slug\":\"组件类型\",\"link\":\"#组件类型\",\"children\":[]},{\"level\":3,\"title\":\"语义色板\",\"slug\":\"语义色板\",\"link\":\"#语义色板\",\"children\":[]},{\"level\":3,\"title\":\"与其他图表的对比\",\"slug\":\"与其他图表的对比\",\"link\":\"#与其他图表的对比\",\"children\":[]}],\"relativePath\":\"src/components/pie/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<h3 id=\"使用场景\" tabindex=\"-1\">使用场景 <a class=\"header-anchor\" href=\"#使用场景\" aria-hidden=\"true\">#</a></h3><p>用于展示同一总体内各分类的占比，如安全事件、风险业务、资产分布等。传入各分类的原始数量即可，无需将数据预先换算成总和为 100 的百分数。建议分类数量保持精简；这不是组件限制，多分类可参考多列图例示例。</p><h3 id=\"选择合适的示例\" tabindex=\"-1\">选择合适的示例 <a class=\"header-anchor\" href=\"#选择合适的示例\" aria-hidden=\"true\">#</a></h3><table><thead><tr><th>示例</th><th>展示内容</th></tr></thead><tbody><tr><td>实心饼图、环形图、玫瑰图</td><td>形态、轻/重总数，以及全零、缺失、空态、加载和模拟重试；环形图另支持中心摘要</td></tr><tr><td>多列图例、图例自定义 Formatter</td><td>自动分列与分页，以及业务计算的数值和百分比</td></tr><tr><td>九宫格对齐、形态与自适应</td><td>整体对齐、容器宽高、分类数量和可见性切换</td></tr><tr><td>卡片环形图、轻量卡片饼图</td><td>业务卡片组合与紧凑布局</td></tr><tr><td>大尺寸：基础形态与加载</td><td>实心、环形、面积模式玫瑰图及原生加载遮罩</td></tr><tr><td>大尺寸：风险分布</td><td>分类绑定语义颜色，扇区与图例使用一致的业务提示</td></tr><tr><td>大尺寸：多层装饰环图</td><td>显式 <code>series</code> 组合的手动布局</td></tr></tbody></table><p>只传 <code>data</code> 时保留 1.0.0 的原生布局与默认效果。设置 <code>layoutMode=&quot;auto&quot;</code> 或声明 <code>align</code> 启用自动布局；显式 auto 模式下，样式变化不会间接切换布局。设置 <code>layoutMode=&quot;native&quot;</code> 使用原生配置路径。完整几何配置仍优先，具体条件见 API。</p><p>统计合计、百分比分母、风险阈值和缺失原因由业务提供；自动布局负责图形、标题及图例的位置和尺寸。全零保留中性占位环，缺失项保留图例且不绘制扇区；空态 UI、模拟加载和重试由示例外层控制。</p><h3 id=\"组件构成\" tabindex=\"-1\">组件构成 <a class=\"header-anchor\" href=\"#组件构成\" aria-hidden=\"true\">#</a></h3><table><thead><tr><th>序号</th><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>图形</td><td>分为实心饼图、环形饼图、南丁格尔玫瑰图，根据场景需求选择饼图类型。</td></tr><tr><td>2</td><td>图例</td><td>用于解释图表中的分类维度信息。</td></tr><tr><td>3</td><td>提示信息</td><td>当鼠标悬停在图形上时，以提示框的形式展示该点的数据，帮助用户快速获取图形的关键数据。</td></tr><tr><td>4</td><td>统计总数（可选）</td><td>数据总数，可根据场景放置。</td></tr></tbody></table><p><img src=\"" + _1_default + "\" alt=\"组件构成\"></p><h3 id=\"组件类型\" tabindex=\"-1\">组件类型 <a class=\"header-anchor\" href=\"#组件类型\" aria-hidden=\"true\">#</a></h3><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>基础饼图</td><td>饼图通过弧度的大小来对比数据。</td></tr><tr><td>环形饼图</td><td>由饼图将中间区域挖空，视觉上比饼图更加轻量，通过区块弧长对比数据。</td></tr><tr><td>南丁格尔玫瑰图</td><td>支持 <code>roseType: &#39;radius&#39;</code> 和 <code>&#39;area&#39;</code> 两种模式；分类较多时仍应控制可读性。</td></tr></tbody></table><ul><li>基础饼图</li></ul><p><img src=\"" + _2_default + "\" alt=\"基础饼图\"></p><ul><li>环形饼图</li></ul><p><img src=\"" + _3_default + "\" alt=\"环形饼图\"></p><ul><li>南丁格尔玫瑰图</li></ul><p><img src=\"" + _4_default + "\" alt=\"南丁格尔玫瑰图\"></p><p>文中的图片是设计示意，当前可运行效果以示例页为准。</p><h3 id=\"语义色板\" tabindex=\"-1\">语义色板 <a class=\"header-anchor\" href=\"#语义色板\" aria-hidden=\"true\">#</a></h3><p>用于风险等级的配色等。</p><p><img src=\"" + _6_default + "\" alt=\"语义色板\"></p><h3 id=\"与其他图表的对比\" tabindex=\"-1\">与其他图表的对比 <a class=\"header-anchor\" href=\"#与其他图表的对比\" aria-hidden=\"true\">#</a></h3><p>对比柱状图</p><ul><li>饼图主要是展示分类之间的占比情况。</li><li>而柱状图主要展示各个分类数量、大小的对比。</li></ul>", 24)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/pie/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-27",
	"filename": "Design.md",
	"relativePath": "components/pie/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/pie/Design.md"]]))
};
export { __archive_data__ as default };
