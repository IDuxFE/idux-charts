import { t as Ui } from "./client-BW1H2jEP.js";
import { En as createStaticVNode, Tn as createElementBlock, Un as openBlock, s as _plugin_vue_export_helper_default } from "./app-default-C6SHhrLB.js";
JSON.parse("{\"title\":\"指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"指南\"},\"headers\":[{\"level\":3,\"title\":\"用原生配置组合地图\",\"slug\":\"用原生配置组合地图\",\"link\":\"#用原生配置组合地图\",\"children\":[]},{\"level\":3,\"title\":\"数据和布局\",\"slug\":\"数据和布局\",\"link\":\"#数据和布局\",\"children\":[]}],\"relativePath\":\"src/components/map/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<h3 id=\"用原生配置组合地图\" tabindex=\"-1\">用原生配置组合地图 <a class=\"header-anchor\" href=\"#用原生配置组合地图\" aria-hidden=\"true\">#</a></h3><p>底图使用 geo，节点和线路使用原生 series。组件提供统一的底图视觉默认值及可选配置生成函数，业务决定数据聚合、状态含义、配色与系列组合。</p><ul><li>状态分布：createMapRegions 生成区域填色，createMapNodes 生成位置标记。业务定义指标的风险区间，按数值计算颜色并同步到区域、节点和图例。例如攻击次数 &gt;700 使用最高危颜色，0 使用中性色；颜色不依赖站点名称或数据顺序。</li><li>区域统计：createMapRegions 按 pieces 分段着色，createMapVisualMap 展示相应图例。区域分级统计不计算散点密度，应区分缺失数据与 0。</li><li>网络连接：createMapNodes 生成节点，createMapLines 生成连接。通过 nodes 参数解析 source/target，按需设置 animated、lineStyle 和 effect。</li><li>综合态势：geo.regions 提供区域汇总，series 混合站点、连接线和业务手写的其他 ECharts 系列。</li></ul><p>生成函数直接返回标准 ECharts 配置，不要求配合特定组件使用。常见样式直接使用默认值，需要差异时传入原生 options；新的系列类型可以直接加入 series，注册对应 ECharts 能力即可。</p><h3 id=\"数据和布局\" tabindex=\"-1\">数据和布局 <a class=\"header-anchor\" href=\"#数据和布局\" aria-hidden=\"true\">#</a></h3><p>应用提供并注册适合业务范围的 GeoJSON，区域匹配键和展示名分别维护。区域数据与站点数据独立，同一区域可以有多个站点。线路引用的完整节点集合显式传入 createMapLines，不依赖系列声明顺序。</p><p>使用 <code>validateMapData</code> 在接入数据时检查坐标、线路引用和重复标识，将返回的记录位置和原因交给业务诊断。校验不替代几何注册或坐标系确认。</p><p>生成函数只处理本次输入。响应式数据、坐标或主题更新时，通过 computed 重新生成配置；同一份自定义主题可传给组件和生成函数。</p><p>几何数据不进入组件包，示例附带中国和世界 GeoJSON。世界地图来自 <a href=\"https://echarts.apache.org/examples/data/asset/geo/world.json\" target=\"_blank\" rel=\"noreferrer\">ECharts 官方示例数据</a>，保留源文件英文名称，通过 geo.nameMap 本地化。几何和系列数据应使用相同坐标系。</p><p>建议中国地图高度至少 480px、世界地图至少 400px。多个图例由业务安排位置。空状态由业务页面呈现；加载状态保留图表实例。缩放和拖动默认开启，由 geo.roam 控制。</p>", 10)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/map/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-75",
	"filename": "Design.md",
	"relativePath": "components/map/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/map/Design.md"]]))
};
export { __archive_data__ as default };
