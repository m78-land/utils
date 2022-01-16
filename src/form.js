import { isDom } from '@lxjx/utils';

/**
 * 收集指定对象内带name属性的所有输入控件(input,select,textarea)的值，并按一定规则整合
 * checkbox: 选中值的value组成的数组，没有的话返回 []
 * radio: 选中项的value，没有value的话作为默认行为浏览器会返回 "on"
 * file: 选择的文件组成的数组，没有的话返回 []
 * 其他: 表单元素的value属性值
 * @param {Element} el
 * @returns {object}
 */
export function form2obj(el) {
  if (!isDom(el)) {
    console.error('Please pass in the dom element');
    return;
  }
  if (!el.querySelectorAll) {
    console.error('The passed in element does not support the querySelectorAll API');
    return;
  }
  const tempObj = {};
  let inputs = el.querySelectorAll('input[name],select[name],textarea[name]');
  inputs = Array.prototype.slice.call(inputs);
  inputs.forEach(v => {
    // name => ""
    if (!v.name) return;

    if (v.type === 'radio' || v.type === 'checkbox') {
      if (!tempObj[v.name]) tempObj[v.name] = v.type === 'checkbox' ? [] : '';
    }
    if (v.type === 'radio') {
      v.checked && (tempObj[v.name] = v.value);
    } else if (v.type === 'checkbox') {
      v.checked && tempObj[v.name].push(v.value);
    } else if (v.type === 'file') {
      tempObj[v.name] = Array.prototype.slice.call(v.files);
    } else {
      tempObj[v.name] = v.value;
    }
  });

  return tempObj;
}

/**
 * 将一个object转为对应键值对的 FormData 对象
 * @param {object} obj
 * @returns {FormData}
 */
export function obj2FormData(obj) {
  const keys = Object.keys(obj);
  const form = new FormData();

  keys.forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(val => {
        // form.append(`${key}[]`, val)
        form.append(key, val);
      });
    } else if (obj[key]) {
      form.append(key, obj[key]);
    }
  });

  return form;
}
