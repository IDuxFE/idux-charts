import { An as createVNode, C as isBrowser, Cn as computed, E as normalizePassiveListenerOptions, Hn as onMounted, I as convertCssPixel, Jn as watch, L as convertElement, O as useGlobalConfig, Pn as inject, Qn as customRef, S as _getShadowRoot, Sn as cloneVNode, U as getFirstValidNode, Yn as watchEffect, Z as isNumeric, ar as shallowRef, ir as ref, jn as defineComponent, k as Logger, ot as tryOnScopeDispose, ur as normalizeClass, x as _getEventTarget, z as createSharedComposable, zn as onBeforeUnmount } from "./app-default-DalXtduk.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/icon/index.js
var iconProps = {
	name: String,
	iconfont: {
		type: Boolean,
		default: false
	},
	rotate: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	color: String,
	size: [String, Number],
	ariaPressed: {
		type: String,
		default: void 0
	}
};
var iconDefinitions = /* @__PURE__ */ new Map();
var iconCache = /* @__PURE__ */ new Map();
function clearSVGElement(el) {
	var _a;
	const children = el.childNodes;
	const length = children.length;
	for (let i = length - 1; i >= 0; i--) {
		const child = children[i];
		if (((_a = child.tagName) == null ? void 0 : _a.toLowerCase()) === "svg") child.remove();
	}
}
async function loadSVGElement(iconName, loadIconDynamically) {
	if (removeIcons.includes(iconName)) Logger.warn("components/icon", `The icon [${iconName}]  has been deprecated, please use another icon.`);
	if (Object.keys(renameIcons).includes(iconName)) Logger.warn("components/icon", `The icon [${iconName}]  has been deprecated, please use [${renameIcons[iconName]}] instead.`);
	const cached = iconCache.get(iconName);
	if (cached) {
		const svg2 = await cached;
		if (svg2) return svg2.cloneNode(true);
		else {
			iconCache.delete(iconName);
			return null;
		}
	}
	const svg = createSVGElement(iconName, loadIconDynamically);
	iconCache.set(iconName, svg);
	return svg;
}
async function loadSvgElementFormScript(iconName) {
	let svg = null;
	const cachedName = `IDUX_CACHED_ICON_FONT_` + iconName;
	const cached = iconCache.get(cachedName);
	if (cached) svg = await cached;
	if (!svg) {
		svg = convertSVGElement(`<svg><use xlink:href="#${iconName}"></svg>`);
		setSVGAttribute(svg, iconName);
		iconCache.set(cachedName, svg);
	}
	return svg.cloneNode(true);
}
async function createSVGElement(iconName, loadIconDynamically) {
	let svg = null;
	const icon = await loadIconDefinition(iconName, loadIconDynamically);
	if (icon) {
		svg = convertSVGElement(icon.svg);
		if (svg) {
			setSVGAttribute(svg, iconName);
			iconCache.set(iconName, svg);
		} else Logger.warn("components/icon", `The icon [${iconName}] create failed.`);
	}
	return svg;
}
async function loadIconDefinition(iconName, loadIconDynamically) {
	let icon = iconDefinitions.get(iconName);
	if (!icon) {
		if (loadIconDynamically) {
			const svg = await loadIconDynamically(iconName);
			if (validSVGString(svg)) {
				icon = {
					name: iconName,
					svg
				};
				iconDefinitions.set(iconName, icon);
			} else {
				Logger.warn("components/icon", `The dynamically loaded icon [${iconName}] is invalid.`);
				return;
			}
		} else Logger.warn("components/icon", `The icon [${iconName}] load failed.`);
	}
	return icon;
}
function validSVGString(svg) {
	return !!svg && svg.includes("<svg");
}
function convertSVGElement(svg) {
	const div = document.createElement("div");
	div.innerHTML = svg;
	return div.querySelector("svg");
}
var defaultSVGAttributes = {
	viewBox: "0 0 1024 1024",
	focusable: "false",
	"aria-hidden": "true"
};
function setSVGAttribute(svg, iconName) {
	Object.entries(defaultSVGAttributes).forEach(([key, value]) => {
		if (!svg.hasAttribute(key)) svg.setAttribute(key, value);
	});
	svg.setAttribute("data-icon", iconName);
}
function convertSVGNode(child) {
	const node = getFirstValidNode(child);
	if (!node || node.type !== "svg") {
		Logger.warn("components/icon", "The children must is svg element");
		return;
	}
	return cloneVNode(node, {
		...defaultSVGAttributes,
		...node.props
	});
}
var removeIcons = [
	"left-double",
	"right-double",
	"unexpand"
];
var renameIcons = {
	bars: "view-list",
	"book-mark": "bookmark",
	card: "view-card",
	collect: "favourite",
	"delivered-procedure": "file-export",
	"dialog-close": "close-filled",
	environment: "location",
	exception: "file-alert",
	"file-gif": "gif",
	"for-screen": "projection",
	insurance: "safety",
	"layout-large": "grid-loose",
	"loading-split": "wait",
	loose: "layout-loose",
	normal: "layout-medium",
	menu: "layout-compact",
	"scan-security": "security-scan",
	"scan-virus": "radar",
	success: "check-filled",
	transmit: "send",
	"tree-expand": "expand-all",
	"tree-unexpand": "collapse-all",
	uncollapse: "expand"
};
var Icon = /* @__PURE__ */ defineComponent({
	name: "IxIcon",
	props: iconProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-icon`);
		const config = useGlobalConfig("icon");
		const root = ref();
		onMounted(() => appendChild(props, config, root.value));
		onBeforeUnmount(() => {
			if (root.value) {
				clearSVGElement(root.value);
				root.value = void 0;
			}
		});
		watch([() => props.name, () => props.iconfont], () => {
			const rootElement = root.value;
			if (!rootElement) return;
			clearSVGElement(rootElement);
			appendChild(props, config, rootElement);
		});
		const classes = computed(() => {
			const { name, rotate } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[prefixCls]: true,
				[`${prefixCls}-${name}`]: !!name,
				[`${prefixCls}-spinning`]: rotate === true
			});
		});
		const style = computed(() => {
			const { rotate, color, size } = props;
			return {
				color,
				fontSize: convertCssPixel(size),
				transform: isNumeric(rotate) ? `rotate(${rotate}deg)` : void 0
			};
		});
		return () => {
			var _a;
			const { name, ariaPressed } = props;
			if (name) return createVNode("i", {
				"ref": root,
				"class": classes.value,
				"style": style.value,
				"role": "img",
				"aria-label": name,
				"aria-pressed": ariaPressed
			}, null);
			else return createVNode("i", {
				"ref": root,
				"class": classes.value,
				"style": style.value,
				"role": "img",
				"aria-pressed": ariaPressed
			}, [convertSVGNode((_a = slots.default) == null ? void 0 : _a.call(slots))]);
		};
	}
});
async function appendChild(props, config, rootElement) {
	const { name, iconfont } = props;
	if (name) {
		const svgElement = iconfont ? await loadSvgElementFormScript(name) : await loadSVGElement(name, config.loadIconDynamically);
		if (svgElement && name === props.name) rootElement.appendChild(svgElement);
	}
}
var addIconDefinitions = (icons) => {
	icons.forEach((icon) => iconDefinitions.set(icon.name, icon));
};
var Down = {
	name: "down",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path d=\"M503.234 694.123 249.575 440.464c-4.998-4.998-5.001-12.869-.003-17.867l27.39-27.39c5-5 12.927-4.939 17.926.06l217.281 217.281 217.281-217.28c4.999-5 12.927-5.06 17.925-.062l27.39 27.39c5 5 4.996 12.87-.002 17.868L521.104 694.123c-4.998 4.998-12.872 4.998-17.87 0Z\"/></svg>"
};
var Empty = {
	name: "empty",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path fill-rule=\"evenodd\" d=\"M256 192V76.8c0-7.07 5.73-12.8 12.8-12.8h486.4c7.072 0 12.8 5.73 12.8 12.8V192h179.2c7.072 0 12.8 5.73 12.8 12.8v38.4c0 7.07-5.728 12.8-12.8 12.8H76.8c-7.07 0-12.8-5.73-12.8-12.8v-38.4c0-7.07 5.73-12.8 12.8-12.8H256Zm64.749 0h383.673v-64H320.75v64ZM204.8 959.693h614.4c7.072 0 12.8-5.69 12.8-12.755V332.893c0-7.068-5.562-12.893-12.634-12.893h-38.732c-7.072 0-12.634 5.562-12.634 12.631V896H256V332.631c0-7.069-5.563-12.631-12.632-12.631h-38.736c-7.07 0-12.632 5.825-12.632 12.893v614.045c0 7.065 5.73 12.755 12.8 12.755Z\"/></svg>"
};
var Right = {
	name: "right",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path d=\"M710.763 521.104 457.104 774.763c-4.998 4.998-12.869 5.001-17.867.003l-27.39-27.39c-5-5-4.939-12.927.06-17.926l217.281-217.28-217.28-217.281c-5-4.999-5.06-12.927-.062-17.925l27.39-27.39c5-5 12.87-4.996 17.868.002l253.659 253.659c4.998 4.998 4.998 12.872 0 17.87Z\"/></svg>"
};
var IxIcon = Icon;
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/cdk/a11y/index.js
function isFakeMousedownFromScreenReader(event) {
	return event.offsetX === 0 && event.offsetY === 0;
}
function isFakeTouchstartFromScreenReader(event) {
	const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
	return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
var INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN = Symbol("cdk-input-modality-detector-options");
var INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = { ignoreCodes: [
	"AltLeft",
	"AltRight",
	"ControlLeft",
	"ControlRight",
	"OSLeft",
	"OSRight",
	"ShiftLeft",
	"ShiftRight"
] };
var modalityEventListenerOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
function useInputModalityDetector(options) {
	const _options = {
		...inject(INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN, INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS),
		...options
	};
	const _modality = ref(null);
	const _modalityDetected = customRef((track, trigger) => {
		let value = null;
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				value = newValue;
				trigger();
			}
		};
	});
	const changeModality = (value) => {
		_modality.value = value;
		_modalityDetected.value = value;
	};
	const _target = ref(null);
	let _lastTouchMs = 0;
	const _onKeydown = (event) => {
		var _a;
		if ((_a = _options.ignoreCodes) == null ? void 0 : _a.some((code) => code === event.code)) return;
		changeModality("keyboard");
		_target.value = _getEventTarget(event);
	};
	const _onMousedown = (event) => {
		if (Date.now() - _lastTouchMs < 650) return;
		changeModality(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
		_target.value = _getEventTarget(event);
	};
	const _onTouchstart = (event) => {
		if (isFakeTouchstartFromScreenReader(event)) {
			changeModality("keyboard");
			return;
		}
		_lastTouchMs = Date.now();
		changeModality("touch");
		_target.value = _getEventTarget(event);
	};
	if (isBrowser) {
		document.addEventListener("keydown", _onKeydown, modalityEventListenerOptions);
		document.addEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
		document.addEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
	}
	tryOnScopeDispose(() => {
		if (isBrowser) {
			document.removeEventListener("keydown", _onKeydown, modalityEventListenerOptions);
			document.removeEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
			document.removeEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
		}
	});
	return {
		modality: _modality,
		modalityDetected: _modalityDetected,
		target: _target
	};
}
var useSharedInputModalityDetector = createSharedComposable(() => useInputModalityDetector());
var FOCUS_MONITOR_OPTIONS_TOKEN = Symbol("cdk-focus-monitor-options");
var FOCUS_MONITOR_DEFAULT_OPTIONS = { detectionMode: "immediate" };
var captureEventListenerOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
function useFocusMonitor(options) {
	var _a;
	const _options = {
		...inject(FOCUS_MONITOR_OPTIONS_TOKEN, FOCUS_MONITOR_DEFAULT_OPTIONS),
		...options
	};
	const _detectionMode = _options.detectionMode;
	const _inputModalityDetector = (_a = _options.inputModalityDetector) != null ? _a : useSharedInputModalityDetector();
	let _origin = null;
	let _lastFocusOrigin;
	let _windowFocused = false;
	let _windowFocusTimeoutId;
	let _originTimeoutId;
	let _originFromTouchInteraction = false;
	const _elementInfo = /* @__PURE__ */ new Map();
	let _monitoredElementCount = 0;
	const _rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
	const _windowFocusListener = () => {
		_windowFocused = true;
		_windowFocusTimeoutId = setTimeout(() => _windowFocused = false);
	};
	let _stopInputModalityDetector = null;
	const _rootNodeFocusAndBlurListener = (event) => {
		const target = _getEventTarget(event);
		const handler = event.type === "focus" ? _onFocus : _onBlur;
		for (let element = target; element; element = element.parentElement) handler(event, element);
	};
	function monitor(element, checkChildren = false) {
		const nativeElement = convertElement(element);
		if (!isBrowser || !nativeElement || nativeElement.nodeType !== 1) return computed(() => ({ origin: null }));
		const rootNode = _getShadowRoot(nativeElement) || _getDocument();
		const cachedInfo = _elementInfo.get(nativeElement);
		if (cachedInfo) {
			if (checkChildren) cachedInfo.checkChildren = true;
			return computed(() => cachedInfo.subject.value);
		}
		const info = {
			checkChildren,
			subject: shallowRef({ origin: null }),
			rootNode
		};
		_elementInfo.set(nativeElement, info);
		_registerGlobalListeners(info);
		return computed(() => info.subject.value);
	}
	function stopMonitoring(element) {
		const nativeElement = convertElement(element);
		if (!nativeElement) return;
		const elementInfo = _elementInfo.get(nativeElement);
		if (elementInfo) {
			_setClasses(nativeElement);
			_elementInfo.delete(nativeElement);
			_removeGlobalListeners(elementInfo);
		}
	}
	function focusVia(element, origin, options2) {
		const nativeElement = convertElement(element);
		if (nativeElement === _getDocument().activeElement) _getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) => _originChanged(currentElement, origin, info));
		else {
			_setOrigin(origin);
			if (nativeElement && typeof nativeElement.focus === "function") nativeElement.focus(options2);
		}
	}
	function blurVia(element) {
		const nativeElement = convertElement(element);
		if (!nativeElement) return;
		if (nativeElement === _getDocument().activeElement && typeof nativeElement.blur === "function") nativeElement.blur();
	}
	function _getDocument() {
		return document;
	}
	function _getWindow() {
		return _getDocument().defaultView || window;
	}
	function _toggleClass(element, className, shouldSet) {
		if (shouldSet) element.classList.add(className);
		else element.classList.remove(className);
	}
	function _getFocusOrigin(focusEventTarget) {
		if (_origin) {
			if (_originFromTouchInteraction) return _shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
			else return _origin;
		}
		return _windowFocused && _lastFocusOrigin ? _lastFocusOrigin : "program";
	}
	function _shouldBeAttributedToTouch(focusEventTarget) {
		return _detectionMode === "eventual" || !!(focusEventTarget == null ? void 0 : focusEventTarget.contains(_inputModalityDetector.target.value));
	}
	function _setClasses(element, origin) {
		_toggleClass(element, "cdk-focused", !!origin);
		_toggleClass(element, "cdk-touch-focused", origin === "touch");
		_toggleClass(element, "cdk-keyboard-focused", origin === "keyboard");
		_toggleClass(element, "cdk-mouse-focused", origin === "mouse");
		_toggleClass(element, "cdk-program-focused", origin === "program");
	}
	function _setOrigin(origin, isFromInteraction = false) {
		_origin = origin;
		_originFromTouchInteraction = origin === "touch" && isFromInteraction;
		if (_detectionMode === "immediate") {
			clearTimeout(_originTimeoutId);
			_originTimeoutId = setTimeout(() => _origin = null, _originFromTouchInteraction ? 650 : 1);
		}
	}
	function _onFocus(event, element) {
		const elementInfo = _elementInfo.get(element);
		const focusEventTarget = _getEventTarget(event);
		if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) return;
		_originChanged(element, _getFocusOrigin(focusEventTarget), elementInfo, event);
	}
	function _onBlur(event, element) {
		const elementInfo = _elementInfo.get(element);
		if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
		_setClasses(element);
		_emitOrigin(elementInfo.subject, null, event);
	}
	function _emitOrigin(subject, origin, event) {
		subject.value = {
			origin,
			event
		};
	}
	function _registerGlobalListeners(elementInfo) {
		if (!isBrowser) return;
		const rootNode = elementInfo.rootNode;
		const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode) || 0;
		if (!rootNodeFocusListeners) {
			rootNode.addEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
			rootNode.addEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
		}
		_rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
		if (++_monitoredElementCount === 1) {
			_getWindow().addEventListener("focus", _windowFocusListener);
			_stopInputModalityDetector = watchEffect(() => {
				_setOrigin(_inputModalityDetector.modalityDetected.value, true);
			});
		}
	}
	function _removeGlobalListeners(elementInfo) {
		const rootNode = elementInfo.rootNode;
		if (_rootNodeFocusListenerCount.has(rootNode)) {
			const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode);
			if (rootNodeFocusListeners > 1) _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
			else {
				rootNode.removeEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
				rootNode.removeEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
				_rootNodeFocusListenerCount.delete(rootNode);
			}
		}
		if (!--_monitoredElementCount) {
			_getWindow().removeEventListener("focus", _windowFocusListener);
			if (_stopInputModalityDetector) {
				_stopInputModalityDetector();
				_stopInputModalityDetector = null;
			}
			clearTimeout(_windowFocusTimeoutId);
			clearTimeout(_originTimeoutId);
		}
	}
	function _originChanged(element, origin, elementInfo, event) {
		_setClasses(element, origin);
		_emitOrigin(elementInfo.subject, origin, event);
		_lastFocusOrigin = origin;
	}
	function _getClosestElementsInfo(element) {
		const results = [];
		_elementInfo.forEach((info, currentElement) => {
			if (currentElement === element || info.checkChildren && currentElement.contains(element)) results.push([currentElement, info]);
		});
		return results;
	}
	tryOnScopeDispose(() => _elementInfo.forEach((_info, element) => stopMonitoring(element)));
	return {
		monitor,
		stopMonitoring,
		focusVia,
		blurVia
	};
}
var useSharedFocusMonitor = createSharedComposable(() => useFocusMonitor());
export { Right as a, IxIcon as i, Down as n, addIconDefinitions as o, Empty as r, useSharedFocusMonitor as t };
