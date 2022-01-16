export function getGlobal() {
  // eslint-disable-next-line no-restricted-globals
  if (typeof self !== 'undefined') {
    // eslint-disable-next-line no-restricted-globals
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
}

export const __GLOBAL__ = getGlobal();

export function createEvent() {
  const listeners = [];

  function on(listener) {
    listeners.push(listener);
  }

  function off(listener) {
    const ind = listeners.indexOf(listener);
    if (ind !== -1) listeners.splice(ind, 1);
  }

  function emit(...args) {
    listeners.forEach(listener => listener(...args));
  }

  return {
    on,
    off,
    emit,
  };
}
