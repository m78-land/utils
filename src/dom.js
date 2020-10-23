const portalsID = 'J__PORTALS__NODE__';
export const getPortalsNode = (namespace) => {
  const id = portalsID + (namespace ? namespace.toLocaleUpperCase() : 'DEFAULT');

  let portalsEl = document.getElementById(id);

  if (!portalsEl) {
    const el = document.createElement('div');
    el.id = id;
    portalsEl = document.body.appendChild(el);
  }
  return portalsEl;
};

export function getScrollBarWidth(nodeTarget) {
  const node = nodeTarget || document.body;

  // Create the measurement node
  const scrollDiv = document.createElement('div');
  scrollDiv.style.overflow = 'scroll';
  node.appendChild(scrollDiv);

  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV
  node.removeChild(scrollDiv);

  return scrollbarWidth;
}

export function getStyle(dom) {
  if (!dom) return {};
  if (!dom.currentStyle && !window.getComputedStyle) return {};
  return dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom);
}

export function checkElementVisible(
  el,
  option = {},
) {
  const { fullVisible = false, wrapEl } = option;
  let yMin = 0;
  let xMin = 0;
  let yMax = window.innerHeight;
  let xMax = window.innerWidth;

  if (wrapEl) {
    const { top, left, bottom, right } = wrapEl.getBoundingClientRect();
    yMin += top;
    xMin += left;
    yMax -= yMax - bottom;
    xMax -= xMax - right; // 减去元素右边到视口右边
  }

  const { top, left, bottom, right } = el.getBoundingClientRect();

  const bottomPass = (fullVisible ? bottom : top) < yMax;
  const topPass = (fullVisible ? top : bottom) > yMin;
  const leftPass = (fullVisible ? left : right) > xMin;
  const rightPass = (fullVisible ? right : left) < xMax;

  return topPass && rightPass && bottomPass && leftPass;
}

export function triggerHighlight(t, color) {
  if (isDom(t)) {
    mountHighlight(t, color);
  } else {
    const temp = document.querySelectorAll(t);
    if (temp.length) {
      Array.from(temp).forEach(item => mountHighlight(item, color));
    }
  }
}

function mountHighlight(target, color = '#1890ff') {
  target.style.boxShadow = `0 0 0 4px ${color}`;

  function clickHandle() {
    target.style.boxShadow = '';

    document.removeEventListener('click', clickHandle);
  }

  document.addEventListener('click', clickHandle);
}