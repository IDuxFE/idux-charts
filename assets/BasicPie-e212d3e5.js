import { d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-918196f7.js";
import { e as IxPieChart, s as setup } from "./setup-c0401084.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BasicPie",
  setup(__props) {
    const data = [
      { value: 145, name: "图例A" },
      { value: 124, name: "图例B" },
      { value: 118, name: "图例C" },
      { value: 110, name: "图例D" },
      { value: 104, name: "图例E" },
      { value: 92, name: "图例F" },
      { value: 80, name: "图例G" },
      { value: 72, name: "图例H" },
      { value: 60, name: "图例I" },
      { value: 52, name: "图例J" }
    ];
    const pieOption = {};
    return (_ctx, _cache) => {
      const _component_IxPieChart = IxPieChart;
      return openBlock(), createBlock(
        _component_IxPieChart,
        mergeProps({
          style: { "width": "600px", "height": "300px" },
          data,
          name: "环形饼图"
        }, pieOption),
        null,
        16
        /* FULL_PROPS */
      );
    };
  }
});
const title = "环形饼图";
const description = "";
const index = 1;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/sallerli1/codes/idux-charts/packages/site/src/components/pie/demos/BasicPie.vue"]]);
const __archive_data__ = {
  "id": "archive-item-27",
  "filename": "BasicPie.vue",
  "relativePath": "components/pie/demos/BasicPie.vue",
  "query": {},
  "title": "环形饼图",
  "description": "",
  "index": 1,
  "sourceCodes": [{ "filename": "BasicPie.vue", "code": `<script setup lang="ts">
import { type PieChartProps } from '@idux/charts'

const data = [
  { value: 145, name: '图例A' },
  { value: 124, name: '图例B' },
  { value: 118, name: '图例C' },
  { value: 110, name: '图例D' },
  { value: 104, name: '图例E' },
  { value: 92, name: '图例F' },
  { value: 80, name: '图例G' },
  { value: 72, name: '图例H' },
  { value: 60, name: '图例I' },
  { value: 52, name: '图例J' },
]

const pieOption: PieChartProps = {}
<\/script>
<template>
  <IxPieChart style="width: 600px; height: 300px" :data="data" name="环形饼图" v-bind="pieOption" />
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">PieChartProps</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> data </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">145</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例A</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">124</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例B</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">118</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例C</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">110</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例D</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">104</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例E</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">92</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例F</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">80</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例G</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">72</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例H</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">60</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例I</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">52</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">图例J</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> pieOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">PieChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxPieChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">width: 600px; height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> :</span><span style="color: #C792EA">data</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">data</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">name</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">环形饼图</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">pieOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
