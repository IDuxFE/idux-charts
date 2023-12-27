import { u as useTooltipsFormatter } from "./setup-9638164e.js";
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
export {
  useStripeBarSeries as a,
  useStripeBarTooltip as u
};
