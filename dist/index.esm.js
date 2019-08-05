function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * @description 引入方式 import * as util from 'xxx || import { isObject } from 'xxx
 * @author lxj https://github.com/qq1073830130
 * @date 2018-09-06
 * @export
 * @param {*} arg
 * @returns
 */

/* Is */
function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }

  return obj2Str(arg) === '[object Array]';
}
function isObject(arg) {
  return obj2Str(arg) === '[object Object]';
}
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
    return o && _typeof(o) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
  }
}
function isRegExp(re) {
  return obj2Str(re) === '[object RegExp]';
}
function isFunction(arg) {
  return typeof arg === 'function';
}
function isDate(d) {
  return obj2Str(d) === '[object Date]';
}
function isBoolean(arg) {
  return typeof arg === 'boolean';
}
function isNull(arg) {
  return arg === null;
}
function isUndefined(arg) {
  return arg === void 0;
}
function isNullOrUndefined(arg) {
  return arg == null;
}
/* CASE: undefined、null、''、NaN  */

function isTrueEmpty(obj) {
  if (obj === undefined || obj === null || obj === '') return true;
  if (isNumber(obj) && isNaN(obj)) return true;
  return false;
}
/* CASE: undefined, null ,'', NaN, [], {}, 0, false  */

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
function isNumber(arg) {
  return typeof arg === 'number';
}
function isString(arg) {
  return typeof arg === 'string';
}
function isInt(value) {
  if (isNaN(value) || isString(value)) {
    return false;
  }

  var x = parseFloat(value);
  return (x | 0) === x;
}
function isSymbol(arg) {
  return _typeof(arg) === 'symbol';
}
function isError(e) {
  return obj2Str(e) === '[object Error]' || e instanceof Error;
}
/* 是不是原始类型, null、string、boolean、number、symbol、undefined */

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
/* ===========================  Util =========================== */

/**
 * 根据传入规则格式化一个日期对象
 * @param {Date|str} 待转换的日期对象
 * @param {string} 'YYYY、MM、DD、hh、mm、ss'组成的字符串
 * @returns 格式化后的日期
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
/* =========================== Format =========================== */

function obj2Str(o) {
  return Object.prototype.toString.call(o);
}
/**
 * callback2promise
 * @param  {Function} 要包装的函数
 * @param  {Object} 要绑定作用域的对象
 * @return {Promise}
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
 * 收集指定对象内带name属性的所有输入控件(input,select,textarea)的值，并按一定规则整合
 * checkbox: 选中值的value组成的数组，没有的话返回 []
 * radio: 选中项的value，没有value的话作为默认行为浏览器会返回 "on"
 * file: 选择的文件组成的数组，没有的话返回 []
 * 其他: 表单元素的value属性值
 * @param {dom} el
 * @returns obj;
 */

function form2obj(el) {
  if (!isDom(el)) {
    console.error('请传入dom元素');
    return;
  }

  if (!el.querySelectorAll) {
    console.error('当前浏览器不支持querySelectorAll API');
    return;
  }

  var tempObj = {};
  var inps = el.querySelectorAll('input[name],select[name],textarea[name]');
  inps = Array.prototype.slice.call(inps);
  inps.forEach(function (v) {
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
      var files = Array.prototype.slice.call(v.files);
      tempObj[v.name] = files;
    } else {
      tempObj[v.name] = v.value;
    }
  });
  return tempObj;
}
/**
 * Object 转 FormData 对象
 * @param {obj} obj
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

export { datetime, form2obj, isArray, isBoolean, isDate, isDom, isEmpty, isError, isFunction, isInt, isNull, isNullOrUndefined, isNumber, isObject, isPrimitive, isRegExp, isString, isSymbol, isTrueEmpty, isUndefined, obj2FormData, obj2Str, promisify };