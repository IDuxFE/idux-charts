import { n as isVNode, F as Fragment, C as Comment, T as Text, p as getCurrentInstance, q as getCurrentScope, t as onScopeDispose, d as defineComponent, g as computed, r as ref, h as onMounted, f as watch, v as normalizeClass, a as createVNode, x as cloneVNode, l as inject, y as reactive, z as provide, s as shallowRef, u as unref, A as toRaw, B as nextTick, j as watchEffect, i as onBeforeUnmount } from "./_plugin-vue_export-helper-918196f7.js";
let hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
const testUserAgent = (regexp) => {
  return regexp.test(navigator.userAgent);
};
const isBrowser = typeof document === "object" && !!document;
const isEdge = isBrowser && testUserAgent(/(edge)/i);
const isTrident = isBrowser && testUserAgent(/(msie|trident)/i);
const isBlink = isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !isEdge && !isTrident;
const isWebKit = isBrowser && testUserAgent(/AppleWebKit/i) && !isBlink && !isEdge && !isTrident;
isBrowser && testUserAgent(/(firefox|minefield)/i);
isBrowser && testUserAgent(/safari/i) && isWebKit;
isBrowser && testUserAgent(/iPad|iPhone|iPod/) && !("MSStream" in window);
isBrowser && testUserAgent(/android/i) && !isTrident;
let flexGapSupported$1;
function supportsFlexGap() {
  if (!isBrowser) {
    return false;
  }
  if (flexGapSupported$1 !== void 0) {
    return flexGapSupported$1;
  }
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  flexGapSupported$1 = flex.scrollHeight === 1;
  document.body.removeChild(flex);
  return flexGapSupported$1;
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
var nativeObjectToString$1 = objectProto$d.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$c = Object.prototype;
var nativeObjectToString = objectProto$c.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
const isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$b = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$9;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
var objectTag$2 = "[object Object]";
var funcProto = Function.prototype, objectProto$2 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$2 && getTag(new Map$2()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$2 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag$1 = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag$1] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag$1] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
const baseFor$1 = baseFor;
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var stringTag = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
var numberTag = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
}
function isNil(value) {
  return value == null;
}
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
const merge$1 = merge;
function callEmit(funcs, ...args) {
  if (!funcs) {
    return;
  }
  if (Array.isArray(funcs)) {
    funcs.forEach((fn) => fn(...args));
  } else {
    return funcs(...args);
  }
}
function tryOnScopeDispose(fn) {
  if (!getCurrentScope()) {
    return false;
  }
  onScopeDispose(fn);
  return true;
}
function isNumeric(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}
function convertArray(value) {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
function convertCssPixel(value) {
  if (isNil(value)) {
    return "";
  }
  return typeof value === "string" ? value : `${value}px`;
}
const logWrapper = (location, args, log) => {
  log(`[@idux/${location}]:`, ...args);
};
const info = (location, ...args) => logWrapper(location, args, console.log);
const warn = (location, ...args) => logWrapper(location, args, console.warn);
const error = (location, ...args) => logWrapper(location, args, console.error);
const Logger = { info, warn, error };
const NoopFunction = () => {
};
function useKey() {
  var _a;
  const { vnode, uid } = getCurrentInstance();
  return (_a = vnode.key) != null ? _a : uid;
}
const TEMPLATE = "template";
const isComment = (node) => node.type === Comment;
const isFragment = (node) => node.type === Fragment;
const isTemplate = (node) => node.type === TEMPLATE;
const isText = (node) => node.type === Text;
function getValidNode(node, depth) {
  if (isComment(node)) {
    return;
  }
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children, depth - 1) : void 0;
  }
  return node;
}
function getFirstValidNode(nodes, maxDepth = 3) {
  return convertArray(nodes).find((node) => getValidNode(node, maxDepth));
}
function isEmptyNode(nodes) {
  return convertArray(nodes).every(
    (node) => !node || isComment(node) || isFragment(node) && node.children.length === 0 || isText(node) && node.children.trim() === ""
  );
}
function flattenNode(nodes, filterOptions = {}) {
  const result = [];
  convertArray(nodes).forEach((node) => {
    if (Array.isArray(node)) {
      result.push(...flattenNode(node, filterOptions));
    } else if (isFragment(node)) {
      result.push(...flattenNode(node.children, filterOptions));
    } else {
      const { empty = true, key } = filterOptions;
      if (empty && isEmptyNode(node)) {
        return;
      }
      const keys2 = convertArray(key);
      if (keys2.length && isVNode(node) && !keys2.some((key2) => node.type[key2])) {
        return;
      }
      result.push(node);
    }
  });
  return result;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function isSameUTCWeek(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var dateLeftStartOfWeek = startOfUTCWeek(dirtyDateLeft, options);
  var dateRightStartOfWeek = startOfUTCWeek(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "不到 1 秒",
    other: "不到 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分钟",
  lessThanXMinutes: {
    one: "不到 1 分钟",
    other: "不到 {{count}} 分钟"
  },
  xMinutes: {
    one: "1 分钟",
    other: "{{count}} 分钟"
  },
  xHours: {
    one: "1 小时",
    other: "{{count}} 小时"
  },
  aboutXHours: {
    one: "大约 1 小时",
    other: "大约 {{count}} 小时"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大约 1 个星期",
    other: "大约 {{count}} 个星期"
  },
  xWeeks: {
    one: "1 个星期",
    other: "{{count}} 个星期"
  },
  aboutXMonths: {
    one: "大约 1 个月",
    other: "大约 {{count}} 个月"
  },
  xMonths: {
    one: "1 个月",
    other: "{{count}} 个月"
  },
  aboutXYears: {
    one: "大约 1 年",
    other: "大约 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超过 1 年",
    other: "超过 {{count}} 年"
  },
  almostXYears: {
    one: "将近 1 年",
    other: "将近 {{count}} 年"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "内";
    } else {
      return result + "前";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
var dateFormats = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
var timeFormats = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatLong$1 = formatLong;
function checkWeek(date, baseDate, options) {
  var baseFormat = "eeee p";
  if (isSameUTCWeek(date, baseDate, options)) {
    return baseFormat;
  } else if (date.getTime() > baseDate.getTime()) {
    return "'下个'" + baseFormat;
  }
  return "'上个'" + baseFormat;
}
var formatRelativeLocale = {
  lastWeek: checkWeek,
  // days before yesterday, maybe in this week or last week
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: checkWeek,
  // days after tomorrow, maybe in this week or next week
  other: "PP p"
};
var formatRelative = function formatRelative2(token, date, baseDate, options) {
  var format = formatRelativeLocale[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const formatRelative$1 = formatRelative;
var eraValues = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一季", "第二季", "第三季", "第四季"],
  wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
var monthValues = {
  narrow: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
  abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
var dayValues = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
var dayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number.toString() + "日";
    case "hour":
      return number.toString() + "时";
    case "minute":
      return number.toString() + "分";
    case "second":
      return number.toString() + "秒";
    default:
      return "第 " + number.toString();
  }
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const localize$1 = localize;
var matchOrdinalNumberPattern = /^(第\s*)?\d+(日|时|分|秒)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
var parseQuarterPatterns = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const match$1 = match;
var locale = {
  code: "zh-CN",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const zhCN$1 = locale;
const zhCN = {
  type: "zh-CN",
  date: zhCN$1,
  datePicker: {
    today: "今天",
    ok: "确定",
    clear: "清除",
    month: "月",
    year: "年",
    monthSelect: "选择月份",
    yearSelect: "选择年份",
    monthFormat: "MMM",
    yearFormat: "yyyy年",
    previousMonth: "上个月",
    nextMonth: "下个月",
    previousYear: "上一年",
    nextYear: "下一年",
    previousDecade: "上一年代",
    nextDecade: "下一年代",
    datePlaceholder: "请选择日期",
    yearPlaceholder: "请选择年份",
    quarterPlaceholder: "请选择季度",
    monthPlaceholder: "请选择月份",
    weekPlaceholder: "请选择周",
    datetimePlaceholder: "请选择日期时间"
  },
  dateRangePicker: {
    datePlaceholder: ["开始日期", "结束日期"],
    weekPlaceholder: ["开始周", "结束周"],
    monthPlaceholder: ["开始月份", "结束月份"],
    quarterPlaceholder: ["开始季度", "结束季度"],
    yearPlaceholder: ["开始年份", "结束年份"],
    datetimePlaceholder: ["开始时间", "结束时间"],
    separator: "至",
    okText: "确定",
    cancelText: "取消"
  },
  empty: {
    description: "暂无数据"
  },
  modal: {
    cancelText: "取消",
    okText: "确定",
    justOkText: "我知道了"
  },
  popconfirm: {
    cancelText: "取消",
    okText: "确定"
  },
  pagination: {
    itemsPerPage: "每页",
    itemsSuffix: "项",
    jumpTo: "前往",
    page: "页",
    prev: "上一页",
    next: "下一页",
    prev5: "向前 5 页",
    next5: "向后 5 页",
    totalPrefix: "共",
    totalSuffix: "项"
  },
  select: {
    limitMessage: "该选择器的值不能超过 ${0} 项"
  },
  table: {
    expand: "展开行",
    collapse: "收起行",
    filterTitle: "筛选",
    filterConfirm: "确定",
    filterReset: "重置",
    filterEmptyText: "无筛选项",
    selectAll: "全选所有",
    selectInvert: "反选所有",
    selectNone: "清空所有",
    selectPageAll: "全选当页",
    selectPageInvert: "反选当页",
    sortDesc: "点击降序",
    sortAsc: "点击升序",
    sortCancel: "取消排序"
  },
  timePicker: {
    okText: "确定",
    placeholder: "请选择时间"
  },
  timeRangePicker: {
    okText: "确定",
    separator: "至",
    placeholder: ["起始时间", "结束时间"]
  },
  tour: {
    nextText: "下一步",
    prevText: "上一步",
    finishText: "开始体验"
  },
  transfer: {
    toSelect: "待选",
    selected: "已选",
    searchPlaceholder: ["搜索关键字", "搜索关键字"]
  },
  treeSelect: {
    expandAll: "展开全部",
    collapseAll: "收起全部"
  },
  upload: {
    uploading: "正在上传...",
    error: "上传失败",
    cancel: "取消上传",
    preview: "预览文件",
    remove: "删除文件",
    retry: "重新上传",
    download: "下载文件"
  }
};
const iconProps = {
  name: String,
  iconfont: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: [Boolean, Number, String],
    default: void 0
  },
  color: String,
  size: [String, Number]
};
const iconDefinitions = /* @__PURE__ */ new Map();
const iconCache = /* @__PURE__ */ new Map();
function clearSVGElement(el) {
  var _a;
  const children = el.childNodes;
  const length = children.length;
  for (let i = length - 1; i >= 0; i--) {
    const child = children[i];
    if (((_a = child.tagName) == null ? void 0 : _a.toLowerCase()) === "svg") {
      child.remove();
    }
  }
}
async function loadSVGElement(iconName, loadIconDynamically) {
  {
    if (removeIcons.includes(iconName)) {
      Logger.warn("components/icon", `The icon [${iconName}]  has been deprecated, please use another icon.`);
    }
    if (Object.keys(renameIcons).includes(iconName)) {
      Logger.warn(
        "components/icon",
        `The icon [${iconName}]  has been deprecated, please use [${renameIcons[iconName]}] instead.`
      );
    }
  }
  const cached = iconCache.get(iconName);
  if (cached) {
    const svg2 = await cached;
    if (svg2) {
      return svg2.cloneNode(true);
    } else {
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
  if (cached) {
    svg = await cached;
  }
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
    } else {
      Logger.warn("components/icon", `The icon [${iconName}] create failed.`);
    }
  }
  return svg;
}
async function loadIconDefinition(iconName, loadIconDynamically) {
  let icon = iconDefinitions.get(iconName);
  if (!icon) {
    if (loadIconDynamically) {
      const svg = await loadIconDynamically(iconName);
      if (validSVGString(svg)) {
        icon = { name: iconName, svg };
        iconDefinitions.set(iconName, icon);
      } else {
        Logger.warn("components/icon", `The dynamically loaded icon [${iconName}] is invalid.`);
        return;
      }
    } else {
      Logger.warn("components/icon", `The icon [${iconName}] load failed.`);
    }
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
const defaultSVGAttributes = {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "aria-hidden": "true"
};
function setSVGAttribute(svg, iconName) {
  Object.entries(defaultSVGAttributes).forEach(([key, value]) => {
    if (!svg.hasAttribute(key)) {
      svg.setAttribute(key, value);
    }
  });
  svg.setAttribute("data-icon", iconName);
}
function convertSVGNode(child) {
  const node = getFirstValidNode(child);
  if (!node || node.type !== "svg") {
    Logger.warn("components/icon", "The children must is svg element");
    return;
  }
  return cloneVNode(node, { ...defaultSVGAttributes, ...node.props });
}
const removeIcons = ["left-double", "right-double", "unexpand"];
const renameIcons = {
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
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-icon`);
    const config = useGlobalConfig("icon");
    const root2 = ref();
    onMounted(() => appendChild(props, config, root2.value));
    watch([() => props.name, () => props.iconfont], () => {
      const rootElement = root2.value;
      if (!rootElement) {
        return;
      }
      clearSVGElement(rootElement);
      appendChild(props, config, rootElement);
    });
    const classes = computed(() => {
      const {
        name,
        rotate
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${name}`]: !!name,
        [`${prefixCls}-spinning`]: rotate === true
      });
    });
    const style = computed(() => {
      const {
        rotate,
        color,
        size
      } = props;
      return {
        color,
        fontSize: convertCssPixel(size),
        transform: isNumeric(rotate) ? `rotate(${rotate}deg)` : void 0
      };
    });
    return () => {
      var _a;
      const {
        name
      } = props;
      if (name) {
        return createVNode("i", {
          "ref": root2,
          "class": classes.value,
          "style": style.value,
          "role": "img",
          "aria-label": name
        }, null);
      } else {
        return createVNode("i", {
          "ref": root2,
          "class": classes.value,
          "style": style.value,
          "role": "img"
        }, [convertSVGNode((_a = slots.default) == null ? void 0 : _a.call(slots))]);
      }
    };
  }
});
async function appendChild(props, config, rootElement) {
  const {
    name,
    iconfont
  } = props;
  if (name) {
    const svgElement = iconfont ? await loadSvgElementFormScript(name) : await loadSVGElement(name, config.loadIconDynamically);
    if (svgElement && name === props.name) {
      rootElement.appendChild(svgElement);
    }
  }
}
const IxIcon = Icon;
function numFormatter(value, precision) {
  const separator = ".";
  const numReg = /^(\d+)(\.(\d+))?$/;
  const numMatchRet = String(value).match(numReg);
  if (!numMatchRet) {
    return {
      value: String(value),
      int: "",
      decimal: ""
    };
  } else {
    const int = String(numMatchRet[1]);
    let decimal = String(numMatchRet[3] || "").slice(0, precision).padEnd(precision, "0");
    decimal = decimal.length > 0 ? `${separator}${decimal}` : "";
    return {
      value: `${int}${decimal}`,
      int,
      decimal
    };
  }
}
const defaultConfig = {
  common: {
    prefixCls: "ix",
    overlayZIndex: 1e3,
    theme: "default"
  },
  locale: zhCN,
  alert: {
    closable: false,
    icon: {
      success: "check-circle",
      error: "exclamation-circle",
      info: "bulb",
      warning: "info-circle",
      offline: "info-circle"
    }
  },
  anchor: {
    bounds: 5,
    hideLinkBall: false
  },
  avatar: {
    gap: 4,
    icon: "user",
    shape: "circle",
    size: "md"
  },
  backTop: {
    duration: 450,
    visibilityHeight: 400
  },
  badge: {
    showZero: false,
    dot: false,
    overflowCount: 99
  },
  button: {
    size: "md",
    waveless: false
  },
  card: {
    borderless: false,
    hoverable: false,
    size: "md"
  },
  carousel: {
    autoplayTime: 0,
    dotPlacement: "bottom",
    showArrow: false,
    trigger: "click"
  },
  cascader: {
    borderless: false,
    clearIcon: "close-circle",
    childrenKey: "children",
    expandIcon: "right",
    fullPath: true,
    getKey: "key",
    labelKey: "label",
    overlayMatchWidth: false,
    size: "md",
    suffix: "down"
  },
  checkbox: {
    size: "md",
    waveless: false
  },
  collapse: {
    accordion: false,
    borderless: false,
    expandIcon: "right",
    ghost: false,
    size: "md"
  },
  datePicker: {
    allowInput: false,
    borderless: false,
    clearable: false,
    clearIcon: "close-circle",
    size: "md",
    suffix: "calendar"
  },
  desc: {
    col: 3,
    colonless: false,
    labelAlign: "end",
    layout: "horizontal",
    size: "md"
  },
  divider: {
    dashed: false,
    labelPlacement: "center",
    plain: false,
    size: "md"
  },
  drawer: {
    closable: true,
    closeOnEsc: true,
    closeIcon: "close-filled",
    height: 256,
    mask: true,
    maskClosable: true,
    width: 480
  },
  dropdown: {
    autoAdjust: true,
    destroyOnHide: false,
    offset: [0, 4],
    placement: "bottomStart",
    showArrow: false,
    trigger: "hover"
  },
  empty: {},
  form: {
    colonless: false,
    labelAlign: "end",
    layout: "horizontal",
    size: "md",
    labelTooltipIcon: "question-circle",
    controlTooltipIcon: "info-circle"
  },
  icon: {},
  input: {
    borderless: false,
    clearable: false,
    clearIcon: "close-circle",
    size: "md",
    trim: false
  },
  inputNumber: {
    keyboard: true,
    size: "md"
  },
  list: {
    size: "md",
    borderless: true
  },
  loadingBar: {
    mask: false,
    animation: {
      loading: {
        duration: 3e3,
        progress: 80
      },
      finish: {
        duration: 300,
        progress: 100
      },
      error: {
        duration: 400,
        progress: 100
      }
    }
  },
  image: {
    preview: true
  },
  imageViewer: {
    loop: true,
    maskClosable: true,
    zoom: [0.5, 2]
  },
  menu: {
    getKey: "key",
    indent: 16,
    offset: [0, 8],
    suffix: "right",
    theme: "light"
  },
  message: {
    destroyOnHover: false,
    duration: 3e3,
    maxCount: 5,
    icon: {
      success: "check-circle-filled",
      error: "close-circle-filled",
      info: "info-circle-filled",
      warning: "exclamation-circle-filled",
      loading: "loading"
    }
  },
  modal: {
    animatable: true,
    centered: false,
    closable: true,
    closeIcon: "close-filled",
    closeOnEsc: true,
    mask: true,
    maskClosable: true
  },
  notification: {
    destroyOnHover: false,
    duration: 4500,
    maxCount: 5,
    offset: 24,
    placement: "topEnd"
  },
  pagination: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: false,
    showSizeChanger: false,
    showTitle: true,
    showTotal: true,
    simple: false,
    size: "md"
  },
  popconfirm: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: "top",
    trigger: "click",
    offset: [0, 4]
  },
  popover: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: "top",
    showArrow: true,
    trigger: "hover",
    closeIcon: "close",
    offset: [0, 4]
  },
  progress: {
    strokeLinecap: "round",
    size: "md",
    format: (percent) => percent + "%",
    icon: {
      success: "check",
      exception: "close"
    }
  },
  radio: {
    size: "md",
    waveless: false
  },
  rate: {
    allowHalf: false,
    clearable: false,
    count: 5,
    icon: "star-filled",
    size: "md"
  },
  result: {
    status: "info"
  },
  row: {
    wrap: true
  },
  select: {
    borderless: false,
    childrenKey: "children",
    getKey: "key",
    clearIcon: "close-circle",
    labelKey: "label",
    offset: [0, 4],
    overlayMatchWidth: true,
    size: "md",
    suffix: "down"
  },
  skeleton: {
    animated: true
  },
  space: {
    size: 8,
    wrap: true
  },
  spin: {
    tip: "",
    tipAlign: "vertical",
    size: "md"
  },
  statistic: {
    precision: 0,
    formatter: numFormatter
  },
  stepper: {
    clickable: false,
    labelPlacement: "end",
    size: "md"
  },
  switch: {
    size: "md"
  },
  tabs: {
    size: "md"
  },
  table: {
    autoHeight: false,
    borderless: true,
    childrenKey: "children",
    getKey: "key",
    size: "md",
    scrollToTopOnChange: true,
    pagination: {
      position: "bottomEnd"
    },
    columnBase: {
      align: "start",
      sortable: {
        nextTooltip: false,
        orders: ["ascend", "descend"]
      },
      filterable: {
        multiple: true,
        footer: true
      }
    },
    columnExpandable: {
      icon: "right"
    },
    columnSelectable: {
      showIndex: false
    },
    columnIndexable: {
      align: "center",
      customCell: ({ rowIndex, pageSize, pageIndex }) => (pageIndex - 1) * pageSize + rowIndex + 1
    }
  },
  tag: {},
  tagGroup: {
    gap: 8,
    wrap: true
  },
  textarea: {
    autoRows: false,
    clearable: false,
    clearIcon: "close-circle",
    resize: "vertical",
    showCount: false,
    size: "md",
    trim: false
  },
  timePicker: {
    borderless: false,
    clearable: true,
    clearIcon: "close-circle",
    size: "md",
    suffix: "clock-circle",
    allowInput: false,
    format: "HH:mm:ss"
  },
  transfer: {
    getKey: "key",
    clearable: true,
    clearIcon: "delete",
    showSelectAll: true
  },
  tooltip: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    offset: [0, 4],
    placement: "top",
    trigger: "hover"
  },
  tour: {
    animatable: true,
    gap: { offset: 4, radius: 2 },
    offset: [0, 4],
    mask: true,
    placement: "bottomStart",
    showArrow: true,
    scrollIntoViewOptions: true,
    closeOnClick: false,
    closeOnEsc: true,
    closable: true
  },
  tree: {
    autoHeight: false,
    blocked: false,
    childrenKey: "children",
    expandIcon: "right",
    draggableIcon: "holder",
    getKey: "key",
    labelKey: "label",
    showLine: false
  },
  treeSelect: {
    borderless: false,
    childrenKey: "children",
    clearIcon: "close-circle",
    labelKey: "label",
    getKey: "key",
    offset: [0, 4],
    overlayMatchWidth: true,
    size: "md",
    suffix: "down"
  },
  upload: {
    multiple: false,
    dragable: false,
    directory: false,
    name: "file",
    withCredentials: false,
    requestMethod: "post"
  },
  uploadFiles: {
    type: "text",
    icon: {
      file: "paper-clip",
      remove: "close",
      retry: "edit"
    }
  }
};
const tokens = Object.keys(defaultConfig).map((key) => [key, Symbol(key)]);
const tokenMap = new Map(tokens);
function useGlobalConfig(compName, config) {
  const token = tokenMap.get(compName);
  const currConfig = inject(token, defaultConfig[compName]);
  if (!config) {
    return currConfig;
  }
  const newConfig = reactive(merge$1(cloneDeep(currConfig), config));
  provide(token, newConfig);
  return [newConfig, (config2) => merge$1(newConfig, config2)];
}
function convertStringVNode(slots, props, keyOrParams, slotParams) {
  let labelSlot;
  let label;
  const isKey = isString(keyOrParams);
  const params = isKey ? slotParams : keyOrParams;
  if (isKey) {
    labelSlot = slots[keyOrParams];
    if (!labelSlot) {
      label = props[keyOrParams];
    }
  } else {
    labelSlot = slots;
    label = props;
  }
  return labelSlot ? labelSlot(params) : label;
}
const spaceProps = {
  align: String,
  block: {
    type: Boolean,
    default: void 0
  },
  justify: String,
  size: [Number, String, Array],
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
const flexGapSupported = supportsFlexGap();
const defaultSizeMap = {
  sm: "8px",
  md: "16px",
  lg: "24px"
};
var Space = /* @__PURE__ */ defineComponent({
  name: "IxSpace",
  props: spaceProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-space`);
    const config = useGlobalConfig("space");
    const wrap = computed(() => {
      var _a;
      return (_a = props.wrap) != null ? _a : config.wrap;
    });
    const mergedGaps = computed(() => {
      const {
        size = config.size
      } = props;
      const sizes = Array.isArray(size) ? size : [size, size];
      return sizes.map((size2) => defaultSizeMap[size2] || convertCssPixel(size2));
    });
    const classes = computed(() => {
      const {
        align,
        justify,
        block,
        vertical
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
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
      if (flexGapSupported) {
        return `gap: ${rowGap} ${columnGap}`;
      } else {
        return !props.vertical && wrap.value ? `margin-bottom: -${convertCssPixel(rowGap)}` : void 0;
      }
    });
    return () => {
      var _a;
      const nodes = flattenNode((_a = slots.default) == null ? void 0 : _a.call(slots));
      if (nodes.length === 0) {
        return;
      }
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
        if (separatorNode && index < lastIndex) {
          children.push(createVNode("div", {
            "key": `separator-${index}`,
            "class": `${prefixCls}-item-separator`,
            "style": style2
          }, [separatorNode]));
        }
      });
      return createVNode("div", {
        "class": classes.value,
        "style": style.value
      }, [children]);
    };
  }
});
const calcItemStyle = (mergedGaps, wrap, vertical, index, lastIndex) => {
  if (flexGapSupported) {
    return void 0;
  }
  const [rowGap, columnGap] = mergedGaps.value;
  if (vertical) {
    const marginBottom = index < lastIndex ? convertCssPixel(rowGap) : void 0;
    return {
      marginBottom
    };
  } else {
    const marginRight = index < lastIndex ? convertCssPixel(columnGap) : void 0;
    const paddingBottom = wrap.value ? convertCssPixel(rowGap) : void 0;
    return {
      marginRight,
      paddingBottom
    };
  }
};
const IxSpace = Space;
const defaultName$1 = "此项";
const zhCNMessages = {
  default: (_, control) => {
    var _a;
    return `${(_a = control.name) != null ? _a : ""}验证失败`;
  },
  required: (_, control) => {
    const { name = defaultName$1, example } = control;
    return `请输入${name}${example ? ", 例: " + example : ""}`;
  },
  requiredTrue: (_, control) => {
    const { name = defaultName$1 } = control;
    return `${name}必须为 'true'`;
  },
  email: (_, control) => {
    const { example } = control;
    return `请输入正确的邮箱格式${example ? ", 例: " + example : ""}`;
  },
  min: (err, __) => {
    return `请输入不小于 ${err.min} 的数字`;
  },
  max: (err, __) => {
    return `请输入不大于 ${err.max} 的数字`;
  },
  range: (err, __) => {
    return `请输入 ${err.min}-${err.max} 之间的数字`;
  },
  minLength: (err, __) => {
    const { minLength, isArray: isArray2 } = err;
    return isArray2 ? `请至少选择 ${minLength} 项` : `请至少输入 ${minLength} 个字符`;
  },
  maxLength: (err, __) => {
    const { maxLength, isArray: isArray2 } = err;
    return isArray2 ? `请至多选择 ${maxLength} 项` : `请至多输入 ${maxLength} 个字符`;
  },
  rangeLength: (err, __) => {
    const { minLength, maxLength, isArray: isArray2 } = err;
    return isArray2 ? `请选择 ${minLength}-${maxLength} 项` : `请输入 ${minLength}-${maxLength} 个字符`;
  },
  pattern: (_, control) => {
    const { example } = control;
    return `请输入正确的格式${example ? ", 例: " + example : ""}`;
  }
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const _Validators = class {
  static setMessages(messages, locale2) {
    _Validators.messages = mergedLocaleMessages(_Validators.messages, messages, locale2);
  }
  static getMessage(key) {
    return _Validators.messages[key];
  }
  static getError(key, control, errorContext = {}) {
    let message = void 0;
    const validMessage = _Validators.messages[key] || _Validators.messages.default;
    if (isFunction(validMessage)) {
      message = validMessage(errorContext, control);
    } else {
      message = validMessage;
    }
    return { ...errorContext, message };
  }
  static required(value, control) {
    if (isEmpty(value)) {
      return { required: _Validators.getError("required", control) };
    }
    return void 0;
  }
  static requiredTrue(value, control) {
    if (value === true) {
      return void 0;
    }
    return { requiredTrue: _Validators.getError("requiredTrue", control, { actual: value }) };
  }
  static email(value, control) {
    if (isEmpty(value) || emailRegexp.test(value)) {
      return void 0;
    }
    return { email: _Validators.getError("email", control, { actual: value }) };
  }
  static min(min) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min) {
        return void 0;
      }
      return { min: _Validators.getError("min", control, { min, actual: value }) };
    };
  }
  static max(max) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) <= max) {
        return void 0;
      }
      return { max: _Validators.getError("max", control, { max, actual: value }) };
    };
  }
  static range(min, max) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min && Number(value) <= max) {
        return void 0;
      }
      return { range: _Validators.getError("range", control, { min, max, actual: value }) };
    };
  }
  static minLength(minLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength) {
        return void 0;
      }
      return {
        minLength: _Validators.getError("minLength", control, {
          minLength,
          actual: value.length,
          isArray: isArray$1(value)
        })
      };
    };
  }
  static maxLength(maxLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) {
        return void 0;
      }
      return {
        maxLength: _Validators.getError("maxLength", control, {
          maxLength,
          actual: value.length,
          isArray: isArray$1(value)
        })
      };
    };
  }
  static rangeLength(minLength, maxLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength && value.length <= maxLength) {
        return void 0;
      }
      return {
        rangeLength: _Validators.getError("rangeLength", control, {
          minLength,
          maxLength,
          actual: value.length,
          isArray: isArray$1(value)
        })
      };
    };
  }
  static pattern(pattern) {
    if (!pattern) {
      return _Validators.nullValidator;
    }
    let regex;
    let regexStr;
    if (typeof pattern === "string") {
      regexStr = "";
      if (pattern.charAt(0) !== "^") {
        regexStr += "^";
      }
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== "$") {
        regexStr += "$";
      }
      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (value, control) => {
      if (isEmpty(value) || regex.test(value)) {
        return void 0;
      }
      return { pattern: _Validators.getError("pattern", control, { pattern: regexStr, actual: value }) };
    };
  }
  static nullValidator(_, _control) {
    return void 0;
  }
  static compose(validators) {
    if (!validators) {
      return void 0;
    }
    const presentValidators = validators.filter(isFunction);
    if (presentValidators.length == 0) {
      return void 0;
    }
    return (value, control) => mergeMessages(executeValidators(value, control, presentValidators));
  }
  static composeAsync(validators) {
    if (!validators) {
      return void 0;
    }
    const presentValidators = validators.filter(isFunction);
    if (presentValidators.length == 0) {
      return void 0;
    }
    return (value, control) => {
      const ValidateErrors = executeValidators(value, control, presentValidators);
      return Promise.all(ValidateErrors).then(mergeMessages);
    };
  }
};
let Validators = _Validators;
__publicField$2(Validators, "messages", mergedLocaleMessages({}, zhCNMessages, "zh-CN"));
function isEmpty(val) {
  return isNil(val) || (isString(val) || isArray$1(val)) && val.length === 0;
}
function hasLength(val) {
  return !isNil(val) && isNumber(val.length);
}
function executeValidators(value, control, validators) {
  return validators.map((validator) => validator(value, control));
}
function mergeMessages(validateErrors) {
  let res = {};
  validateErrors.forEach((errors) => {
    res = isNil(errors) ? res : { ...res, ...errors };
  });
  return Object.keys(res).length === 0 ? void 0 : res;
}
function mergedLocaleMessages(currMessages, newMessages, locale2) {
  if (!locale2) {
    return merge$1(currMessages, newMessages);
  }
  const messageWithLocale = {};
  Object.keys(newMessages).forEach((key) => {
    messageWithLocale[key] = { [locale2]: newMessages[key] };
  });
  return merge$1(currMessages, messageWithLocale);
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = convertArray(currentValidators);
  const validatorsToAdd = convertArray(validators);
  validatorsToAdd.forEach((v) => {
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return convertArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function isOptions(val) {
  return isPlainObject(val);
}
function toValidator(validator) {
  return isArray$1(validator) ? Validators.compose(validator) : validator;
}
function toAsyncValidator(asyncValidator) {
  return isArray$1(asyncValidator) ? Validators.composeAsync(asyncValidator) : asyncValidator;
}
let controlId = 0;
class AbstractControl {
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
  }
  get parent() {
    return this._parent;
  }
  get root() {
    let root2 = this;
    while (root2.parent) {
      root2 = root2.parent;
    }
    return root2;
  }
  get trigger() {
    var _a, _b, _c;
    return (_c = (_b = this._trigger) != null ? _b : (_a = this._parent) == null ? void 0 : _a.trigger) != null ? _c : "change";
  }
  reset() {
    if (this._controls.value) {
      this._forEachControls((control) => control.reset());
    } else {
      const currValue = this._valueRef.value;
      const initValue = this._calculateInitValue();
      if (currValue !== initValue) {
        this._valueRef.value = initValue;
      } else {
        this._validate();
      }
      this.markAsUnblurred();
      this.markAsPristine();
    }
  }
  async validate() {
    if (!this._disabled.value && this._controls.value) {
      const validates = [];
      this._forEachControls((control) => validates.push(control.validate()));
      if (validates.length > 0) {
        await Promise.all(validates);
      }
    }
    return this._validate();
  }
  disable() {
    this._disabled.value = true;
    this._errors.value = void 0;
    if (this._controls.value) {
      this._forEachControls((control) => control.disable());
    }
  }
  enable() {
    this._disabled.value = false;
    if (this._controls.value) {
      this._forEachControls((control) => control.enable());
    }
    this._validate();
  }
  markAsBlurred() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsBlurred());
    } else {
      this._blurred.value = true;
    }
    if (this.trigger === "blur") {
      this._validate();
    }
  }
  markAsUnblurred() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsUnblurred());
    } else {
      this._blurred.value = false;
    }
  }
  markAsDirty() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsDirty());
    } else {
      this._dirty.value = true;
    }
  }
  markAsPristine() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsPristine());
    } else {
      this._dirty.value = false;
    }
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
    if (isNil(path)) {
      return void 0;
    }
    const currPath = isString(path) ? path.split(".") : convertArray(path);
    if (currPath.length === 0) {
      return void 0;
    }
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  setErrors(errors, path) {
    var _a;
    if (!isNil(path)) {
      (_a = this.get(path)) == null ? void 0 : _a.setErrors(errors);
    } else {
      this._errors.value = errors;
    }
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
    return !!this.getError(errorCode, path);
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
  async _validate() {
    let newErrors = void 0;
    if (!this._disabled.value) {
      let value = void 0;
      if (this._composedValidators) {
        value = this.getValue();
        newErrors = this._composedValidators(value, this);
      }
      if (isNil(newErrors) && this._composedAsyncValidators) {
        if (!this._composedValidators) {
          value = this.getValue();
        }
        this._status.value = "validating";
        newErrors = await this._composedAsyncValidators(value, this);
      }
    }
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
      if (trigger) {
        this._trigger = trigger;
      }
      if (disabled) {
        if (isFunction(disabled)) {
          _disabled = disabled(this, true);
          this._disabledFn = disabled;
        } else {
          _disabled = true;
        }
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
      if (selfStatus === "valid") {
        return this._controlsStatus.value;
      }
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
    if (this._disabledFn) {
      nextTick(() => {
        watchEffect(() => {
          if (this._disabledFn(this, false)) {
            this.disable();
          } else {
            this.enable();
          }
        });
      });
    }
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
      if (errors) {
        status = "invalid";
      }
      this._forEachControls((control) => {
        if (control.status.value === "invalid") {
          controlsStatus = "invalid";
        }
      });
    }
    this._errors = shallowRef(errors);
    this._status = ref(status);
    this._controlsStatus = ref(controlsStatus);
    if (!disabled && status === "valid" && controlsStatus === "valid" && this._composedAsyncValidators) {
      value = this._validators ? value : this.getValue();
      this._status.value = "validating";
      this._composedAsyncValidators(value, this).then((asyncErrors) => {
        this._errors.value = asyncErrors;
        this._status.value = asyncErrors ? "invalid" : "valid";
      });
    }
  }
}
const isAbstractControl = (val) => {
  return val instanceof AbstractControl;
};
const FORMS_CONTROL_TOKEN = Symbol("cdk-forms-control");
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
  watch(
    [() => props[controlKey], parentControl],
    ([controlOrPath, pControl]) => {
      cleanWatch();
      if (isAbstractControl(controlOrPath)) {
        control.value = controlOrPath;
      } else if (!!pControl && !isNil(controlOrPath)) {
        watchStop = watch(
          pControl.controls,
          () => {
            const _control = pControl.get(controlOrPath);
            if (!_control) {
              Logger.warn("cdk/forms", `not find control by [${controlOrPath}]`);
            }
            control.value = _control;
          },
          { immediate: true }
        );
      }
    },
    { immediate: true }
  );
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
    valueStop = watch(
      currControl.valueRef,
      (value) => {
        accessor.value = value;
      },
      { immediate: true }
    );
    disabledStop = watch(
      currControl.disabled,
      (disabled) => {
        accessor.disabled = disabled;
      },
      { immediate: true }
    );
    accessor.setValue = (value, options) => currControl.setValue(value, { dirty: true, ...options });
    accessor.markAsBlurred = () => currControl.markAsBlurred();
  };
  const generateAccessorByProps = () => {
    const tempRef = shallowRef(props[valueKey]);
    tempValueWatchStop = watch(
      () => props[valueKey],
      (value) => tempRef.value = value
    );
    valueStop = watch(
      () => {
        var _a;
        return (_a = props[valueKey]) != null ? _a : tempRef.value;
      },
      (value) => {
        accessor.value = value;
      },
      { immediate: true }
    );
    disabledStop = watch(
      () => props[disabledKey],
      (disabled) => {
        accessor.disabled = disabled;
      },
      { immediate: true }
    );
    accessor.setValue = (value) => {
      if (value != toRaw(accessor.value)) {
        tempRef.value = value;
        callEmit(props[`onUpdate:${valueKey}`], value);
      }
    };
    accessor.markAsBlurred = NoopFunction;
  };
  watch(
    () => unref(control),
    (currControl) => {
      cleanWatch();
      if (currControl) {
        generateAccessorByControl(currControl);
      } else {
        generateAccessorByProps();
      }
    },
    { immediate: true }
  );
  tryOnScopeDispose(cleanWatch);
  return accessor;
}
function useAccessorAndControl(options) {
  const { controlKey, valueKey, disabledKey } = options != null ? options : {};
  const control = useControl(controlKey);
  const accessor = useAccessor(control, valueKey, disabledKey);
  return { accessor, control };
}
const FORM_TOKEN = Symbol("FORM_TOKEN");
const FORM_ITEM_TOKEN = Symbol("FORM_ITEM_TOKEN");
function useFormItemRegister(control) {
  const context = inject(FORM_ITEM_TOKEN, null);
  if (context) {
    const key = useKey();
    const { registerControl, unregisterControl } = context;
    registerControl(key, control);
    onBeforeUnmount(() => unregisterControl(key));
  }
}
function useFormElement() {
  const elementRef = ref();
  const focus = (options) => {
    var _a;
    (_a = elementRef.value) == null ? void 0 : _a.focus(options);
  };
  const blur = () => {
    var _a;
    return (_a = elementRef.value) == null ? void 0 : _a.blur();
  };
  return { elementRef, focus, blur };
}
function useFormSize(props, config) {
  const formContext = inject(FORM_TOKEN, null);
  return computed(() => {
    var _a, _b;
    return (_b = (_a = props.size) != null ? _a : formContext == null ? void 0 : formContext.size.value) != null ? _b : config.size;
  });
}
const switchProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  checked: { type: Boolean, default: void 0 },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  labels: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  size: String,
  "onUpdate:checked": [Function, Array],
  onChange: [Function, Array],
  onBlur: [Function, Array],
  onFocus: [Function, Array]
};
var Switch = /* @__PURE__ */ defineComponent({
  name: "IxSwitch",
  props: switchProps,
  setup(props, {
    expose,
    slots
  }) {
    const common = useGlobalConfig("common");
    const config = useGlobalConfig("switch");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-switch`);
    const mergedSize = useFormSize(props, config);
    const {
      elementRef,
      focus,
      blur
    } = useFormElement();
    expose({
      focus,
      blur
    });
    const {
      accessor,
      control
    } = useAccessorAndControl({
      valueKey: "checked"
    });
    useFormItemRegister(control);
    const isChecked = computed(() => accessor.value);
    const isDisabled = computed(() => accessor.disabled);
    const handleClick = () => {
      if (isDisabled.value || props.loading) {
        return;
      }
      const oldValue = accessor.value;
      const newValue = !oldValue;
      accessor.setValue(newValue);
      callEmit(props.onChange, newValue, oldValue);
    };
    const handleFocus = (evt) => {
      callEmit(props.onFocus, evt);
    };
    const handleBlur = (evt) => {
      accessor.markAsBlurred();
      callEmit(props.onBlur, evt);
    };
    const classes = computed(() => {
      const {
        loading
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-checked`]: isChecked.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-${mergedSize.value}`]: true
      });
    });
    onMounted(() => props.autofocus && focus());
    return () => {
      var _a, _b;
      const checked = isChecked.value;
      const label = (_b = (_a = slots.label) == null ? void 0 : _a.call(slots, {
        checked
      })) != null ? _b : props.labels[checked ? 0 : 1];
      const prefixCls = mergedPrefixCls.value;
      return createVNode("button", {
        "ref": elementRef,
        "type": "button",
        "class": classes.value,
        "onClick": handleClick,
        "onFocus": handleFocus,
        "onBlur": handleBlur
      }, [props.loading && createVNode("span", {
        "class": `${prefixCls}-loading-icon`
      }, [createVNode(IxIcon, {
        "name": "loading"
      }, null)]), createVNode("span", {
        "class": `${prefixCls}-label`
      }, [label])]);
    };
  }
});
const IxSwitch = Switch;
export {
  IxSpace as I,
  IxSwitch as a
};
