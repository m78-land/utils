/* 获取指定区间内的随机数 */
export function getRandRange(min, max) {
  return Math.round((max - min) * Math.random() + min);
}
