// ../plots/map/src/mapDefaults.ts
/** Convert lower thresholds to native (lower, upper] pieces, ordered high to low. */
function createMapPieces(thresholds, options = {}) {
	var _options$zeroColor;
	const sorted = [...thresholds].sort((a, b) => b.value - a.value);
	const seen = /* @__PURE__ */ new Set();
	for (const { value } of sorted) {
		if (!Number.isFinite(value) || seen.has(value)) throw new Error("Map thresholds must be finite and unique");
		seen.add(value);
	}
	const pieces = sorted.map(({ value, color }, index) => {
		var _sorted;
		const upper = (_sorted = sorted[index - 1]) === null || _sorted === void 0 ? void 0 : _sorted.value;
		return {
			gt: value,
			...upper !== void 0 ? { lte: upper } : {},
			label: upper === void 0 ? `>${value}` : `(${value}, ${upper}]`,
			color
		};
	});
	const zero = sorted.find((item) => item.value === 0);
	if (zero) pieces.splice(sorted.indexOf(zero) + 1, 0, {
		value: 0,
		label: "0",
		color: (_options$zeroColor = options.zeroColor) !== null && _options$zeroColor !== void 0 ? _options$zeroColor : zero.color
	});
	return pieces;
}
var defaultMapPieces = createMapPieces([
	{
		value: 800,
		color: "#214EB0"
	},
	{
		value: 600,
		color: "#4089FF"
	},
	{
		value: 400,
		color: "#6BA5FF"
	},
	{
		value: 200,
		color: "#98C6FF"
	},
	{
		value: 0,
		color: "#BFDEFF"
	}
], { zeroColor: "#E5F2FF" });
export { defaultMapPieces as n, createMapPieces as t };
