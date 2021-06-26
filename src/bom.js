const storagePrefix = 'THIS_IS_A_UNIQUE_PREFIX_';

export function setStorage(key, val) {
  localStorage.setItem(`${storagePrefix}${key}`.toUpperCase(), JSON.stringify(val));
}

export function getStorage(key) {
  const s = localStorage.getItem(`${storagePrefix}${key}`.toUpperCase());

  if (!s) return null;

  return JSON.parse(s);
}
