import { padSingleNumber } from './format';

export function parseDate(date) {
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

export function datetime(date = new Date(), format = 'YYYY-MM-DD hh:mm:ss') {
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
export function getDateCountDown(date) {
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
    d: padSingleNumber(d),
    h: padSingleNumber(h),
    m: padSingleNumber(m),
    s: padSingleNumber(s),
    ms: padSingleNumber(ms),
    timeOut: false,
  };
}

export function getDateStringFirst(dataString = '') {
  if (!dataString) return '';
  return dataString.split(' ')[0];
}

export function isBetweenDate(startDate, endDate, currentDate) {
  const s = parseDate(startDate);
  const e = parseDate(endDate);

  if (!s || !e) return false;

  const c = currentDate ? parseDate(currentDate) : new Date();

  return c <= e && c >= s;
}
