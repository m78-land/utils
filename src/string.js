/* 去掉html字符中的标签，返回纯文本 */
export function replaceTags(str = '') {
  const reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
  return str.replace(reg, '');
}

/**
 *  生成一段随机字符
 *  @param number - 随机串的倍数，默认1倍，随机字符长度为10为
 *  @return string
 *  */
export function createRandString(number = 1) {
  return Array.from({ length: number }).reduce((prev) => {
    return prev + Math.random().toString(36).substr(2);
  }, '');
}

/* 以指定规则格式化字符 */

export const validateFormatString = /^(\s?\d\s?,?)+$/;

const defaultConfig = {
  delimiter: ' ',
  repeat: false,
  lastRepeat: false,
};

function getPatterns(str, pattern, options = {}) {
  const { repeat, lastRepeat } = { ...defaultConfig, ...options };

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
      const currentIndex = prevIndex + Number(index);
      return currentIndex;
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
export function formatString(str, pattern, options = {}) {
  const { delimiter, repeat, lastRepeat } = { ...defaultConfig, ...options };
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
export function unFormatString(str, pattern, options = {}) {
  const { delimiter, repeat, lastRepeat } = { ...defaultConfig, ...options };
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
/**
 * Generate RFC-compliant UUIDs
 * @return {String}
 */
export const uuidV4 = uuidv4;
