import { d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-ea9817b5.js";
import { n as getAlphaColor, p as IxLineChart, s as setup } from "./setup-1f0c886d.js";
import { u as useLineStyleColor } from "./useLineStyleColor-77645e3e.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultipleLine",
  setup(__props) {
    const lineOption = {
      // smooth: true,
      title: { text: "折线图标题" },
      xAxis: {
        data: ["星期一", "星期二", "星期三", "星期四", "星期五"]
      },
      yAxis: {
        name: "次"
      },
      series: [
        {
          data: [100, 150, 300, 88, 200],
          name: "到店靓仔",
          showSymbol: false,
          lineStyle: {
            shadowColor: getAlphaColor("#458FFF", 0.9),
            // 等同 rgba(69, 143, 255, 0.9)
            shadowBlur: 8,
            color: useLineStyleColor("#458FFF")
          }
        },
        {
          data: [55, 88, 150, 120, 65],
          name: "到店靓女",
          showSymbol: false,
          lineStyle: {
            shadowColor: getAlphaColor("#20cc94", 0.9),
            // 等同 rgba(69, 143, 255, 0.9)
            shadowBlur: 8,
            color: useLineStyleColor("#20cc94")
          }
        }
      ]
    };
    return (_ctx, _cache) => {
      const _component_IxLineChart = IxLineChart;
      return openBlock(), createBlock(
        _component_IxLineChart,
        mergeProps({ style: { "height": "300px" } }, lineOption),
        null,
        16
        /* FULL_PROPS */
      );
    };
  }
});
const title = "双轴折线图";
const description = "";
const index = 2;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/work/codes/idux-charts/packages/site/src/components/line/demos/MultipleLine.vue"]]);
const __archive_data__ = {
  "id": "archive-item-19",
  "filename": "MultipleLine.vue",
  "relativePath": "components/line/demos/MultipleLine.vue",
  "query": {},
  "title": "双轴折线图",
  "description": "",
  "index": 2,
  "sourceCodes": [{ "filename": "MultipleLine.vue", "code": `<script setup lang="ts">\r
import { type LineChartProps, useLineStyleColor, getAlphaColor } from '@idux/charts'\r
\r
const lineOption: LineChartProps = {\r
  // smooth: true,\r
  title: { text: '折线图标题' },\r
  xAxis: {\r
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],\r
  },\r
  yAxis: {\r
    name: '次',\r
  },\r
  series: [\r
    {\r
      data: [100, 150, 300, 88, 200],\r
      name: '到店靓仔',\r
      showSymbol: false,\r
      lineStyle: {\r
        shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)\r
        shadowBlur: 8,\r
        color: useLineStyleColor('#458FFF'),\r
      },\r
    },\r
    {\r
      data: [55, 88, 150, 120, 65],\r
      name: '到店靓女',\r
      showSymbol: false,\r
      lineStyle: {\r
        shadowColor: getAlphaColor('#20cc94', 0.9), // 等同 rgba(69, 143, 255, 0.9)\r
        shadowBlur: 8,\r
        color: useLineStyleColor('#20cc94')\r
      }\r
    },\r
  ],\r
}\r
<\/script>\r
<template>\r
  <IxLineChart style="height: 300px" v-bind="lineOption" />\r
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">LineChartProps</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useLineStyleColor</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">getAlphaColor</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> lineOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">LineChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #676E95">// smooth: true,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">折线图标题</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">100</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">300</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">88</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">200</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">到店靓仔</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">showSymbol</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">false</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">lineStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">shadowColor</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getAlphaColor</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#458FFF</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.9</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #676E95">// 等同 rgba(69, 143, 255, 0.9)</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">shadowBlur</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">8</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useLineStyleColor</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#458FFF</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">55</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">88</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">120</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">65</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">到店靓女</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">showSymbol</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">false</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">lineStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">shadowColor</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getAlphaColor</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#20cc94</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.9</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #676E95">// 等同 rgba(69, 143, 255, 0.9)</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">shadowBlur</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">8</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useLineStyleColor</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#20cc94</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxLineChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">lineOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
