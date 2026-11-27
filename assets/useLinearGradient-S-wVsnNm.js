import { Lt as LinearGradient, z as getAlphaColor } from "./setup-Dd2XUUl1.js";
// ../plots/line/src/useLinearGradient.ts
function useLinearGradient(color = "#458FFF") {
	return new LinearGradient(0, 0, 0, 1, [
		{
			offset: 0,
			color: getAlphaColor(color, .3)
		},
		{
			offset: .5,
			color: getAlphaColor(color, .2)
		},
		{
			offset: 1,
			color: getAlphaColor(color, 0)
		}
	]);
}
export { useLinearGradient as t };
