(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@lxjx/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@lxjx/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RollupPlay = {}, global.utils));
}(this, (function (exports, utils) { 'use strict';

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
    return typeof arg === 'symbol';
  }

  /**
   * 检测是不是原始类型, null、string、boolean、number、symbol、undefined
   * @param {*} arg - 需待查询的对象
   * @returns {boolean}
   * */
  function isPrimitive(arg) {
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
      for (const key in obj) {
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

  function parseDate(date) {
    let d = date;
    if (typeof date === 'string') {
      d = date.replace(/-/g, '/'); // Safari无法解析 2020-01-01 格式的日期
    }
    d = new Date(d);

    // 处理Invalid Date
    if (d instanceof Date && isNaN(d.getTime())) {
      return null;
    }

    return d;
  }

  function datetime(date = new Date(), format = 'YYYY-MM-DD hh:mm:ss') {
    const d = parseDate(date);

    if (!d) {
      return '';
    }

    const fn = d => {
      return ('0' + d).slice(-2);
    };

    const formats = {
      YY: String(d.getFullYear() + 1).slice(2),
      YYYY: d.getFullYear(),
      MM: fn(d.getMonth() + 1),
      DD: fn(d.getDate()),
      hh: fn(d.getHours()),
      mm: fn(d.getMinutes()),
      ss: fn(d.getSeconds()),
    };

    return format.replace(/([a-z])\1+/gi, a => {
      return formats[a] || a;
    });
  }

  const oneMS = 100;
  const oneS = oneMS * 10;
  const oneM = 60 * oneS;
  const oneH = 60 * oneM;
  const oneD = 24 * oneH;
  function getDateCountDown(date) {
    const dt = parseDate(date);

    if (!dt) {
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
    const end = dt.getTime();

    const diff = end - start;

    if (diff < 0) {
      return getDateCountDown();
    }

    const fr = Math.floor;

    // h、m、s 用单位总数取余就是该单位对应的ms，除单位总数获得单位
    let d = fr(diff / oneD);
    let h = fr((diff % oneD) / oneH);
    let m = fr((diff % oneH) / oneM);
    let s = fr((diff % oneM) / oneS);
    let ms = fr(diff % oneMS);

    return {
      d: utils.padSingleNumber(d),
      h: utils.padSingleNumber(h),
      m: utils.padSingleNumber(m),
      s: utils.padSingleNumber(s),
      ms: utils.padSingleNumber(ms),
      timeOut: false,
    };
  }

  function getDateStringFirst(dataString = '') {
    if (!dataString) return '';
    return dataString.split(' ')[0];
  }

  function isBetweenDate(startDate, endDate, currentDate) {
    const s = parseDate(startDate);
    const e = parseDate(endDate);

    if (!s || !e) return false;

    const c = currentDate ? parseDate(currentDate) : new Date();

    return c <= e && c >= s;
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

  /* 以指定规则格式化字符 */

  const validateFormatString = /^(\s?\d\s?,?)+$/;

  const defaultConfig$1 = {
    delimiter: ' ',
    repeat: false,
    lastRepeat: false,
  };

  function getPatterns(str, pattern, options = {}) {
    const { repeat, lastRepeat } = { ...defaultConfig$1, ...options };

    if (!validateFormatString.test(pattern)) {
      console.warn(`invalid pattern: ${pattern}, must match the /^[\\s?\\d\\s?,?]+$/ rule`);
      return;
    }

    // 生成模式数组
    let patterns = pattern
      .split(',')
      .map(p => p.trim())
      .filter(p => !!p);

    if (!patterns.length) return;

    // 字符转为数组方便操作
    const strArr = str.split('');

    // repeat处理
    if (repeat || lastRepeat) {
      // 传入模式能匹配到的最大长度
      const maxLength = patterns.reduce((prevIndex, index) => {
        return prevIndex + Number(index);
      }, 0);

      // 需要额外填充的模式长度
      let fillLength;

      // 模式组最后一位，用于lastRepeat
      const lastPatter = Number(patterns[patterns.length - 1]);

      if (repeat) {
        // (字符长度 - 最大匹配长度) / 最大匹配长度
        fillLength = Math.ceil((strArr.length - maxLength) / maxLength);
      }

      if (lastRepeat) {
        // (字符长度 - 最大匹配长度) / 最后一位匹配符能匹配的长度
        fillLength = Math.ceil((strArr.length - maxLength) / lastPatter);
      }

      const originArr = lastRepeat ? [lastPatter] : [...patterns];

      Array.from({ length: fillLength }).forEach(() => {
        patterns = [...patterns, ...originArr];
      });
    }

    return {
      patterns,
      strArr,
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
  function formatString(str, pattern, options = {}) {
    const { delimiter, repeat, lastRepeat } = { ...defaultConfig$1, ...options };
    const patternMeta = getPatterns(str, pattern, { repeat, lastRepeat });

    if (!patternMeta) return;

    const { patterns, strArr } = patternMeta;

    patterns.reduce((prevPattern, _pattern, ind) => {
      const currentIndex = prevPattern + Number(_pattern);

      // 替换位置为 前面所有pattern + 当前pattern + 已匹配次数
      const replaceIndex = currentIndex + ind;

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
  function unFormatString(str, pattern, options = {}) {
    const { delimiter, repeat, lastRepeat } = { ...defaultConfig$1, ...options };
    const patternMeta = getPatterns(str, pattern, { repeat, lastRepeat });

    if (!patternMeta) return;

    const { patterns, strArr } = patternMeta;

    patterns.reduce((prev, pattern) => {
      const index = Number(pattern) + prev;

      /* 只在字符首位匹配时才执行替换, 在某些场景会有用（fr的input处理双向绑定时） */
      if (strArr[index] === delimiter[0]) {
        strArr.splice(index, delimiter.length);
      }

      return index;
    }, 0);

    return strArr.join('');
  }

  function getFirstTruthyOrZero(...args) {
    for (const arg of args) {
      if (utils.isTruthyOrZero(arg)) {
        return arg;
      }
    }
    return false;
  }

  function vie(arg, feedback = '-') {
    return utils.isTruthyOrZero(arg) ? arg : feedback;
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
    if (!utils.isDom(el)) {
      console.error('Please pass in the dom element');
      return;
    }
    if (!el.querySelectorAll) {
      console.error('The passed in element does not support the querySelectorAll API');
      return;
    }
    const tempObj = {};
    let inputs = el.querySelectorAll('input[name],select[name],textarea[name]');
    inputs = Array.prototype.slice.call(inputs);
    inputs.forEach(v => {
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
    const keys = Object.keys(obj);
    const form = new FormData();

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

  const shakeFalsy = source => {
    Object.keys(source).forEach(key => {
      const val = source[key];
      if (!val && val !== 0) {
        delete source[key];
      }
    });
    return source;
  };

  function pickOrOmit(obj, props, isPick) {
    if (utils.isString(props)) {
      props = props.split(',').map(key => key.trim());
    }
    const keys = Object.keys(obj);
    const result = {};
    keys.forEach(item => {
      const cond = isPick ? props.indexOf(item) !== -1 : props.indexOf(item) === -1;
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
    if (utils.isString(name)) {
      return obj?.[name];
    }

    if (utils.isArray(name) && name.length) {
      return name.reduce((p, i) => {
        return p?.[i];
      }, obj);
    }
  }

  /** 将 ['user', 'name'], ['list', '0', 'title'] 格式的字段数组转换为字符串  */
  function stringifyNamePath(name) {
    if (utils.isString(name)) return name;

    return name.reduce((p, i) => {
      if (utils.isNumber(Number(i))) {
        return `${p}[${i}]`;
      }

      if (utils.isString(i)) {
        return p.length ? `${p}.${i}` : i;
      }

      return p;
    }, '');
  }

  /** 在通过name在obj上设置值 */
  function setNamePathValue(obj, name, val) {
    if (utils.isString(name)) {
      obj[name] = val;
    }

    if (utils.isArray(name) && name.length) {
      let lastObj = obj;

      for (let i = 0; i < name.length; i++) {
        const n = name[i]; // 当前name
        const nextN = name[i + 1]; // 下一个name
        const hasNextN = nextN !== undefined; // 是否有下个

        if (!hasNextN) {
          if (utils.isNumerical(n)) {
            lastObj.push(val);
          } else {
            lastObj[n] = val;
          }
          return;
        }

        // 确保要操作的对象存在
        if (utils.isNumerical(nextN)) {
          if (!utils.isArray(lastObj[n])) {
            lastObj[n] = [];
          }
          // 不是数字的话则为对象
        } else if (!utils.isObject(lastObj[n])) {
          lastObj[n] = {};
        }

        lastObj = lastObj[n];
      }
    }
  }

  function replaceHtmlTags(str = '', val = '') {
    const reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
    return str.replace(reg, val);
  }

  function createRandString(number = 1) {
    return Array.from({ length: number }).reduce(prev => {
      return prev + Math.random().toString(36).substr(2);
    }, '');
  }

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;
  const byte2textDefaultConfig = {
    precision: 1,
  };

  const byte2text = (byte, conf) => {
    const cf = {
      ...byte2textDefaultConfig,
      ...conf,
    };

    let s = '';

    if (byte >= TB) {
      s = `${(byte / TB).toFixed(cf.precision)}T`;
    } else if (byte >= GB) {
      s = `${(byte / GB).toFixed(cf.precision)}G`;
    } else if (byte >= MB) {
      s = `${(byte / MB).toFixed(cf.precision)}M`;
    } else {
      s = `${(byte / KB).toFixed(cf.precision)}K`;
    }

    return s;
  };

  byte2text.KB = KB;
  byte2text.MB = MB;
  byte2text.GB = GB;
  byte2text.TB = TB;

  const heightLightMatchStringDefaultConf = {
    color: '#F83D48',
  };

  function heightLightMatchString(str, regExp, conf) {
    if (!str || !regExp) return str || '';
    const cf = {
      ...heightLightMatchStringDefaultConf,
      ...conf,
    };

    const reg = new RegExp(regExp, 'g');

    return str.replace(reg, s => {
      return `<span style="color: ${cf.color}">${s}</span>`;
    });
  }

  function getRandRange(min, max) {
    return Math.round((max - min) * Math.random() + min);
  }

  function decimalPrecision(num, precision = 1) {
    const mid = +`1${Array.from({ length: precision })
    .map(() => '0')
    .join('')}`;

    return Math.round(num * mid) / mid;
  }

  function sum(...nums) {
    return nums.reduce((p, i) => {
      return p + (utils.isWeakNumber(i) ? Number(i) : 0);
    }, 0);
  }

  function subtract(...nums) {
    return nums.reduce((p, i) => {
      if (p === null) return i;
      if (!utils.isWeakNumber(i)) return p;
      return p - i;
    }, null);
  }

  function weakNumber(arg) {
    return utils.isWeakNumber(arg) ? Number(arg) : null;
  }

  function clamp(val, min, max) {
    if (utils.isNumber(min) && val < min) return min;
    if (utils.isNumber(max) && val > max) return max;
    return val;
  }

  const portalsID = 'J__PORTALS__NODE__';
  const getPortalsNode = namespace => {
    const id = portalsID + (namespace ? namespace.toLocaleUpperCase() : 'DEFAULT');

    let portalsEl = document.getElementById(id);

    if (!portalsEl) {
      const el = document.createElement('div');
      el.id = id;
      portalsEl = document.body.appendChild(el);
    }
    return portalsEl;
  };

  function getScrollBarWidth(className) {
    // Create the measurement node
    const scrollEl = document.createElement('div');
    if (className) scrollEl.className = className;
    scrollEl.style.overflow = 'scroll';
    scrollEl.style.height = '200px';
    scrollEl.style.width = '200px';
    scrollEl.style.border = '2px solid red';

    document.body.appendChild(scrollEl);

    let wSize = scrollEl.offsetWidth - scrollEl.clientWidth;
    let hSize = scrollEl.offsetWidth - scrollEl.clientWidth;

    const sty = getStyle(scrollEl);

    if (sty) {
      const trimPXStr = s => s.replace(/px/, '');
      wSize = wSize - trimPXStr(sty.borderLeftWidth) - trimPXStr(sty.borderRightWidth);
      hSize = hSize - trimPXStr(sty.borderTopWidth) - trimPXStr(sty.borderBottomWidth);
    }

    document.body.removeChild(scrollEl);

    // Get the scrollbar width
    return [wSize, hSize];
  }

  function getStyle(dom) {
    if (!dom) return {};
    if (!dom.currentStyle && !window.getComputedStyle) return {};
    return dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom);
  }

  function checkElementVisible(target, option = {}) {
    const { fullVisible = false, wrapEl, offset = 0 } = option;

    const ofs = getOffsetObj(offset);

    // 核心是判定视口的可用区域所在的框，再检测元素是否在这个框坐标内

    /** 基础边界(用于窗口) */
    const yMinBase = 0;
    const xMinBase = 0;
    const yMaxBase = window.innerHeight;
    const xMaxBase = window.innerWidth;

    /** 有效边界 */
    let aYMin = yMinBase;
    let aXMin = xMinBase;
    let aYMax = yMaxBase;
    let aXMax = xMaxBase;

    // 需要同时检测是否超出窗口、所在容器
    if (wrapEl) {
      const { top, left, bottom, right } = wrapEl.getBoundingClientRect();

      const yMin = yMinBase + top;
      const xMin = xMinBase + left;
      const yMax = bottom;
      const xMax = right; // 减去元素右边到视口右边

      // 有效区域左上取最小值，最小不小于0
      // 有效区域右下取最大值，最大不大于窗口对应方向尺寸
      aXMin = utils.clamp(Math.max(xMinBase, xMin), xMinBase, xMaxBase);
      aYMin = utils.clamp(Math.max(yMinBase, yMin), yMinBase, yMaxBase);
      aXMax = utils.clamp(Math.min(xMaxBase, xMax), xMinBase, xMaxBase);
      aYMax = utils.clamp(Math.min(yMaxBase, yMax), yMinBase, yMaxBase);
    }

    const bound = utils.isDom(target) ? target.getBoundingClientRect() : target;

    const { top, left, bottom, right } = offsetCalc(bound, ofs);

    /** fullVisible检测 */
    const topPos = fullVisible ? top : bottom;
    const bottomPos = fullVisible ? bottom : top;
    const leftPos = fullVisible ? left : right;
    const rightPos = fullVisible ? right : left;

    // 指定方向是否包含有效尺寸
    const xFalse = aXMax === aXMin;
    const yFalse = aYMax === aYMin;

    const topVisible = yFalse ? false : topPos >= aYMin;
    const leftVisible = xFalse ? false : leftPos >= aXMin;
    const bottomVisible = yFalse ? false : bottomPos <= aYMax;
    const rightVisible = xFalse ? false : rightPos <= aXMax;

    return {
      visible: topVisible && leftVisible && rightVisible && bottomVisible,
      top: topVisible,
      left: leftVisible,
      right: rightVisible,
      bottom: bottomVisible,
      bound,
    };
  }

  /** 用于checkElementVisible获取offset四个方向的值 */
  function getOffsetObj(offset) {
    const ofs = { left: 0, top: 0, right: 0, bottom: 0 };

    if (!offset) return ofs;

    if (utils.isNumber(offset)) {
      return { left: offset, top: offset, right: offset, bottom: offset };
    }

    Object.keys(ofs).forEach(key => {
      if (utils.isNumber(offset[key])) {
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
      bottom: bound.bottom + offset.bottom,
    };
  }

  function triggerHighlight(t, conf) {
    if (utils.isDom(t)) {
      mountHighlight(t, conf);
    } else {
      const temp = document.querySelectorAll(t);
      if (temp.length) {
        Array.from(temp).forEach(item => mountHighlight(item, conf));
      }
    }
  }

  const mountHighlightDefaultConf = {
    color: '#1890ff',
    useOutline: true,
  };

  function mountHighlight(target, conf = {}) {
    const cf = {
      ...mountHighlightDefaultConf,
      ...conf,
    };

    if (cf.useOutline) {
      target.style.outline = `1px auto ${cf.color}`;
    } else {
      target.style.boxShadow = `0 0 0 4px ${cf.color}`;
    }

    function clickHandle() {
      if (cf.useOutline) {
        target.style.outline = '';
      } else {
        target.style.boxShadow = '';
      }

      document.removeEventListener('click', clickHandle);
    }

    document.addEventListener('click', clickHandle);
  }

  function getCurrentParent(node, matcher, depth) {
    let hasMatch = false;

    let cDepth = 0;

    function recur(n) {
      if (depth) {
        cDepth++;
        if (cDepth === depth) return;
      }

      if (!n) {
        return;
      }
      const pNode = n.parentNode;

      if (pNode) {
        const res = matcher(pNode);
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
    let node = getAll ? [] : null;

    function handle(el) {
      const parent = el.parentNode;

      if (parent) {
        const e = parent;
        const h = e.clientHeight;
        const sH = e.scrollHeight;

        if (sH > h) {
          const isRoot = e === document.documentElement || e === document.body;
          const scrollStatus = hasScroll(e);

          // 为body或doc时，统一取documentElement方便识别，部分浏览器支持body设置document.scrollXxx部分浏览器支持documentElement设置
          const el = isRoot ? document.documentElement : e;

          /* body和html元素不需要检测滚动属性 */
          if (isRoot || scrollStatus.x || scrollStatus.y) {
            if (getAll) {
              if (isRoot) {
                node.indexOf(document.documentElement) === -1 && node.push(el);
              } else {
                node.push(el);
              }
            } else {
              node = el;
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
    const doc = document.documentElement;
    const body = document.body;

    return {
      // Math.ceil用于解决高分屏缩放时的滚动位置小数问题
      x: Math.ceil(doc.scrollLeft + body.scrollLeft),
      y: Math.ceil(doc.scrollTop + body.scrollTop),
    };
  }

  function setDocScrollOffset(conf = {}) {
    if (utils.isNumber(conf.x)) {
      document.body.scrollLeft = document.documentElement.scrollLeft = conf.x;
    }

    if (utils.isNumber(conf.y)) {
      document.body.scrollTop = document.documentElement.scrollTop = conf.y;
    }
  }

  function hasScroll(el) {
    let x = Math.max(0, el.scrollWidth - el.clientWidth) > 0;
    let y = Math.max(0, el.scrollHeight - el.clientHeight) > 0;

    if (el === document.documentElement || el === document.body) ; else {
      const { overflowX, overflowY } = getStyle(el);
      if (overflowX !== 'scroll' && overflowX !== 'auto') {
        x = false;
      }
      if (overflowY !== 'scroll' && overflowY !== 'auto') {
        y = false;
      }
    }

    return {
      x,
      y,
    };
  }

  function promisify(fn, receiver) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fn.apply(receiver, [
          ...args,
          (err, res) => {
            return err ? reject(err) : resolve(res);
          },
        ]);
      });
    };
  }

  function delay(ms, payload) {
    return new Promise((res, rej) => {
      setTimeout(() => (payload instanceof Error ? rej(payload) : res(payload)), ms);
    });
  }

  const dumpFn = (...arg) => arg;

  const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

  const defaultConfig = {
    rate: 0.2,
  };

  function retry(handle, delay, config) {
    const { maxDelay, rate, fixed, maxRetry } = { ...defaultConfig, ...config };

    let t;
    const clear = () => t && clearTimeout(t);

    const res = handle();
    if (!res) return clear;

    let d = delay;
    let count = 1;

    const trigger = () => {
      t = setTimeout(() => {
        if (handle()) {
          if (maxRetry && maxRetry === count) return;
          if (!fixed) {
            const nextD = count * rate * delay + d;
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
    throw new Error(`${prefix ? `${prefix}::` : ''}ERROR: ${msg}`);
  }

  function throwWarning(msg, prefix) {
    console.warn(`${prefix ? `${prefix}::` : ''}Warning: ${msg}`);
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

  const __GLOBAL__ = getGlobal();

  function createEvent() {
    const listeners = [];

    function on(listener) {
      listeners.push(listener);
    }

    function off(listener) {
      const ind = listeners.indexOf(listener);
      if (ind !== -1) listeners.splice(ind, 1);
    }

    function emit(...args) {
      listeners.forEach(listener => listener(...args));
    }

    return {
      on,
      off,
      emit,
    };
  }

  const idCardRegexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  const storagePrefix = 'THIS_IS_A_UNIQUE_PREFIX_';

  function setStorage(key, val) {
    localStorage.setItem(`${storagePrefix}${key}`.toUpperCase(), JSON.stringify(val));
  }

  function getStorage(key) {
    const s = localStorage.getItem(`${storagePrefix}${key}`.toUpperCase());

    if (!s) return null;

    return JSON.parse(s);
  }

  function swap(arr, sourceInd, targetInd) {
    if (sourceInd < 0 || targetInd < 0) return arr;
    if (sourceInd > arr.length - 1 || targetInd > arr.length - 1) return arr;
    arr.splice(targetInd, 1, arr.splice(sourceInd, 1, arr[targetInd])[0]);
    return arr;
  }

  function move(array, form, to) {
    if (form < 0 || to < 0) return array;
    if (form > array.length - 1 || to > array.length - 1) return array;
    array.splice(to, 0, ...array.splice(form, 1));
    return array;
  }

  const ensureArray = val => (utils.isArray(val) ? val : [val]);

  function uniq(array) {
    const arr = [];

    array.forEach(it => {
      if (arr.indexOf(it) === -1) {
        arr.push(it);
      }
    });

    return arr;
  }

  function uniqWith(array, comparator) {
    const arr = [];

    array.forEach(it => {
      let flag = false;
      for (const item of arr) {
        if (comparator(item, it)) {
          flag = true;
          break;
        }
      }

      if (!flag) {
        arr.push(it);
      }
    });

    return arr;
  }

  exports.__GLOBAL__ = __GLOBAL__;
  exports.byte2text = byte2text;
  exports.checkElementVisible = checkElementVisible;
  exports.clamp = clamp;
  exports.createEvent = createEvent;
  exports.createRandString = createRandString;
  exports.datetime = datetime;
  exports.decimalPrecision = decimalPrecision;
  exports.defer = defer;
  exports.delay = delay;
  exports.dumpFn = dumpFn;
  exports.ensureArray = ensureArray;
  exports.form2obj = form2obj;
  exports.formatString = formatString;
  exports.getCurrentParent = getCurrentParent;
  exports.getDateCountDown = getDateCountDown;
  exports.getDateStringFirst = getDateStringFirst;
  exports.getDocScrollOffset = getDocScrollOffset;
  exports.getFirstTruthyOrZero = getFirstTruthyOrZero;
  exports.getGlobal = getGlobal;
  exports.getNamePathValue = getNamePathValue;
  exports.getPortalsNode = getPortalsNode;
  exports.getProtoStr = getProtoStr;
  exports.getRandRange = getRandRange;
  exports.getScrollBarWidth = getScrollBarWidth;
  exports.getScrollParent = getScrollParent;
  exports.getStorage = getStorage;
  exports.getStyle = getStyle;
  exports.hasScroll = hasScroll;
  exports.heightLightMatchString = heightLightMatchString;
  exports.idCardRegexp = idCardRegexp;
  exports.isArray = isArray;
  exports.isBetweenDate = isBetweenDate;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isDom = isDom;
  exports.isEmpty = isEmpty;
  exports.isError = isError;
  exports.isFunction = isFunction;
  exports.isInt = isInt;
  exports.isNull = isNull;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isNumber = isNumber;
  exports.isNumerical = isNumerical;
  exports.isObject = isObject;
  exports.isPrimitive = isPrimitive;
  exports.isRegExp = isRegExp;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.isTrueEmpty = isTrueEmpty;
  exports.isTruthyArray = isTruthyArray;
  exports.isTruthyOrZero = isTruthyOrZero;
  exports.isUndefined = isUndefined;
  exports.isWeakNumber = isWeakNumber;
  exports.move = move;
  exports.obj2FormData = obj2FormData;
  exports.omit = omit;
  exports.padSingleNumber = padSingleNumber;
  exports.parseDate = parseDate;
  exports.pick = pick;
  exports.promisify = promisify;
  exports.replaceHtmlTags = replaceHtmlTags;
  exports.retry = retry;
  exports.setDocScrollOffset = setDocScrollOffset;
  exports.setNamePathValue = setNamePathValue;
  exports.setStorage = setStorage;
  exports.shakeFalsy = shakeFalsy;
  exports.stringifyNamePath = stringifyNamePath;
  exports.subtract = subtract;
  exports.sum = sum;
  exports.swap = swap;
  exports.throwError = throwError;
  exports.throwWarning = throwWarning;
  exports.triggerHighlight = triggerHighlight;
  exports.unFormatString = unFormatString;
  exports.uniq = uniq;
  exports.uniqWith = uniqWith;
  exports.validateFormatString = validateFormatString;
  exports.vie = vie;
  exports.weakNumber = weakNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
