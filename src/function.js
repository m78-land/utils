
export function promisify(fn, receiver) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [
        ...args,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      ]);
    });
  };
}

export function delay(ms, payload) {
  return new Promise((res, rej) => {
    setTimeout(() => (payload instanceof Error ? rej(payload) : res(payload)), ms);
  });
}

export const dumpFn = (...arg) => arg;

export const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

const defaultConfig = {
  rate: 0.2,
};

export function retry(handle, delay, config) {
  const { maxDelay, rate, fixed, maxRetry } = { ...defaultConfig, ...config };

  let t;
  const clear = () => t && clearTimeout(t);

  const res = handle();
  if (!res) return clear;

  let d = delay;
  let count = 1;

  const trigger = () => {
    t = setTimeout(() => {
      if (handle()) {
        if (maxRetry && maxRetry === count) return;
        if (!fixed) {
          const nextD = count * rate * delay + d;
          d = maxDelay ? Math.min(nextD, maxDelay) : nextD;
        }
        count++;
        trigger();
      }
    }, d);
  };

  trigger();

  return clear;
}

export function throwError(msg, prefix) {
  throw new Error(`${prefix ? `${prefix}::` : ''}ERROR: ${msg}`);
}

export function throwWarning(msg, prefix) {
  console.warn(`${prefix ? `${prefix}::` : ''}Warning: ${msg}`);
}
