import { isString } from './is';
import { padSingleNumber } from './format';

/**
 * 根据传入规则格式化一个日期对象
 * @param {Date|string} date - 待转换的日期对象, 传入string时，将其作为format并设置date为当前时间
 * @param {string} format - 'YYYY、MM、DD、hh、mm、ss'组成的字符串
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
 * @param {string|Date} datestr - (YYYY-MM-DD hh:mm:ss / YYYY/MM/DD hh:mm:ss)
 * @returns {object} 格式化后的日期
 */
const oneMS = 100;
const oneS = oneMS * 10;
const oneM = 60 * oneS;
const oneH = 60 * oneM;
const oneD = 24 * oneH;
export function getDateCountDown(date) {
  if (!date) {
    return {
      ms: '00',
      s: '00',
      m: '00',
      h: '00',
      d: '00',
      timeOut: true,
    };
  }

  if (isString(date)) {
    date = Date.parse(date.replace(/-/g, '/')); // 兼容ios
  }

  const start = Date.now();
  const end = date;

  const diff = end - start;

  if(diff < 0) {
    return getDateCountDown();
  }

  const fr = Math.floor;

  // h、m、s 用单位总数取余就是该单位对应的ms，除单位总数获得单位
  let d = fr(diff / oneD);
  let h = fr(diff % oneD / oneH);
  let m = fr(diff % oneH / oneM);
  let s = fr(diff % oneM / oneS);
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
