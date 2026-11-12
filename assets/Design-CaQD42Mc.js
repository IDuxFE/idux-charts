import { t as Ui } from "./client-D2zkqFpb.js";
import { Br as createStaticVNode, bt as _plugin_vue_export_helper_default, ri as openBlock, zr as createElementBlock } from "./app-default-DCCQUDkm.js";
// src/components/line/assets/2.png
var _2_default = "/assets/2-hF14iRAM.png";
JSON.parse("{\"title\":\"指南\",\"description\":\"\",\"frontmatter\":{\"title\":\"指南\"},\"headers\":[{\"level\":3,\"title\":\"选择布局\",\"slug\":\"选择布局\",\"link\":\"#选择布局\",\"children\":[]},{\"level\":3,\"title\":\"表达缺报\",\"slug\":\"表达缺报\",\"link\":\"#表达缺报\",\"children\":[]}],\"relativePath\":\"src/components/line/Design.md\"}");
var _sfc_main = { name: "Design.md" };
var _hoisted_1 = { class: "archive-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<h3 id=\"选择布局\" tabindex=\"-1\">选择布局 <a class=\"header-anchor\" href=\"#选择布局\" aria-hidden=\"true\">#</a></h3><ul><li>折线用于时间或其他有序分类。分类轴的采样槽等距排列，采样间隔不均且需要表达实际间隔时，使用原生时间轴。</li><li>多条同单位曲线优先共用 Y 轴。两种单位共用一张图时，标明各自的轴和单位。</li><li>关注总量及各系列贡献时使用堆叠面积图。需要读取实测拐点时，保留直线连接。</li></ul><p><img src=\"" + _2_default + "\" alt=\"折线图布局示意\"></p><h3 id=\"表达缺报\" tabindex=\"-1\">表达缺报 <a class=\"header-anchor\" href=\"#表达缺报\" aria-hidden=\"true\">#</a></h3><p>缺报点传 <code>null</code>，有原因时使用带 <code>missingReason</code> 的数据项。保留该采样槽，让底纹或插值标记表达缺报。实际采样为零时传 <code>0</code>。</p>", 5)])]);
}
// ../../../../../../../archive__resolvedarchive-page:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/line/Design.md__resolved
var __archive_data__ = {
	"id": "archive-item-40",
	"filename": "Design.md",
	"relativePath": "components/line/Design.md",
	"query": {},
	instance: Ui("archive-vue-loader-0", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/line/Design.md"]]))
};
export { __archive_data__ as default };
