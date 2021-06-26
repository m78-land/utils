export function swap(arr, sourceInd, targetInd) {
  if (sourceInd < 0 || targetInd < 0) return arr;
  if (sourceInd > arr.length - 1 || targetInd > arr.length - 1) return arr;
  arr.splice(targetInd, 1, arr.splice(sourceInd, 1, arr[targetInd])[0]);
  return arr;
}
