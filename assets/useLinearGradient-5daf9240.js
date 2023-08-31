import { L as LinearGradient } from "./setup-db92dac3.js";
function useLinearGradient() {
  return new LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: "rgba(69, 143, 255, 0.35)"
    },
    {
      offset: 0.5,
      color: "rgba(69, 143, 255, 0.2)"
    },
    {
      offset: 1,
      color: "rgba(69, 143, 255, 0.00)"
    }
  ]);
}
export {
  useLinearGradient as u
};
