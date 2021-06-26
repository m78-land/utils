export function replaceHtmlTags(str = '', val = '') {
  const reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
  return str.replace(reg, val);
}

export function createRandString(number = 1) {
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

export const byte2text = (byte, conf) => {
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

export function heightLightMatchString(str, regExp, conf) {
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
