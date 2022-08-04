import { padSingleNumber } from "./format.js";

/**
 * Receive a date string, timestamp (ms), date object, and return it after converting it into a date object, or return null if the conversion fail
 *  */
export function parseDate(date: any): Date | null {
  let d = date;
  if (typeof date === "string") {
    d = date.replace(/-/g, "/"); // Safari无法解析 2020-01-01 格式的日期
  }
  d = new Date(d);

  // 处理Invalid Date
  if (d instanceof Date && isNaN(d.getTime())) {
    return null;
  }

  return d;
}

/**
 * format the date into readable date string
 * @param date - new Date() | any time(string/date object/timestamp .etc) that can be parsed by parseDate(), default current time
 * @param format - 'YYYY-MM-DD hh:mm:ss' | custom format
 * @return - formatted date string, if date is invalid, return an empty string
 * @example
 datetime(); // => 2020-06-01 18:45:57
 datetime('2020-06-01 15:30:30', 'hh时mm分 YYYY年MM月'); // => 15时30分 2020年06月
 datetime(1591008308782, 'YY年MM月DD日'); // => 21年06月01日
 datetime('1591008308782'); // => ''
 datetime('hello'); // => ''
 datetime(new Date()); // => 2020-06-01 18:46:39
 */
export function datetime(date = new Date(), format = "YYYY-MM-DD hh:mm:ss") {
  const d = parseDate(date);

  if (!d) {
    return "";
  }

  const fn = (d) => {
    return ("0" + d).slice(-2);
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

  return format.replace(/([a-z])\1+/gi, (a) => {
    return formats[a] || a;
  });
}

const oneMS = 100;
const oneS = oneMS * 10;
const oneM = 60 * oneS;
const oneH = 60 * oneM;
const oneD = 24 * oneH;

/**
 * get d day, h hour, m minute, s second, ms millisecond between the current time and the specified time. If the current time exceeds the incoming time, all return to '00' and timeOut is true
 * @param date - any time that can be parsed by parseDate()
 * @return count data
 */
export function getDateCountDown(date?: any) {
  const dt = parseDate(date);

  if (!dt) {
    return {
      ms: "00",
      s: "00",
      m: "00",
      h: "00",
      d: "00",
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
  const d = fr(diff / oneD);
  const h = fr((diff % oneD) / oneH);
  const m = fr((diff % oneH) / oneM);
  const s = fr((diff % oneM) / oneS);
  const ms = fr(diff % oneMS);

  return {
    d: padSingleNumber(d),
    h: padSingleNumber(h),
    m: padSingleNumber(m),
    s: padSingleNumber(s),
    ms: padSingleNumber(ms),
    timeOut: false,
  };
}

/**
 * Whether the current time or the specified time is within a certain period of time
 * @param startDate - start time
 * @param endDate - end time
 * @param currentDate - mid time, default is now
 * @return - whether within a time period
 * */
export function isBetweenDate(startDate: any, endDate: any, currentDate: any) {
  const s = parseDate(startDate);
  const e = parseDate(endDate);

  if (!s || !e) return false;

  if (currentDate) {
    const c = parseDate(currentDate);
    if (!c) return false;

    return c <= e && c >= s;
  }

  const c = new Date();

  return c <= e && c >= s;
}
