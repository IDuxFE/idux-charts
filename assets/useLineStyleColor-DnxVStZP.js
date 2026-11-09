import { u as getAlphaColor } from "./setup-Dllf4FRH.js";
// ../plots/line/src/useLineStyleColor.ts
function useLineStyleColor(color = "#458FFF") {
	return {
		type: "linear",
		x: 0,
		y: 0,
		x2: 1,
		y2: 0,
		colorStops: [
			{
				offset: 0,
				color: getAlphaColor(color, .1)
			},
			{
				offset: .2,
				color: getAlphaColor(color, .9)
			},
			{
				offset: .5,
				color: getAlphaColor(color, 1)
			},
			{
				offset: .8,
				color: getAlphaColor(color, .9)
			},
			{
				offset: 1,
				color: getAlphaColor(color, .1)
			}
		],
		globalCoord: false
	};
}
export { useLineStyleColor as t };
