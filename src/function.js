
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

export function defer(fn, ...args) {
  return setTimeout(fn, 1, ...args)
}