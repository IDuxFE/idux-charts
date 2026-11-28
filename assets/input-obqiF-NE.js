import { An as createVNode, Cn as computed, In as mergeProps, O as useGlobalConfig, b as useThemeToken, ir as ref, jn as defineComponent, ur as normalizeClass } from "./app-default-DalXtduk.js";
import { i as IxIcon } from "./a11y-DoXqCLWj.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/_private/input/index.js
var Input = /* @__PURE__ */ defineComponent({
	name: "ɵInput",
	inheritAttrs: false,
	props: {
		addonAfter: String,
		addonBefore: String,
		borderless: {
			type: Boolean,
			default: void 0
		},
		clearable: {
			type: Boolean,
			default: void 0
		},
		clearIcon: String,
		clearVisible: {
			type: Boolean,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: void 0
		},
		focused: {
			type: Boolean,
			default: void 0
		},
		prefix: String,
		size: String,
		status: String,
		suffix: String,
		onClear: Function
	},
	setup(props, { attrs, slots, expose }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-input`);
		const inputRef = ref();
		const getInputElement = () => inputRef.value;
		expose({ getInputElement });
		const classes = computed(() => {
			const { borderless, clearable, disabled, focused, size, status, addonAfter, addonBefore, prefix, suffix } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[prefixCls]: true,
				[globalHashId.value]: !!globalHashId.value,
				[`${prefixCls}-${size}`]: true,
				[`${prefixCls}-${status}`]: !!status,
				[`${prefixCls}-borderless`]: borderless,
				[`${prefixCls}-clearable`]: clearable,
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-focused`]: focused,
				[`${prefixCls}-with-addon-after`]: addonAfter || slots.addonAfter,
				[`${prefixCls}-with-addon-before`]: addonBefore || slots.addonBefore,
				[`${prefixCls}-with-prefix`]: prefix || slots.prefix,
				[`${prefixCls}-with-suffix`]: suffix || slots.suffix
			});
		});
		return () => {
			const { clearable, clearIcon, clearVisible, disabled, addonAfter, addonBefore, prefix, suffix, onClear } = props;
			const prefixCls = mergedPrefixCls.value;
			const addonBeforeNode = renderAddon(slots.addonBefore, addonBefore, `${prefixCls}-addon`, "__before-addon");
			const addonAfterNode = renderAddon(slots.addonAfter, addonAfter, `${prefixCls}-addon`, "__before-after");
			const prefixNode = renderIcon(slots.prefix, prefix, `${prefixCls}-prefix`, "__prefix");
			const suffixNode = renderIcon(slots.suffix, suffix, `${prefixCls}-suffix`, "__suffix");
			const clearNode = clearable && createVNode("span", {
				"key": "__clear",
				"class": `${prefixCls}-clear${clearVisible ? " visible" : ""}`,
				"onClick": onClear
			}, [slots.clearIcon ? slots.clearIcon() : createVNode(IxIcon, { "name": clearIcon }, null)]);
			if (!(addonBeforeNode || addonAfterNode || prefixNode || suffixNode || clearNode)) return createVNode("input", mergeProps({
				"ref": inputRef,
				"class": classes.value,
				"disabled": disabled,
				"aria-disabled": String(!!disabled),
				"aria-readonly": String(!!attrs.readonly)
			}, attrs), null);
			const { class: className, style, readonly, ...rest } = attrs;
			const classNames = normalizeClass([classes.value, className]);
			const inputNode = createVNode("input", mergeProps({
				"ref": inputRef,
				"class": `${prefixCls}-inner`,
				"disabled": disabled,
				"aria-disabled": String(!!disabled),
				"aria-readonly": String(!!readonly)
			}, rest), null);
			if (!(addonBeforeNode || addonAfterNode)) return createVNode("span", {
				"class": classNames,
				"style": style
			}, [
				prefixNode,
				inputNode,
				suffixNode,
				clearNode
			]);
			if (!(prefixNode || suffixNode || clearNode)) return createVNode("span", {
				"class": classNames,
				"style": style
			}, [
				addonBeforeNode,
				inputNode,
				addonAfterNode
			]);
			return createVNode("span", {
				"class": classNames,
				"style": style
			}, [
				addonBeforeNode,
				createVNode("span", {
					"key": "__wrapper",
					"class": `${prefixCls}-wrapper`
				}, [
					prefixNode,
					inputNode,
					suffixNode,
					clearNode
				]),
				addonAfterNode
			]);
		};
	}
});
function renderAddon(slot, prop, cls, key) {
	if (!(slot || prop)) return;
	return createVNode("span", {
		"key": key,
		"class": cls
	}, [slot ? slot() : prop]);
}
function renderIcon(slot, prop, cls, key) {
	if (!(slot || prop)) return;
	return createVNode("span", {
		"key": key,
		"class": cls
	}, [slot ? slot() : createVNode(IxIcon, { "name": prop }, null)]);
}
var ɵInput = Input;
export { ɵInput as t };
