import { d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-ea9817b5.js";
import { I as IxBarChart, u as useTooltipsFormatter, s as setup } from "./setup-1f0c886d.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomTooltipsBar",
  setup(__props) {
    const barOption = {
      title: { text: "自定义 tooltips" },
      // 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果
      tooltip: {
        trigger: "axis",
        backgroundColor: "#FBFDFF",
        formatter(params) {
          if (!(params == null ? void 0 : params.length)) {
            return "";
          }
          const title2 = params[0].name;
          const list = params.map((param) => {
            return {
              name: param.seriesName,
              value: `${param.value} 个`,
              color: param.color
            };
          });
          return useTooltipsFormatter(title2, list);
        }
      },
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
          itemStyle: {
            borderRadius: [1, 1, 0, 0]
          }
        },
        {
          data: [55, 88, 150, 120, 65],
          name: "到店靓女",
          itemStyle: {
            borderRadius: [1, 1, 0, 0]
          }
        }
      ]
    };
    return (_ctx, _cache) => {
      const _component_IxBarChart = IxBarChart;
      return openBlock(), createBlock(
        _component_IxBarChart,
        mergeProps({ style: { "height": "300px" } }, barOption),
        null,
        16
        /* FULL_PROPS */
      );
    };
  }
});
const title = "自定义 tooltips";
const description = "";
const index = 13;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/work/codes/idux-charts/packages/site/src/components/bar/demos/CustomTooltipsBar.vue"]]);
const __archive_data__ = {
  "id": "archive-item-3",
  "filename": "CustomTooltipsBar.vue",
  "relativePath": "components/bar/demos/CustomTooltipsBar.vue",
  "query": {},
  "title": "自定义 tooltips",
  "description": "",
  "index": 13,
  "sourceCodes": [{ "filename": "CustomTooltipsBar.vue", "code": `<script setup lang="ts">\r
import { type BarChartProps, useTooltipsFormatter } from '@idux/charts'\r
\r
const barOption: BarChartProps = {\r
  title: { text: '自定义 tooltips' },\r
  // 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果\r
  tooltip: {\r
    trigger: 'axis',\r
    backgroundColor: '#FBFDFF',\r
    formatter (params: any) {\r
      if (!params?.length) {\r
        return '';\r
      }\r
\r
      const title = params[0].name\r
      const list = params.map(param => {\r
        return {\r
          name: param.seriesName,\r
          value: \`\${param.value} 个\`,\r
          color: param.color,\r
        }\r
      })\r
\r
      return useTooltipsFormatter(title, list);\r
    },\r
  },\r
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
      itemStyle: {\r
        borderRadius: [1, 1, 0, 0],\r
      },\r
    },\r
    {\r
      data: [55, 88, 150, 120, 65],\r
      name: '到店靓女',\r
      itemStyle: {\r
        borderRadius: [1, 1, 0, 0],\r
      },\r
    },\r
  ],\r
}\r
<\/script>\r
<template>\r
  <IxBarChart style="height: 300px" v-bind="barOption" />\r
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">BarChartProps</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useTooltipsFormatter</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> barOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BarChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">自定义 tooltips</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #676E95">// 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">tooltip</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">trigger</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">axis</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">backgroundColor</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#FBFDFF</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">formatter</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">(</span><span style="color: #A6ACCD">params</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">any</span><span style="color: #89DDFF">)</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">if</span><span style="color: #F07178"> (</span><span style="color: #89DDFF">!</span><span style="color: #A6ACCD">params</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">length</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;&#39;</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">title</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">params</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">name</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">list</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">params</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">map</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">param</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">          name</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">param</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">seriesName</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          value</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">`${</span><span style="color: #A6ACCD">param</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">value</span><span style="color: #89DDFF">}</span><span style="color: #C3E88D"> 个</span><span style="color: #89DDFF">`</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          color</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">param</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">color</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useTooltipsFormatter</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">title</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">list</span><span style="color: #F07178">)</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">100</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">300</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">88</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">200</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">到店靓仔</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">borderRadius</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">55</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">88</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">120</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">65</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">到店靓女</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">borderRadius</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxBarChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">barOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
