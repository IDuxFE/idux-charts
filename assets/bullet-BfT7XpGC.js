import { A as defaultDarkMissingBackgroundColor, B as getAlphaColor, C as seerGradientStartColors, D as mergeNativePlotOptions, E as createPlotTooltipFormatter, F as getTooltipsColor, H as install$1, It as Model, J as install$4, K as installLabelLayout, Kt as ZRText, M as createCategorySlider, O as mergePlotOptions, P as useReactiveAttrs, Pt as formatTpl, Q as install$3, R as convertArray, Rt as LinearGradient, S as getLinearColors, St as registerVisual, T as mergeCartesianGrid, V as withChartProps, W as install, Xt as lift, Y as install$2, b as installBarShadow, gt as install$5, j as usePlotDark, jt as getLayoutRect, nt as install$6, tt as install$7, v as plotInstanceMethods, vt as PRIORITY, w as categoryLabelDefaults, x as LinearDirection, xt as registerUpdateLifecycle, y as usePlotRender, yt as registerLayout, z as createInstall } from "./setup-CX-vYG6t.js";
import { t as createTextStyle } from "./helper-DMXVJ_Bb.js";
import { ft as pick, jn as defineComponent } from "./app-default-T1OuoY14.js";
// ../plots/bullet/assets/loading.svg?raw
var loading_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"none\" version=\"1.1\" width=\"90\" height=\"90\" viewBox=\"0 0 90 90\"><ellipse cx=\"45\" cy=\"69\" rx=\"40\" ry=\"5\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"10\" y=\"28\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"33\" y=\"28\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"56\" y=\"28\" width=\"24\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"10\" y=\"38\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"33\" y=\"38\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"56\" y=\"38\" width=\"24\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"10\" y=\"48\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"33\" y=\"48\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"56\" y=\"48\" width=\"24\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"10\" y=\"18\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"33\" y=\"18\" width=\"22\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"56\" y=\"18\" width=\"24\" height=\"6\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"11\" y=\"19\" width=\"49\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"11\" y=\"29\" width=\"41\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"11\" y=\"39\" width=\"36\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"11\" y=\"49\" width=\"31\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"72\" y=\"19\" width=\"1\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"64\" y=\"29\" width=\"1\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"56\" y=\"39\" width=\"1\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"48\" y=\"49\" width=\"1\" height=\"4\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/></svg>";
// ../plots/bullet/assets/loading-single.svg?raw
var loading_single_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"none\" version=\"1.1\" width=\"90\" height=\"90\" viewBox=\"0 0 90 90\"><ellipse cx=\"45\" cy=\"69\" rx=\"40\" ry=\"5\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"10\" y=\"35\" width=\"20\" height=\"8\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"31\" y=\"35\" width=\"20\" height=\"8\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"52\" y=\"35\" width=\"28\" height=\"8\" rx=\"0\" fill=\"#F7F9FC\" fill-opacity=\"1\"/><rect x=\"11\" y=\"36\" width=\"49\" height=\"6\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/><rect x=\"72\" y=\"36\" width=\"1\" height=\"6\" rx=\"0\" fill=\"#E1E5EB\" fill-opacity=\"1\"/></svg>";
// ../plots/bullet/src/bulletHover.ts
var layers = [
	"bullet",
	"bullet-decorations",
	"bullet-targets"
];
/** Highlight the native bar when the pointer is over its track or target. */
function bindBulletHover(chart) {
	const toggle = (type, event) => {
		if (!event.seriesId || !layers.includes(event.seriesId) || event.dataIndex === void 0) return;
		chart.dispatchAction({
			type,
			batch: layers.filter((id) => id !== event.seriesId).map((seriesId) => ({
				seriesId,
				dataIndex: event.dataIndex
			}))
		});
	};
	chart.on("mouseover", (event) => toggle("highlight", event));
	chart.on("mouseout", (event) => toggle("downplay", event));
}
// ../plots/bullet/src/types.ts
var bulletSeriesProps = [
	"name",
	"barWidth",
	"barMinWidth",
	"barMaxWidth",
	"label",
	"labelLayout",
	"itemStyle",
	"emphasis",
	"blur",
	"select",
	"selectedMode",
	"markLine",
	"markPoint",
	"markArea",
	"silent",
	"cursor"
];
var bulletProps = [
	...bulletSeriesProps,
	"layout",
	"value",
	"target",
	"data",
	"ranges",
	"targetColor",
	"trackColor",
	"zeroText",
	"plotTheme"
];
// ../plots/bullet/src/resolveBulletModel.ts
var rangeColors = [
	3,
	2,
	1
].map((index) => seerGradientStartColors[index]);
var isFiniteBulletValue = (value) => typeof value === "number" && Number.isFinite(value);
function resolveBulletModel(props) {
	var _props$data, _props$ranges, _props$plotTheme, _props$darkMode, _props$trackColor, _theme$missingBackgro, _theme$errorColor, _theme$secondaryTextC;
	const grouped = props.data !== void 0;
	const source = (_props$data = props.data) !== null && _props$data !== void 0 ? _props$data : [{
		name: "",
		value: props.value,
		target: props.target
	}];
	const ranges = ((_props$ranges = props.ranges) !== null && _props$ranges !== void 0 ? _props$ranges : []).map((range, index) => {
		var _range$color;
		return {
			...range,
			color: (_range$color = range.color) !== null && _range$color !== void 0 ? _range$color : rangeColors[index % rangeColors.length]
		};
	});
	const axis = convertArray(props.xAxis)[0];
	const nativeMin = typeof (axis === null || axis === void 0 ? void 0 : axis.min) === "number" ? axis.min : void 0;
	const nativeMax = typeof (axis === null || axis === void 0 ? void 0 : axis.max) === "number" ? axis.max : void 0;
	const min = nativeMin !== null && nativeMin !== void 0 ? nativeMin : 0;
	if (!isFiniteBulletValue(min)) return { diagnostic: `xAxis.min must be finite; received ${min}.` };
	for (const [index, range] of ranges.entries()) {
		var _ranges$upper, _ranges;
		if (!isFiniteBulletValue(range.upper)) return { diagnostic: `ranges[${index}].upper must be finite; received ${range.upper}.` };
		const previous = (_ranges$upper = (_ranges = ranges[index - 1]) === null || _ranges === void 0 ? void 0 : _ranges.upper) !== null && _ranges$upper !== void 0 ? _ranges$upper : min;
		if (range.upper <= previous) return { diagnostic: `ranges[${index}].upper must be greater than ${previous}; received ${range.upper}.` };
	}
	const max = nativeMax !== null && nativeMax !== void 0 ? nativeMax : source.reduce((upper, row) => Math.max(upper, isFiniteBulletValue(row.value) ? row.value : upper, isFiniteBulletValue(row.target) ? row.target : upper), ranges.reduce((upper, range) => Math.max(upper, range.upper), Math.max(100, min + 1)));
	if (!isFiniteBulletValue(max)) return { diagnostic: `xAxis.max must be finite; received ${max}.` };
	if (max <= min) return { diagnostic: `xAxis.max must be greater than xAxis.min (${min}); received ${max}.` };
	const overflowingRange = ranges.findIndex((range) => range.upper > max);
	if (overflowingRange >= 0) return { diagnostic: `ranges[${overflowingRange}].upper must not exceed xAxis.max (${max}); received ${ranges[overflowingRange].upper}.` };
	const theme = (_props$plotTheme = props.plotTheme) !== null && _props$plotTheme !== void 0 ? _props$plotTheme : {};
	const dark = !!((_props$darkMode = props.darkMode) !== null && _props$darkMode !== void 0 ? _props$darkMode : props.theme === "dark");
	const color = getTooltipsColor(convertArray(props.color)[0]) || theme.color || "#458FFF";
	const colorAt = (value) => {
		var _ranges$find$color, _ranges$find;
		return value === void 0 ? color : (_ranges$find$color = (_ranges$find = ranges.find((range) => value <= range.upper)) === null || _ranges$find === void 0 ? void 0 : _ranges$find.color) !== null && _ranges$find$color !== void 0 ? _ranges$find$color : color;
	};
	const rows = source.map((row) => {
		var _row$itemStyle$color, _row$itemStyle, _props$itemStyle, _props$targetColor;
		const value = isFiniteBulletValue(row.value) ? row.value : void 0;
		const target = isFiniteBulletValue(row.target) ? row.target : void 0;
		const styleColor = (_row$itemStyle$color = (_row$itemStyle = row.itemStyle) === null || _row$itemStyle === void 0 ? void 0 : _row$itemStyle.color) !== null && _row$itemStyle$color !== void 0 ? _row$itemStyle$color : (_props$itemStyle = props.itemStyle) === null || _props$itemStyle === void 0 ? void 0 : _props$itemStyle.color;
		return {
			...row,
			value,
			target,
			actualColor: typeof styleColor !== "function" && getTooltipsColor(styleColor) || (grouped ? color : colorAt(value)),
			targetColor: (_props$targetColor = props.targetColor) !== null && _props$targetColor !== void 0 ? _props$targetColor : grouped ? color : colorAt(target)
		};
	});
	return { model: {
		props,
		grouped,
		rows,
		ranges,
		min,
		max,
		theme,
		dark,
		track: (_props$trackColor = props.trackColor) !== null && _props$trackColor !== void 0 ? _props$trackColor : getAlphaColor(color, dark ? .16 : .1),
		missingColor: (_theme$missingBackgro = theme.missingBackgroundColor) !== null && _theme$missingBackgro !== void 0 ? _theme$missingBackgro : dark ? defaultDarkMissingBackgroundColor : getAlphaColor((_theme$errorColor = theme.errorColor) !== null && _theme$errorColor !== void 0 ? _theme$errorColor : "#F5654F", .12),
		text: (_theme$secondaryTextC = theme.secondaryTextColor) !== null && _theme$secondaryTextC !== void 0 ? _theme$secondaryTextC : dark ? "#808999" : "#A1A7B3",
		allZero: rows.length > 0 && rows.every((row) => row.value === 0)
	} };
}
// ../plots/bullet/src/bulletLabel.ts
function resolveLabelPosition(position) {
	switch (position) {
		case "outside":
		case "end": return "right";
		case "start": return "left";
		case "insideStart": return "insideLeft";
		case "insideEnd": return "insideRight";
		case "middle": return "inside";
		default: return position;
	}
}
/** Shared defaults for native bar labels and missing-value anchors. */
function resolveBulletLabel(model) {
	var _theme$numberFontFami, _theme$secondaryTextC, _theme$textColor;
	const { props, theme, dark } = model;
	return mergePlotOptions({
		show: model.grouped && props.layout === "horizontal-above",
		position: "right",
		distance: 2,
		fontSize: 12,
		fontFamily: (_theme$numberFontFami = theme.numberFontFamily) !== null && _theme$numberFontFami !== void 0 ? _theme$numberFontFami : theme.fontFamily,
		color: dark ? (_theme$secondaryTextC = theme.secondaryTextColor) !== null && _theme$secondaryTextC !== void 0 ? _theme$secondaryTextC : "#A1A7B3" : (_theme$textColor = theme.textColor) !== null && _theme$textColor !== void 0 ? _theme$textColor : "#454D61"
	}, props.label);
}
/** Missing values have no native bar to attach text to. Only their anchor is custom. */
function createBulletLabel(model) {
	const { props, rows } = model;
	const defaults = resolveBulletLabel(model);
	const labels = rows.map((row) => mergePlotOptions(defaults, row.label));
	return {
		show: labels.some((label) => !!label.show),
		render: (params) => {
			var _row$value, _props$data$params$da, _props$data, _props$name;
			const row = rows[params.dataIndex];
			const label = labels[params.dataIndex];
			if (!label.show) return;
			const textConfig = {
				position: resolveLabelPosition(label.position),
				distance: label.distance,
				offset: label.offset,
				rotation: label.rotate == null ? void 0 : label.rotate * Math.PI / 180,
				outsideFill: "auto"
			};
			const value = (_row$value = row.value) !== null && _row$value !== void 0 ? _row$value : null;
			const data = {
				...(_props$data$params$da = (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data[params.dataIndex]) !== null && _props$data$params$da !== void 0 ? _props$data$params$da : {
					value: props.value,
					target: props.target
				},
				name: row.name,
				value
			};
			const context = {
				componentType: "series",
				componentSubType: "custom",
				componentIndex: params.seriesIndex,
				seriesType: "custom",
				seriesIndex: params.seriesIndex,
				seriesId: params.seriesId,
				seriesName: String((_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : "实际值"),
				name: row.name,
				dataIndex: params.dataIndex,
				data,
				value,
				color: row.actualColor,
				dimensionNames: ["value"],
				encode: { x: [0] },
				$vars: [
					"seriesName",
					"name",
					"value"
				]
			};
			const formatter = label.formatter;
			const content = typeof formatter === "function" ? formatter(context) : typeof formatter === "string" ? formatTpl(formatter, context) : value === null ? "–" : String(value);
			return {
				textConfig,
				textContent: {
					type: "text",
					name: "value-label",
					ignore: false,
					silent: label.silent,
					z2: 10,
					style: {
						...createTextStyle(new Model({
							...label,
							color: label.color === "inherit" ? row.actualColor : label.color
						}), { state: "normal" }),
						text: content
					}
				}
			};
		}
	};
}
// ../plots/bullet/src/bulletLayout.ts
function hasNativeBulletWidth(props) {
	return props.barWidth != null || props.barMinWidth != null || props.barMaxWidth != null;
}
function getBulletThickness(grouped, band, height) {
	const preferred = grouped && height / band <= 3 ? 16 : 8;
	return grouped ? Math.min(preferred, band / 4) : preferred;
}
/** Only adapt thickness and the above-label offset; ECharts lays out value lengths. */
function installBulletLayout() {
	registerLayout(PRIORITY.VISUAL.PROGRESSIVE_LAYOUT + 1, {
		seriesType: "bar",
		reset(seriesModel) {
			var _seriesModel$coordina;
			const settings = seriesModel.option.__ixBulletLayout;
			if (!settings || ((_seriesModel$coordina = seriesModel.coordinateSystem) === null || _seriesModel$coordina === void 0 ? void 0 : _seriesModel$coordina.type) !== "cartesian2d") return;
			const cartesian = seriesModel.coordinateSystem;
			const band = cartesian.getBaseAxis().getBandWidth();
			const data = seriesModel.getData();
			const thickness = settings.nativeWidth ? data.getLayout("size") : getBulletThickness(settings.grouped, band, cartesian.getArea().height);
			const offset = settings.above ? Math.min(10, band / 6) : 0;
			data.each((index) => {
				const layout = data.getItemLayout(index);
				if (!layout) return;
				layout.y = layout.y + layout.height / 2 + offset - thickness / 2;
				layout.height = thickness;
				if (data.get(data.mapDimension("x"), index) === 0) layout.width = 0;
			});
			data.setLayout({
				size: thickness,
				offset: offset - thickness / 2
			});
		}
	});
}
// ../plots/bullet/src/bulletBar.ts
var gradients$1 = getLinearColors(LinearDirection.horizontal);
function createBulletBar(model) {
	var _props$name;
	const { props, rows, grouped, ranges } = model;
	const defaultColor = (params) => {
		var _gradients$find$color, _gradients$find;
		const fill = rows[params.dataIndex].actualColor;
		if (!grouped && ranges.length) return fill;
		const light = (_gradients$find$color = (_gradients$find = gradients$1.find((gradient) => {
			var _gradient$colorStops$;
			return ((_gradient$colorStops$ = gradient.colorStops[0]) === null || _gradient$colorStops$ === void 0 ? void 0 : _gradient$colorStops$.color) === fill;
		})) === null || _gradients$find === void 0 || (_gradients$find = _gradients$find.colorStops[1]) === null || _gradients$find === void 0 ? void 0 : _gradients$find.color) !== null && _gradients$find$color !== void 0 ? _gradients$find$color : lift(fill, .4);
		return new LinearGradient(0, 0, 1, 0, [{
			offset: 0,
			color: light
		}, {
			offset: 1,
			color: fill
		}]);
	};
	return mergePlotOptions({
		id: "bullet",
		name: (_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : "实际值",
		type: "bar",
		z: 2,
		clip: true,
		barMinHeight: 1,
		__ixBulletLayout: {
			grouped,
			above: grouped && props.layout === "horizontal-above",
			nativeWidth: hasNativeBulletWidth(props)
		},
		label: resolveBulletLabel(model),
		itemStyle: {
			...props.color == null ? { color: defaultColor } : {},
			shadowColor: "auto",
			shadowBlur: 10,
			shadowOffsetY: -4
		},
		data: rows.map((row, index) => {
			var _props$data$index, _props$data, _row$value, _props$data2;
			return {
				...(_props$data$index = (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data[index]) !== null && _props$data$index !== void 0 ? _props$data$index : {
					value: props.value,
					target: props.target
				},
				name: row.name,
				value: (_row$value = row.value) !== null && _row$value !== void 0 ? _row$value : null,
				...grouped && props.layout === "horizontal-above" && row.value === 0 ? { label: mergePlotOptions((_props$data2 = props.data) === null || _props$data2 === void 0 || (_props$data2 = _props$data2[index]) === null || _props$data2 === void 0 ? void 0 : _props$data2.label, { show: false }) } : {}
			};
		})
	}, pick(props, bulletSeriesProps));
}
// ../plots/bullet/src/renderBullet.ts
var gradients = getLinearColors(LinearDirection.horizontal);
function lightColor(color) {
	var _preset$colorStops$1$, _preset$colorStops$;
	const preset = gradients.find((gradient) => {
		var _gradient$colorStops$;
		return ((_gradient$colorStops$ = gradient.colorStops[0]) === null || _gradient$colorStops$ === void 0 ? void 0 : _gradient$colorStops$.color) === color;
	});
	return (_preset$colorStops$1$ = preset === null || preset === void 0 || (_preset$colorStops$ = preset.colorStops[1]) === null || _preset$colorStops$ === void 0 ? void 0 : _preset$colorStops$.color) !== null && _preset$colorStops$1$ !== void 0 ? _preset$colorStops$1$ : lift(color, .4);
}
/** Geometry follows the final ECharts axis; clipping never changes tooltip values. */
function clippedPosition(coord, api, category) {
	return (value) => Math.max(coord.x, Math.min(coord.x + coord.width, api.coord([value, category])[0]));
}
function createBulletSeries(model) {
	const { props, grouped, rows, ranges, min, max, track, missingColor, text, allZero } = model;
	const above = grouped && props.layout === "horizontal-above";
	const hideZero = grouped && allZero && !above;
	const label = createBulletLabel(model);
	const rowGeometry = (params, api) => {
		var _api$barLayout, _props$barMinWidth;
		const row = rows[params.dataIndex];
		const coord = params.coordSys;
		let y = api.coord([min, params.dataIndex])[1];
		if ((above || label.show) && (y < coord.y || y > coord.y + coord.height)) return;
		const x = coord.x, width = coord.width;
		const band = Math.abs(api.size([0, 1])[1]);
		const sparse = grouped && coord.height / band <= 3;
		const customWidth = hasNativeBulletWidth(props);
		const widthInPixels = (width) => typeof width === "string" ? width === "auto" ? void 0 : getLayoutRect({ width }, {
			width: band,
			height: 0
		}).width : width;
		const nativeWidth = customWidth ? (_api$barLayout = api.barLayout({
			count: 1,
			barWidth: widthInPixels(props.barWidth),
			barMinWidth: widthInPixels((_props$barMinWidth = props.barMinWidth) !== null && _props$barMinWidth !== void 0 ? _props$barMinWidth : 1),
			barMaxWidth: widthInPixels(props.barMaxWidth)
		})) === null || _api$barLayout === void 0 || (_api$barLayout = _api$barLayout[0]) === null || _api$barLayout === void 0 ? void 0 : _api$barLayout.width : void 0;
		const thickness = nativeWidth !== null && nativeWidth !== void 0 ? nativeWidth : getBulletThickness(grouped, band, coord.height);
		const trackThickness = thickness * (sparse && !customWidth ? 1.5 : 2);
		if (above) y += Math.min(10, band / 6);
		const position = clippedPosition(coord, api, params.dataIndex);
		const reversed = api.coord([min, params.dataIndex])[0] > api.coord([max, params.dataIndex])[0];
		const trackStart = reversed ? x + width : x;
		const trackEnd = reversed ? x : x + width;
		const rect = (left, right, height, fill, opacity = 1) => ({
			type: "rect",
			transition: ["shape", "style"],
			shape: {
				x: Math.min(left, right),
				y: y - height / 2,
				width: Math.abs(right - left),
				height
			},
			style: {
				fill,
				opacity
			}
		});
		return {
			row,
			x,
			width,
			y,
			thickness,
			trackThickness,
			position,
			trackStart,
			trackEnd,
			rect
		};
	};
	const series = {
		id: "bullet-decorations",
		z: 1,
		type: "custom",
		coordinateSystem: "cartesian2d",
		clip: !above && !label.show,
		dimensions: [
			"value",
			"category",
			"target"
		],
		encode: {
			x: 0,
			y: 1
		},
		data: rows.map(({ actualColor: _actualColor, targetColor: _targetColor, ...row }, index) => {
			var _row$value, _row$target;
			return {
				...row,
				value: [
					(_row$value = row.value) !== null && _row$value !== void 0 ? _row$value : min,
					index,
					(_row$target = row.target) !== null && _row$target !== void 0 ? _row$target : null
				]
			};
		}),
		renderItem: (params, api) => {
			const geometry = rowGeometry(params, api);
			if (!geometry) return;
			const { row, x, width, y, thickness, trackThickness, position, trackStart, trackEnd, rect } = geometry;
			const barSize = 0;
			const barX = position(0);
			const children = [];
			if (above) {
				var _model$theme$secondar;
				children.push({
					type: "text",
					name: "category-label",
					style: {
						x,
						y: y - trackThickness / 2 - 2,
						text: row.name,
						width,
						overflow: "truncate",
						fill: (_model$theme$secondar = model.theme.secondaryTextColor) !== null && _model$theme$secondar !== void 0 ? _model$theme$secondar : model.dark ? "#A1A7B3" : "#6F7785",
						fontSize: 12,
						fontFamily: model.theme.fontFamily,
						align: "left",
						verticalAlign: "bottom"
					}
				});
			}
			const missing = grouped && row.value === void 0;
			if (missing) children.push({
				...rect(x, x + width, trackThickness, missingColor),
				name: "missing"
			});
			if (row.value !== void 0 || row.target !== void 0) {
				if (!missing) {
					if (!grouped && ranges.length) {
						ranges.forEach((range, index) => children.push(rect(index === 0 ? trackStart : position(ranges[index - 1].upper), position(range.upper), trackThickness, getAlphaColor(range.color, .1))));
						const end = ranges[ranges.length - 1].upper;
						if (position(end) !== trackEnd) children.push(rect(position(end), trackEnd, trackThickness, track));
					} else children.push(rect(x, x + width, trackThickness, track, hideZero ? 0 : 1));
					let trackIndex = 0;
					children.forEach((child) => {
						if (!child.name) child.name = `track-${trackIndex++}`;
					});
				}
				if (!grouped && allZero && props.zeroText) children.push({
					type: "text",
					name: "empty-label",
					style: {
						x: x + 8,
						y,
						text: props.zeroText,
						fill: text,
						font: api.font({
							fontSize: 10,
							fontWeight: "normal"
						}),
						lineHeight: 12,
						align: "left",
						verticalAlign: "middle"
					}
				});
			}
			if (!above && row.value === void 0) {
				const content = label.render(params);
				if (content) {
					const anchor = rect(barX, barX + barSize, thickness, "transparent");
					children.push({
						...anchor,
						name: "value-label-anchor",
						silent: true,
						...content
					});
				}
			}
			return {
				type: "group",
				originY: y,
				$mergeChildren: "byName",
				children
			};
		}
	};
	const rangeSeries = {
		id: "bullet-ranges",
		type: "custom",
		encode: {
			x: 0,
			y: -1
		},
		silent: true,
		z: 0,
		data: ranges.length && grouped ? [[min, 0]] : [],
		renderItem: (params, api) => {
			const coord = params.coordSys;
			const y = coord.y + coord.height;
			const position = clippedPosition(coord, api, 0);
			return {
				type: "group",
				$mergeChildren: "byName",
				children: ranges.flatMap((range, index) => {
					var _ranges$upper, _ranges;
					return [{
						type: "line",
						name: `range-${index}-segment`,
						transition: ["shape", "style"],
						shape: {
							x1: position((_ranges$upper = (_ranges = ranges[index - 1]) === null || _ranges === void 0 ? void 0 : _ranges.upper) !== null && _ranges$upper !== void 0 ? _ranges$upper : min),
							x2: position(range.upper),
							y1: y,
							y2: y
						},
						style: {
							stroke: range.color,
							lineWidth: 2
						}
					}, {
						type: "line",
						name: `range-${index}-boundary`,
						transition: ["shape", "style"],
						shape: {
							x1: position(range.upper),
							x2: position(range.upper),
							y1: coord.y,
							y2: y
						},
						style: {
							stroke: range.color,
							lineWidth: 1,
							lineDash: [2, 3],
							opacity: .6
						}
					}];
				})
			};
		}
	};
	const targets = {
		...series,
		id: "bullet-targets",
		z: 3,
		renderItem: (params, api) => {
			const geometry = rowGeometry(params, api);
			if (!geometry) return;
			const { row, y, thickness, position, rect } = geometry;
			const children = [];
			if (row.target !== void 0) {
				const fill = row.targetColor;
				children.push({
					...rect(position(row.target) - .5, position(row.target) + .5, thickness * 1.5, !grouped && ranges.length ? fill : new LinearGradient(0, 0, 1, 0, [{
						offset: 0,
						color: lightColor(fill)
					}, {
						offset: 1,
						color: fill
					}]), hideZero ? 0 : 1),
					name: "target"
				});
			}
			return {
				type: "group",
				originY: y,
				$mergeChildren: "byName",
				children
			};
		}
	};
	return [
		createBulletBar(model),
		series,
		targets,
		rangeSeries
	];
}
// ../plots/bullet/src/legacyRangeLabels.ts
/** ECharts 5 does not support axisLabel.customValues; draw the same labels with the guides. */
function applyLegacyRangeLabels(option) {
	var _axis$axisLabel;
	const axis = convertArray(option.xAxis)[0];
	const series = convertArray(option.series).find((item) => item.type === "custom" && item.id === "bullet-ranges");
	if ((series === null || series === void 0 ? void 0 : series.type) !== "custom") return;
	const values = axis === null || axis === void 0 || (_axis$axisLabel = axis.axisLabel) === null || _axis$axisLabel === void 0 ? void 0 : _axis$axisLabel.customValues;
	if (!axis || !(series === null || series === void 0 ? void 0 : series.renderItem) || !(values === null || values === void 0 ? void 0 : values.length)) return;
	const label = { ...axis.axisLabel };
	const renderGuides = series.renderItem;
	axis.axisLabel = {
		...label,
		show: false
	};
	if (axis.show === false || label.show === false) return;
	series.renderItem = (params, api) => {
		const guides = renderGuides(params, api);
		if (!guides || guides.type !== "group") return guides;
		const coord = params.coordSys;
		const labels = values.flatMap((value, index) => {
			var _label$margin, _label$fontSize, _label$align, _label$verticalAlign;
			if (index === 0 && label.showMinLabel === false || index === values.length - 1 && label.showMaxLabel === false) return [];
			const x = api.coord([value, 0])[0];
			if (x < coord.x || x > coord.x + coord.width) return [];
			const text = typeof label.formatter === "function" ? label.formatter(Number(value), index, void 0) : typeof label.formatter === "string" ? label.formatter.replace("{value}", String(value)) : String(value);
			return [{
				type: "text",
				name: `range-label-${index}`,
				silent: true,
				style: {
					x,
					y: coord.y + coord.height + ((_label$margin = label.margin) !== null && _label$margin !== void 0 ? _label$margin : 8),
					text,
					fill: typeof label.color === "function" ? label.color(Number(value), index) : label.color,
					fontSize: (_label$fontSize = label.fontSize) !== null && _label$fontSize !== void 0 ? _label$fontSize : 12,
					fontFamily: label.fontFamily,
					fontWeight: label.fontWeight,
					fontStyle: label.fontStyle,
					align: (_label$align = label.align) !== null && _label$align !== void 0 ? _label$align : "center",
					verticalAlign: (_label$verticalAlign = label.verticalAlign) !== null && _label$verticalAlign !== void 0 ? _label$verticalAlign : "top"
				}
			}];
		});
		if (label.hideOverlap !== false) {
			const priority = [
				labels[0],
				labels[labels.length - 1],
				...labels.slice(1, -1)
			];
			const occupied = [];
			const visible = /* @__PURE__ */ new Set();
			for (const item of priority) {
				if (!item || visible.has(item)) continue;
				const rect = new ZRText({ style: item.style }).getBoundingRect().clone();
				rect.x -= 2;
				rect.width += 4;
				if (occupied.some((previous) => previous.intersect(rect))) continue;
				occupied.push(rect);
				visible.add(item);
			}
			return {
				...guides,
				children: [...guides.children, ...labels.filter((item) => visible.has(item))]
			};
		}
		return {
			...guides,
			children: [...guides.children, ...labels]
		};
	};
}
// ../plots/bullet/src/createBulletOption.ts
function createBulletOption(props) {
	var _theme$splitLineColor, _theme$secondaryTextC, _theme$borderColor, _theme$secondaryTextC2, _props$zeroText;
	const { model, diagnostic } = resolveBulletModel(props);
	if (!model) {
		console.warn(`[IxBulletChart] ${diagnostic}`);
		return mergeNativePlotOptions({ series: [] }, props, props.series === void 0 ? [
			...bulletProps,
			"xAxis",
			"yAxis",
			"grid",
			"dataZoom"
		] : bulletProps);
	}
	const { grouped, rows, ranges, min, max, theme, dark, text, allZero } = model;
	const above = grouped && props.layout === "horizontal-above";
	const nativeAxis = convertArray(props.xAxis)[0];
	const alignRangeLabels = grouped && ranges.length > 0 && (nativeAxis === null || nativeAxis === void 0 ? void 0 : nativeAxis.interval) == null && (nativeAxis === null || nativeAxis === void 0 ? void 0 : nativeAxis.splitNumber) == null && ((nativeAxis === null || nativeAxis === void 0 ? void 0 : nativeAxis.min) == null || typeof nativeAxis.min === "number") && ((nativeAxis === null || nativeAxis === void 0 ? void 0 : nativeAxis.max) == null || typeof nativeAxis.max === "number");
	const labelMin = typeof (nativeAxis === null || nativeAxis === void 0 ? void 0 : nativeAxis.min) === "number" ? nativeAxis.min : min;
	const labelMax = typeof (nativeAxis === null || nativeAxis === void 0 ? void 0 : nativeAxis.max) === "number" ? nativeAxis.max : max;
	const tooltip = convertArray(props.tooltip)[0];
	const format = (value, index) => {
		var _tooltip$valueFormatt, _tooltip$valueFormatt2;
		return (_tooltip$valueFormatt = tooltip === null || tooltip === void 0 || (_tooltip$valueFormatt2 = tooltip.valueFormatter) === null || _tooltip$valueFormatt2 === void 0 ? void 0 : _tooltip$valueFormatt2.call(tooltip, value, index)) !== null && _tooltip$valueFormatt !== void 0 ? _tooltip$valueFormatt : String(value);
	};
	const generated = {
		animation: true,
		grid: mergeCartesianGrid({
			top: grouped ? 16 : 0,
			bottom: grouped ? 24 : 0,
			left: grouped ? 16 : 0,
			right: above ? 72 : grouped ? 16 : 0
		}, props.grid),
		xAxis: {
			type: "value",
			min,
			max,
			show: grouped && (!above || ranges.length > 0),
			splitNumber: 3,
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: {
				show: !ranges.length,
				lineStyle: { color: (_theme$splitLineColor = theme.splitLineColor) !== null && _theme$splitLineColor !== void 0 ? _theme$splitLineColor : dark ? "#354052" : "#E1E5EB" }
			},
			axisLabel: {
				hideOverlap: true,
				...grouped && ranges.length ? {
					showMinLabel: true,
					showMaxLabel: true
				} : {},
				...alignRangeLabels ? { customValues: [.../* @__PURE__ */ new Set([
					labelMin,
					...ranges.map((range) => range.upper),
					labelMax
				])] } : {},
				color: (_theme$secondaryTextC = theme.secondaryTextColor) !== null && _theme$secondaryTextC !== void 0 ? _theme$secondaryTextC : dark ? "#A1A7B3" : "#6F7785",
				fontFamily: theme.numberFontFamily
			}
		},
		yAxis: {
			type: "category",
			inverse: true,
			show: grouped && !above,
			data: rows.map((row) => row.name),
			triggerEvent: true,
			tooltip: { show: false },
			axisLine: {
				show: true,
				lineStyle: { color: (_theme$borderColor = theme.borderColor) !== null && _theme$borderColor !== void 0 ? _theme$borderColor : dark ? "#354052" : "#E1E5EB" }
			},
			axisTick: { show: true },
			axisLabel: {
				...categoryLabelDefaults,
				color: (_theme$secondaryTextC2 = theme.secondaryTextColor) !== null && _theme$secondaryTextC2 !== void 0 ? _theme$secondaryTextC2 : dark ? "#A1A7B3" : "#6F7785",
				margin: 16,
				fontFamily: theme.fontFamily
			}
		},
		tooltip: {
			trigger: "item",
			formatter: createPlotTooltipFormatter((params) => {
				var _props$name;
				const item = Array.isArray(params) ? params[0] : params;
				const row = item && rows[item.dataIndex];
				if (!row || grouped && allZero && !above) return void 0;
				return {
					title: row.name,
					rows: [...row.value !== void 0 ? [{
						name: String((_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : "实际值"),
						value: format(row.value, item.dataIndex),
						color: item.color ? getTooltipsColor(item.color) : row.actualColor
					}] : [], ...row.target !== void 0 ? [{
						name: "目标值",
						value: format(row.target, item.dataIndex),
						color: row.targetColor
					}] : []],
					notes: row.value === void 0 ? [row.missingReason || "–"] : void 0
				};
			})
		},
		series: createBulletSeries(model),
		graphic: [{
			type: "text",
			left: "center",
			top: "middle",
			silent: true,
			style: {
				text: grouped && allZero ? (_props$zeroText = props.zeroText) !== null && _props$zeroText !== void 0 ? _props$zeroText : "" : "",
				fill: text,
				fontSize: 12,
				fontFamily: theme.fontFamily
			}
		}]
	};
	const option = mergeNativePlotOptions(generated, props, bulletProps);
	if (grouped && ranges.length && props.series === void 0 && Number.parseInt("6.1.0", 10) < 6) applyLegacyRangeLabels(option);
	if (grouped && option.dataZoom) option.dataZoom = convertArray(option.dataZoom).map((item) => {
		var _item$orient;
		return item.type && item.type !== "slider" ? item : createCategorySlider(item, (_item$orient = item.orient) !== null && _item$orient !== void 0 ? _item$orient : "vertical", theme, !!dark);
	});
	return option;
}
// ../plots/bullet/src/Bullet.ts
var Bullet_default = withChartProps()(defineComponent({
	name: "IxBulletChart",
	inheritAttrs: false,
	slots: Object,
	props: [...bulletProps],
	methods: plotInstanceMethods,
	setup(props, context) {
		const attrs = useReactiveAttrs(context.attrs);
		const dark = usePlotDark(() => attrs.value);
		return usePlotRender(context, () => props, (input) => createBulletOption({
			...input,
			darkMode: dark.value
		}), {
			loadingIcon: () => props.data === void 0 ? loading_single_default : loading_default,
			mergeDataUpdates: true,
			onReady: bindBulletHover,
			categoryLabelTooltip: true,
			zoomConfig: (input) => {
				var _convertArray$;
				const { data } = input;
				return data === void 0 ? void 0 : {
					categories: data.map((row) => row.name),
					layout: "horizontal",
					axisId: (_convertArray$ = convertArray(input.yAxis)[0]) === null || _convertArray$ === void 0 ? void 0 : _convertArray$.id,
					dataZoom: input.dataZoom
				};
			}
		});
	}
}));
// ../plots/bullet/src/bulletDecal.ts
var adapted = /* @__PURE__ */ new WeakSet();
var patterns = /* @__PURE__ */ new WeakMap();
/** Generate the hover texture with ECharts, then attach it to the native bar state. */
function installBulletDecal() {
	registerVisual(PRIORITY.VISUAL.DECAL - 1, {
		seriesType: "bar",
		reset(series) {
			const option = series.option;
			if (!option.__ixBulletLayout) return;
			const data = series.getData();
			const pending = /* @__PURE__ */ new Map();
			patterns.set(data, pending);
			data.each((index) => {
				var _item$itemStyle$decal, _item$itemStyle, _option$itemStyle, _item$emphasis$disabl, _item$emphasis, _option$emphasis, _data$getItemVisual;
				const item = data.getRawDataItem(index);
				if (((_item$itemStyle$decal = (_item$itemStyle = item.itemStyle) === null || _item$itemStyle === void 0 ? void 0 : _item$itemStyle.decal) !== null && _item$itemStyle$decal !== void 0 ? _item$itemStyle$decal : (_option$itemStyle = option.itemStyle) === null || _option$itemStyle === void 0 ? void 0 : _option$itemStyle.decal) != null || ((_item$emphasis$disabl = (_item$emphasis = item.emphasis) === null || _item$emphasis === void 0 ? void 0 : _item$emphasis.disabled) !== null && _item$emphasis$disabl !== void 0 ? _item$emphasis$disabl : (_option$emphasis = option.emphasis) === null || _option$emphasis === void 0 ? void 0 : _option$emphasis.disabled)) return;
				const fill = (_data$getItemVisual = data.getItemVisual(index, "style")) === null || _data$getItemVisual === void 0 ? void 0 : _data$getItemVisual.fill;
				data.setItemVisual(index, "decal", {
					symbol: "rect",
					symbolSize: 1,
					color: getAlphaColor(getTooltipsColor(fill), .5),
					backgroundColor: "transparent",
					dashArrayX: [1, 0],
					dashArrayY: [200, 225],
					rotation: -Math.PI / 4
				});
				pending.set(index, void 0);
			});
		}
	});
	registerVisual(PRIORITY.VISUAL.DECAL + 1, {
		seriesType: "bar",
		reset(series) {
			const data = series.getData();
			const pending = patterns.get(data);
			pending === null || pending === void 0 || pending.forEach((_, index) => {
				const style = data.ensureUniqueItemVisual(index, "style");
				if (style.decal) {
					style.decal.scaleY = 6 / Math.SQRT2 / 425;
					pending.set(index, style.decal);
				}
				delete style.decal;
			});
		}
	});
	registerUpdateLifecycle("series:afterupdate", (model) => {
		model.eachSeriesByType("bar", (series) => {
			var _patterns$get;
			const data = series.getData();
			(_patterns$get = patterns.get(data)) === null || _patterns$get === void 0 || _patterns$get.forEach((pattern, index) => {
				const bar = data.getItemGraphicEl(index);
				if (bar && pattern) {
					const state = bar.ensureState("emphasis");
					state.style = {
						...state.style,
						decal: pattern
					};
					if (!adapted.has(bar)) {
						adapted.add(bar);
						const afterUpdate = bar.afterUpdate;
						bar.afterUpdate = function() {
							afterUpdate.call(this);
							const decal = this.getDecalElement();
							if (decal) {
								decal.style.shadowBlur = 0;
								decal.style.shadowOffsetX = 0;
								decal.style.shadowOffsetY = 0;
							}
						};
					}
				}
			});
		});
	});
}
// ../plots/bullet/src/bulletVisual.ts
/** Keep tooltip markers consistent without reevaluating caller color callbacks. */
function installBulletVisual() {
	registerVisual(PRIORITY.VISUAL.DECAL - 2, {
		seriesType: "custom",
		reset(series, model) {
			if (series.id !== "bullet-decorations" && series.id !== "bullet-targets") return;
			const actual = model.getSeries().find((item) => item.id === "bullet" && item.option.__ixBulletLayout);
			if (!actual) return;
			const source = actual.getData();
			const data = series.getData();
			data.each((index) => {
				var _source$getItemVisual;
				const sourceIndex = source.indexOfRawIndex(data.getRawIndex(index));
				if (sourceIndex < 0) return;
				const fill = (_source$getItemVisual = source.getItemVisual(sourceIndex, "style")) === null || _source$getItemVisual === void 0 ? void 0 : _source$getItemVisual.fill;
				if (fill != null) data.ensureUniqueItemVisual(index, "style").fill = fill;
			});
		}
	});
}
// ../plots/bullet/index.ts
var IxBulletChart = createInstall(Bullet_default, [
	install,
	install$1,
	installBulletLayout,
	installBulletVisual,
	installBulletDecal,
	installBarShadow,
	installLabelLayout,
	install$2,
	install$3,
	install$4,
	install$5,
	install$6,
	install$7
]);
export { IxBulletChart as t };
