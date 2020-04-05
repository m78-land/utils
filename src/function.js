/**
 * 将一个优先错误且回调位于最后一个参数的node风格的callback函数转为return Promise的函数
 * @param {function} fn - 要包装的函数
 * @param {object} receiver - 要绑定作用域的对象
 * @return {function(...[*]): Promise<unknown>}
 */
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

/**
 * 一个延迟指定时间后resolve的Promise
 * @param {number} time [2000] - 指定延迟时间
 * @param {object} options
 * @param {boolean} options.isReject - 为true时reject Promise
 * @param {boolean} options.value - 指定resolve或reject时的值
 * @return Promise
 */
export function delay(time = 2000, { isReject, value } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isReject ? reject(value) : resolve(value);
    }, time);
  });
}

export const dumpFn = (...arg) => arg;