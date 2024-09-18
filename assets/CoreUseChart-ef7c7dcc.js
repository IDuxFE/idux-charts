import { d as defineComponent, b as createElementBlock, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-ea9817b5.js";
import { c as useChart, s as setup } from "./setup-1f0c886d.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CoreUseChart",
  setup(__props) {
    const option = {
      title: { text: "柱状图标题" },
      xAxis: {
        type: "category",
        data: ["星期一", "星期二", "星期三", "星期四", "星期五"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        }
      ]
    };
    const { containerRef, chartRef } = useChart(option);
    setTimeout(() => {
      var _a;
      (_a = chartRef.value) == null ? void 0 : _a.setOption({ title: { text: "修改后的标题" } });
    }, 3e3);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "containerRef",
          ref: containerRef,
          style: { "width": "100%", "height": "300px" }
        },
        null,
        512
        /* NEED_PATCH */
      );
    };
  }
});
const title = "函数用法";
const description = "";
const index = 11;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/work/codes/idux-charts/packages/site/src/components/core/demos/CoreUseChart.vue"]]);
const __archive_data__ = {
  "id": "archive-item-13",
  "filename": "CoreUseChart.vue",
  "relativePath": "components/core/demos/CoreUseChart.vue",
  "query": {},
  "title": "函数用法",
  "description": "",
  "index": 11,
  "sourceCodes": [{ "filename": "CoreUseChart.vue", "code": `<script setup lang="ts">\r
import { useChart, type ChartProps } from '@idux/charts'\r
\r
const option: ChartProps = {\r
  title: { text: '柱状图标题' },\r
  xAxis: {\r
    type: 'category',\r
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],\r
  },\r
  yAxis: {\r
    type: 'value',\r
  },\r
  series: [\r
    {\r
      data: [120, 200, 150, 80, 70, 110, 130],\r
      type: 'bar',\r
    },\r
  ],\r
}\r
const { containerRef, chartRef } = useChart(option)\r
\r
setTimeout(() => {\r
  chartRef.value?.setOption({ title: { text: '修改后的标题' } })\r
}, 3000)\r
<\/script>\r
<template>\r
  <div ref="containerRef" style="width: 100%; height: 300px" />\r
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useChart</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ChartProps</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> option</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">ChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">柱状图标题</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">category</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">value</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">120</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">200</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">80</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">70</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">110</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">130</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">bar</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> containerRef</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> chartRef </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useChart</span><span style="color: #A6ACCD">(option)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #82AAFF">setTimeout</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">chartRef</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">value</span><span style="color: #89DDFF">?.</span><span style="color: #82AAFF">setOption</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span><span style="color: #F07178"> title</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> text</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">修改后的标题</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #89DDFF">},</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">3000</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">ref</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">containerRef</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">width: 100%; height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
