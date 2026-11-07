import { M as isFunction, P as isArray, _ as isNil, g as merge, x as isPlainObject } from "./setup-Dx32Rw55.js";
import { F as watch, G as reactive, I as watchEffect, J as toRaw, K as ref, Q as normalizeClass, Z as unref, _ as createVNode, q as shallowRef, u as computed, v as defineComponent, w as nextTick, x as inject, y as getCurrentInstance } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { A as convertCssPixel, C as useGlobalConfig, D as callEmit, F as flattenNode, G as isNumeric, S as useThemeToken, T as NoopFunction, c as convertStringVNode, dt as isNumber, et as tryOnScopeDispose, ft as isString, k as convertArray, lt as supportsFlexGap, w as Logger } from "./form-B-ZW9mDA.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/space/index.js
var spaceProps = {
	align: String,
	block: {
		type: Boolean,
		default: void 0
	},
	justify: String,
	size: [
		Number,
		String,
		Array
	],
	separator: String,
	vertical: {
		type: Boolean,
		default: void 0
	},
	wrap: {
		type: Boolean,
		default: void 0
	}
};
function getDefaultThemeTokens(tokens) {
	const { colorSeparator } = tokens;
	return { separatorColor: colorSeparator };
}
var getThemeTokens = (tokens) => {
	return getDefaultThemeTokens(tokens);
};
var flexGapSupported = supportsFlexGap();
var defaultSizeMap = {
	sm: "8px",
	md: "16px",
	lg: "24px"
};
var Space = /* @__PURE__ */ defineComponent({
	name: "IxSpace",
	props: spaceProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("space");
		registerToken(getThemeTokens);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-space`);
		const config = useGlobalConfig("space");
		const wrap = computed(() => {
			var _a;
			return (_a = props.wrap) != null ? _a : config.wrap;
		});
		const mergedGaps = computed(() => {
			const { size = config.size } = props;
			return (Array.isArray(size) ? size : [size, size]).map((size2) => defaultSizeMap[size2] || convertCssPixel(size2));
		});
		const classes = computed(() => {
			const { align, justify, block, vertical } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-align-${align}`]: align,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-justify-${justify}`]: justify,
				[`${prefixCls}-nowrap`]: !wrap.value,
				[`${prefixCls}-vertical`]: vertical
			});
		});
		const style = computed(() => {
			const [rowGap, columnGap] = mergedGaps.value;
			if (flexGapSupported) return `gap: ${rowGap} ${columnGap}`;
			else return !props.vertical && wrap.value ? `margin-bottom: -${convertCssPixel(rowGap)}` : void 0;
		});
		return () => {
			var _a;
			const nodes = flattenNode((_a = slots.default) == null ? void 0 : _a.call(slots));
			if (nodes.length === 0) return;
			const prefixCls = mergedPrefixCls.value;
			const children = [];
			const separatorNode = convertStringVNode(slots, props, "separator");
			const lastIndex = nodes.length - 1;
			nodes.forEach((node, index) => {
				const style2 = calcItemStyle(mergedGaps, wrap, props.vertical, index, lastIndex);
				children.push(createVNode("div", {
					"key": `item-${index}`,
					"class": `${prefixCls}-item`,
					"style": style2
				}, [node]));
				if (separatorNode && index < lastIndex) children.push(createVNode("div", {
					"key": `separator-${index}`,
					"class": `${prefixCls}-item-separator`,
					"style": style2
				}, [separatorNode]));
			});
			return createVNode("div", {
				"class": classes.value,
				"style": style.value
			}, [children]);
		};
	}
});
var calcItemStyle = (mergedGaps, wrap, vertical, index, lastIndex) => {
	if (flexGapSupported) return;
	const [rowGap, columnGap] = mergedGaps.value;
	if (vertical) return { marginBottom: index < lastIndex ? convertCssPixel(rowGap) : void 0 };
	else return {
		marginRight: index < lastIndex ? convertCssPixel(columnGap) : void 0,
		paddingBottom: wrap.value ? convertCssPixel(rowGap) : void 0
	};
};
var IxSpace = Space;
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/forms/index.js
var defaultName$1 = "此项";
var zhCNMessages = {
	default: (_, control) => {
		var _a;
		return `${(_a = control.name) != null ? _a : ""}\u9A8C\u8BC1\u5931\u8D25`;
	},
	required: (_, control) => {
		const { name = defaultName$1, example } = control;
		return `\u8BF7\u8F93\u5165${name}${example ? ", 例: " + example : ""}`;
	},
	requiredTrue: (_, control) => {
		const { name = defaultName$1 } = control;
		return `${name}\u5FC5\u987B\u4E3A 'true'`;
	},
	email: (_, control) => {
		const { example } = control;
		return `\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u683C\u5F0F${example ? ", 例: " + example : ""}`;
	},
	min: (err, __) => {
		return `\u8BF7\u8F93\u5165\u4E0D\u5C0F\u4E8E ${err.min} \u7684\u6570\u5B57`;
	},
	max: (err, __) => {
		return `\u8BF7\u8F93\u5165\u4E0D\u5927\u4E8E ${err.max} \u7684\u6570\u5B57`;
	},
	range: (err, __) => {
		return `\u8BF7\u8F93\u5165 ${err.min}-${err.max} \u4E4B\u95F4\u7684\u6570\u5B57`;
	},
	minLength: (err, __) => {
		const { minLength, isArray: isArray2 } = err;
		return isArray2 ? `\u8BF7\u81F3\u5C11\u9009\u62E9 ${minLength} \u9879` : `\u8BF7\u81F3\u5C11\u8F93\u5165 ${minLength} \u4E2A\u5B57\u7B26`;
	},
	maxLength: (err, __) => {
		const { maxLength, isArray: isArray2 } = err;
		return isArray2 ? `\u8BF7\u81F3\u591A\u9009\u62E9 ${maxLength} \u9879` : `\u8BF7\u81F3\u591A\u8F93\u5165 ${maxLength} \u4E2A\u5B57\u7B26`;
	},
	rangeLength: (err, __) => {
		const { minLength, maxLength, isArray: isArray2 } = err;
		return isArray2 ? `\u8BF7\u9009\u62E9 ${minLength}-${maxLength} \u9879` : `\u8BF7\u8F93\u5165 ${minLength}-${maxLength} \u4E2A\u5B57\u7B26`;
	},
	pattern: (_, control) => {
		const { example } = control;
		return `\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u683C\u5F0F${example ? ", 例: " + example : ""}`;
	}
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
	__defNormalProp$2(obj, key + "", value);
	return value;
};
var emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _Validators = class {
	static setMessages(messages, locale) {
		_Validators.messages = mergedLocaleMessages(_Validators.messages, messages, locale);
	}
	static getMessage(key) {
		return _Validators.messages[key];
	}
	static getError(key, control, errorContext = {}) {
		let message = void 0;
		const validMessage = _Validators.messages[key] || _Validators.messages.default;
		if (isFunction(validMessage)) message = validMessage(errorContext, control);
		else message = validMessage;
		return {
			...errorContext,
			message
		};
	}
	static required(value, control) {
		if (isEmpty(value)) return { required: _Validators.getError("required", control) };
	}
	static requiredTrue(value, control) {
		if (value === true) return;
		return { requiredTrue: _Validators.getError("requiredTrue", control, { actual: value }) };
	}
	static email(value, control) {
		if (isEmpty(value) || emailRegexp.test(value)) return;
		return { email: _Validators.getError("email", control, { actual: value }) };
	}
	static min(min) {
		return (value, control) => {
			if (isEmpty(value) || !isNumeric(value) || Number(value) >= min) return;
			return { min: _Validators.getError("min", control, {
				min,
				actual: value
			}) };
		};
	}
	static max(max) {
		return (value, control) => {
			if (isEmpty(value) || !isNumeric(value) || Number(value) <= max) return;
			return { max: _Validators.getError("max", control, {
				max,
				actual: value
			}) };
		};
	}
	static range(min, max) {
		return (value, control) => {
			if (isEmpty(value) || !isNumeric(value) || Number(value) >= min && Number(value) <= max) return;
			return { range: _Validators.getError("range", control, {
				min,
				max,
				actual: value
			}) };
		};
	}
	static minLength(minLength) {
		return (value, control) => {
			if (isEmpty(value) || !hasLength(value) || value.length >= minLength) return;
			return { minLength: _Validators.getError("minLength", control, {
				minLength,
				actual: value.length,
				isArray: isArray(value)
			}) };
		};
	}
	static maxLength(maxLength) {
		return (value, control) => {
			if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) return;
			return { maxLength: _Validators.getError("maxLength", control, {
				maxLength,
				actual: value.length,
				isArray: isArray(value)
			}) };
		};
	}
	static rangeLength(minLength, maxLength) {
		return (value, control) => {
			if (isEmpty(value) || !hasLength(value) || value.length >= minLength && value.length <= maxLength) return;
			return { rangeLength: _Validators.getError("rangeLength", control, {
				minLength,
				maxLength,
				actual: value.length,
				isArray: isArray(value)
			}) };
		};
	}
	static pattern(pattern) {
		if (!pattern) return _Validators.nullValidator;
		let regex;
		let regexStr;
		if (typeof pattern === "string") {
			regexStr = "";
			if (pattern.charAt(0) !== "^") regexStr += "^";
			regexStr += pattern;
			if (pattern.charAt(pattern.length - 1) !== "$") regexStr += "$";
			regex = new RegExp(regexStr);
		} else {
			regexStr = pattern.toString();
			regex = pattern;
		}
		return (value, control) => {
			if (isEmpty(value) || regex.test(value)) return;
			return { pattern: _Validators.getError("pattern", control, {
				pattern: regexStr,
				actual: value
			}) };
		};
	}
	static nullValidator(_, _control) {}
	static compose(validators) {
		if (!validators) return;
		const presentValidators = validators.filter(isFunction);
		if (presentValidators.length === 0) return;
		return (value, control) => mergeMessages(executeValidators(value, control, presentValidators));
	}
	static composeAsync(validators) {
		if (!validators) return;
		const presentValidators = validators.filter(isFunction);
		if (presentValidators.length === 0) return;
		return (value, control) => {
			const validateErrors = executeValidators(value, control, presentValidators);
			return Promise.all(validateErrors).then(mergeMessages);
		};
	}
};
var Validators = _Validators;
__publicField$2(Validators, "messages", mergedLocaleMessages({}, zhCNMessages, "zh-CN"));
function isEmpty(val) {
	return isNil(val) || (isString(val) || isArray(val)) && val.length === 0;
}
function hasLength(val) {
	return !isNil(val) && isNumber(val.length);
}
function executeValidators(value, control, validators) {
	return validators.map((validator) => validator(value, control));
}
function mergeMessages(validateErrors) {
	const res = {};
	for (const errors of validateErrors) if (!isNil(errors)) Object.assign(res, errors);
	return Object.keys(res).length === 0 ? void 0 : res;
}
function mergedLocaleMessages(currMessages, newMessages, locale) {
	if (!locale) return merge(currMessages, newMessages);
	const messageWithLocale = {};
	Object.keys(newMessages).forEach((key) => {
		messageWithLocale[key] = { [locale]: newMessages[key] };
	});
	return merge(currMessages, messageWithLocale);
}
function hasValidator(validators, validator) {
	if (!validator) return false;
	return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
	const current = convertArray(currentValidators);
	convertArray(validators).forEach((v) => {
		if (!hasValidator(current, v)) current.push(v);
	});
	return current;
}
function removeValidators(validators, currentValidators) {
	return convertArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
	__defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
	return value;
};
function isOptions(val) {
	return isPlainObject(val);
}
function toValidator(validator) {
	return isArray(validator) ? Validators.compose(validator) : validator;
}
function toAsyncValidator(asyncValidator) {
	return isArray(asyncValidator) ? Validators.composeAsync(asyncValidator) : asyncValidator;
}
var DefaultTrigger = "change";
var controlId = 0;
var AbstractControl = class {
	constructor(controls, validatorOrOptions, asyncValidator, initValue) {
		__publicField$1(this, "uid", controlId++);
		__publicField$1(this, "controls");
		__publicField$1(this, "valueRef");
		__publicField$1(this, "status");
		__publicField$1(this, "errors");
		__publicField$1(this, "valid");
		__publicField$1(this, "invalid");
		__publicField$1(this, "validating");
		__publicField$1(this, "disabled");
		__publicField$1(this, "blurred");
		__publicField$1(this, "unblurred");
		__publicField$1(this, "dirty");
		__publicField$1(this, "pristine");
		__publicField$1(this, "validated");
		__publicField$1(this, "name");
		__publicField$1(this, "example");
		__publicField$1(this, "_controls");
		__publicField$1(this, "_valueRef");
		__publicField$1(this, "_status");
		__publicField$1(this, "_controlsStatus");
		__publicField$1(this, "_errors");
		__publicField$1(this, "_disabled");
		__publicField$1(this, "_disabledFn");
		__publicField$1(this, "_blurred", ref(false));
		__publicField$1(this, "_dirty", ref(false));
		__publicField$1(this, "_initializing", ref(true));
		__publicField$1(this, "_validated", ref(false));
		__publicField$1(this, "_validators");
		__publicField$1(this, "_composedValidators");
		__publicField$1(this, "_asyncValidators");
		__publicField$1(this, "_composedAsyncValidators");
		__publicField$1(this, "_parent");
		__publicField$1(this, "_trigger");
		this._controls = shallowRef(controls);
		this._valueRef = shallowRef(initValue != null ? initValue : this._calculateInitValue());
		this._forEachControls((control) => control.setParent(this));
		this._convertOptions(validatorOrOptions, asyncValidator);
		this._init();
		this._watchCommonStatuses();
		this._watchOtherStatuses();
	}
	get parent() {
		return this._parent;
	}
	get root() {
		let root = this;
		while (root.parent) root = root.parent;
		return root;
	}
	get trigger() {
		var _a, _b, _c;
		return (_c = (_b = this._trigger) != null ? _b : (_a = this._parent) == null ? void 0 : _a.trigger) != null ? _c : DefaultTrigger;
	}
	reset() {
		if (this._controls.value) this._forEachControls((control) => control.reset());
		else {
			const currValue = this._valueRef.value;
			const initValue = this._calculateInitValue();
			if (currValue !== initValue) this._valueRef.value = initValue;
			else this._validate(true);
			this.markAsUnblurred();
			this.markAsPristine();
		}
	}
	async validate() {
		if (!this._disabled.value && this._controls.value) {
			const validates = [];
			this._forEachControls((control) => validates.push(control.validate()));
			if (validates.length > 0) await Promise.all(validates);
		}
		return this._validate();
	}
	disable() {
		this._disabled.value = true;
		this._errors.value = void 0;
		if (this._controls.value) this._forEachControls((control) => control.disable());
	}
	enable() {
		this._disabled.value = false;
		if (this._controls.value) this._forEachControls((control) => control.enable());
		this._validate(true);
	}
	markAsBlurred() {
		if (this._controls.value) this._forEachControls((control) => control.markAsBlurred());
		else this._blurred.value = true;
		if (this.trigger === "blur") this._validate();
	}
	markAsUnblurred() {
		if (this._controls.value) this._forEachControls((control) => control.markAsUnblurred());
		else this._blurred.value = false;
	}
	markAsDirty() {
		if (this._controls.value) this._forEachControls((control) => control.markAsDirty());
		else this._dirty.value = true;
	}
	markAsPristine() {
		if (this._controls.value) this._forEachControls((control) => control.markAsPristine());
		else this._dirty.value = false;
		this._validated.value = false;
	}
	setValidators(newValidators) {
		this._validators = newValidators;
		this._composedValidators = toValidator(newValidators);
	}
	setAsyncValidators(newAsyncValidators) {
		this._asyncValidators = newAsyncValidators;
		this._composedAsyncValidators = toAsyncValidator(newAsyncValidators);
	}
	addValidators(validators) {
		this.setValidators(addValidators(validators, this._validators));
	}
	addAsyncValidators(validators) {
		this.setAsyncValidators(addValidators(validators, this._asyncValidators));
	}
	removeValidators(validators) {
		this.setValidators(removeValidators(validators, this._validators));
	}
	removeAsyncValidators(validators) {
		this.setAsyncValidators(removeValidators(validators, this._asyncValidators));
	}
	clearValidators() {
		this.setValidators(void 0);
	}
	clearAsyncValidators() {
		this.setAsyncValidators(void 0);
	}
	hasValidator(validator) {
		return hasValidator(this._validators, validator);
	}
	hasAsyncValidator(validator) {
		return hasValidator(this._asyncValidators, validator);
	}
	get(path) {
		if (isNil(path)) return;
		const currPath = isString(path) ? path.split(".") : convertArray(path);
		if (currPath.length === 0) return;
		return currPath.reduce((control, name) => control && control._find(name), this);
	}
	setErrors(errors, path) {
		var _a;
		if (!isNil(path)) (_a = this.get(path)) == null || _a.setErrors(errors);
		else this._errors.value = errors;
	}
	clearErrors(path) {
		this.setErrors(void 0, path);
	}
	getError(errorCode, path) {
		var _a, _b;
		const control = path ? this.get(path) : this;
		return (_b = (_a = control == null ? void 0 : control._errors) == null ? void 0 : _a.value) == null ? void 0 : _b[errorCode];
	}
	hasError(errorCode, path) {
		return this.getError(errorCode, path) !== void 0;
	}
	setParent(parent) {
		this._parent = parent;
	}
	watchValue(cb, options) {
		return watch(this.valueRef, cb, options);
	}
	watchStatus(cb, options) {
		return watch(this.status, cb, options);
	}
	async _validate(isInner = false) {
		let newErrors = void 0;
		let value = void 0;
		if (!this._disabled.value) {
			if (this._composedValidators) {
				value = this.getValue();
				newErrors = this._composedValidators(value, this);
			}
			if (isNil(newErrors) && this._composedAsyncValidators) {
				if (!this._composedValidators) value = this.getValue();
				this._status.value = "validating";
				newErrors = await this._composedAsyncValidators(value, this);
			}
		}
		if (!isInner) this._validated.value = true;
		this.setErrors(newErrors);
		this._status.value = newErrors ? "invalid" : "valid";
		return newErrors;
	}
	_convertOptions(validatorOrOptions, asyncValidator) {
		let _disabled = false;
		if (isOptions(validatorOrOptions)) {
			const { name, example, trigger, validators, asyncValidators, disabled } = validatorOrOptions;
			this.name = name;
			this.example = example;
			this.setValidators(validators);
			this.setAsyncValidators(asyncValidators);
			if (trigger) this._trigger = trigger;
			if (disabled) {
				if (isFunction(disabled)) {
					_disabled = disabled(this, true);
					this._disabledFn = disabled;
				} else _disabled = true;
				_disabled && this._forEachControls((control) => control.disable());
			}
		} else {
			this.setValidators(validatorOrOptions);
			this.setAsyncValidators(asyncValidator);
		}
		this._disabled = ref(_disabled);
	}
	_init() {
		const current = this;
		current.controls = computed(() => this._controls.value);
		current.valueRef = computed(() => this._valueRef.value);
		this._initErrorsAndStatus();
		current.errors = computed(() => this._errors.value);
		current.status = computed(() => {
			const selfStatus = this._status.value;
			if (selfStatus === "valid") return this._controlsStatus.value;
			return selfStatus;
		});
		current.valid = computed(() => this.status.value === "valid");
		current.invalid = computed(() => this.status.value === "invalid");
		current.validating = computed(() => this.status.value === "validating");
		current.disabled = computed(() => this._disabled.value);
		current.blurred = computed(() => this._blurred.value);
		current.unblurred = computed(() => !this._blurred.value);
		current.dirty = computed(() => this._dirty.value);
		current.pristine = computed(() => !this._dirty.value);
		current.validated = computed(() => this._validated.value);
		tryOnScopeDispose(() => {
			current.controls = null;
			current.valueRef = null;
			current.errors = null;
			current.status = null;
			current.valid = null;
			current.invalid = null;
			current.validating = null;
			current.disabled = null;
			current.blurred = null;
			current.unblurred = null;
			current.dirty = null;
			current.pristine = null;
			current.validated = null;
		});
	}
	_initErrorsAndStatus() {
		const disabled = this._disabled.value;
		let value;
		let errors;
		let status = "valid";
		let controlsStatus = "valid";
		if (!disabled) {
			if (this._composedValidators) {
				value = this.getValue();
				errors = this._composedValidators(value, this);
			}
			if (errors) status = "invalid";
			this._forEachControls((control) => {
				const controlStatus = control.status.value;
				if (controlStatus === "invalid") controlsStatus = "invalid";
				else if (controlStatus === "validating" && controlsStatus === "valid") controlsStatus = "validating";
			});
		}
		this._errors = shallowRef(errors);
		this._status = ref(status);
		this._controlsStatus = ref(controlsStatus);
		if (!disabled && status === "valid" && controlsStatus === "valid" && this._composedAsyncValidators) {
			if (!this._composedValidators) value = this.getValue();
			this._status.value = "validating";
			this._composedAsyncValidators(value, this).then((asyncErrors) => {
				this._errors.value = asyncErrors;
				this._status.value = asyncErrors ? "invalid" : "valid";
			});
		}
	}
	_watchCommonStatuses() {
		if (this._disabledFn) nextTick(() => {
			watchEffect(() => {
				if (this._disabledFn(this, false)) this.disable();
				else this.enable();
			});
		});
		watchEffect(() => {
			this._status.value = this._errors.value ? "invalid" : "valid";
		});
		watch(this._dirty, (dirty) => {
			if (!dirty) return;
			if (this.trigger === "interactions" && this._blurred.value && !this._validated.value) this._validate();
		});
		watch(this._blurred, (blurred) => {
			if (!blurred) return;
			if (this.trigger === "interactions" && this._dirty.value && !this._validated.value) this._validate();
		});
		watch(this._valueRef, () => {
			if (this.trigger === "change" || this.trigger === "interactions" && this._validated.value && this._dirty.value && this._blurred.value) this._validate();
		});
	}
};
var isAbstractControl = (val) => {
	return val instanceof AbstractControl;
};
var FORMS_CONTROL_TOKEN = Symbol("cdk-forms-control");
function useControl(controlKey = "control") {
	const { props } = getCurrentInstance();
	const parentControl = inject(FORMS_CONTROL_TOKEN, shallowRef());
	const control = shallowRef();
	let watchStop;
	const cleanWatch = () => {
		if (watchStop) {
			watchStop();
			watchStop = void 0;
		}
	};
	tryOnScopeDispose(cleanWatch);
	watch([() => props[controlKey], parentControl], ([controlOrPath, pControl]) => {
		cleanWatch();
		if (isAbstractControl(controlOrPath)) control.value = controlOrPath;
		else if (pControl && !isNil(controlOrPath)) watchStop = watch(pControl.controls, () => {
			const _control = pControl.get(controlOrPath);
			if (!_control) Logger.warn("cdk/forms", `not find control by [${controlOrPath}]`);
			control.value = _control;
		}, { immediate: true });
	}, { immediate: true });
	return control;
}
function useAccessor(control, valueKey = "value", disabledKey = "disabled") {
	const accessor = reactive({});
	const { props } = getCurrentInstance();
	let valueStop;
	let disabledStop;
	let tempValueWatchStop;
	const cleanWatch = () => {
		if (valueStop) {
			valueStop();
			valueStop = void 0;
		}
		if (disabledStop) {
			disabledStop();
			disabledStop = void 0;
		}
		if (tempValueWatchStop) {
			tempValueWatchStop();
			tempValueWatchStop = void 0;
		}
	};
	const generateAccessorByControl = (currControl) => {
		valueStop = watch(currControl.valueRef, (value) => {
			accessor.value = value;
		}, { immediate: true });
		disabledStop = watch(currControl.disabled, (disabled) => {
			accessor.disabled = disabled;
		}, { immediate: true });
		accessor.setValue = (value, options) => currControl.setValue(value, {
			dirty: true,
			...options
		});
		accessor.markAsBlurred = () => currControl.markAsBlurred();
	};
	const generateAccessorByProps = () => {
		const tempRef = shallowRef(props[valueKey]);
		tempValueWatchStop = watch(() => props[valueKey], (value) => tempRef.value = value);
		valueStop = watch(() => {
			var _a;
			return (_a = props[valueKey]) != null ? _a : tempRef.value;
		}, (value) => {
			accessor.value = value;
		}, { immediate: true });
		disabledStop = watch(() => props[disabledKey], (disabled) => {
			accessor.disabled = disabled;
		}, { immediate: true });
		accessor.setValue = (value) => {
			if (value !== toRaw(accessor.value)) {
				tempRef.value = value;
				callEmit(props[`onUpdate:${valueKey}`], value);
			}
		};
		accessor.markAsBlurred = NoopFunction;
	};
	watch(() => unref(control), (currControl) => {
		cleanWatch();
		if (currControl) generateAccessorByControl(currControl);
		else generateAccessorByProps();
	}, { immediate: true });
	tryOnScopeDispose(cleanWatch);
	return accessor;
}
function useAccessorAndControl(options) {
	const { controlKey, valueKey, disabledKey } = options != null ? options : {};
	const control = useControl(controlKey);
	return {
		accessor: useAccessor(control, valueKey, disabledKey),
		control
	};
}
export { IxSpace as n, useAccessorAndControl as t };
