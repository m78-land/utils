/**
 * 获取表示对象原始类型的字符串
 * @param {*} o - 需要查询的字符
 *  @returns {string}
 * */
export function getProtoStr(o) {
  return Object.prototype.toString.call(o);
}

/**
 * 检测是否为数组
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return getProtoStr(arg) === '[object Array]';
}

export function isTruthyArray(arg) {
  if (!isArray(arg)) return false;
  return arg.length !== 0;
}

/**
 * 检测是否为数字且非NAN
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isNumber(arg) {
  return typeof arg === 'number' && !isNaN(arg);
}

export function isWeakNumber(arg) {
  return isNumber(Number(arg));
}

/**
 * 检测是否为字符串
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isString(arg) {
  return typeof arg === 'string';
}

/**
 * 检测是否为整数
 * @param {*} value - 需待查询的对象
 * @returns {boolean}
 * */
export function isInt(value) {
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
export function isSymbol(arg) {
  return typeof arg === 'symbol';
}

/**
 * 检测是不是原始类型, null、string、boolean、number、symbol、undefined
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isPrimitive(arg) {
  return (
    arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined'
  );
}

/**
 * 检测是否为Error对象
 * @param {*} e - 需待查询的对象
 * @returns {boolean}
 * */
export function isError(e) {
  return getProtoStr(e) === '[object Error]' || e instanceof Error;
}

/**
 * 检测是否为对象
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isObject(arg) {
  return getProtoStr(arg) === '[object Object]';
}

/**
 * 检测是否为DOM
 * @param {*} o - 需待查询的对象
 * @returns {boolean}
 * */
export function isDom(o) {
  if (!o) {
    return false;
  }

  if (!o.querySelectorAll || !o.querySelector) {
    return false;
  }

  if (isObject(document) && o === document) {
    return true;
  }

  if (typeof HTMLElement === 'object') {
    return o instanceof HTMLElement;
  } else {
    return o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
  }
}

/**
 * 检测是否为正则
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isRegExp(arg) {
  return getProtoStr(arg) === '[object RegExp]';
}

/**
 * 检测是否为数组
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isFunction(arg) {
  return typeof arg === 'function';
}

/**
 * 检测是否为日期对象
 * @param {*} d - 需待查询的对象
 * @returns {boolean}
 * */
export function isDate(d) {
  return getProtoStr(d) === '[object Date]';
}

/**
 * 检测是否为布尔值
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isBoolean(arg) {
  return typeof arg === 'boolean';
}

/**
 * 检测是否为Null
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isNull(arg) {
  return arg === null;
}

/**
 * 检测是否为undefined
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isUndefined(arg) {
  return arg === void 0;
}

/**
 * 检测是否为null/undefined
 * @param {*} arg - 需待查询的对象
 * @returns {boolean}
 * */
export function isNullOrUndefined(arg) {
  return arg == null;
}

/**
 * 检测传入对象是否为: undefined、null、''、NaN
 *
 * */
export function isTrueEmpty(obj) {
  if (obj === undefined || obj === null || obj === '') return true;
  return !!(isNumber(obj) && isNaN(obj));
}

/* 检测传入对象是否为: undefined, null ,'', NaN, [], {}, 0, false  */
export function isEmpty(obj) {
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
    for (const key in obj) {
      return false;
    }
    return true;
  }
  return false;
}

export function isNumerical(numLike) {
  return !isNaN(Number(numLike));
}

export function isTruthyOrZero(arg) {
  return !!arg || arg === 0;
}
