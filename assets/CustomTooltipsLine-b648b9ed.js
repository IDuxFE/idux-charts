import { d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-6ab5f9be.js";
import { p as IxLineChart, u as useTooltipsFormatter, s as setup } from "./setup-9638164e.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomTooltipsLine",
  setup(__props) {
    const lineOption = {
      title: { text: "自定义 tooltips" },
      // 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果
      tooltip: {
        trigger: "axis",
        backgroundColor: "#FBFDFF",
        axisPointer: {
          lineStyle: {
            type: "dashed",
            color: "#D3D7DE"
          }
        },
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
          name: "到店靓仔"
        },
        {
          data: [55, 88, 150, 120, 65],
          name: "到店靓女"
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
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/saller/codes/idux-charts/packages/site/src/components/line/demos/CustomTooltipsLine.vue"]]);
const __archive_data__ = {
  "id": "archive-item-18",
  "filename": "CustomTooltipsLine.vue",
  "relativePath": "components/line/demos/CustomTooltipsLine.vue",
  "query": {},
  "title": "自定义 tooltips",
  "description": "",
  "index": 13,
  "sourceCodes": [{ "filename": "CustomTooltipsLine.vue", "code": `<script setup lang="ts">
import { type LineChartProps, useTooltipsFormatter } from '@idux/charts'

const lineOption: LineChartProps = {
  title: { text: '自定义 tooltips' },
  // 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#FBFDFF',
    axisPointer: {
      lineStyle: {
        type: 'dashed',
        color: '#D3D7DE',
      },
    },
    formatter (params: any) {
      if (!params?.length) {
        return '';
      }

      const title = params[0].name
      const list = params.map(param => {
        return {
          name: param.seriesName,
          value: \`\${param.value} 个\`,
          color: param.color,
        }
      })

      return useTooltipsFormatter(title, list);
    },
  },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      data: [100, 150, 300, 88, 200],
      name: '到店靓仔',
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
    },
  ],
}
<\/script>
<template>
  <IxLineChart style="height: 300px" v-bind="lineOption" />
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">LineChartProps</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useTooltipsFormatter</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> lineOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">LineChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">自定义 tooltips</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #676E95">// 若不自定义 tooltips，就会使用这块代码作为默认的 tooltips 效果</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">tooltip</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">trigger</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">axis</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">backgroundColor</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#FBFDFF</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">axisPointer</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">lineStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">dashed</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#D3D7DE</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">formatter</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">(</span><span style="color: #A6ACCD">params</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">any</span><span style="color: #89DDFF">)</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">if</span><span style="color: #F07178"> (</span><span style="color: #89DDFF">!</span><span style="color: #A6ACCD">params</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">length</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;&#39;</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">title</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">params</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">name</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">list</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">params</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">map</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">param</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">          name</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">param</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">seriesName</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          value</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">`${</span><span style="color: #A6ACCD">param</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">value</span><span style="color: #89DDFF">}</span><span style="color: #C3E88D"> 个</span><span style="color: #89DDFF">`</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          color</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">param</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">color</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useTooltipsFormatter</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">title</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">list</span><span style="color: #F07178">)</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">100</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">300</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">88</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">200</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">到店靓仔</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">55</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">88</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">150</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">120</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">65</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">到店靓女</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxLineChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">lineOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
