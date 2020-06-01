export function replaceHtmlTags(str = '', val = '') {
  const reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
  return str.replace(reg, val);
}

export function createRandString(number = 1) {
  return Array.from({ length: number }).reduce(prev => {
    return (
      prev +
      Math.random()
        .toString(36)
        .substr(2)
    );
  }, '');
}

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;
const TB = GB * 1024;
export const byte2text = (byte) => {
  let s = `${(byte / KB).toFixed(2)}K`;

  if (byte >= TB) {
    s = `${(byte / TB).toFixed(2)}T`;
  } else if (byte >= GB) {
    s = `${(byte / GB).toFixed(2)}G`;
  } else if (byte >= KB * 200) {
    s = `${(byte / MB).toFixed(2)}M`;
  }

  return s;
};
