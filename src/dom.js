import { isDom } from './index';

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

  /** 基础边界(用于窗口) */
  let yMinBase = 0;
  let xMinBase = 0;
  let yMaxBase = window.innerHeight;
  let xMaxBase = window.innerWidth;

  /** 元素边界(用于指定元素边界) */
  let yMin = yMinBase;
  let xMin = xMinBase;
  let yMax = yMaxBase;
  let xMax = xMaxBase;

  if (wrapEl) {
    const { top, left, bottom, right } = wrapEl.getBoundingClientRect();
    yMin += top;
    xMin += left;
    yMax -= yMax - bottom;
    xMax -= xMax - right; // 减去元素右边到视口右边
  }

  const { top, left, bottom, right } = el.getBoundingClientRect();

  /** fullVisible检测 */
  const topPos = fullVisible ? top : bottom;
  const bottomPos = fullVisible ? bottom : top;
  const leftPos = fullVisible ? left : right;
  const rightPos = fullVisible ? right : left;

  const elTopVisible = topPos > yMin;
  const winTopVisible = topPos > yMinBase;

  const elLeftVisible = leftPos > xMin;
  const winLeftVisible = leftPos > xMinBase;

  const elBottomVisible = bottomPos < yMax;
  const winBottomVisible = bottomPos < yMaxBase;

  const elRightVisible = rightPos < xMax;
  const winRightVisible = rightPos < xMaxBase;

  const topVisible = elTopVisible && winTopVisible;
  const leftVisible = elLeftVisible && winLeftVisible;
  const bottomVisible = elBottomVisible && winBottomVisible;
  const rightVisible = elRightVisible && winRightVisible;

  return {
    visible: topVisible && leftVisible && rightVisible && bottomVisible,
    top: topVisible,
    left: leftVisible,
    right: rightVisible,
    bottom: bottomVisible,
  }
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

export function getCurrentParent(node, matcher, depth) {
  let hasMatch = false;

  let cDepth = 0;

  function recur(n) {
    if (depth) {
      cDepth++;
      if (cDepth === depth) return;
    }

    if (!n) {
      return;
    }
    const pNode = n.parentNode;

    if (pNode) {
      const res = matcher(pNode);
      if (res) {
        hasMatch = true;
        return;
      }
    }

    recur(pNode);
  }

  recur(node);

  return hasMatch;
}

export function getFirstScrollParent(ele) {
  let node = null;

  function handle(el) {
    const parent = el.parentNode;

    if (parent) {
      const e = parent;
      const h = e.clientHeight;
      const sH = e.scrollHeight;

      if (sH > h) {
        const { overflow } = getStyle(e);

        /* body和html元素不需要执行下面检测 */
        if (e === document.documentElement || e === document.body) {
          node = e;
          return;
        }

        if (overflow === 'scroll' || overflow === 'auto') {
          node = e;
          return;
        }
      }

      handle(e);
    } else {
      // 无匹配
    }
  }

  handle(ele);

  return node;
}
