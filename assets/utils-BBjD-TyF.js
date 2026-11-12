import { Bt as Logger, Dn as isString, En as isNil, Fr as computed, Hr as createVNode, Kr as inject, Lt as normalizePassiveListenerOptions, Mt as _getEventTarget, Nt as _getShadowRoot, Pt as isBrowser, Xn as isFunction, Yt as createSharedComposable, _i as shallowRef, gi as ref, gn as tryOnScopeDispose, oi as watch, qt as convertElement, si as watchEffect, ui as customRef, xn as useState } from "./app-default-DCCQUDkm.js";
import { u as IxIcon } from "./form-CkhvCP4O.js";
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/a11y/index.js
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/utils/index.js
function convertIconVNode(slots, props, keyOrParams, slotParams) {
	let iconSlot;
	let iconName;
	const isKey = isString(keyOrParams);
	const params = isKey ? slotParams : keyOrParams;
	if (isKey) {
		iconSlot = slots[keyOrParams];
		if (!iconSlot) iconName = props[keyOrParams];
	} else {
		iconSlot = slots;
		iconName = props;
	}
	if (iconSlot) return iconSlot(params);
	return isString(iconName) && iconName !== "" ? createVNode(IxIcon, { name: iconName }, null) : isFunction(iconName) ? iconName(params) : iconName;
}
function convertStringVNode(slots, props, keyOrParams, slotParams) {
	let labelSlot;
	let label;
	const isKey = isString(keyOrParams);
	const params = isKey ? slotParams : keyOrParams;
	if (isKey) {
		labelSlot = slots[keyOrParams];
		if (!labelSlot) label = props[keyOrParams];
	} else {
		labelSlot = slots;
		label = props;
	}
	return labelSlot ? labelSlot(params) : isFunction(label) ? label(params) : label;
}
function useGetKey(props, config, location) {
	return computed(() => {
		const { getKey = config.getKey } = props;
		if (isString(getKey)) return (data) => {
			const key = data[getKey];
			if (key === void 0) Logger.warn(location, "Each item in dataSource should have a unique `key` prop.");
			return key;
		};
		return getKey;
	});
}
function useOverlayFocusMonitor(onFocus, onBlur) {
	const [focused, setFocused] = useState(false);
	const [overlayFocused, setOverlayFocused] = useState(false);
	const [triggerFocused, setTriggerFocused] = useState(false);
	const { monitor, stopMonitoring, focusVia: _focusVia, blurVia } = useSharedFocusMonitor();
	const { handleFocus: _handleFocus, handleBlur: _handleBlur } = useFocusHandlers(focused, setFocused, onFocus, onBlur);
	const handleFocus = (evt) => {
		_handleFocus(evt);
		setTriggerFocused(true);
	};
	const handleBlur = (evt) => {
		_handleBlur(evt);
		setTriggerFocused(false);
	};
	const monitorStops = /* @__PURE__ */ new Set();
	const _bindMonitor = (el, isOverlay = false) => {
		const stop = watch(monitor(el, true), (evt) => {
			const { origin, event } = evt;
			if (event) {
				if (origin) {
					_handleFocus(event, origin);
					isOverlay ? setOverlayFocused(true) : setTriggerFocused(true);
				} else {
					_handleBlur(event);
					isOverlay ? setOverlayFocused(false) : setTriggerFocused(false);
				}
			}
		});
		return () => {
			stop();
			stopMonitoring(el);
		};
	};
	const bindMonitor = (elRef) => {
		let stop;
		const stopWatch = watch(elRef, (el) => {
			stop == null || stop();
			if (!el) return;
			stop = _bindMonitor(el);
		}, { immediate: true });
		const stopMonitor = () => {
			stop == null || stop();
			stopWatch();
		};
		monitorStops.add(stopMonitor);
		return stopMonitor;
	};
	const bindOverlayMonitor = (overlayRef, overlayOpened) => {
		let stop;
		const stopWatch = watch([() => {
			var _a;
			return (_a = overlayRef.value) == null ? void 0 : _a.getPopperElement();
		}, overlayOpened], ([el, opened]) => {
			stop == null || stop();
			if (!opened || !el) return;
			stop = _bindMonitor(el, true);
		}, { immediate: true });
		const stopMonitor = () => {
			stop == null || stop();
			stopWatch();
		};
		monitorStops.add(stopMonitor);
		return stopMonitor;
	};
	const unbindAllMonitor = () => {
		monitorStops.forEach((stop) => stop());
	};
	const focusVia = (elRef, origin, options) => {
		_focusVia(elRef, origin != null ? origin : "program", options);
	};
	tryOnScopeDispose(() => {
		unbindAllMonitor();
	});
	return {
		focused,
		overlayFocused,
		triggerFocused,
		bindMonitor,
		bindOverlayMonitor,
		focusVia,
		blurVia,
		handleFocus,
		handleBlur
	};
}
function useFocusHandlers(focused, setFocused, onFocus, onBlur) {
	let lastFocusEvtTime = 0;
	const checkSubsequentFocus = async (evt) => {
		await new Promise((resolve) => setTimeout(resolve));
		return lastFocusEvtTime >= evt.timeStamp;
	};
	const handleBlur = async (evt) => {
		if (await checkSubsequentFocus(evt)) return;
		setFocused(false);
		onBlur(evt);
	};
	const handleFocus = (evt, origin) => {
		lastFocusEvtTime = evt.timeStamp;
		if (focused.value) return;
		setFocused(true);
		onFocus(evt, origin != null ? origin : "program");
	};
	return {
		handleFocus,
		handleBlur
	};
}
var zIndexCount = 0;
var useZIndex = (controlZIndex, configZIndex, visible) => {
	const getZIndex = () => {
		const zIndex = configZIndex.value;
		if (isFunction(zIndex)) return zIndex();
		return zIndex + zIndexCount++;
	};
	const innerZIndex = ref(0);
	watch(visible, (newVisible) => {
		if (newVisible && isNil(controlZIndex.value)) innerZIndex.value = getZIndex();
	}, { immediate: true });
	return computed(() => {
		var _a;
		return (_a = controlZIndex.value) != null ? _a : innerZIndex.value;
	});
};
export { useZIndex as a, useOverlayFocusMonitor as i, convertStringVNode as n, useSharedFocusMonitor as o, useGetKey as r, convertIconVNode as t };
