import { $t as getFirstValidNode, Bn as isFunction, Br as onBeforeUnmount, Bt as Logger, Cr as cloneVNode, En as isString, Fn as toString, Fr as inject, Ht as NoopObject, Lr as mergeProps, Mn as createCompounder, Mr as defineComponent, Qr as withDirectives, Rr as nextTick, Sr as Teleport, Ur as onMounted, Ut as callEmit, Vt as NoopFunction, Yr as watch, _n as uniqueId, ai as ref, br as vShow, ci as toRef, cn as isVisibleElement, gn as tryOnScopeDispose, ii as reactive, jr as createVNode, jt as useThemeToken, ni as isRef, oi as shallowRef, qr as provide, qt as convertElement, ti as isReactive, ui as unref, vn as useControlledProp, vr as Transition, wn as kebabCase, wr as computed, xn as useState, xr as Fragment, yn as useEventListener, zt as useGlobalConfig } from "./app-default-K1ISpu3o.js";
import { A as isEqual } from "./setup-4IHtv3yV.js";
import { a as useZIndex } from "./utils-DfB9XSBU.js";
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseSlice.js
/**
* The base implementation of `_.slice` without an iteratee call guard.
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
function baseSlice(array, start, end) {
	var index = -1, length = array.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array[index + start];
	return result;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_castSlice.js
/**
* Casts `array` to a slice if it's needed.
*
* @private
* @param {Array} array The array to inspect.
* @param {number} start The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the cast slice.
*/
function castSlice(array, start, end) {
	var length = array.length;
	end = end === void 0 ? length : end;
	return !start && end >= length ? array : baseSlice(array, start, end);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hasUnicode.js
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
/**
* Checks if `string` contains Unicode symbols.
*
* @private
* @param {string} string The string to inspect.
* @returns {boolean} Returns `true` if a symbol is found, else `false`.
*/
function hasUnicode(string) {
	return reHasUnicode.test(string);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_asciiToArray.js
/**
* Converts an ASCII `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function asciiToArray(string) {
	return string.split("");
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_unicodeToArray.js
/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff";
var rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff";
var rsVarRange = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */
var rsAstral = "[" + rsAstralRange + "]";
var rsCombo = "[" + rsComboRange + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange + "]?";
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [
	rsNonAstral,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = "(?:" + [
	rsNonAstral + rsCombo + "?",
	rsCombo,
	rsRegional,
	rsSurrPair,
	rsAstral
].join("|") + ")";
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
/**
* Converts a Unicode `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function unicodeToArray(string) {
	return string.match(reUnicode) || [];
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stringToArray.js
/**
* Converts `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function stringToArray(string) {
	return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_createCaseFirst.js
/**
* Creates a function like `_.lowerFirst`.
*
* @private
* @param {string} methodName The name of the `String` case method to use.
* @returns {Function} Returns the new case function.
*/
function createCaseFirst(methodName) {
	return function(string) {
		string = toString(string);
		var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
		var chr = strSymbols ? strSymbols[0] : string.charAt(0);
		var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
		return chr[methodName]() + trailing;
	};
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/upperFirst.js
/**
* Converts the first character of `string` to upper case.
*
* @static
* @memberOf _
* @since 4.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.upperFirst('fred');
* // => 'Fred'
*
* _.upperFirst('FRED');
* // => 'FRED'
*/
var upperFirst = createCaseFirst("toUpperCase");
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/capitalize.js
/**
* Converts the first character of `string` to upper case and the remaining
* to lower case.
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to capitalize.
* @returns {string} Returns the capitalized string.
* @example
*
* _.capitalize('FRED');
* // => 'Fred'
*/
function capitalize(string) {
	return upperFirst(toString(string).toLowerCase());
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/camelCase.js
/**
* Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the camel cased string.
* @example
*
* _.camelCase('Foo Bar');
* // => 'fooBar'
*
* _.camelCase('--foo-bar--');
* // => 'fooBar'
*
* _.camelCase('__FOO_BAR__');
* // => 'fooBar'
*/
var camelCase = createCompounder(function(result, word, index) {
	word = word.toLowerCase();
	return result + (index ? capitalize(word) : word);
});
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/click-outside/index.js
function useClickOutside(target, handler, options) {
	const { container = window, exclude = [] } = options || {};
	if (!container) return NoopFunction;
	const shouldListen = ref(true);
	let fallback;
	const listener = (evt) => {
		clearTimeout(fallback);
		const targetElement = convertElement(target);
		if (!targetElement || !shouldListen.value) return;
		const eventTarget = evt.target;
		const composedPath = evt.composedPath();
		if (targetElement === eventTarget || composedPath.includes(targetElement) || exclude.some((item) => {
			const element = convertElement(item);
			return element && (element === eventTarget || composedPath.includes(element));
		})) return;
		handler(evt);
	};
	const listenerStops = [
		useEventListener(container, "click", listener, {
			passive: true,
			capture: true
		}),
		useEventListener(container, "pointerdown", (evt) => {
			const targetElement = convertElement(target);
			shouldListen.value = !!targetElement && !evt.composedPath().includes(targetElement);
		}, { passive: true }),
		useEventListener(container, "pointerup", (evt) => {
			if (evt.button === 0) {
				const path = evt.composedPath();
				evt.composedPath = () => path;
				fallback = setTimeout(() => listener(evt), 50);
			}
		}, { passive: true })
	];
	const stop = () => {
		listenerStops.forEach((listenerStop) => listenerStop());
	};
	tryOnScopeDispose(stop);
	return stop;
}
var stopHandleMap = /* @__PURE__ */ new Map();
var createClickOutside = (el, binding) => {
	let stop = stopHandleMap.get(el);
	if (stop) stop();
	if (!binding) return;
	if (isFunction(binding)) stop = useClickOutside(el, binding);
	else {
		const { handler, ...options } = binding;
		stop = useClickOutside(el, handler, options);
	}
	stopHandleMap.set(el, stop);
};
var vClickOutside = {
	mounted(el, binding) {
		createClickOutside(el, binding.value);
	},
	updated(el, binding) {
		createClickOutside(el, binding.value);
	},
	unmounted(el) {
		const stop = stopHandleMap.get(el);
		if (stop) stop();
		stopHandleMap.delete(el);
	}
};
// ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	var _padding$top, _padding$right, _padding$bottom, _padding$left;
	return {
		top: (_padding$top = padding.top) != null ? _padding$top : 0,
		right: (_padding$right = padding.right) != null ? _padding$right : 0,
		bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
		left: (_padding$left = padding.left) != null ? _padding$left : 0
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
// ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	const alignment = getAlignment(placement);
	if (alignment) coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) && await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(minPadding, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement": resetPlacement = initialPlacement;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
			if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
			if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
// ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
// ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) {
		if (offsetParent) {
			if (isElement(offsetParent)) scale = getScale(offsetParent);
		} else scale = getScale(element);
	}
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement && offsetParent) {
		const win = getWindow(domElement);
		const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
	const scroll = getNodeScroll(html);
	const body = html.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(html);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
	if (rootBoundary === void 0) rootBoundary = "viewport";
	const isLayoutViewport = rootBoundary === "layoutViewport";
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
		if (isLayoutViewport) {
			if (!layoutRelativeClientCoords) {
				x = -visualViewport.offsetLeft;
				y = -visualViewport.offsetTop;
			}
		} else {
			width = visualViewport.width;
			height = visualViewport.height;
			if (layoutRelativeClientCoords) {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
	}
	if (getWindowScrollBarX(html) <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
		if (gutter <= SCROLLBAR_MAX) width -= gutter;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = getScale(element);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") rect = getViewportRect(element, strategy, clippingAncestor);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let lastKeptComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
		if (!currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static")) result = result.filter((ancestor) => ancestor !== currentNode);
		else lastKeptComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement);
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) return refresh();
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	const win = getWindow(element);
	const handleResize = () => refresh(ancestorResize);
	win.addEventListener("resize", handleResize);
	refresh(true);
	return () => {
		win.removeEventListener("resize", handleResize);
		cleanup();
	};
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update);
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo == null || cleanupIo();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = offset$1;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = shift$1;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = flip$1;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = hide$1;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$2 = arrow$1;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = options != null ? options : {};
	const platformWithCache = {
		...platform,
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/popper/index.js
var defaultDelay = 0;
function usePopperOptions$1(options) {
	const localOptions = reactive({});
	function getOptionValue(key, defaultValue) {
		var _a;
		let value;
		if (isRef(options[key])) value = unref(options[key]);
		else if (isRef(localOptions[key])) value = unref(localOptions[key]);
		else value = (_a = localOptions[key]) != null ? _a : options[key];
		return value != null ? value : defaultValue;
	}
	const resolvedOptions = computed(() => {
		var _a;
		return {
			allowEnter: getOptionValue("allowEnter", true),
			autoAdjust: getOptionValue("autoAdjust", true),
			delay: getOptionValue("delay", defaultDelay),
			disabled: getOptionValue("disabled", false),
			offset: getOptionValue("offset", [0, 0]),
			placement: getOptionValue("placement", "bottomStart"),
			trigger: getOptionValue("trigger", "hover"),
			strategy: getOptionValue("strategy", "absolute"),
			middlewares: getOptionValue("middlewares", []),
			visible: getOptionValue("visible"),
			onVisibleChange: (_a = options.onVisibleChange) != null ? _a : localOptions.onVisibleChange
		};
	});
	const updateOptions = (options2) => {
		Object.entries(options2).forEach(([key, value]) => {
			const _key = key;
			if (value !== void 0 && !isEqual(unref(value), resolvedOptions.value[_key])) localOptions[_key] = value;
		});
	};
	if (isReactive(options)) watch(options, (_options) => {
		nextTick(() => {
			updateOptions(_options);
		});
	});
	return {
		resolvedOptions,
		updateOptions
	};
}
function useBaseOptions(options) {
	return computed(() => {
		const { placement, strategy, middlewares, offset: offset2, autoAdjust } = options.value;
		return {
			placement,
			strategy,
			middlewares,
			offset: offset2,
			autoAdjust
		};
	});
}
function useDelay(options) {
	const convertDelay = (delay) => {
		if (Array.isArray(delay)) {
			const [show, hide2] = delay;
			return {
				show: show != null ? show : defaultDelay,
				hide: hide2 != null ? hide2 : defaultDelay
			};
		}
		return {
			show: delay,
			hide: delay
		};
	};
	return computed(() => convertDelay(options.value.delay));
}
var referenceHiddenMiddlewareName = "IDUX_referenceHidden";
function referenceHidden() {
	const { fn: hideFn, ...rest } = hide({ elementContext: "reference" });
	return {
		...rest,
		name: referenceHiddenMiddlewareName,
		async fn(middlewareArguments) {
			const { elements: { floating, reference } } = middlewareArguments;
			const res = await hideFn(middlewareArguments);
			const { data: { referenceHidden: referenceHidden2 } } = res;
			const shouldHideReference = referenceHidden2 && !(reference instanceof HTMLElement && isReferenceDispalyNone(reference) && checkParentsVisible(reference));
			if (shouldHideReference) floating.setAttribute("data-popper-reference-hidden", "");
			else floating.removeAttribute("data-popper-reference-hidden");
			return {
				...res,
				data: {
					...res.data,
					referenceHidden: shouldHideReference
				}
			};
		}
	};
}
function isReferenceDispalyNone(reference) {
	const referenceDisplay = getComputedStyle(reference).display;
	if (referenceDisplay === "none") return true;
	if (referenceDisplay === "contents") return !!reference.firstElementChild && getComputedStyle(reference.firstElementChild).display === "none";
	return false;
}
function checkParentsVisible(el) {
	let parent = el.parentElement;
	while (parent) {
		if (getComputedStyle(parent).display !== "contents" && !isVisibleElement(parent)) return false;
		parent = parent.parentElement;
	}
	return true;
}
function useInstance(triggerRef, popperRef, visibility, options) {
	const updatePopperPosition = (state) => {
		const popperEl = convertElement(popperRef.value);
		const { x, y, strategy } = state;
		if (popperEl) Object.assign(popperEl.style, {
			position: strategy,
			left: `${x}px`,
			top: `${y}px`
		});
	};
	const update = async () => {
		var _a;
		const triggerEl = convertElement(triggerRef.value);
		const popperEl = convertElement(popperRef.value);
		if (!triggerEl || !popperEl) return;
		const state = await computePosition(triggerEl, popperEl, options.value);
		if (!visibility.value || !state || ((_a = state.middlewareData[referenceHiddenMiddlewareName]) == null ? void 0 : _a.referenceHidden) || getComputedStyle(triggerEl).display === "none") return;
		updatePopperPosition(state);
	};
	let cleanUpHandler = null;
	const initialize = () => {
		const triggerEl = convertElement(triggerRef.value);
		const popperEl = convertElement(popperRef.value);
		if (!triggerEl || !popperEl) return;
		cleanUpHandler == null || cleanUpHandler();
		Object.assign(popperEl.style, {
			position: "absolute",
			left: 0,
			top: 0
		});
		cleanUpHandler = autoUpdate(triggerEl, popperEl, () => {
			update();
		});
	};
	const watchStopHandlers = [watch([triggerRef, popperRef], initialize, { immediate: true }), watch(options, update, { immediate: true })];
	const destroy = () => {
		watchStopHandlers.forEach((handler) => handler());
		cleanUpHandler == null || cleanUpHandler();
	};
	return {
		update,
		destroy
	};
}
function usePlacement(options) {
	const _placement = ref(options.value.placement);
	const updatePlacement2 = (value) => {
		_placement.value = value;
	};
	watch(() => options.value.placement, updatePlacement2);
	return {
		placement: computed(() => _placement.value),
		updatePlacement: updatePlacement2
	};
}
function usePopperEvents(baseOptions, eventOptions) {
	const { show, hide: hide2 } = eventOptions;
	const onMouseenter = () => show();
	const onMouseleave = () => hide2();
	const eventsMap = {
		click: NoopObject,
		focus: NoopObject,
		hover: {
			onMouseenter,
			onMouseleave
		},
		contextmenu: NoopObject,
		manual: NoopObject
	};
	return computed(() => {
		const { allowEnter, trigger } = baseOptions.value;
		return allowEnter ? eventsMap[trigger] : NoopObject;
	});
}
function useTimer() {
	let timer = null;
	const setTimer = (action, delay) => {
		clearTimer();
		timer = setTimeout(() => {
			action();
			timer = null;
		}, delay);
	};
	const clearTimer = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};
	return {
		setTimer,
		clearTimer
	};
}
function useTriggerEvents(baseOptions, eventOptions) {
	const { visibility, show, hide: hide2 } = eventOptions;
	const onMouseenter = () => show();
	const onMouseleave = () => hide2();
	const onFocus = () => show();
	const onBlur = () => hide2();
	const onClick = () => {
		const { trigger } = baseOptions.value;
		if (trigger === "click") visibility.value ? hide2() : show();
		else if (trigger === "contextmenu") visibility.value && hide2();
	};
	const onContextmenu = (evt) => {
		evt.preventDefault();
		show();
	};
	const eventsMap = {
		hover: {
			onMouseenter,
			onMouseleave
		},
		focus: {
			onFocus,
			onBlur
		},
		click: { onClick },
		contextmenu: {
			onClick,
			onContextmenu
		},
		manual: {}
	};
	return computed(() => eventsMap[baseOptions.value.trigger]);
}
function useVisibility(options) {
	const visible = shallowRef(!!options.value.visible);
	const mergedVisible = computed(() => {
		var _a;
		return !options.value.disabled && !!((_a = options.value.visible) != null ? _a : visible.value);
	});
	const updateVisibility = (v) => {
		var _a, _b, _c;
		if (options.value.disabled || v === ((_a = options.value.visible) != null ? _a : visible.value)) return;
		visible.value = v;
		(_c = (_b = options.value).onVisibleChange) == null || _c.call(_b, v);
	};
	return {
		visibility: mergedVisible,
		updateVisibility
	};
}
function arrow(arrowElement) {
	const { fn: arrowFn, ...rest } = arrow$2({
		element: arrowElement,
		padding: 4
	});
	return {
		...rest,
		name: "IDUX_arrow",
		async fn(middlewareArguments) {
			const { reference } = middlewareArguments.elements;
			if (!(reference instanceof HTMLElement) || getComputedStyle(reference).display === "none") return middlewareArguments;
			const res = await arrowFn(middlewareArguments);
			const { data: { x, y } } = res;
			Object.assign(arrowElement.style, {
				left: x != null ? `${x}px` : "",
				top: y != null ? `${y}px` : ""
			});
			return res;
		}
	};
}
function updatePlacement(updatePlacement2) {
	return {
		name: "IDUX_updatePlacement",
		fn(middlewareArguments) {
			const { placement, elements: { floating, reference } } = middlewareArguments;
			if (reference instanceof HTMLElement && getComputedStyle(reference).display !== "none") {
				updatePlacement2(camelCase(placement));
				floating.setAttribute("data-popper-placement", placement);
			}
			return middlewareArguments;
		}
	};
}
function convertOptions(baseOptions, extraOptions) {
	var _a;
	const { placement, strategy, middlewares, offset: offset$1, autoAdjust } = baseOptions;
	const { arrowElement, updatePlacement: _updatePlacement } = extraOptions;
	const { width } = (_a = arrowElement == null ? void 0 : arrowElement.getBoundingClientRect()) != null ? _a : {};
	const arrowSize = width ? width / 2 : 0;
	return {
		placement: kebabCase(placement),
		strategy,
		middleware: [
			autoAdjust && flip({
				padding: 2 + arrowSize,
				crossAxis: false
			}),
			autoAdjust && shift(),
			!!arrowElement && arrow(arrowElement),
			offset({
				mainAxis: offset$1[1],
				crossAxis: offset$1[0]
			}),
			referenceHidden(),
			updatePlacement(_updatePlacement),
			...middlewares
		].filter(Boolean)
	};
}
function usePopper(options = {}) {
	let popperInstance;
	const triggerRef = ref();
	const popperRef = ref();
	const arrowRef = ref();
	const { resolvedOptions, updateOptions } = usePopperOptions$1(options);
	const baseOptions = useBaseOptions(resolvedOptions);
	const convertedOptions = computed(() => convertOptions(baseOptions.value, {
		arrowElement: convertElement(arrowRef),
		updatePlacement: updatePlacement2
	}));
	const { visibility, updateVisibility } = useVisibility(resolvedOptions);
	const { placement, updatePlacement: updatePlacement2 } = usePlacement(resolvedOptions);
	const delay = useDelay(resolvedOptions);
	const { setTimer, clearTimer } = useTimer();
	const triggerEvents = useTriggerEvents(resolvedOptions, {
		visibility,
		show,
		hide: hide2
	});
	const popperEvents = usePopperEvents(resolvedOptions, {
		show,
		hide: hide2
	});
	function toggle(visible, delay2) {
		clearTimer();
		const action = () => {
			updateVisibility(visible);
		};
		if (delay2 > 0) setTimer(action, delay2);
		else action();
	}
	function show(showDelay = delay.value.show) {
		toggle(true, showDelay);
	}
	function hide2(hideDelay = delay.value.hide) {
		toggle(false, hideDelay);
	}
	function update(options2) {
		if (options2) {
			updateOptions(options2);
			return;
		}
		popperInstance == null || popperInstance.update();
	}
	function initialize() {
		destroy();
		popperInstance = useInstance(triggerRef, popperRef, visibility, convertedOptions);
	}
	function destroy() {
		clearTimer();
		if (!popperInstance) return;
		popperInstance.destroy();
		popperInstance = null;
	}
	watch(visibility, (value) => {
		if (value) {
			clearTimer();
			popperInstance == null || popperInstance.update();
		}
	});
	return {
		visibility,
		placement,
		triggerRef,
		triggerEvents,
		popperRef,
		popperEvents,
		arrowRef,
		initialize,
		show,
		hide: hide2,
		update,
		destroy
	};
}
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/portal/index.js
var Portal = /* @__PURE__ */ defineComponent({
	name: "CdkPortal",
	props: {
		disabled: {
			type: Boolean,
			default: void 0
		},
		target: {
			type: [
				String,
				HTMLElement,
				Function
			],
			required: true
		},
		load: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { slots }) {
		const elementRef = computed(() => convertTargetElement(props.target));
		let rendered = false;
		return () => {
			if (!rendered && !props.load) return null;
			rendered = true;
			return createVNode(Teleport, {
				"to": elementRef.value,
				"disabled": props.disabled
			}, { default: () => [slots.default && slots.default()] });
		};
	}
});
function convertTargetElement(target) {
	const elementOrSelector = isFunction(target) ? target() : target;
	if (!isString(elementOrSelector)) return elementOrSelector;
	return getTargetElement(elementOrSelector);
}
function getTargetElement(selector) {
	let element = document.querySelector(selector);
	if (element) return element;
	const selectorType = selector.startsWith(".") ? "class" : selector.startsWith("#") ? "id" : void 0;
	if (!selectorType) {
		Logger.warn("cdk/portal", "the selector of target supports only simple id or class");
		element = document.querySelector(`.${selector}`);
		if (element) return element;
	}
	return createDivElement(selectorType || "class", selectorType ? selector.substring(1) : selector);
}
function createDivElement(attrName, attrValue) {
	const element = document.createElement("div");
	element.setAttribute(attrName, attrValue);
	document.body.appendChild(element);
	return element;
}
var CdkPortal = Portal;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/overlay/index.js
var OverlayVisibleLockToken = Symbol("OverlayVisibleLockToken");
var Content = /* @__PURE__ */ defineComponent({
	props: {
		lock: {
			type: Function,
			required: true
		},
		unlock: {
			type: Function,
			required: true
		}
	},
	setup(props, { slots, attrs }) {
		provide(OverlayVisibleLockToken, {
			lock: props.lock,
			unlock: props.unlock
		});
		return () => {
			var _a;
			return createVNode("div", attrs, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
		};
	}
});
function useMergedEvents(triggerEvents, popperEvents, stateTriggerEvents, statePopperEvents) {
	return {
		mergedTriggerEvents: computed(() => mergeEvents(triggerEvents.value, stateTriggerEvents)),
		mergedPopperEvents: computed(() => mergeEvents(popperEvents.value, statePopperEvents))
	};
}
function mergeEvents(events, extendedEvents) {
	const mergedEvents = { ...events };
	Object.entries(extendedEvents).forEach(([key, cb]) => {
		if (key in mergedEvents) {
			const originalCb = mergedEvents[key];
			mergedEvents[key] = (evt) => {
				cb(evt);
				originalCb(evt);
			};
		}
	});
	return mergedEvents;
}
function useOverlayStates() {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const handleMouseenter = () => setIsHovered(true);
	const handleMouseleave = () => setIsHovered(false);
	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);
	return {
		isHovered,
		isFocused,
		stateTriggerEvents: {
			onMouseenter: handleMouseenter,
			onMouseleave: handleMouseleave,
			onFocus: handleFocus,
			onBlur: handleBlur
		},
		statePopperEvents: {
			onMouseenter: handleMouseenter,
			onMouseleave: handleMouseleave
		}
	};
}
function usePopperOptions(props, arrowRef) {
	var _a;
	const [allowEnter, setAllowEnter] = useState(props.allowEnter);
	const [autoAdjust, setAutoAdjust] = useState(props.autoAdjust);
	const [delay, setDelay] = useState(props.delay);
	const [disabled, setDisabled] = useState(props.disabled);
	const [offset, setOffset] = useState(props.offset);
	const [placement, setPlacement] = useState(props.placement);
	const [trigger, setTrigger] = useState((_a = props.trigger) != null ? _a : "hover");
	const options = {
		allowEnter,
		autoAdjust,
		delay,
		disabled,
		offset,
		placement,
		trigger
	};
	const updateOptions = () => {
		const { allowEnter: allowEnter2, autoAdjust: autoAdjust2, delay: delay2, disabled: disabled2, offset: offset2, placement: placement2, trigger: trigger2 } = props;
		let _offset;
		if (!arrowRef.value) _offset = offset2;
		else {
			const { offsetHeight, offsetWidth } = arrowRef.value;
			_offset = offset2 ? [...offset2] : [0, 0];
			_offset[1] += [offsetWidth, offsetHeight][1] / 2;
		}
		setAllowEnter(allowEnter2);
		setAutoAdjust(autoAdjust2);
		setDelay(delay2);
		setDisabled(disabled2);
		setOffset(_offset);
		setPlacement(placement2);
		setTrigger(trigger2 != null ? trigger2 : "hover");
	};
	watch(props, updateOptions, {
		immediate: true,
		deep: true
	});
	watch(arrowRef, updateOptions);
	return {
		options,
		update: updateOptions
	};
}
function useVisible(props, trigger, isHovered, isFocused) {
	const parentLockContext = inject(OverlayVisibleLockToken, null);
	const [visible, setVisible] = useControlledProp(props, "visible", false);
	const [visibleLocked, setVisibleLocked] = useState(false);
	const lock = () => {
		if (visibleLocked.value) return;
		setVisibleLocked(true);
		if (parentLockContext == null ? void 0 : parentLockContext.lock) parentLockContext.lock();
	};
	const unlock = () => {
		if (!visibleLocked.value) return;
		setVisibleLocked(false);
		if (trigger.value === "hover" && !isHovered.value || trigger.value === "focus" && !isFocused.value) setVisible(false);
	};
	const updateVisible = (v) => {
		if (visibleLocked.value) return;
		setVisible(v);
	};
	onMounted(() => {
		watch(visible, (v) => {
			nextTick(() => {
				if (v) parentLockContext == null || parentLockContext.lock();
				else parentLockContext == null || parentLockContext.unlock();
			});
		});
		if (visible.value) parentLockContext == null || parentLockContext.lock();
	});
	onBeforeUnmount(() => {
		parentLockContext == null || parentLockContext.unlock();
	});
	return {
		visible,
		visibleLocked,
		updateVisible,
		lock,
		unlock
	};
}
var overlayPlacementDef = String;
var overlayTriggerDef = String;
var overlayDelayDef = [Number, Array];
var Overlay = /* @__PURE__ */ defineComponent({
	name: "ɵOverlay",
	inheritAttrs: false,
	props: {
		visible: {
			type: Boolean,
			default: void 0
		},
		placement: overlayPlacementDef,
		allowEnter: {
			type: Boolean,
			default: void 0
		},
		autoAdjust: {
			type: Boolean,
			default: void 0
		},
		clickOutside: {
			type: Boolean,
			default: void 0
		},
		container: {
			type: [
				String,
				HTMLElement,
				Function
			],
			default: void 0
		},
		containerFallback: {
			type: String,
			required: true
		},
		delay: overlayDelayDef,
		destroyOnHide: {
			type: Boolean,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: void 0
		},
		lazy: {
			type: Boolean,
			default: true
		},
		offset: Array,
		showArrow: {
			type: Boolean,
			default: void 0
		},
		transitionName: String,
		trigger: overlayTriggerDef,
		triggerId: {
			type: null,
			default: void 0
		},
		zIndex: Number,
		"onUpdate:visible": [Function, Array],
		"onUpdate:placement": [Function, Array],
		onAfterLeave: [Function, Array]
	},
	setup(props, { slots, attrs, expose }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const overlayId = ref(props.triggerId != null ? `__IDUX_OVERLAY-${props.triggerId}` : uniqueId("control-overlay"));
		const mergedPrefixCls = computed(() => `${common.prefixCls}-overlay`);
		const contentArrowRef = ref();
		const { options: popperOptions, update: updateOptions } = usePopperOptions(props, contentArrowRef);
		const { isHovered, isFocused, statePopperEvents, stateTriggerEvents } = useOverlayStates();
		const { visible, visibleLocked, updateVisible, lock, unlock } = useVisible(props, popperOptions.trigger, isHovered, isFocused);
		const { arrowRef, popperRef, popperEvents, triggerRef, triggerEvents, visibility, placement, initialize, update, hide, destroy } = usePopper({
			...popperOptions,
			visible,
			onVisibleChange: updateVisible
		});
		const { mergedTriggerEvents, mergedPopperEvents } = useMergedEvents(triggerEvents, popperEvents, stateTriggerEvents, statePopperEvents);
		const currentZIndex = useZIndex(toRef(props, "zIndex"), toRef(common, "overlayZIndex"), visibility);
		const mergedContainer = computed(() => {
			var _a;
			const { container = common.overlayContainer } = props;
			return (_a = isFunction(container) ? container(convertElement(triggerRef)) : container) != null ? _a : props.containerFallback;
		});
		onMounted(() => initialize());
		onBeforeUnmount(() => destroy());
		watch(visibility, (value) => {
			if (value) {
				nextTick(updateOptions);
				props.destroyOnHide && initialize();
			}
		});
		watch(placement, (value) => callEmit(props["onUpdate:placement"], value));
		watch(contentArrowRef, () => {
			arrowRef.value = contentArrowRef.value;
		}, { immediate: true });
		const onAfterLeave = () => {
			if (props.destroyOnHide) destroy();
			callEmit(props.onAfterLeave);
		};
		expose({
			updatePopper: update,
			getPopperElement: () => convertElement(popperRef)
		});
		const handleClickOutside = (evt) => {
			if (visibleLocked.value) return;
			const popperElement = convertElement(popperRef);
			const target = evt.target;
			if (!popperElement || popperElement === target || popperElement.contains(target)) return;
			hide();
		};
		return () => {
			var _a, _b;
			const triggerNode = getFirstValidNode((_a = slots.default) == null ? void 0 : _a.call(slots));
			if (!triggerNode) {
				Logger.warn("components/overlay", "Trigger must is single rooted node");
				return null;
			}
			const trigger = renderTrigger(props, triggerNode, {
				ref: triggerRef,
				...mergedTriggerEvents.value
			}, handleClickOutside, overlayId);
			const contentNode = (_b = slots.content) == null ? void 0 : _b.call(slots);
			if (!getFirstValidNode(contentNode)) return createVNode(Fragment, null, [trigger, createVNode(CdkPortal, {
				"target": mergedContainer.value,
				"load": false
			}, null)]);
			const content = renderContent(props, globalHashId, mergedPrefixCls, visibility, currentZIndex, contentNode, contentArrowRef, popperRef, mergedPopperEvents, attrs, lock, unlock, overlayId);
			return createVNode(Fragment, null, [trigger, createVNode(CdkPortal, {
				"target": mergedContainer.value,
				"load": props.lazy ? visibility.value : true
			}, { default: () => [createVNode(Transition, {
				"appear": true,
				"name": props.transitionName,
				"onAfterLeave": onAfterLeave
			}, { default: () => [content] })] })]);
		};
	}
});
function renderContent(props, globalHashId, mergedPrefixCls, visibility, currentZIndex, contentNode, arrowRef, popperRef, popperEvents, attrs, lock, unlock, overlayId) {
	if (props.destroyOnHide && !visibility.value) return null;
	const prefixCls = mergedPrefixCls.value;
	const style = `z-index: ${currentZIndex.value}`;
	const overlay = createVNode(Content, mergeProps({
		"ref": popperRef,
		"class": [prefixCls, globalHashId.value],
		"style": style,
		"lock": lock,
		"unlock": unlock,
		"id": overlayId.value
	}, popperEvents.value, attrs), { default: () => [contentNode, props.showArrow && createVNode("div", {
		"ref": arrowRef,
		"class": `${prefixCls}-arrow`
	}, null)] });
	return props.destroyOnHide ? overlay : withDirectives(overlay, [[vShow, visibility.value]]);
}
function renderTrigger(props, triggerNode, extraProps, handleClickOutside, overlayId) {
	const triggerProps = {
		...extraProps,
		"aria-controls": overlayId.value
	};
	const element = cloneVNode(triggerNode, triggerProps, true);
	if (props.clickOutside) return withDirectives(element, [[vClickOutside, handleClickOutside]]);
	return element;
}
var ɵOverlay = Overlay;
export { ɵOverlay as i, overlayPlacementDef as n, overlayTriggerDef as r, overlayDelayDef as t };
