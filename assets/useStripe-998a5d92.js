import { u as useTooltipsFormatter } from "./setup-f1a25eeb.js";
function useStripe({
  data = [],
  color = "",
  offset = [0, 0],
  rotate = -20,
  size = [2, 8]
}) {
  return {
    // 分隔线
    name: "",
    data,
    // @ts-ignore
    type: "pictorialBar",
    symbolRotate: rotate,
    silent: true,
    itemStyle: {
      color,
      opacity: 0
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    symbolRepeat: "fixed",
    symbolMargin: 2,
    symbol: "rect",
    symbolClip: true,
    symbolSize: size,
    symbolPosition: "start",
    symbolOffset: offset,
    z: 1,
    animationEasing: "elasticOut"
  };
}
function useStripeBarTooltip(unit) {
  return {
    axisPointer: {
      lineStyle: {
        opacity: 0.6
      }
    },
    formatter: function(params) {
      if (!(params == null ? void 0 : params.length)) {
        return "";
      }
      const title = params[0].name;
      const list = params.filter((item) => !!item.seriesName).map((param) => {
        return {
          name: param.seriesName,
          value: `${param.value} ${unit}`,
          color: param.color
        };
      });
      return useTooltipsFormatter(title, list);
    }
  };
}
function useStripeBarSeries({
  series,
  color,
  offset = [0, 0],
  rotate,
  size
}) {
  return [
    {
      type: "bar",
      z: 0,
      ...series
    },
    useStripe({
      data: series.data,
      offset,
      color,
      rotate,
      size
    })
  ];
}
function useStripeArea() {
  return {
    aria: {
      enabled: true,
      decal: {
        show: true,
        decals: [
          {
            color: "white",
            dashArrayX: [1, 0],
            // 这个一般不用调增
            dashArrayY: [6, 0],
            // 调整 [x, y] 中 x 的值可以调整条纹的密度
            symbolSize: 0.5,
            // 这个值越大，白色条纹就越宽。0.5 的时候则是平均分
            rotation: Math.PI / 2
            // 这个让条纹保持竖向
          }
        ]
      }
    }
  };
}
export {
  useStripeBarSeries as a,
  useStripeArea as b,
  useStripeBarTooltip as u
};
