import _typeof from '@babel/runtime/helpers/typeof';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';

/**
 * 获取表示对象原始类型的字符串
 * @param {*} o - 需要查询的字符
 *  @returns {string}
 * */
function getProtoStr(o) {
  return Object.prototype.toString.call(o);
}
/**
 * 检测是否为数组
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }

  return getProtoStr(arg) === '[object Array]';
}
function isTruthyArray(arg) {
  if (!isArray(arg)) return false;
  return arg.length !== 0;
}
/**
 * 检测是否为数字且非NAN
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isNumber(arg) {
  return typeof arg === 'number' && !isNaN(arg);
}
function isWeakNumber(arg) {
  return isNumber(Number(arg));
}
/**
 * 检测是否为字符串
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isString(arg) {
  return typeof arg === 'string';
}
/**
 * 检测是否为整数
 * @param {*} value - 需待查询的对象
 * @returns {boolean}
 * */

function isInt(value) {
  if (isNaN(value) || isString(value)) {
    return false;
  }

  var x = parseFloat(value);
  return (x | 0) === x;
}
/**
 * 检测是否为symbol
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isSymbol(arg) {
  return _typeof(arg) === 'symbol';
}
/**
 * 检测是不是原始类型, null、string、boolean、number、symbol、undefined
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
/**
 * 检测是否为Error对象
 * @param {*} e - 需待查询的对象
 * @returns {boolean}
 * */

function isError(e) {
  return getProtoStr(e) === '[object Error]' || e instanceof Error;
}
/**
 * 检测是否为对象
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isObject(arg) {
  return getProtoStr(arg) === '[object Object]';
}
/**
 * 检测是否为DOM
 * @param {*} o - 需待查询的对象
 * @returns {boolean}
 * */

function isDom(o) {
  if (!o) {
    return false;
  }

  if (!o.querySelectorAll || !o.querySelector) {
    return false;
  }

  if (isObject(document) && o === document) {
    return true;
  }

  if ((typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object') {
    return o instanceof HTMLElement;
  } else {
    return o && _typeof(o) === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
  }
}
/**
 * 检测是否为正则
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isRegExp(arg) {
  return getProtoStr(arg) === '[object RegExp]';
}
/**
 * 检测是否为数组
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isFunction(arg) {
  return typeof arg === 'function';
}
/**
 * 检测是否为日期对象
 * @param {*} d - 需待查询的对象
 * @returns {boolean}
 * */

function isDate(d) {
  return getProtoStr(d) === '[object Date]';
}
/**
 * 检测是否为布尔值
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
/**
 * 检测是否为Null
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isNull(arg) {
  return arg === null;
}
/**
 * 检测是否为undefined
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isUndefined(arg) {
  return arg === void 0;
}
/**
 * 检测是否为null/undefined
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isNullOrUndefined(arg) {
  return arg == null;
}
/**
 * 检测传入对象是否为: undefined、null、''、NaN
 *
 * */

function isTrueEmpty(obj) {
  if (obj === undefined || obj === null || obj === '') return true;
  return !!(isNumber(obj) && isNaN(obj));
}
/* 检测传入对象是否为: undefined, null ,'', NaN, [], {}, 0, false  */

function isEmpty(obj) {
  if (isTrueEmpty(obj)) return true;

  if (isRegExp(obj)) {
    return false;
  } else if (isDate(obj)) {
    return false;
  } else if (isError(obj)) {
    return false;
  } else if (isArray(obj)) {
    return obj.length === 0;
  } else if (isString(obj)) {
    return obj.length === 0;
  } else if (isNumber(obj)) {
    return obj === 0;
  } else if (isBoolean(obj)) {
    return !obj;
  } else if (isObject(obj)) {
    for (var key in obj) {
      return false;
    }

    return true;
  }

  return false;
}
function isNumerical(numLike) {
  return !isNaN(Number(numLike));
}
function isTruthyOrZero(arg) {
  return !!arg || arg === 0;
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function padSingleNumber(number) {
  if (number < 1) {
    return '00';
  }

  if (number < 10) {
    return '0' + String(number);
  }

  return String(number);
}
/* 以指定规则格式化字符 */

var validateFormatString = /^(\s?\d\s?,?)+$/;
var defaultConfig$1 = {
  delimiter: ' ',
  repeat: false,
  lastRepeat: false,
  reverse: false
};

function getPatterns(str, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _defaultConfig$option = _objectSpread$3(_objectSpread$3({}, defaultConfig$1), options),
      repeat = _defaultConfig$option.repeat,
      lastRepeat = _defaultConfig$option.lastRepeat,
      reverse = _defaultConfig$option.reverse;

  if (!validateFormatString.test(pattern)) {
    console.warn("invalid pattern: ".concat(pattern, ", must match the /^[\\s?\\d\\s?,?]+$/ rule"));
    return;
  } // 生成模式数组


  var patterns = pattern.split(',').map(function (p) {
    return p.trim();
  }).filter(function (p) {
    return !!p;
  });
  if (!patterns.length) return; // 字符转为数组方便操作

  var strArr = reverse ? str.split('').reverse() : str.split(''); // repeat处理

  if (repeat || lastRepeat) {
    // 传入模式能匹配到的最大长度
    var maxLength = patterns.reduce(function (prevIndex, index) {
      return prevIndex + Number(index);
    }, 0); // 需要额外填充的模式长度

    var fillLength; // 模式组最后一位，用于lastRepeat

    var lastPatter = Number(patterns[patterns.length - 1]);

    if (repeat) {
      // (字符长度 - 最大匹配长度) / 最大匹配长度
      fillLength = Math.ceil((strArr.length - maxLength) / maxLength);
    }

    if (lastRepeat) {
      // (字符长度 - 最大匹配长度) / 最后一位匹配符能匹配的长度
      fillLength = Math.ceil((strArr.length - maxLength) / lastPatter);
    }

    var originArr = lastRepeat ? [lastPatter] : _toConsumableArray(patterns);
    Array.from({
      length: fillLength
    }).forEach(function () {
      patterns = [].concat(_toConsumableArray(patterns), _toConsumableArray(originArr));
    });
  }

  return {
    patterns: patterns,
    strArr: strArr
  };
}

function formatString(str, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opt = _objectSpread$3(_objectSpread$3({}, defaultConfig$1), options);

  var patternMeta = getPatterns(str, pattern, opt);
  if (!patternMeta) return;
  var patterns = patternMeta.patterns,
      strArr = patternMeta.strArr;
  patterns.reduce(function (prevPattern, _pattern, ind) {
    var currentIndex = prevPattern + Number(_pattern); // 替换位置为 前面所有pattern + 当前pattern + 已匹配次数

    var replaceIndex = currentIndex + ind;

    if (replaceIndex < strArr.length) {
      strArr.splice(replaceIndex, 0, opt.delimiter);
    }

    return currentIndex;
  }, 0);
  return opt.reverse ? strArr.reverse().join('') : strArr.join('');
}
function unFormatString(str, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opt = _objectSpread$3(_objectSpread$3({}, defaultConfig$1), options);

  var delimiter = opt.delimiter;
  var patternMeta = getPatterns(str, pattern, opt);
  if (!patternMeta) return;
  var patterns = patternMeta.patterns,
      strArr = patternMeta.strArr;
  patterns.reduce(function (prev, pt) {
    var index = Number(pt) + prev;
    /* 只在字符首位匹配时才执行替换, 在某些场景会有用（fr的input处理双向绑定时） */

    if (strArr[index] === delimiter[0]) {
      strArr.splice(index, delimiter.length);
    }

    return index;
  }, 0);
  return opt.reverse ? strArr.reverse().join('') : strArr.join('');
}
function getFirstTruthyOrZero() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var arg = _args[_i];

    if (isTruthyOrZero(arg)) {
      return arg;
    }
  }

  return false;
}
function vie(arg) {
  var feedback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  return isTruthyOrZero(arg) ? arg : feedback;
}

function parseDate(date) {
  var d = date;

  if (typeof date === 'string') {
    d = date.replace(/-/g, '/'); // Safari无法解析 2020-01-01 格式的日期
  }

  d = new Date(d); // 处理Invalid Date

  if (d instanceof Date && isNaN(d.getTime())) {
    return null;
  }

  return d;
}
function datetime() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';
  var d = parseDate(date);

  if (!d) {
    return '';
  }

  var fn = function fn(d) {
    return ('0' + d).slice(-2);
  };

  var formats = {
    YY: String(d.getFullYear() + 1).slice(2),
    YYYY: d.getFullYear(),
    MM: fn(d.getMonth() + 1),
    DD: fn(d.getDate()),
    hh: fn(d.getHours()),
    mm: fn(d.getMinutes()),
    ss: fn(d.getSeconds())
  };
  return format.replace(/([a-z])\1+/gi, function (a) {
    return formats[a] || a;
  });
}
var oneMS = 100;
var oneS = oneMS * 10;
var oneM = 60 * oneS;
var oneH = 60 * oneM;
var oneD = 24 * oneH;
function getDateCountDown(date) {
  var dt = parseDate(date);

  if (!dt) {
    return {
      ms: '00',
      s: '00',
      m: '00',
      h: '00',
      d: '00',
      timeOut: true
    };
  }

  var start = Date.now();
  var end = dt.getTime();
  var diff = end - start;

  if (diff < 0) {
    return getDateCountDown();
  }

  var fr = Math.floor; // h、m、s 用单位总数取余就是该单位对应的ms，除单位总数获得单位

  var d = fr(diff / oneD);
  var h = fr(diff % oneD / oneH);
  var m = fr(diff % oneH / oneM);
  var s = fr(diff % oneM / oneS);
  var ms = fr(diff % oneMS);
  return {
    d: padSingleNumber(d),
    h: padSingleNumber(h),
    m: padSingleNumber(m),
    s: padSingleNumber(s),
    ms: padSingleNumber(ms),
    timeOut: false
  };
}
function getDateStringFirst() {
  var dataString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!dataString) return '';
  return dataString.split(' ')[0];
}
function isBetweenDate(startDate, endDate, currentDate) {
  var s = parseDate(startDate);
  var e = parseDate(endDate);
  if (!s || !e) return false;
  var c = currentDate ? parseDate(currentDate) : new Date();
  return c <= e && c >= s;
}

/**
 * 收集指定对象内带name属性的所有输入控件(input,select,textarea)的值，并按一定规则整合
 * checkbox: 选中值的value组成的数组，没有的话返回 []
 * radio: 选中项的value，没有value的话作为默认行为浏览器会返回 "on"
 * file: 选择的文件组成的数组，没有的话返回 []
 * 其他: 表单元素的value属性值
 * @param {Element} el
 * @returns {object}
 */

function form2obj(el) {
  if (!isDom(el)) {
    console.error('Please pass in the dom element');
    return;
  }

  if (!el.querySelectorAll) {
    console.error('The passed in element does not support the querySelectorAll API');
    return;
  }

  var tempObj = {};
  var inputs = el.querySelectorAll('input[name],select[name],textarea[name]');
  inputs = Array.prototype.slice.call(inputs);
  inputs.forEach(function (v) {
    // name => ""
    if (!v.name) return;

    if (v.type === 'radio' || v.type === 'checkbox') {
      if (!tempObj[v.name]) tempObj[v.name] = v.type === 'checkbox' ? [] : '';
    }

    if (v.type === 'radio') {
      v.checked && (tempObj[v.name] = v.value);
    } else if (v.type === 'checkbox') {
      v.checked && tempObj[v.name].push(v.value);
    } else if (v.type === 'file') {
      tempObj[v.name] = Array.prototype.slice.call(v.files);
    } else {
      tempObj[v.name] = v.value;
    }
  });
  return tempObj;
}
/**
 * 将一个object转为对应键值对的 FormData 对象
 * @param {object} obj
 * @returns {FormData}
 */

function obj2FormData(obj) {
  var keys = Object.keys(obj);
  var form = new FormData();
  keys.forEach(function (key) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(function (val) {
        // form.append(`${key}[]`, val)
        form.append(key, val);
      });
    } else if (obj[key]) {
      form.append(key, obj[key]);
    }
  });
  return form;
}

var shakeFalsy = function shakeFalsy(source) {
  Object.keys(source).forEach(function (key) {
    var val = source[key];

    if (!val && val !== 0) {
      delete source[key];
    }
  });
  return source;
};

function pickOrOmit(obj, props, isPick) {
  if (isString(props)) {
    props = props.split(',').map(function (key) {
      return key.trim();
    });
  }

  var keys = Object.keys(obj);
  var result = {};
  keys.forEach(function (item) {
    var cond = isPick ? props.indexOf(item) !== -1 : props.indexOf(item) === -1;

    if (cond) {
      result[item] = obj[item];
    }
  });
  return result;
}

function omit(obj, props) {
  return pickOrOmit(obj, props);
}
function pick(obj, props) {
  return pickOrOmit(obj, props, true);
}
/** 根据NamePath在对象中获取值` */

function getNamePathValue(obj, name) {
  if (isString(name)) {
    return obj === null || obj === void 0 ? void 0 : obj[name];
  }

  if (isArray(name) && name.length) {
    return name.reduce(function (p, i) {
      return p === null || p === void 0 ? void 0 : p[i];
    }, obj);
  }
}
/** 将 ['user', 'name'], ['list', '0', 'title'] 格式的字段数组转换为字符串  */

function stringifyNamePath(name) {
  if (isString(name)) return name;
  return name.reduce(function (p, i) {
    if (isNumber(Number(i))) {
      return "".concat(p, "[").concat(i, "]");
    }

    if (isString(i)) {
      return p.length ? "".concat(p, ".").concat(i) : i;
    }

    return p;
  }, '');
}
/** 在通过name在obj上设置值 */

function setNamePathValue(obj, name, val) {
  if (isString(name)) {
    obj[name] = val;
  }

  if (isArray(name) && name.length) {
    var lastObj = obj;

    for (var i = 0; i < name.length; i++) {
      var n = name[i]; // 当前name

      var nextN = name[i + 1]; // 下一个name

      var hasNextN = nextN !== undefined; // 是否有下个

      if (!hasNextN) {
        lastObj[n] = val;
        return;
      } // 确保要操作的对象存在


      if (isNumerical(nextN)) {
        if (!isArray(lastObj[n])) {
          lastObj[n] = [];
        } // 不是数字的话则为对象

      } else if (!isObject(lastObj[n])) {
        lastObj[n] = {};
      }

      lastObj = lastObj[n];
    }
  }
}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function replaceHtmlTags() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
  return str.replace(reg, val);
}
function createRandString() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return Array.from({
    length: number
  }).reduce(function (prev) {
    return prev + Math.random().toString(36).substr(2);
  }, '');
}
var KB = 1024;
var MB = KB * 1024;
var GB = MB * 1024;
var TB = GB * 1024;
var byte2textDefaultConfig = {
  precision: 1
};
var byte2text = function byte2text(_byte, conf) {
  var cf = _objectSpread$2(_objectSpread$2({}, byte2textDefaultConfig), conf);

  var s = '';

  if (_byte >= TB) {
    s = "".concat((_byte / TB).toFixed(cf.precision), "T");
  } else if (_byte >= GB) {
    s = "".concat((_byte / GB).toFixed(cf.precision), "G");
  } else if (_byte >= MB) {
    s = "".concat((_byte / MB).toFixed(cf.precision), "M");
  } else {
    s = "".concat((_byte / KB).toFixed(cf.precision), "K");
  }

  return s;
};
byte2text.KB = KB;
byte2text.MB = MB;
byte2text.GB = GB;
byte2text.TB = TB;
var heightLightMatchStringDefaultConf = {
  color: '#F83D48'
};
function heightLightMatchString(str, regExp, conf) {
  if (!str || !regExp) return str || '';

  var cf = _objectSpread$2(_objectSpread$2({}, heightLightMatchStringDefaultConf), conf);

  var reg = new RegExp(regExp, 'g');
  return str.replace(reg, function (s) {
    return "<span style=\"color: ".concat(cf.color, "\">").concat(s, "</span>");
  });
}

function getRandRange(min, max) {
  return Math.round((max - min) * Math.random() + min);
}
function decimalPrecision(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var mid = +"1".concat(Array.from({
    length: precision
  }).map(function () {
    return '0';
  }).join(''));
  return Math.round(num * mid) / mid;
}
function sum() {
  for (var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }

  return nums.reduce(function (p, i) {
    return p + (isWeakNumber(i) ? Number(i) : 0);
  }, 0);
}
function subtract() {
  for (var _len2 = arguments.length, nums = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    nums[_key2] = arguments[_key2];
  }

  return nums.reduce(function (p, i) {
    if (p === null) return i;
    if (!isWeakNumber(i)) return p;
    return p - i;
  }, null);
}
function weakNumber(arg) {
  return isWeakNumber(arg) ? Number(arg) : null;
}
function clamp(val, min, max) {
  if (isNumber(min) && val < min) return min;
  if (isNumber(max) && val > max) return max;
  return val;
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var portalsID = 'J__PORTALS__NODE__';
var getPortalsNode = function getPortalsNode(namespace) {
  var id = portalsID + (namespace ? namespace.toLocaleUpperCase() : 'DEFAULT');
  var portalsEl = document.getElementById(id);

  if (!portalsEl) {
    var el = document.createElement('div');
    el.id = id;
    portalsEl = document.body.appendChild(el);
  }

  return portalsEl;
};
function getScrollBarWidth(className) {
  // Create the measurement node
  var scrollEl = document.createElement('div');
  if (className) scrollEl.className = className;
  scrollEl.style.overflow = 'scroll';
  scrollEl.style.height = '200px';
  scrollEl.style.width = '200px';
  scrollEl.style.border = '2px solid red';
  document.body.appendChild(scrollEl);
  var wSize = scrollEl.offsetWidth - scrollEl.clientWidth;
  var hSize = scrollEl.offsetWidth - scrollEl.clientWidth;
  var sty = getStyle(scrollEl);

  if (sty) {
    var trimPXStr = function trimPXStr(s) {
      return s.replace(/px/, '');
    };

    wSize = wSize - trimPXStr(sty.borderLeftWidth) - trimPXStr(sty.borderRightWidth);
    hSize = hSize - trimPXStr(sty.borderTopWidth) - trimPXStr(sty.borderBottomWidth);
  }

  document.body.removeChild(scrollEl); // Get the scrollbar width

  return [wSize, hSize];
}
function getStyle(dom) {
  if (!dom) return {};
  if (!dom.currentStyle && !window.getComputedStyle) return {};
  return dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom);
}
function checkElementVisible(target) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _option$fullVisible = option.fullVisible,
      fullVisible = _option$fullVisible === void 0 ? false : _option$fullVisible,
      wrapEl = option.wrapEl,
      _option$offset = option.offset,
      offset = _option$offset === void 0 ? 0 : _option$offset;
  var ofs = getOffsetObj(offset); // 核心是判定视口的可用区域所在的框，再检测元素是否在这个框坐标内

  /** 基础边界(用于窗口) */

  var yMinBase = 0;
  var xMinBase = 0;
  var yMaxBase = window.innerHeight;
  var xMaxBase = window.innerWidth;
  /** 有效边界 */

  var aYMin = yMinBase;
  var aXMin = xMinBase;
  var aYMax = yMaxBase;
  var aXMax = xMaxBase; // 需要同时检测是否超出窗口、所在容器

  if (wrapEl) {
    var _wrapEl$getBoundingCl = wrapEl.getBoundingClientRect(),
        _top = _wrapEl$getBoundingCl.top,
        _left = _wrapEl$getBoundingCl.left,
        _bottom = _wrapEl$getBoundingCl.bottom,
        _right = _wrapEl$getBoundingCl.right;

    var yMin = yMinBase + _top;
    var xMin = xMinBase + _left;
    var yMax = _bottom;
    var xMax = _right; // 减去元素右边到视口右边
    // 有效区域左上取最小值，最小不小于0
    // 有效区域右下取最大值，最大不大于窗口对应方向尺寸

    aXMin = clamp(Math.max(xMinBase, xMin), xMinBase, xMaxBase);
    aYMin = clamp(Math.max(yMinBase, yMin), yMinBase, yMaxBase);
    aXMax = clamp(Math.min(xMaxBase, xMax), xMinBase, xMaxBase);
    aYMax = clamp(Math.min(yMaxBase, yMax), yMinBase, yMaxBase);
  }

  var bound = isDom(target) ? target.getBoundingClientRect() : target;

  var _offsetCalc = offsetCalc(bound, ofs),
      top = _offsetCalc.top,
      left = _offsetCalc.left,
      bottom = _offsetCalc.bottom,
      right = _offsetCalc.right;
  /** fullVisible检测 */


  var topPos = fullVisible ? top : bottom;
  var bottomPos = fullVisible ? bottom : top;
  var leftPos = fullVisible ? left : right;
  var rightPos = fullVisible ? right : left; // 指定方向是否包含有效尺寸

  var xFalse = aXMax === aXMin;
  var yFalse = aYMax === aYMin;
  var topVisible = yFalse ? false : topPos >= aYMin;
  var leftVisible = xFalse ? false : leftPos >= aXMin;
  var bottomVisible = yFalse ? false : bottomPos <= aYMax;
  var rightVisible = xFalse ? false : rightPos <= aXMax;
  return {
    visible: topVisible && leftVisible && rightVisible && bottomVisible,
    top: topVisible,
    left: leftVisible,
    right: rightVisible,
    bottom: bottomVisible,
    bound: bound
  };
}
/** 用于checkElementVisible获取offset四个方向的值 */

function getOffsetObj(offset) {
  var ofs = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
  if (!offset) return ofs;

  if (isNumber(offset)) {
    return {
      left: offset,
      top: offset,
      right: offset,
      bottom: offset
    };
  }

  Object.keys(ofs).forEach(function (key) {
    if (isNumber(offset[key])) {
      ofs[key] = offset[key];
    }
  });
  return ofs;
}
/** 用于checkElement，计算offset对象和当前位置对象的最终值 */


function offsetCalc(bound, offset) {
  return {
    top: bound.top - offset.top,
    left: bound.left - offset.left,
    right: bound.right + offset.right,
    bottom: bound.bottom + offset.bottom
  };
}

function triggerHighlight(t, conf) {
  if (isDom(t)) {
    mountHighlight(t, conf);
  } else {
    var temp = document.querySelectorAll(t);

    if (temp.length) {
      Array.from(temp).forEach(function (item) {
        return mountHighlight(item, conf);
      });
    }
  }
}
var mountHighlightDefaultConf = {
  color: '#1890ff',
  useOutline: true
};

function mountHighlight(target) {
  var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var cf = _objectSpread$1(_objectSpread$1({}, mountHighlightDefaultConf), conf);

  if (cf.useOutline) {
    target.style.outline = "1px auto ".concat(cf.color);
  } else {
    target.style.boxShadow = "0 0 0 4px ".concat(cf.color);
  }

  function clickHandle() {
    if (cf.useOutline) {
      target.style.outline = '';
    } else {
      target.style.boxShadow = '';
    }

    document.removeEventListener('click', clickHandle);
    document.removeEventListener('keydown', clickHandle);
  }

  document.addEventListener('click', clickHandle);
  document.addEventListener('keydown', clickHandle);
}

function getCurrentParent(node, matcher, depth) {
  var hasMatch = false;
  var cDepth = 0;

  function recur(n) {
    if (depth) {
      cDepth++;
      if (cDepth === depth) return;
    }

    if (!n) {
      return;
    }

    var pNode = n.parentNode;

    if (pNode) {
      var res = matcher(pNode);

      if (res) {
        hasMatch = true;
        return;
      }
    }

    recur(pNode);
  }

  recur(node);
  return hasMatch;
}
function getScrollParent(ele, getAll) {
  var node = getAll ? [] : null;

  function handle(el) {
    var parent = el.parentNode;

    if (parent) {
      var e = parent;
      var h = e.clientHeight;
      var sH = e.scrollHeight;

      if (sH > h) {
        var isRoot = e === document.documentElement || e === document.body;
        var scrollStatus = hasScroll(e); // 为body或doc时，统一取documentElement方便识别，部分浏览器支持body设置document.scrollXxx部分浏览器支持documentElement设置

        var element = isRoot ? document.documentElement : e;
        /* body和html元素不需要检测滚动属性 */

        if (isRoot || scrollStatus.x || scrollStatus.y) {
          if (getAll) {
            if (isRoot) {
              node.indexOf(document.documentElement) === -1 && node.push(element);
            } else {
              node.push(element);
            }
          } else {
            node = element;
            return;
          }
        }
      }

      handle(e);
    }
  }

  handle(ele);
  return node;
}
function getDocScrollOffset() {
  var doc = document.documentElement;
  var body = document.body;
  return {
    // Math.ceil用于解决高分屏缩放时的滚动位置小数问题
    x: Math.ceil(doc.scrollLeft + body.scrollLeft),
    y: Math.ceil(doc.scrollTop + body.scrollTop)
  };
}
function setDocScrollOffset() {
  var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (isNumber(conf.x)) {
    // eslint-disable-next-line no-multi-assign
    document.body.scrollLeft = document.documentElement.scrollLeft = conf.x;
  }

  if (isNumber(conf.y)) {
    // eslint-disable-next-line no-multi-assign
    document.body.scrollTop = document.documentElement.scrollTop = conf.y;
  }
}
function hasScroll(el) {
  var x = Math.max(0, el.scrollWidth - el.clientWidth) > 0;
  var y = Math.max(0, el.scrollHeight - el.clientHeight) > 0;

  if (el === document.documentElement || el === document.body) ; else {
    var _getStyle = getStyle(el),
        overflowX = _getStyle.overflowX,
        overflowY = _getStyle.overflowY;

    if (overflowX !== 'scroll' && overflowX !== 'auto') {
      x = false;
    }

    if (overflowY !== 'scroll' && overflowY !== 'auto') {
      y = false;
    }
  }

  return {
    x: x,
    y: y
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function promisify(fn, receiver) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      fn.apply(receiver, [].concat(args, [function (err, res) {
        return err ? reject(err) : resolve(res);
      }]));
    });
  };
}
function delay(ms, payload) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      return payload instanceof Error ? rej(payload) : res(payload);
    }, ms);
  });
}
var dumpFn = function dumpFn() {
  for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arg[_key2] = arguments[_key2];
  }

  return arg;
};
var defer = function defer(fn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return setTimeout.apply(void 0, [fn, 1].concat(args));
};
var defaultConfig = {
  rate: 0.2
};
function retry(handle, delay, config) {
  var _defaultConfig$config = _objectSpread(_objectSpread({}, defaultConfig), config),
      maxDelay = _defaultConfig$config.maxDelay,
      rate = _defaultConfig$config.rate,
      fixed = _defaultConfig$config.fixed,
      maxRetry = _defaultConfig$config.maxRetry;

  var t;

  var clear = function clear() {
    return t && clearTimeout(t);
  };

  var res = handle();
  if (!res) return clear;
  var d = delay;
  var count = 1;

  var trigger = function trigger() {
    t = setTimeout(function () {
      if (handle()) {
        if (maxRetry && maxRetry === count) return;

        if (!fixed) {
          var nextD = count * rate * delay + d;
          d = maxDelay ? Math.min(nextD, maxDelay) : nextD;
        }

        count++;
        trigger();
      }
    }, d);
  };

  trigger();
  return clear;
}
function throwError(msg, prefix) {
  throw new Error("".concat(prefix ? "".concat(prefix, "::") : '', "ERROR: ").concat(msg));
}
function throwWarning(msg, prefix) {
  console.warn("".concat(prefix ? "".concat(prefix, "::") : '', "Warning: ").concat(msg));
}

function getGlobal() {
  // eslint-disable-next-line no-restricted-globals
  if (typeof self !== 'undefined') {
    // eslint-disable-next-line no-restricted-globals
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
}
var __GLOBAL__ = getGlobal();
function createEvent() {
  var listeners = [];

  function on(listener) {
    listeners.push(listener);
  }

  function off(listener) {
    var ind = listeners.indexOf(listener);
    if (ind !== -1) listeners.splice(ind, 1);
  }

  function emit() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    on: on,
    off: off,
    emit: emit
  };
}

var idCardRegexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

var storagePrefix = 'THIS_IS_A_UNIQUE_PREFIX_';
function setStorage(key, val) {
  localStorage.setItem("".concat(storagePrefix).concat(key).toUpperCase(), JSON.stringify(val));
}
function getStorage(key) {
  var s = localStorage.getItem("".concat(storagePrefix).concat(key).toUpperCase());
  if (!s) return null;
  return JSON.parse(s);
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function swap(arr, sourceInd, targetInd) {
  if (sourceInd < 0 || targetInd < 0) return arr;
  if (sourceInd > arr.length - 1 || targetInd > arr.length - 1) return arr;
  arr.splice(targetInd, 1, arr.splice(sourceInd, 1, arr[targetInd])[0]);
  return arr;
}
function move(array, form, to) {
  if (form < 0 || to < 0) return array;
  if (form > array.length - 1 || to > array.length - 1) return array;
  array.splice.apply(array, [to, 0].concat(_toConsumableArray(array.splice(form, 1))));
  return array;
}
var ensureArray = function ensureArray(val) {
  return isArray(val) ? val : [val];
};
function uniq(array) {
  var arr = [];
  array.forEach(function (it) {
    if (arr.indexOf(it) === -1) {
      arr.push(it);
    }
  });
  return arr;
}
function uniqWith(array, comparator) {
  var arr = [];
  array.forEach(function (it) {
    var flag = false;

    var _iterator = _createForOfIteratorHelper(arr),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (comparator(item, it)) {
          flag = true;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!flag) {
      arr.push(it);
    }
  });
  return arr;
}

export { __GLOBAL__, byte2text, checkElementVisible, clamp, createEvent, createRandString, datetime, decimalPrecision, defer, delay, dumpFn, ensureArray, form2obj, formatString, getCurrentParent, getDateCountDown, getDateStringFirst, getDocScrollOffset, getFirstTruthyOrZero, getGlobal, getNamePathValue, getPortalsNode, getProtoStr, getRandRange, getScrollBarWidth, getScrollParent, getStorage, getStyle, hasScroll, heightLightMatchString, idCardRegexp, isArray, isBetweenDate, isBoolean, isDate, isDom, isEmpty, isError, isFunction, isInt, isNull, isNullOrUndefined, isNumber, isNumerical, isObject, isPrimitive, isRegExp, isString, isSymbol, isTrueEmpty, isTruthyArray, isTruthyOrZero, isUndefined, isWeakNumber, move, obj2FormData, omit, padSingleNumber, parseDate, pick, promisify, replaceHtmlTags, retry, setDocScrollOffset, setNamePathValue, setStorage, shakeFalsy, stringifyNamePath, subtract, sum, swap, throwError, throwWarning, triggerHighlight, unFormatString, uniq, uniqWith, validateFormatString, vie, weakNumber };
