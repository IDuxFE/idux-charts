import { d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-a9f395b3.js";
import { L as LinearGradient, d as IxPieChart, s as setup } from "./setup-db92dac3.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RingPie",
  setup(__props) {
    const getLinearGradient = (start, end) => {
      return new LinearGradient(0, 0, 1, 1, [
        {
          offset: 0,
          color: start
          // 渐变起始颜色
        },
        {
          offset: 1,
          color: end
          // 渐变结束颜色
        }
      ]);
    };
    const getDotData = () => {
      const dataArr = [];
      for (var i = 0; i < 100; i++) {
        if (i % 2 === 0) {
          dataArr.push({
            name: (i + 1).toString(),
            value: 25,
            itemStyle: {
              color: "rgb(126,190,255)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          });
        } else {
          dataArr.push({
            name: (i + 1).toString(),
            value: 20,
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          });
        }
      }
      return dataArr;
    };
    const data = [
      {
        value: 45,
        name: "高危",
        itemStyle: {
          color: getLinearGradient("rgba(104, 159, 255, 1)", "rgba(104, 159, 255, 0.2)")
        }
      },
      {
        value: 124,
        name: "中危",
        itemStyle: {
          color: getLinearGradient("rgba(255, 146, 69, 1)", "rgba(255, 146, 69, 0.2)")
        }
      },
      {
        value: 118,
        name: "低危",
        itemStyle: {
          color: getLinearGradient("rgba(219, 76, 53, 1)", "rgba(219, 76, 53, 0.2)")
        }
      }
    ];
    const pieOption = {
      legend: {
        data
      },
      title: {
        // 总数
        text: String((data || []).reduce((acc, cur) => acc + cur.value, 0)),
        // 标题
        textStyle: {
          fontSize: 24,
          fontWeight: 500,
          color: "#2F3540",
          fontFamily: "D-DIN-PRO"
        },
        subtextStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: "#6A6D76"
        }
      },
      // 从外到内，一个pie表示一个图
      series: [
        // 最外层颜色
        {
          type: "pie",
          zlevel: 1,
          radius: ["80%", "100%"],
          silent: true,
          itemStyle: {
            color: getLinearGradient("rgba(69, 143, 255, 0.08)", "rgba(69, 143, 255, 0.01)")
          },
          label: {
            show: false
          },
          data: [1]
        },
        // 条纹
        {
          type: "pie",
          radius: ["70%", "80%"],
          zlevel: 2,
          emphasis: {
            scaleSize: 10
          },
          // 显示的数据
          data
        },
        // 虚线圈
        {
          type: "pie",
          zlevel: 3,
          silent: true,
          radius: ["64%", "65%"],
          data: getDotData()
        },
        //最内圈
        {
          type: "pie",
          zlevel: 4,
          center: ["center", "center"],
          silent: true,
          radius: "55%",
          tooltip: {
            show: false
          },
          itemStyle: {
            borderColor: getLinearGradient("rgba(69, 143, 255, 0.16)", "rgba(69, 143, 255, 0)"),
            borderWidth: 1,
            color: getLinearGradient("rgba(69, 143, 255, 0.1)", "rgba(69, 143, 255, 0)")
          },
          data: [1]
        }
      ]
    };
    return (_ctx, _cache) => {
      const _component_IxPieChart = IxPieChart;
      return openBlock(), createBlock(
        _component_IxPieChart,
        mergeProps({
          style: { "width": "600px", "height": "300px" },
          name: "风险用户数"
        }, pieOption),
        null,
        16
        /* FULL_PROPS */
      );
    };
  }
});
const title = "风险用户数";
const description = "";
const index = 1;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/vm/workspace/vue/idux-charts-stream/packages/site/src/components/pie/demos/RingPie.vue"]]);
const __archive_data__ = {
  "id": "archive-item-26",
  "filename": "RingPie.vue",
  "relativePath": "components/pie/demos/RingPie.vue",
  "query": {},
  "title": "风险用户数",
  "description": "",
  "index": 1,
  "sourceCodes": [{ "filename": "RingPie.vue", "code": `<script setup lang="ts">
import { type PieChartProps } from '@idux/charts'
import { graphic } from 'echarts/core'
import { PieSeriesOption } from 'echarts/charts'

type DataItem = PieSeriesOption['data']

const getLinearGradient = (start: string, end: string) => {
  return new graphic.LinearGradient(0, 0, 1, 1, [
    {
      offset: 0,
      color: start, // 渐变起始颜色
    },
    {
      offset: 1,
      color: end, // 渐变结束颜色
    },
  ])
}

const getDotData = () => {
  const dataArr: DataItem = []

  for (var i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 25,
        itemStyle: {
          color: 'rgb(126,190,255)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      })
    }
  }

  return dataArr
}

const data = [
  {
    value: 45,
    name: '高危',
    itemStyle: {
      color: getLinearGradient('rgba(104, 159, 255, 1)', 'rgba(104, 159, 255, 0.2)'),
    },
  },
  {
    value: 124,
    name: '中危',
    itemStyle: {
      color: getLinearGradient('rgba(255, 146, 69, 1)', 'rgba(255, 146, 69, 0.2)'),
    },
  },
  {
    value: 118,
    name: '低危',
    itemStyle: {
      color: getLinearGradient('rgba(219, 76, 53, 1)', 'rgba(219, 76, 53, 0.2)'),
    },
  },
]

const pieOption: PieChartProps = {
  legend: {
    data,
  },

  title: {
    // 总数
    text: String((data || []).reduce((acc, cur) => acc + cur.value, 0)),
    // 标题
    textStyle: {
      fontSize: 24,
      fontWeight: 500,
      color: '#2F3540',
      fontFamily: 'D-DIN-PRO',
    },
    subtextStyle: {
      fontSize: 12,
      fontWeight: 400,
      color: '#6A6D76',
    },
  },

  // 从外到内，一个pie表示一个图
  series: [
    // 最外层颜色
    {
      type: 'pie',
      zlevel: 1,
      radius: ['80%', '100%'],
      silent: true,
      itemStyle: {
        color: getLinearGradient('rgba(69, 143, 255, 0.08)', 'rgba(69, 143, 255, 0.01)'),
      },
      label: {
        show: false,
      },
      data: [1],
    },

    // 条纹
    {
      type: 'pie',
      radius: ['70%', '80%'],
      zlevel: 2,
      emphasis: {
        scaleSize: 10,
      },
      // 显示的数据
      data: data,
    },

    // 虚线圈
    {
      type: 'pie',
      zlevel: 3,
      silent: true,
      radius: ['64%', '65%'],
      data: getDotData(),
    },

    //最内圈
    {
      type: 'pie',
      zlevel: 4,
      center: ['center', 'center'],
      silent: true,
      radius: '55%',
      tooltip: {
        show: false,
      },
      itemStyle: {
        borderColor: getLinearGradient('rgba(69, 143, 255, 0.16)', 'rgba(69, 143, 255, 0)'),
        borderWidth: 1,
        color: getLinearGradient('rgba(69, 143, 255, 0.1)', 'rgba(69, 143, 255, 0)'),
      },
      data: [1],
    },
  ],
}
<\/script>

<template>
  <IxPieChart
    style="width: 600px; height: 300px"
    name="风险用户数"
    v-bind="pieOption"
  />
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">PieChartProps</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">graphic</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">echarts/core</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">PieSeriesOption</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">echarts/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">type</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">DataItem</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">PieSeriesOption</span><span style="color: #A6ACCD">[</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">data</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> getLinearGradient </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">(</span><span style="color: #A6ACCD">start</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #A6ACCD">end</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span><span style="color: #89DDFF">)</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">graphic</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">LinearGradient</span><span style="color: #F07178">(</span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> [</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">      offset</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">      color</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">start</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #676E95">// 渐变起始颜色</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">      offset</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">      color</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">end</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #676E95">// 渐变结束颜色</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #F07178">  ])</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> getDotData </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">dataArr</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">DataItem</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> []</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">for</span><span style="color: #F07178"> (</span><span style="color: #C792EA">var</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">i</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">;</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">i</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178"> </span><span style="color: #F78C6C">100</span><span style="color: #89DDFF">;</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">i</span><span style="color: #89DDFF">++</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">i</span><span style="color: #F07178"> </span><span style="color: #89DDFF">%</span><span style="color: #F07178"> </span><span style="color: #F78C6C">2</span><span style="color: #F07178"> </span><span style="color: #89DDFF">===</span><span style="color: #F07178"> </span><span style="color: #F78C6C">0</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #A6ACCD">dataArr</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">push</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">        name</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">i</span><span style="color: #F07178"> </span><span style="color: #89DDFF">+</span><span style="color: #F07178"> </span><span style="color: #F78C6C">1</span><span style="color: #F07178">)</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">toString</span><span style="color: #F07178">()</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        value</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">25</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">          color</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgb(126,190,255)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          borderWidth</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          borderColor</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(0,0,0,0)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">else</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #A6ACCD">dataArr</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">push</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">        name</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">i</span><span style="color: #F07178"> </span><span style="color: #89DDFF">+</span><span style="color: #F07178"> </span><span style="color: #F78C6C">1</span><span style="color: #F07178">)</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">toString</span><span style="color: #F07178">()</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        value</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">20</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">          color</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(0,0,0,0)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          borderWidth</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">0</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">          borderColor</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(0,0,0,0)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">return</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">dataArr</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> data </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">45</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">高危</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getLinearGradient</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(104, 159, 255, 1)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(104, 159, 255, 0.2)</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">124</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">中危</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getLinearGradient</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(255, 146, 69, 1)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(255, 146, 69, 0.2)</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">value</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">118</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">低危</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getLinearGradient</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(219, 76, 53, 1)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(219, 76, 53, 0.2)</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> pieOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">PieChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">legend</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    data</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #676E95">// 总数</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">String</span><span style="color: #A6ACCD">((data </span><span style="color: #89DDFF">||</span><span style="color: #A6ACCD"> [])</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">reduce</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">(</span><span style="color: #A6ACCD">acc</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #A6ACCD">cur</span><span style="color: #89DDFF">)</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> acc </span><span style="color: #89DDFF">+</span><span style="color: #A6ACCD"> cur</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">value</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">))</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #676E95">// 标题</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">textStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">fontSize</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">24</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">fontWeight</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">500</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#2F3540</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">fontFamily</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">D-DIN-PRO</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">subtextStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">fontSize</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">12</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">fontWeight</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">400</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#6A6D76</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #676E95">// 从外到内，一个pie表示一个图</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #676E95">// 最外层颜色</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">pie</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">zlevel</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">radius</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">80%</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">100%</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">silent</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">true</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getLinearGradient</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(69, 143, 255, 0.08)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(69, 143, 255, 0.01)</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">show</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">false</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">1</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #676E95">// 条纹</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">pie</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">radius</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">70%</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">80%</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">zlevel</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">emphasis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">scaleSize</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">10</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #89DDFF">      </span><span style="color: #676E95">// 显示的数据</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> data</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #676E95">// 虚线圈</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">pie</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">zlevel</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">3</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">silent</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">true</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">radius</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">64%</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">65%</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getDotData</span><span style="color: #A6ACCD">()</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #676E95">//最内圈</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">type</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">pie</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">zlevel</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">4</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">center</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">center</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">center</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">silent</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">true</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">radius</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">55%</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">tooltip</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">show</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">false</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">itemStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">borderColor</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getLinearGradient</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(69, 143, 255, 0.16)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(69, 143, 255, 0)</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">borderWidth</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getLinearGradient</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(69, 143, 255, 0.1)</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">rgba(69, 143, 255, 0)</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">1</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxPieChart</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">width: 600px; height: 300px</span><span style="color: #89DDFF">&quot;</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #C792EA">name</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">风险用户数</span><span style="color: #89DDFF">&quot;</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">pieOption</span><span style="color: #89DDFF">&quot;</span></span>\n<span class="line"><span style="color: #89DDFF">  /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
