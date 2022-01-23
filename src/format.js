/**
 * 将小于10且大于0的数字转为填充0的字符 如 '01' '05', 小于1的数字始终返回'00'
 * @param {number} number
 */
import { isTruthyOrZero } from './is';

export function padSingleNumber(number) {
  if (number < 1) {
    return '00';
  }

  if (number < 10) {
    return '0' + String(number);
  }

  return String(number);
}

/* 以指定规则格式化字符 */

export const validateFormatString = /^(\s?\d\s?,?)+$/;

const defaultConfig = {
  delimiter: ' ',
  repeat: false,
  lastRepeat: false,
  reverse: false,
};

function getPatterns(str, pattern, options = {}) {
  const { repeat, lastRepeat, reverse } = { ...defaultConfig, ...options };

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
  const strArr = reverse ? str.split('').reverse() : str.split('');

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

export function formatString(str, pattern, options = {}) {
  const opt = { ...defaultConfig, ...options };
  const patternMeta = getPatterns(str, pattern, opt);

  if (!patternMeta) return;

  const { patterns, strArr } = patternMeta;

  patterns.reduce((prevPattern, _pattern, ind) => {
    const currentIndex = prevPattern + Number(_pattern);

    // 替换位置为 前面所有pattern + 当前pattern + 已匹配次数
    const replaceIndex = currentIndex + ind;

    if (replaceIndex < strArr.length) {
      strArr.splice(replaceIndex, 0, opt.delimiter);
    }

    return currentIndex;
  }, 0);

  return opt.reverse ? strArr.reverse().join('') : strArr.join('');
}

export function unFormatString(str, pattern, options = {}) {
  const opt = { ...defaultConfig, ...options };
  const { delimiter } = opt;
  const patternMeta = getPatterns(str, pattern, opt);

  if (!patternMeta) return;

  const { patterns, strArr } = patternMeta;

  patterns.reduce((prev, pt) => {
    const index = Number(pt) + prev;

    /* 只在字符首位匹配时才执行替换, 在某些场景会有用（fr的input处理双向绑定时） */
    if (strArr[index] === delimiter[0]) {
      strArr.splice(index, delimiter.length);
    }

    return index;
  }, 0);

  return opt.reverse ? strArr.reverse().join('') : strArr.join('');
}

export function getFirstTruthyOrZero(...args) {
  for (const arg of args) {
    if (isTruthyOrZero(arg)) {
      return arg;
    }
  }
  return false;
}

export function vie(arg, feedback = '-') {
  return isTruthyOrZero(arg) ? arg : feedback;
}
