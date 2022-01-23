import { isArray } from './is';

export function swap(arr, sourceInd, targetInd) {
  if (sourceInd < 0 || targetInd < 0) return arr;
  if (sourceInd > arr.length - 1 || targetInd > arr.length - 1) return arr;
  arr.splice(targetInd, 1, arr.splice(sourceInd, 1, arr[targetInd])[0]);
  return arr;
}

export function move(array, form, to) {
  if (form < 0 || to < 0) return array;
  if (form > array.length - 1 || to > array.length - 1) return array;
  array.splice(to, 0, ...array.splice(form, 1));
  return array;
}

export const ensureArray = val => (isArray(val) ? val : [val]);

export function uniq(array) {
  const arr = [];

  array.forEach(it => {
    if (arr.indexOf(it) === -1) {
      arr.push(it);
    }
  });

  return arr;
}

export function uniqWith(array, comparator) {
  const arr = [];

  array.forEach(it => {
    let flag = false;
    for (const item of arr) {
      if (comparator(item, it)) {
        flag = true;
        break;
      }
    }

    if (!flag) {
      arr.push(it);
    }
  });

  return arr;
}
