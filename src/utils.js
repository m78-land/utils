/**
 * @description 引入方式 import * as util from 'xxx || import { isObject } from 'xxx
 * @author lxj https://github.com/qq1073830130
 * @date 2018-09-06
 */

/* ================ is ================  */

export function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return obj2Str(arg) === '[object Array]';
}

export function isObject(arg) {
  return obj2Str(arg) === '[object Object]';
}

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
    return (
      o &&
      typeof o === 'object' &&
      o !== null &&
      o.nodeType === 1 &&
      typeof o.nodeName === 'string'
    );
  }
}

export function isRegExp(re) {
  return obj2Str(re) === '[object RegExp]';
}

export function isFunction(arg) {
  return typeof arg === 'function';
}

export function isDate(d) {
  return obj2Str(d) === '[object Date]';
}

export function isBoolean(arg) {
  return typeof arg === 'boolean';
}

export function isNull(arg) {
  return arg === null;
}

export function isUndefined(arg) {
  return arg === void 0;
}

export function isNullOrUndefined(arg) {
  return arg == null;
}

/* CASE: undefined、null、''、NaN  */
export function isTrueEmpty(obj) {
  if (obj === undefined || obj === null || obj === '') return true;
  if (isNumber(obj) && isNaN(obj)) return true;
  return false;
}

/* CASE: undefined, null ,'', NaN, [], {}, 0, false  */
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
      return false && key;
    }
    return true;
  }
  return false;
}

export function isNumber(arg) {
  return typeof arg === 'number';
}

export function isString(arg) {
  return typeof arg === 'string';
}

export function isInt(value) {
  if (isNaN(value) || isString(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

export function isSymbol(arg) {
  return typeof arg === 'symbol';
}

export function isError(e) {
  return obj2Str(e) === '[object Error]' || e instanceof Error;
}

/* 是不是原始类型, null、string、boolean、number、symbol、undefined */
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

/* ================  date ================ */

/**
 * 根据传入规则格式化一个日期对象
 * @param {Date|string} 待转换的日期对象
 * @param {string} 'YYYY、MM、DD、hh、mm、ss'组成的字符串
 * @return {string} 格式化后的日期
 */
export function datetime(date = new Date(), format = 'YYYY-MM-DD hh:mm:ss') {
  if (isString(date)) {
    format = date;
    date = new Date();
  }

  const fn = d => {
    return ('0' + d).slice(-2);
  };

  const d = new Date(date);
  const formats = {
    YYYY: d.getFullYear(),
    MM: fn(d.getMonth() + 1),
    DD: fn(d.getDate()),
    hh: fn(d.getHours()),
    mm: fn(d.getMinutes()),
    ss: fn(d.getSeconds())
  };

  return format.replace(/([a-z])\1+/gi, a => {
    return formats[a] || a;
  });
}

/**
 * 获取当前时间到指定时间相隔的d,h,m,s,ms, 当前时间超过传入时间的话全部返回为'00'且附带timeOut: true 这个属性
 * @param {string} datestr 
 * @return {object} 格式化后的日期
 */
export function getDiff(datestr) {
  if (!datestr) {
    return {
      ms: '00',
      s: '00',
      m: '00',
      h: '00',
      d: '00',
      timeOut: true,
    };
  }
  const start = Date.now();
  const end = Date.parse(datestr);

  const diff = end - start;

  if(diff < 0) {
    return getDiff();
  }
  
  const fr = Math.floor;

  // h、m、s 用单位总数取余就是该单位对应的ms，除单位总数获得单位
  let d = fr(diff / oneD);
  let h = fr(diff % oneD / oneH);  
  let m = fr(diff % oneH / oneM);
  let s = fr(diff % oneM / oneS);
  let ms = fr(diff % oneMS);
  
  return {
    d: padSigleNumber(d),
    h: padSigleNumber(h),
    m: padSigleNumber(m),
    s: padSigleNumber(s),
    ms: padSigleNumber(ms)
  };
}

/* =========================== format =========================== */
/** 
 * 获取表示对象原始类型的字符串
 * @param {object} o 待转换的对象 
 * @return {void}
 *  */
export function obj2Str(o) {
  return Object.prototype.toString.call(o);
}

/**
 * 将一个优先错误且回调位于最后一个参数的node风格的callback函数转为return Promise的函数
 * @param  {function} 要包装的函数
 * @param  {object} 要绑定作用域的对象
 * @return {Promise}
 */
export function promisify(fn, receiver) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [
        ...args,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      ]);
    });
  };
}

/**
 * 将小于10切大于0的数字转为填充0的字符 如 '01' '05', 小于1的数字始终返回'00'
 * @param {number} number
 */
export function padSigleNumber(number) {
  if (number < 1) {
    return '00';
  }

  if (number < 10) {
    return '0' + number;
  }

  return String(number);
}

/**
 * 收集指定对象内带name属性的所有输入控件(input,select,textarea)的值，并按一定规则整合
 * checkbox: 选中值的value组成的数组，没有的话返回 []
 * radio: 选中项的value，没有value的话作为默认行为浏览器会返回 "on"
 * file: 选择的文件组成的数组，没有的话返回 []
 * 其他: 表单元素的value属性值
 * @param {Element} el
 * @return {object}
 */
export function form2obj(el) {
  if (!isDom(el)) {
    console.error('Please pass in the dom element');
    return;
  }
  if (!el.querySelectorAll) {
    console.error('The passed in element does not support the querySelectorAll API');
    return;
  }
  let tempObj = {};
  let inps = el.querySelectorAll('input[name],select[name],textarea[name]');
  inps = Array.prototype.slice.call(inps);
  inps.forEach(v => {
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
      let files = Array.prototype.slice.call(v.files);
      tempObj[v.name] = files;
    } else {
      tempObj[v.name] = v.value;
    }
  });

  return tempObj;
}

/**
 * 将一个object转为对应键值对的 FormData 对象
 * @param {object} obj
 * @return {FormData}
 */
export function obj2FormData(obj) {
  let keys = Object.keys(obj);
  let form = new FormData();

  keys.forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(val => {
        // form.append(`${key}[]`, val)
        form.append(key, val);
      });
    } else if (obj[key]) {
      form.append(key, obj[key]);
    }
  });

  return form;
}
