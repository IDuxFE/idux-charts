import { _ as _export_sfc, o as openBlock, b as createElementBlock, e as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-a9f395b3.js";
const _imports_0 = "/assets/1-61a6bf80.png";
const _imports_1 = "/assets/2-ee9f887f.png";
JSON.parse('{"title":"指南","description":"","frontmatter":{"title":"指南"},"headers":[{"level":3,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]},{"level":3,"title":"组件构成","slug":"组件构成","link":"#组件构成","children":[]},{"level":3,"title":"组件类型","slug":"组件类型","link":"#组件类型","children":[]},{"level":3,"title":"与其他图表的对比","slug":"与其他图表的对比","link":"#与其他图表的对比","children":[]}],"relativePath":"src/components/bar/Design.md"}');
const _sfc_main = { name: "Design.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-hidden="true">#</a></h3><p>柱状图借助与本身高度，能够较清晰的反应数据之间的差异性，一般会用作不同角色间的对比关系，同时也可用来反应变化趋势。通常来说，柱状图的横轴更多会展示时间维度，用户会习惯性的认为存在时间趋势。 分类数据不宜过多，建议不超过 20 条，如有多组分类数据，建议不超过 10 组。</p><h3 id="组件构成" tabindex="-1">组件构成 <a class="header-anchor" href="#组件构成" aria-hidden="true">#</a></h3><table><thead><tr><th>序号</th><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>图形</td><td>连接各个数据点的线。</td></tr><tr><td>2</td><td>坐标轴</td><td>当鼠标悬停在图形上时，以提示框的形式展示该点的数据，帮助用户快速获取图形的关键数据。</td></tr><tr><td>3</td><td>提示信息</td><td>当鼠标悬停在图形上时，以提示框的形式展示该点的数据，帮助用户快速获取图形的关键数据。</td></tr><tr><td>4</td><td>图例（可选）</td><td>对当前的一组数据进行的内容标注。</td></tr><tr><td>5</td><td>数据标注（可选）</td><td>对当前的一组数据进行的内容标注。</td></tr><tr><td>6</td><td>缩略轴（可选）</td><td>可以缩小宏观看数据全貌，又可以放大微观看数据的片断，同时还可以拖拽观察数据在一定区间内的演变。</td></tr></tbody></table><p><img src="' + _imports_0 + '" alt="组件构成"></p><h3 id="组件类型" tabindex="-1">组件类型 <a class="header-anchor" href="#组件类型" aria-hidden="true">#</a></h3><p><img src="' + _imports_1 + '" alt="组件类型"></p><h3 id="与其他图表的对比" tabindex="-1">与其他图表的对比 <a class="header-anchor" href="#与其他图表的对比" aria-hidden="true">#</a></h3><p>对比折线图、饼图</p><ul><li>柱状图主要用于多个分类间的数据（大小、数值）的对比；</li><li>折线图主要用于展示连续数值（例如时间）或者有序分类的变化趋势；</li><li>饼图主要是展示分类之间的占比情况。</li></ul><p>对比南丁格尔图（玫瑰图）</p><ul><li>南丁格尔图（玫瑰图）通过半径的大小来对比数据；</li><li>柱状图根据矩形的长度来对比数据。</li></ul>', 12);
const _hoisted_14 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_14);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/vm/workspace/vue/idux-charts-stream/packages/site/src/components/bar/Design.md"]]);
const __archive_data__ = {
  "id": "archive-item-7",
  "filename": "Design.md",
  "relativePath": "components/bar/Design.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
