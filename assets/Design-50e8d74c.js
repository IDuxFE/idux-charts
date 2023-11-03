import { _ as _export_sfc, o as openBlock, b as createElementBlock, e as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-918196f7.js";
const _imports_0 = "/common/idux-charts/assets/1-15e32dd8.png";
const _imports_1 = "/common/idux-charts/assets/2-35ed724d.png";
JSON.parse('{"title":"指南","description":"","frontmatter":{"title":"指南"},"headers":[{"level":3,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]},{"level":3,"title":"组件构成","slug":"组件构成","link":"#组件构成","children":[]},{"level":3,"title":"组件类型","slug":"组件类型","link":"#组件类型","children":[]},{"level":3,"title":"与其他图表的对比","slug":"与其他图表的对比","link":"#与其他图表的对比","children":[]}],"relativePath":"src/components/line/Design.md"}');
const _sfc_main = { name: "Design.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-hidden="true">#</a></h3><p>在折线图中，数据是递增还是递减、增减的速率、增减的规律（周期性、螺旋性等）、峰值等特征都可以清晰地反映出来。所以，折线图常用来分析数据随时间的变化趋势，也可用来分析多组数据随时间变化的相互作用和相互影响。例如可用来分析上下行流量随时间变化的情况，从而进一步预测未来的流量情况，在折线图中，一般水平轴（X 轴）用来表示时间的推移，并且间隔相同；而垂直轴（Y 轴）代表不同时刻的数据的大小。</p><h3 id="组件构成" tabindex="-1">组件构成 <a class="header-anchor" href="#组件构成" aria-hidden="true">#</a></h3><table><thead><tr><th>序号</th><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>图形</td><td>连接各个数据点的线。</td></tr><tr><td>2</td><td>坐标轴</td><td>当鼠标悬停在图形上时，以提示框的形式展示该点的数据，帮助用户快速获取图形的关键数据。</td></tr><tr><td>3</td><td>提示信息</td><td>当鼠标悬停在图形上时，以提示框的形式展示该点的数据，帮助用户快速获取图形的关键数据。</td></tr><tr><td>4</td><td>图例（可选）</td><td>对当前的一组数据进行的内容标注。</td></tr><tr><td>5</td><td>数据标注（可选）</td><td>对当前的一组数据进行的内容标注。</td></tr><tr><td>6</td><td>缩略轴（可选）</td><td>可以缩小宏观看数据全貌，又可以放大微观看数据的片断，同时还可以拖拽观察数据在一定区间内的演变。</td></tr></tbody></table><p><img src="' + _imports_0 + '" alt="组件构成"></p><h3 id="组件类型" tabindex="-1">组件类型 <a class="header-anchor" href="#组件类型" aria-hidden="true">#</a></h3><p><img src="' + _imports_1 + '" alt="组件类型"></p><h3 id="与其他图表的对比" tabindex="-1">与其他图表的对比 <a class="header-anchor" href="#与其他图表的对比" aria-hidden="true">#</a></h3><p>对比面积图</p><ul><li>折线图和面积图都可以表示一段时间（或者有序分类）的趋势，相比之下面积图的表现力更强一些；</li><li>面积图还可以表示数据的上下限，例如可以表示温度的最小值、最大值。</li></ul><p>对比柱状图</p><ul><li>柱状图主要用于多个分类间的数据（大小、数量）的对比，折线图主要用于时间或者连续数据上的趋势；</li><li>分类间的数据比较，如果分类不存在顺序，那么不要使用折线图。</li></ul>', 12);
const _hoisted_14 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_14);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/sallerli1/codes/idux-charts/packages/site/src/components/line/Design.md"]]);
const __archive_data__ = {
  "id": "archive-item-26",
  "filename": "Design.md",
  "relativePath": "components/line/Design.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
