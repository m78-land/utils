import _typeof from '@babel/runtime/helpers/esm/typeof';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread';

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
/**
 * 检测是否为数字
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */

function isNumber(arg) {
  return typeof arg === 'number';
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

/**
 * 将一个优先错误且回调位于最后一个参数的node风格的callback函数转为return Promise的函数
 * @param {function} fn - 要包装的函数
 * @param {object} receiver - 要绑定作用域的对象
 * @return {function(...[*]): Promise<unknown>}
 */
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
/**
 * 将小于10且大于0的数字转为填充0的字符 如 '01' '05', 小于1的数字始终返回'00'
 * @param {number} number
 */

function padSingleNumber(number) {
  if (number < 1) {
    return '00';
  }

  if (number < 10) {
    return '0' + String(number);
  }

  return String(number);
}

/**
 * 根据传入规则格式化一个日期对象
 * @param {Date|string} date - 待转换的日期对象, 传入string时，将其作为format并设置date为当前时间
 * @param {string} format - 'YYYY、MM、DD、hh、mm、ss'组成的字符串
 * @return {string} 格式化后的日期
 */

function datetime() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';

  if (isString(date)) {
    format = date;
    date = new Date();
  }

  var fn = function fn(d) {
    return ('0' + d).slice(-2);
  };

  var d = new Date(date);
  var formats = {
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
/**
 * 获取当前时间到指定时间相隔的d,h,m,s,ms, 当前时间超过传入时间的话全部返回为'00'且附带timeOut: true 这个属性
 * @param {string|Date} datestr - (YYYY-MM-DD hh:mm:ss / YYYY/MM/DD hh:mm:ss)
 * @returns {object} 格式化后的日期
 */

var oneMS = 100;
var oneS = oneMS * 10;
var oneM = 60 * oneS;
var oneH = 60 * oneM;
var oneD = 24 * oneH;
function getDateCountDown(date) {
  if (!date) {
    return {
      ms: '00',
      s: '00',
      m: '00',
      h: '00',
      d: '00',
      timeOut: true
    };
  }

  if (isString(date)) {
    date = Date.parse(date.replace(/-/g, '/')); // 兼容ios
  }

  var start = Date.now();
  var end = date;
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

/**
 * 去掉对象falsy值(除了0)(使用delete确保返回原对象)
 * @param { object } source
 * @return { object } 返回修改后的原对象
 */
var shakeFalsy = function shakeFalsy(source) {
  Object.keys(source).forEach(function (key) {
    var val = source[key];

    if (!val && val !== 0) {
      delete source[key];
    }
  });
  return source;
};

/* 去掉html字符中的标签，返回纯文本 */
function replaceTags() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
  return str.replace(reg, '');
}
/**
 *  生成一段随机字符
 *  @param number - 随机串的倍数，默认1倍，随机字符长度为10为
 *  @return string
 *  */

function createRandString() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return Array.from({
    length: number
  }).reduce(function (prev) {
    return prev + Math.random().toString(36).substr(2);
  }, '');
}
/* 以指定规则格式化字符 */

var validateFormatString = /^(\s?\d\s?,?)+$/;
var defaultConfig = {
  delimiter: ' ',
  repeat: false,
  lastRepeat: false
};

function getPatterns(str, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _defaultConfig$option = _objectSpread({}, defaultConfig, options),
      repeat = _defaultConfig$option.repeat,
      lastRepeat = _defaultConfig$option.lastRepeat;

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

  var strArr = str.split(''); // repeat处理

  if (repeat || lastRepeat) {
    // 传入模式能匹配到的最大长度
    var maxLength = patterns.reduce(function (prevIndex, index) {
      var currentIndex = prevIndex + Number(index);
      return currentIndex;
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
/**
 * 根据传入的模式对字符进行格式化
 * @param str {string} - 需要进行格式化的字符
 * @param pattern {string} - 格式为 `1,2,3,4` 规则的模式字符，数字两端可包含空格
 * @param options
 * @param options.delimiter {string} - ' ' | 指定分割符
 * @param options.repeat {boolean} -  false | 当字符长度超过pattern可匹配到的长度时，重复以当前pattern对剩余字符进行格式化
 * @param options.lastRepeat {boolean} - false | 当字符长度超过pattern可匹配到的长度时，重复以当前pattern的最后一位对剩余字符进行格式化
 */


function formatString(str, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _defaultConfig$option2 = _objectSpread({}, defaultConfig, options),
      delimiter = _defaultConfig$option2.delimiter,
      repeat = _defaultConfig$option2.repeat,
      lastRepeat = _defaultConfig$option2.lastRepeat;

  var patternMeta = getPatterns(str, pattern, {
    repeat: repeat,
    lastRepeat: lastRepeat
  });
  if (!patternMeta) return;
  var patterns = patternMeta.patterns,
      strArr = patternMeta.strArr;
  patterns.reduce(function (prevPattern, _pattern, ind) {
    var currentIndex = prevPattern + Number(_pattern); // 替换位置为 前面所有pattern + 当前pattern + 已匹配次数

    var replaceIndex = currentIndex + ind;

    if (replaceIndex < strArr.length) {
      strArr.splice(replaceIndex, 0, delimiter);
    }

    return currentIndex;
  }, 0);
  return strArr.join('');
}
/**
 * 对被`format()`过的字符进行反格式化, 除了str, 其他参数必须与执行`format()`时传入的一致
 * @param str {string} - 需要进行反格式化的字符
 * @param pattern {string} - 格式为 `1,2,3,4` 规则的模式字符，数字两端可包含空格
 * @param options
 * @param options.delimiter {string} - ' ' | 指定分割符
 * @param options.repeat {boolean} -  当字符长度超过pattern可匹配到的长度时，重复以当前pattern对剩余字符进行格式化
 * @param options.lastRepeat {boolean} - 当字符长度超过pattern可匹配到的长度时，重复以当前pattern的最后一位对剩余字符进行格式化
 */

function unFormatString(str, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _defaultConfig$option3 = _objectSpread({}, defaultConfig, options),
      delimiter = _defaultConfig$option3.delimiter,
      repeat = _defaultConfig$option3.repeat,
      lastRepeat = _defaultConfig$option3.lastRepeat;

  var patternMeta = getPatterns(str, pattern, {
    repeat: repeat,
    lastRepeat: lastRepeat
  });
  if (!patternMeta) return;
  var patterns = patternMeta.patterns,
      strArr = patternMeta.strArr;
  patterns.reduce(function (prev, pattern) {
    var index = Number(pattern) + prev;
    /* 只在字符首位匹配时才执行替换, 在某些场景会有用（fr的input处理双向绑定时） */

    if (strArr[index] === delimiter[0]) {
      strArr.splice(index, delimiter.length);
    }

    return index;
  }, 0);
  return strArr.join('');
}

/* 获取指定区间内的随机数 */
function getRandRange(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

/** 获取一个用于挂载Portals或动态弹窗等内容的节点, 多次调用时会获取到相同的节点 */
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

export { createRandString, datetime, form2obj, formatString, getDateCountDown, getPortalsNode, getProtoStr, getRandRange, isArray, isBoolean, isDate, isDom, isEmpty, isError, isFunction, isInt, isNull, isNullOrUndefined, isNumber, isObject, isPrimitive, isRegExp, isString, isSymbol, isTrueEmpty, isUndefined, obj2FormData, padSingleNumber, promisify, replaceTags, shakeFalsy, unFormatString, validateFormatString };
