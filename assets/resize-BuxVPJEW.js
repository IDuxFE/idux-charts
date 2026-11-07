import { F as watch } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { et as tryOnScopeDispose, j as convertElement } from "./form-B-ZW9mDA.js";
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/resize/index.js
var resizeMap = /* @__PURE__ */ new Map();
function onResize(el, listener, options) {
	if (!el || !listener) return;
	if (resizeMap.has(el)) resizeMap.get(el).listeners.push(listener);
	else {
		const listeners = [listener];
		const ro = new ResizeObserver((entries) => {
			entries.forEach((entry) => listeners.forEach((fn) => fn(entry)));
		});
		ro.observe(el, options);
		resizeMap.set(el, {
			listeners,
			ro
		});
	}
}
function offResize(el, listener) {
	if (!el || !listener || !resizeMap.has(el)) return;
	const { listeners, ro } = resizeMap.get(el);
	const listenerIndex = listeners.indexOf(listener);
	if (listenerIndex > -1) {
		listeners.splice(listenerIndex, 1);
		if (listeners.length === 0) {
			ro.disconnect();
			resizeMap.delete(el);
		}
	}
}
function useResizeObserver(target, listener, options) {
	const stopWatch = watch(() => convertElement(target), (currElement, prevElement) => {
		if (prevElement) offResize(prevElement, listener);
		if (currElement) onResize(currElement, listener, options);
	}, {
		immediate: true,
		flush: "post"
	});
	const stop = () => {
		offResize(convertElement(target), listener);
		stopWatch();
	};
	tryOnScopeDispose(stop);
	return stop;
}
export { onResize as n, useResizeObserver as r, offResize as t };
