/* 去掉html字符中的标签，返回纯文本 */
export function replaceTags(str = '') {
  const reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
  return str.replace(reg, '');
}
