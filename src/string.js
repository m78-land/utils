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

