import { D as mergePlotOptions, T as createPlotTooltipFormatter, a as hoverColor, c as pinSymbol, i as densityLabelColor, o as lineGradient, s as matchesMapPiece } from "./setup-Dd2XUUl1.js";
// ../plots/map/src/mapValidation.ts
function validMapCoordinate(coord) {
	return Array.isArray(coord) && coord.length === 2 && [coord[0], coord[1]].every((value) => typeof value === "number" && Number.isFinite(value));
}
function resolveMapRoute(item, nodes) {
	var _item$coords, _nodes$get, _nodes$get2;
	const coords = (_item$coords = item.coords) !== null && _item$coords !== void 0 ? _item$coords : item.source !== void 0 && item.target !== void 0 ? [(_nodes$get = nodes.get(item.source)) === null || _nodes$get === void 0 ? void 0 : _nodes$get.coordinate, (_nodes$get2 = nodes.get(item.target)) === null || _nodes$get2 === void 0 ? void 0 : _nodes$get2.coordinate] : void 0;
	return (coords === null || coords === void 0 ? void 0 : coords.length) === 2 && validMapCoordinate(coords[0]) && validMapCoordinate(coords[1]) ? coords : void 0;
}
// ../plots/map/src/mapHelpers.ts
var finite = (value) => typeof value === "number" && Number.isFinite(value);
function tooltipFormatter(options, useDatumTitle = false) {
	return createPlotTooltipFormatter((params) => {
		var _options$plotTheme$co, _options$plotTheme, _options$metricName, _datum$metrics;
		const param = Array.isArray(params) ? params[0] : params;
		const datum = param === null || param === void 0 ? void 0 : param.data;
		if (!datum) return;
		const color = (_options$plotTheme$co = (_options$plotTheme = options.plotTheme) === null || _options$plotTheme === void 0 ? void 0 : _options$plotTheme.color) !== null && _options$plotTheme$co !== void 0 ? _options$plotTheme$co : "#4089FF";
		return {
			title: (_options$metricName = options.metricName) !== null && _options$metricName !== void 0 ? _options$metricName : useDatumTitle ? datum.name : "",
			rows: ((_datum$metrics = datum.metrics) === null || _datum$metrics === void 0 ? void 0 : _datum$metrics.length) ? datum.metrics.map((metric) => ({
				name: metric.name,
				value: metric.value === null || typeof metric.value === "number" && !finite(metric.value) ? "-" : `${metric.value}${metric.unit ? " " + metric.unit : ""}`,
				color
			})) : [{
				name: datum.name,
				value: finite(datum.mapValue) ? `${datum.mapValue}${options.unit ? " " + options.unit : ""}` : "-",
				color
			}]
		};
	});
}
function indexNodes(data) {
	const nodes = /* @__PURE__ */ new Map();
	for (const node of data) {
		if (nodes.has(node.id)) throw new Error(`Duplicate map node id: ${node.id}`);
		nodes.set(node.id, node);
	}
	return nodes;
}
/** Return an ordinary scatter series. Native options override the visual defaults. */
function createMapNodes(data, options = {}) {
	var _theme$color, _theme$secondaryTextC, _theme$mapLabelBackgr, _theme$mapBorderColor;
	indexNodes(data);
	const { metricName, unit, plotTheme: theme = {}, ...native } = options;
	const blue = (_theme$color = theme.color) !== null && _theme$color !== void 0 ? _theme$color : "#4089FF";
	const series = mergePlotOptions({
		type: "scatter",
		coordinateSystem: "geo",
		geoIndex: 0,
		z: 4,
		symbol: "circle",
		symbolSize: options.symbol === "pin" ? 28 : 12,
		label: {
			show: true,
			position: "bottom",
			distance: 8,
			formatter: "{b}",
			color: (_theme$secondaryTextC = theme.secondaryTextColor) !== null && _theme$secondaryTextC !== void 0 ? _theme$secondaryTextC : "#6F7785",
			fontSize: 12,
			fontWeight: "normal",
			lineHeight: 20,
			backgroundColor: (_theme$mapLabelBackgr = theme.mapLabelBackgroundColor) !== null && _theme$mapLabelBackgr !== void 0 ? _theme$mapLabelBackgr : "#FFFFFF",
			padding: [4, 8],
			borderRadius: 12
		},
		itemStyle: {
			color: blue,
			borderColor: (_theme$mapBorderColor = theme.mapBorderColor) !== null && _theme$mapBorderColor !== void 0 ? _theme$mapBorderColor : "#FFFFFF",
			borderWidth: 1,
			opacity: 1
		},
		emphasis: { scale: false },
		tooltip: { formatter: tooltipFormatter(options) }
	}, native);
	series.data = data.filter((item) => validMapCoordinate(item.coordinate)).map((item) => {
		var _item$symbol, _item$color, _series$itemStyle, _series$itemStyle2, _series$itemStyle3;
		const symbol = (_item$symbol = item.symbol) !== null && _item$symbol !== void 0 ? _item$symbol : series.symbol;
		const fill = (_item$color = item.color) !== null && _item$color !== void 0 ? _item$color : typeof ((_series$itemStyle = series.itemStyle) === null || _series$itemStyle === void 0 ? void 0 : _series$itemStyle.color) === "string" ? series.itemStyle.color : blue;
		return {
			id: item.id,
			name: item.name,
			metrics: item.metrics,
			mapValue: item.value,
			value: [...item.coordinate, finite(item.value) ? item.value : "-"],
			...symbol === "pin" ? {
				symbol: !item.color && typeof ((_series$itemStyle2 = series.itemStyle) === null || _series$itemStyle2 === void 0 ? void 0 : _series$itemStyle2.color) === "function" ? "pin" : pinSymbol(fill, ((_series$itemStyle3 = series.itemStyle) === null || _series$itemStyle3 === void 0 ? void 0 : _series$itemStyle3.borderWidth) !== 0),
				symbolOffset: [0, "-50%"],
				...options.symbolSize === void 0 ? { symbolSize: 28 } : {}
			} : item.symbol ? {
				symbol: item.symbol,
				...options.symbolSize === void 0 ? { symbolSize: 12 } : {}
			} : {},
			...item.color ? { itemStyle: { color: fill } } : {}
		};
	});
	return series;
}
/** Resolve endpoint references and return an ordinary lines series. */
function createMapLines(data, options = {}) {
	var _theme$color2, _native$lineStyle;
	const { nodes: nodeData = [], animated = false, gradient = true, curveDirection = "auto", metricName, unit, plotTheme: theme = {}, ...native } = options;
	const nodes = indexNodes(nodeData);
	const blue = (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 ? _theme$color2 : "#4089FF";
	const series = mergePlotOptions({
		type: "lines",
		coordinateSystem: "geo",
		geoIndex: 0,
		z: 3,
		lineStyle: {
			color: blue,
			width: 1,
			opacity: 1,
			type: [3, 2],
			curveness: .2
		},
		stateAnimation: {
			duration: 80,
			easing: "cubicOut"
		},
		effect: {
			show: animated,
			period: 5,
			trailLength: .15,
			symbolSize: 4,
			color: typeof ((_native$lineStyle = native.lineStyle) === null || _native$lineStyle === void 0 ? void 0 : _native$lineStyle.color) === "string" ? native.lineStyle.color : blue
		},
		emphasis: { lineStyle: {
			width: 2,
			type: [6, 4]
		} },
		tooltip: { formatter: tooltipFormatter(options, true) }
	}, native);
	series.data = data.flatMap((item) => {
		var _ref, _item$color2, _series$lineStyle, _series$lineStyle$cur, _series$lineStyle2, _item$name, _source$name, _target$name;
		const source = item.source !== void 0 ? nodes.get(item.source) : void 0;
		const target = item.target !== void 0 ? nodes.get(item.target) : void 0;
		const coords = resolveMapRoute(item, nodes);
		if (!coords) return [];
		const fill = (_ref = (_item$color2 = item.color) !== null && _item$color2 !== void 0 ? _item$color2 : (_series$lineStyle = series.lineStyle) === null || _series$lineStyle === void 0 ? void 0 : _series$lineStyle.color) !== null && _ref !== void 0 ? _ref : blue;
		const curveness = (_series$lineStyle$cur = (_series$lineStyle2 = series.lineStyle) === null || _series$lineStyle2 === void 0 ? void 0 : _series$lineStyle2.curveness) !== null && _series$lineStyle$cur !== void 0 ? _series$lineStyle$cur : .2;
		return [{
			id: item.id,
			name: (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : `${(_source$name = source === null || source === void 0 ? void 0 : source.name) !== null && _source$name !== void 0 ? _source$name : item.from} – ${(_target$name = target === null || target === void 0 ? void 0 : target.name) !== null && _target$name !== void 0 ? _target$name : item.to}`,
			coords,
			value: finite(item.value) ? item.value : void 0,
			mapValue: item.value,
			metrics: item.metrics,
			lineStyle: {
				...typeof fill === "function" ? {} : { color: gradient && typeof fill === "string" ? lineGradient([coords[0], coords[1]], fill) : fill },
				curveness: curveDirection === "fixed" ? curveness : Math.abs(curveness) * (coords[1][0] < coords[0][0] ? -1 : 1)
			},
			...item.color ? {
				effect: { color: item.color },
				emphasis: { lineStyle: { color: item.color } }
			} : {}
		}];
	});
	return series;
}
/** Resolve a value using the same pieces as regions and the native legend. */
function getMapPieceColor(value, pieces, fallback = "#F0F3F7") {
	var _ref2, _pieces$find;
	return (_ref2 = finite(value) ? (_pieces$find = pieces.find((piece) => matchesMapPiece(value, piece))) === null || _pieces$find === void 0 ? void 0 : _pieces$find.color : void 0) !== null && _ref2 !== void 0 ? _ref2 : fallback;
}
/** Return geo.regions entries. Display names do not change geometry matching keys. */
function createMapRegions(data, options = {}) {
	var _ref3, _theme$mapAreaColor, _theme$mapEmptyColor;
	const { pieces, metricName, unit, plotTheme: theme = {}, ...native } = options;
	const names = /* @__PURE__ */ new Set();
	const areaColor = (_ref3 = (_theme$mapAreaColor = theme.mapAreaColor) !== null && _theme$mapAreaColor !== void 0 ? _theme$mapAreaColor : theme.mutedColor) !== null && _ref3 !== void 0 ? _ref3 : "#CDD9E7";
	const emptyColor = (_theme$mapEmptyColor = theme.mapEmptyColor) !== null && _theme$mapEmptyColor !== void 0 ? _theme$mapEmptyColor : "#F0F3F7";
	const formatTooltip = tooltipFormatter(options);
	return data.map((item) => {
		var _item$color3, _options$itemStyle, _item$name2, _theme$color3, _options$label$show, _options$label;
		if (names.has(item.region)) throw new Error(`Duplicate map region: ${item.region}`);
		names.add(item.region);
		const fill = pieces ? getMapPieceColor(item.value, pieces, emptyColor) : (_item$color3 = item.color) !== null && _item$color3 !== void 0 ? _item$color3 : typeof ((_options$itemStyle = options.itemStyle) === null || _options$itemStyle === void 0 ? void 0 : _options$itemStyle.areaColor) === "string" ? options.itemStyle.areaColor : areaColor;
		const datum = {
			name: (_item$name2 = item.name) !== null && _item$name2 !== void 0 ? _item$name2 : item.region,
			mapValue: item.value,
			metrics: item.metrics
		};
		return mergePlotOptions({
			name: item.region,
			label: {
				show: true,
				color: densityLabelColor(fill, (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 ? _theme$color3 : "#4089FF"),
				fontSize: 10
			},
			itemStyle: { areaColor: fill },
			emphasis: {
				label: { show: (_options$label$show = (_options$label = options.label) === null || _options$label === void 0 ? void 0 : _options$label.show) !== null && _options$label$show !== void 0 ? _options$label$show : true },
				itemStyle: { areaColor: hoverColor(fill) }
			},
			tooltip: { formatter: () => formatTooltip({ data: datum }) }
		}, native, pieces || item.color ? { itemStyle: { areaColor: fill } } : {});
	});
}
/** Return a native, non-interactive piecewise legend for manually colored geo.regions. */
function createMapVisualMap(pieces, options = {}) {
	var _theme$mapLabelBackgr2, _theme$borderColor, _theme$secondaryTextC2;
	const { plotTheme: theme = {}, ...native } = options;
	return mergePlotOptions({
		type: "piecewise",
		seriesIndex: [],
		pieces: [...pieces],
		selectedMode: false,
		left: 16,
		bottom: 16,
		itemSymbol: "roundRect",
		itemWidth: 12,
		itemHeight: 12,
		itemGap: 10,
		padding: 12,
		backgroundColor: (_theme$mapLabelBackgr2 = theme.mapLabelBackgroundColor) !== null && _theme$mapLabelBackgr2 !== void 0 ? _theme$mapLabelBackgr2 : "#FFFFFF",
		borderColor: (_theme$borderColor = theme.borderColor) !== null && _theme$borderColor !== void 0 ? _theme$borderColor : "#E1E5EB",
		borderWidth: 1,
		textStyle: { color: (_theme$secondaryTextC2 = theme.secondaryTextColor) !== null && _theme$secondaryTextC2 !== void 0 ? _theme$secondaryTextC2 : "#6F7785" }
	}, native);
}
export { getMapPieceColor as a, createMapVisualMap as i, createMapNodes as n, createMapRegions as r, createMapLines as t };
