import { n as getAlphaColor } from "./setup-9638164e.js";
function useLineStyleColor(color = "#458FFF") {
  return {
    // 配置折线图的两边逐渐透明的效果。
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [{
      offset: 0,
      color: getAlphaColor(color, 0.1)
      // 左边透明
    }, {
      offset: 0.2,
      color: getAlphaColor(color, 0.9)
      // 左边透明
    }, {
      offset: 0.5,
      color: getAlphaColor(color, 1)
      // 中间不透明
    }, {
      offset: 0.8,
      color: getAlphaColor(color, 0.9)
      // 右边透明
    }, {
      offset: 1,
      color: getAlphaColor(color, 0.1)
      // 右边透明
    }],
    globalCoord: false
    // 缺省为 false
  };
}
export {
  useLineStyleColor as u
};
