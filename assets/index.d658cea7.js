import { p as isVNode, F as Fragment, C as Comment, T as Text, q as getCurrentScope, t as onScopeDispose, d as defineComponent, b as computed, r as ref, e as onMounted, w as watch, v as normalizeClass, l as createVNode, x as cloneVNode, i as inject, y as reactive, z as provide, A as getCurrentInstance, s as shallowRef, u as unref, B as toRaw, D as nextTick, g as watchEffect, f as onBeforeUnmount } from "./_plugin-vue_export-helper.eb5450ce.js";
import { i as isArray, a as isObjectLike, b as baseGetTag, c as isNil, m as merge, d as cloneDeep, e as isFunction, f as isPlainObject } from "./setup.22b62e4e.js";
var stringTag = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
var numberTag = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
}
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
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
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
Object.freeze({});
Object.freeze([]);
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
      const keys = convertArray(key);
      if (keys.length && isVNode(node) && !keys.some((key2) => node.type[key2])) {
        return;
      }
      result.push(node);
    }
  });
  return result;
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
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
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
    return new Date(NaN);
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
    one: "\u4E0D\u5230 1 \u79D2",
    other: "\u4E0D\u5230 {{count}} \u79D2"
  },
  xSeconds: {
    one: "1 \u79D2",
    other: "{{count}} \u79D2"
  },
  halfAMinute: "\u534A\u5206\u949F",
  lessThanXMinutes: {
    one: "\u4E0D\u5230 1 \u5206\u949F",
    other: "\u4E0D\u5230 {{count}} \u5206\u949F"
  },
  xMinutes: {
    one: "1 \u5206\u949F",
    other: "{{count}} \u5206\u949F"
  },
  xHours: {
    one: "1 \u5C0F\u65F6",
    other: "{{count}} \u5C0F\u65F6"
  },
  aboutXHours: {
    one: "\u5927\u7EA6 1 \u5C0F\u65F6",
    other: "\u5927\u7EA6 {{count}} \u5C0F\u65F6"
  },
  xDays: {
    one: "1 \u5929",
    other: "{{count}} \u5929"
  },
  aboutXWeeks: {
    one: "\u5927\u7EA6 1 \u4E2A\u661F\u671F",
    other: "\u5927\u7EA6 {{count}} \u4E2A\u661F\u671F"
  },
  xWeeks: {
    one: "1 \u4E2A\u661F\u671F",
    other: "{{count}} \u4E2A\u661F\u671F"
  },
  aboutXMonths: {
    one: "\u5927\u7EA6 1 \u4E2A\u6708",
    other: "\u5927\u7EA6 {{count}} \u4E2A\u6708"
  },
  xMonths: {
    one: "1 \u4E2A\u6708",
    other: "{{count}} \u4E2A\u6708"
  },
  aboutXYears: {
    one: "\u5927\u7EA6 1 \u5E74",
    other: "\u5927\u7EA6 {{count}} \u5E74"
  },
  xYears: {
    one: "1 \u5E74",
    other: "{{count}} \u5E74"
  },
  overXYears: {
    one: "\u8D85\u8FC7 1 \u5E74",
    other: "\u8D85\u8FC7 {{count}} \u5E74"
  },
  almostXYears: {
    one: "\u5C06\u8FD1 1 \u5E74",
    other: "\u5C06\u8FD1 {{count}} \u5E74"
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
      return result + "\u5185";
    } else {
      return result + "\u524D";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
var dateFormats = {
  full: "y'\u5E74'M'\u6708'd'\u65E5' EEEE",
  long: "y'\u5E74'M'\u6708'd'\u65E5'",
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
    return "'\u4E0B\u4E2A'" + baseFormat;
  }
  return "'\u4E0A\u4E2A'" + baseFormat;
}
var formatRelativeLocale = {
  lastWeek: checkWeek,
  yesterday: "'\u6628\u5929' p",
  today: "'\u4ECA\u5929' p",
  tomorrow: "'\u660E\u5929' p",
  nextWeek: checkWeek,
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
  narrow: ["\u524D", "\u516C\u5143"],
  abbreviated: ["\u524D", "\u516C\u5143"],
  wide: ["\u516C\u5143\u524D", "\u516C\u5143"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["\u7B2C\u4E00\u5B63", "\u7B2C\u4E8C\u5B63", "\u7B2C\u4E09\u5B63", "\u7B2C\u56DB\u5B63"],
  wide: ["\u7B2C\u4E00\u5B63\u5EA6", "\u7B2C\u4E8C\u5B63\u5EA6", "\u7B2C\u4E09\u5B63\u5EA6", "\u7B2C\u56DB\u5B63\u5EA6"]
};
var monthValues = {
  narrow: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"],
  abbreviated: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
  wide: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"]
};
var dayValues = {
  narrow: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
  short: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
  abbreviated: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
  wide: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"]
};
var dayPeriodValues = {
  narrow: {
    am: "\u4E0A",
    pm: "\u4E0B",
    midnight: "\u51CC\u6668",
    noon: "\u5348",
    morning: "\u65E9",
    afternoon: "\u4E0B\u5348",
    evening: "\u665A",
    night: "\u591C"
  },
  abbreviated: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  },
  wide: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "\u4E0A",
    pm: "\u4E0B",
    midnight: "\u51CC\u6668",
    noon: "\u5348",
    morning: "\u65E9",
    afternoon: "\u4E0B\u5348",
    evening: "\u665A",
    night: "\u591C"
  },
  abbreviated: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  },
  wide: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number.toString() + "\u65E5";
    case "hour":
      return number.toString() + "\u65F6";
    case "minute":
      return number.toString() + "\u5206";
    case "second":
      return number.toString() + "\u79D2";
    default:
      return "\u7B2C " + number.toString();
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
    today: "\u4ECA\u5929",
    ok: "\u786E\u5B9A",
    clear: "\u6E05\u9664",
    month: "\u6708",
    year: "\u5E74",
    monthSelect: "\u9009\u62E9\u6708\u4EFD",
    yearSelect: "\u9009\u62E9\u5E74\u4EFD",
    monthFormat: "MMM",
    yearFormat: "yyyy\u5E74",
    previousMonth: "\u4E0A\u4E2A\u6708",
    nextMonth: "\u4E0B\u4E2A\u6708",
    previousYear: "\u4E0A\u4E00\u5E74",
    nextYear: "\u4E0B\u4E00\u5E74",
    previousDecade: "\u4E0A\u4E00\u5E74\u4EE3",
    nextDecade: "\u4E0B\u4E00\u5E74\u4EE3",
    datePlaceholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
    yearPlaceholder: "\u8BF7\u9009\u62E9\u5E74\u4EFD",
    quarterPlaceholder: "\u8BF7\u9009\u62E9\u5B63\u5EA6",
    monthPlaceholder: "\u8BF7\u9009\u62E9\u6708\u4EFD",
    weekPlaceholder: "\u8BF7\u9009\u62E9\u5468",
    datetimePlaceholder: "\u8BF7\u9009\u62E9\u65E5\u671F\u65F6\u95F4"
  },
  dateRangePicker: {
    datePlaceholder: ["\u5F00\u59CB\u65E5\u671F", "\u7ED3\u675F\u65E5\u671F"],
    weekPlaceholder: ["\u5F00\u59CB\u5468", "\u7ED3\u675F\u5468"],
    monthPlaceholder: ["\u5F00\u59CB\u6708\u4EFD", "\u7ED3\u675F\u6708\u4EFD"],
    quarterPlaceholder: ["\u5F00\u59CB\u5B63\u5EA6", "\u7ED3\u675F\u5B63\u5EA6"],
    yearPlaceholder: ["\u5F00\u59CB\u5E74\u4EFD", "\u7ED3\u675F\u5E74\u4EFD"],
    datetimePlaceholder: ["\u5F00\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"],
    separator: "\u81F3",
    okText: "\u786E\u5B9A",
    cancelText: "\u53D6\u6D88"
  },
  empty: {
    description: "\u6682\u65E0\u6570\u636E"
  },
  modal: {
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A",
    justOkText: "\u6211\u77E5\u9053\u4E86"
  },
  popconfirm: {
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A"
  },
  pagination: {
    itemsPerPage: "\u6BCF\u9875",
    itemsSuffix: "\u9879",
    jumpTo: "\u524D\u5F80",
    page: "\u9875",
    prev: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875",
    prev5: "\u5411\u524D 5 \u9875",
    next5: "\u5411\u540E 5 \u9875",
    totalPrefix: "\u5171",
    totalSuffix: "\u9879"
  },
  select: {
    limitMessage: "\u8BE5\u9009\u62E9\u5668\u7684\u503C\u4E0D\u80FD\u8D85\u8FC7 ${0} \u9879"
  },
  table: {
    expand: "\u5C55\u5F00\u884C",
    collapse: "\u6536\u8D77\u884C",
    filterTitle: "\u7B5B\u9009",
    filterConfirm: "\u786E\u5B9A",
    filterReset: "\u91CD\u7F6E",
    filterEmptyText: "\u65E0\u7B5B\u9009\u9879",
    selectAll: "\u5168\u9009\u6240\u6709",
    selectInvert: "\u53CD\u9009\u6240\u6709",
    selectNone: "\u6E05\u7A7A\u6240\u6709",
    selectPageAll: "\u5168\u9009\u5F53\u9875",
    selectPageInvert: "\u53CD\u9009\u5F53\u9875",
    sortDesc: "\u70B9\u51FB\u964D\u5E8F",
    sortAsc: "\u70B9\u51FB\u5347\u5E8F",
    sortCancel: "\u53D6\u6D88\u6392\u5E8F"
  },
  timePicker: {
    okText: "\u786E\u5B9A",
    placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4"
  },
  timeRangePicker: {
    okText: "\u786E\u5B9A",
    separator: "\u81F3",
    placeholder: ["\u8D77\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"]
  },
  transfer: {
    toSelect: "\u5F85\u9009",
    selected: "\u5DF2\u9009",
    searchPlaceholder: ["\u641C\u7D22\u5173\u952E\u5B57", "\u641C\u7D22\u5173\u952E\u5B57"]
  },
  treeSelect: {
    expandAll: "\u5C55\u5F00\u5168\u90E8",
    collapseAll: "\u6536\u8D77\u5168\u90E8"
  },
  upload: {
    uploading: "\u6B63\u5728\u4E0A\u4F20...",
    error: "\u4E0A\u4F20\u5931\u8D25",
    cancel: "\u53D6\u6D88\u4E0A\u4F20",
    preview: "\u9884\u89C8\u6587\u4EF6",
    remove: "\u5220\u9664\u6587\u4EF6",
    retry: "\u91CD\u65B0\u4E0A\u4F20",
    download: "\u4E0B\u8F7D\u6587\u4EF6"
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
var Icon = /* @__PURE__ */ defineComponent({
  name: "IxIcon",
  props: iconProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-icon`);
    const config = useGlobalConfig("icon");
    const root = ref();
    onMounted(() => appendChild(props, config, root.value));
    watch([() => props.name, () => props.iconfont], () => {
      const rootElement = root.value;
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
          "ref": root,
          "class": classes.value,
          "style": style.value,
          "role": "img",
          "aria-label": name
        }, null);
      } else {
        return createVNode("i", {
          "ref": root,
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
      error: "info-circle",
      info: "bulb",
      warning: "exclamation-circle",
      offline: "exclamation-circle"
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
    closeIcon: "dialog-close",
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
    centered: false,
    closable: true,
    closeIcon: "dialog-close",
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
    clearIcon: "clear",
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
  const newConfig = reactive(merge(cloneDeep(currConfig), config));
  provide(token, newConfig);
  return [newConfig, (config2) => merge(newConfig, config2)];
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
function useKey() {
  var _a;
  const { vnode, uid } = getCurrentInstance();
  return (_a = vnode.key) != null ? _a : uid;
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
const defaultName$1 = "\u6B64\u9879";
const zhCNMessages = {
  default: (_, control) => {
    var _a;
    return `${(_a = control.name) != null ? _a : ""}\u9A8C\u8BC1\u5931\u8D25`;
  },
  required: (_, control) => {
    const { name = defaultName$1, example } = control;
    return `\u8BF7\u8F93\u5165${name}${example ? ", \u4F8B: " + example : ""}`;
  },
  requiredTrue: (_, control) => {
    const { name = defaultName$1 } = control;
    return `${name}\u5FC5\u987B\u4E3A 'true'`;
  },
  email: (_, control) => {
    const { example } = control;
    return `\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u683C\u5F0F${example ? ", \u4F8B: " + example : ""}`;
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
    return `\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u683C\u5F0F${example ? ", \u4F8B: " + example : ""}`;
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
          isArray: isArray(value)
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
          isArray: isArray(value)
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
          isArray: isArray(value)
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
  return isNil(val) || (isString(val) || isArray(val)) && val.length === 0;
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
    return merge(currMessages, newMessages);
  }
  const messageWithLocale = {};
  Object.keys(newMessages).forEach((key) => {
    messageWithLocale[key] = { [locale2]: newMessages[key] };
  });
  return merge(currMessages, messageWithLocale);
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
  return isArray(validator) ? Validators.compose(validator) : validator;
}
function toAsyncValidator(asyncValidator) {
  return isArray(asyncValidator) ? Validators.composeAsync(asyncValidator) : asyncValidator;
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
    let root = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
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
          this._disabled.value = this._disabledFn(this, false);
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
  IxSwitch as I,
  IxSpace as a
};
