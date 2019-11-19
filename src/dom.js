/** 获取一个用于挂载Portals或动态弹窗等内容的节点, 多次调用时会获取到相同的节点 */
const portalsID = 'J__PORTALS__NODE';
export const getPortalsNode = () => {
  let portalsEl = document.getElementById(portalsID);

  if (!portalsEl) {
    const el = document.createElement('div');
    el.id = portalsID;
    el.setAttribute('warning', '⛔⛔HIGH ENERGY⛔⛔');
    portalsEl = document.body.appendChild(el);
  }
  return portalsEl;
};
