/**
 * 去掉对象falsy值(除了0)(使用delete确保返回原对象)
 * @param { object } source
 * @return { object } 返回原对象
 */
export const shakeFalsy = (source) => {
  Object.keys(source).forEach((key) => {
    const val = source[key];
    if(!val && val !== 0) {
      delete source[key];
    }
  });
  return source;
};
