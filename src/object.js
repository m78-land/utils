import { isString, isArray, isNumber, isNumerical, isObject } from '@lxjx/utils';

export const shakeFalsy = source => {
  Object.keys(source).forEach(key => {
    const val = source[key];
    if (!val && val !== 0) {
      delete source[key];
    }
  });
  return source;
};

function pickOrOmit(obj, props, isPick) {
  if (isString(props)) {
    props = props.split(',').map(key => key.trim());
  }
  const keys = Object.keys(obj);
  const result = {};
  keys.forEach(item => {
    const cond = isPick ? props.indexOf(item) !== -1 : props.indexOf(item) === -1;
    if (cond) {
      result[item] = obj[item];
    }
  });
  return result;
}

export function omit(obj, props) {
  return pickOrOmit(obj, props);
}

export function pick(obj, props) {
  return pickOrOmit(obj, props, true);
}

/** 根据NamePath在对象中获取值` */
export function getNamePathValue(obj, name) {
  if (isString(name)) {
    return obj?.[name];
  }

  if (isArray(name) && name.length) {
    return name.reduce((p, i) => {
      return p?.[i];
    }, obj);
  }
}

/** 将 ['user', 'name'], ['list', '0', 'title'] 格式的字段数组转换为字符串  */
export function stringifyNamePath(name) {
  if (isString(name)) return name;

  return name.reduce((p, i) => {
    if (isNumber(Number(i))) {
      return `${p}[${i}]`;
    }

    if (isString(i)) {
      return p.length ? `${p}.${i}` : i;
    }

    return p;
  }, '');
}

/** 在通过name在obj上设置值 */
export function setNamePathValue(obj, name, val) {
  if (isString(name)) {
    obj[name] = val;
  }

  if (isArray(name) && name.length) {
    let lastObj = obj;

    for (let i = 0; i < name.length; i++) {
      const n = name[i]; // 当前name
      const nextN = name[i + 1]; // 下一个name
      const hasNextN = nextN !== undefined; // 是否有下个

      if (!hasNextN) {
        if (isNumerical(n)) {
          lastObj.push(val);
        } else {
          lastObj[n] = val;
        }
        return;
      }

      // 确保要操作的对象存在
      if (isNumerical(nextN)) {
        if (!isArray(lastObj[n])) {
          lastObj[n] = [];
        }
        // 不是数字的话则为对象
      } else if (!isObject(lastObj[n])) {
        lastObj[n] = {};
      }

      lastObj = lastObj[n];
    }
  }
}
