import { isString } from '@lxjx/utils';

export const shakeFalsy = source => {
  Object.keys(source).forEach(key => {
    const val = source[key];
    if (!val && val !== 0) {
      delete source[key];
    }
  });
  return source;
};

export function omit(obj, props) {
  if (isString(props)) {
    props = props.split(',').map(key => key.trim());
  }
  const keys = Object.keys(obj);
  const result = {};
  keys.forEach(item => {
    if (props.indexOf(item) === -1) {
      result[item] = obj[item];
    }
  });
  return result;
}
