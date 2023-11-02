import { d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-918196f7.js";
import { a as seerColors, I as IxBarChart, s as setup } from "./setup-c0401084.js";
import { u as useStripeBarTooltip, a as useStripeBarSeries } from "./useStripe-83d7b0d1.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StripeBarMultiple",
  setup(__props) {
    const data = [123, 324, 156, 244, 188];
    const barOption = {
      title: { text: "柱状图标题" },
      xAxis: {
        name: "次"
      },
      yAxis: {
        data: ["星期一", "星期二", "星期三", "星期四", "星期五"]
      },
      tooltip: useStripeBarTooltip("次"),
      series: [
        ...useStripeBarSeries({
          series: {
            name: "系列1",
            data
          },
          color: seerColors[0],
          offset: [0, -6]
        }),
        ...useStripeBarSeries({
          series: {
            name: "系列2",
            data: [120, 34, 136, 204, 198]
          },
          color: seerColors[1],
          offset: [0, 6]
        })
      ]
    };
    return (_ctx, _cache) => {
      const _component_IxBarChart = IxBarChart;
      return openBlock(), createBlock(
        _component_IxBarChart,
        mergeProps({
          style: { "height": "300px" },
          data: []
        }, barOption),
        null,
        16
        /* FULL_PROPS */
      );
    };
  }
});
const title = "多系列鼠标经过设置柱状图条纹";
const description = "";
const index = 3;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/sallerli1/codes/idux-charts/packages/site/src/components/bar/demos/StripeBarMultiple.vue"]]);
const __archive_data__ = {
  "id": "archive-item-7",
  "filename": "StripeBarMultiple.vue",
  "relativePath": "components/bar/demos/StripeBarMultiple.vue",
  "query": {},
  "title": "多系列鼠标经过设置柱状图条纹",
  "description": "",
  "index": 3,
  "sourceCodes": [{ "filename": "StripeBarMultiple.vue", "code": `<script setup lang="ts">
import {
  type BarChartProps,
  seerColors,
  useStripeBarTooltip,
  useStripeBarSeries,
} from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    name: '次',
  },
  yAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },

  tooltip: useStripeBarTooltip('次'),

  series: [
    ...useStripeBarSeries({
      series: {
        name: '系列1',
        data: data,
      },
      color: seerColors[0],
      offset: [0, -6],
    }),

    ...useStripeBarSeries({
      series: {
        name: '系列2',
        data: [120, 34, 136, 204, 198],
      },
      color: seerColors[1],
      offset: [0, 6],
    }),
  ],
}
<\/script>
<template>
  <IxBarChart style="height: 300px" :data="[]" v-bind="barOption" />
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">BarChartProps</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">seerColors</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">useStripeBarTooltip</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">useStripeBarSeries</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> data </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">123</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">324</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">156</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">244</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">188</span><span style="color: #A6ACCD">]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> barOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BarChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">柱状图标题</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">tooltip</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useStripeBarTooltip</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">...</span><span style="color: #82AAFF">useStripeBarSeries</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">系列1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> data</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> seerColors[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">offset</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">-</span><span style="color: #F78C6C">6</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">...</span><span style="color: #82AAFF">useStripeBarSeries</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">系列2</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">120</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">34</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">136</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">204</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">198</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> seerColors[</span><span style="color: #F78C6C">1</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">offset</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">6</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxBarChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> :</span><span style="color: #C792EA">data</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">[]</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">barOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
