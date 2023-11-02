import { L as LinearGradient, g as getAlphaColor } from "./setup-c0401084.js";
function useLinearGradient(color = "#458FFF") {
  return new LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: getAlphaColor(color, 0.3)
    },
    {
      offset: 0.5,
      color: getAlphaColor(color, 0.2)
    },
    {
      offset: 1,
      color: getAlphaColor(color, 0)
    }
  ]);
}
export {
  useLinearGradient as u
};
