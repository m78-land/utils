
export function getRandRange(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

export function decimalPrecision(num, precision = 1) {
  const mid = +`1${Array.from({ length: precision })
    .map(() => '0')
    .join('')}`;

  return Math.round(num * mid) / mid;
}
