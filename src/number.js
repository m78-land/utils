import { isNumber, isWeakNumber } from './is';

export function getRandRange(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

export function decimalPrecision(num, precision = 1) {
  const mid = +`1${Array.from({ length: precision })
    .map(() => '0')
    .join('')}`;

  return Math.round(num * mid) / mid;
}

export function sum(...nums) {
  return nums.reduce((p, i) => {
    return p + (isWeakNumber(i) ? Number(i) : 0);
  }, 0);
}

export function subtract(...nums) {
  return nums.reduce((p, i) => {
    if (p === null) return i;
    if (!isWeakNumber(i)) return p;
    return p - i;
  }, null);
}

export function weakNumber(arg) {
  return isWeakNumber(arg) ? Number(arg) : null;
}

export function clamp(val, min, max) {
  if (isNumber(min) && val < min) return min;
  if (isNumber(max) && val > max) return max;
  return val;
}
