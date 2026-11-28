import { t as Ui } from "./client-D7mTuevI.js";
import { Dn as createElementBlock, Gn as openBlock, On as createStaticVNode, c as _plugin_vue_export_helper_default } from "./app-default-DalXtduk.js";
// src/components/map/assets/1.png
var _1_default = "/assets/1-CxAMc04a.png";
// src/components/map/assets/2.png
var _2_default = "/assets/2-DMhZvA1W.png";
// src/components/map/assets/3.png
var _3_default = "/assets/3-CJx6-Aei.png";
// src/components/map/assets/4.png
var _4_default = "/assets/4-CkuHnsuY.png";
JSON.parse("{\"title\":\"设计指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"设计指南\"},\"headers\":[{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":3,\"title\":\"组件构成\",\"slug\":\"组件构成\",\"link\":\"#组件构成\",\"children\":[]},{\"level\":3,\"title\":\"组件类型\",\"slug\":\"组件类型\",\"link\":\"#组件类型\",\"children\":[]}],\"relativePath\":\"src/components/map/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<p data-v-fadc70f3>地图主要用于地域区域数据的可视化，可以用于表示数据的大小和分布范围。飞线型地图常用于展示地理节点之间的空间联系、数据流向与轨迹网络。</p><h3 id=\"使用场景\" tabindex=\"-1\" data-v-fadc70f3>使用场景 <a class=\"header-anchor\" href=\"#使用场景\" aria-hidden=\"true\" data-v-fadc70f3>#</a></h3><p data-v-fadc70f3>适用于空间分布的数据展示，适合带有地理位置信息的数据集，可以展现某个地方单位汇总的流量信息等。也适用于展示起点到终点（OD）的数据流向、网络连接、物流轨迹、业务分布或跨地域的协同关系。</p><h3 id=\"组件构成\" tabindex=\"-1\" data-v-fadc70f3>组件构成 <a class=\"header-anchor\" href=\"#组件构成\" aria-hidden=\"true\" data-v-fadc70f3>#</a></h3><table data-v-fadc70f3><thead data-v-fadc70f3><tr data-v-fadc70f3><th data-v-fadc70f3>序号</th><th data-v-fadc70f3>名称</th><th data-v-fadc70f3>说明</th></tr></thead><tbody data-v-fadc70f3><tr data-v-fadc70f3><td data-v-fadc70f3>1</td><td data-v-fadc70f3>地图</td><td data-v-fadc70f3>分为世界地图、中国地图、省份地图等，根据场景需求选择地图类型。</td></tr><tr data-v-fadc70f3><td data-v-fadc70f3>2</td><td data-v-fadc70f3>起始节点</td><td data-v-fadc70f3>用于标记数据发出的源头或到达的目标位置（如：城市、服务器节点、网点）。</td></tr><tr data-v-fadc70f3><td data-v-fadc70f3>3</td><td data-v-fadc70f3>飞线轨迹</td><td data-v-fadc70f3>用于连接两个节点，表示数据流向或业务关系，可通过线条的弧度、粗细、虚实表示不同含义。</td></tr><tr data-v-fadc70f3><td data-v-fadc70f3>4</td><td data-v-fadc70f3>节点标签</td><td data-v-fadc70f3>显示在节点或飞线附近，用于展示地点名称、IP 地址或具体的业务数值。</td></tr><tr data-v-fadc70f3><td data-v-fadc70f3>5</td><td data-v-fadc70f3>提示信息</td><td data-v-fadc70f3>当鼠标悬停在节点或飞线上时，以提示框的形式显示该节点的详细数据或连线的具体流量。</td></tr></tbody></table><p data-v-fadc70f3><img src=\"" + _1_default + "\" alt=\"地图组件构成：地图、起始节点、飞线轨迹、节点标签和提示信息\" data-v-fadc70f3></p><h3 id=\"组件类型\" tabindex=\"-1\" data-v-fadc70f3>组件类型 <a class=\"header-anchor\" href=\"#组件类型\" aria-hidden=\"true\" data-v-fadc70f3>#</a></h3><table data-v-fadc70f3><thead data-v-fadc70f3><tr data-v-fadc70f3><th data-v-fadc70f3>名称</th><th data-v-fadc70f3>说明</th></tr></thead><tbody data-v-fadc70f3><tr data-v-fadc70f3><td data-v-fadc70f3>状态型</td><td data-v-fadc70f3>用不同颜色突出显示几个主要的区域，快速定位、发现风险。</td></tr><tr data-v-fadc70f3><td data-v-fadc70f3>密度型</td><td data-v-fadc70f3>用于查看该产品入口或人群密度等块状分布情况。</td></tr><tr data-v-fadc70f3><td data-v-fadc70f3>飞线型</td><td data-v-fadc70f3>用于展示地理节点之间的连接关系、数据流向与轨迹网络，突出起点到终点的关联性。</td></tr></tbody></table><h4 id=\"状态型\" tabindex=\"-1\" data-v-fadc70f3>状态型 <a class=\"header-anchor\" href=\"#状态型\" aria-hidden=\"true\" data-v-fadc70f3>#</a></h4><p data-v-fadc70f3><img src=\"" + _2_default + "\" alt=\"状态型地图：中国地图和世界地图通过不同颜色、节点标记及图例展示区域状态\" data-v-fadc70f3></p><h4 id=\"密度型\" tabindex=\"-1\" data-v-fadc70f3>密度型 <a class=\"header-anchor\" href=\"#密度型\" aria-hidden=\"true\" data-v-fadc70f3>#</a></h4><p data-v-fadc70f3><img src=\"" + _3_default + "\" alt=\"密度型地图：中国地图和世界地图通过颜色深浅展示资产总数及区域分布\" data-v-fadc70f3></p><h4 id=\"飞线型\" tabindex=\"-1\" data-v-fadc70f3>飞线型 <a class=\"header-anchor\" href=\"#飞线型\" aria-hidden=\"true\" data-v-fadc70f3>#</a></h4><p data-v-fadc70f3><img src=\"" + _4_default + "\" alt=\"飞线型地图：展示地理节点之间的连接关系，以及时延、丢包、抖动等链路数据\" data-v-fadc70f3></p>", 14)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/map/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-95",
	"filename": "Design.md",
	"relativePath": "components/map/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [
		["render", _sfc_render],
		["__scopeId", "data-v-fadc70f3"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/map/Design.md"]
	]))
};
export { __archive_data__ as default };
