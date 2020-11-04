import { isDom, isNumber } from './index';

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
  target,
  option = {},
) {
  const { fullVisible = false, wrapEl, offset = 0 } = option;

  const ofs = getOffsetObj(offset);

  /** 基础边界(用于窗口) */
  const yMinBase = 0;
  const xMinBase = 0;
  const yMaxBase = window.innerHeight;
  const xMaxBase = window.innerWidth;

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

  const bound = isDom(target) ? target.getBoundingClientRect() : target;

  const { top, left, bottom, right } = offsetCalc(bound, ofs);

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
    bound,
  };
}

/** 用于checkElementVisible获取offset四个方向的值 */
function getOffsetObj(offset) {
  const ofs = { left: 0, top: 0, right: 0, bottom: 0 };

  if (!offset) return ofs;

  if (isNumber(offset)) {
    return { left: offset, top: offset, right: offset, bottom: offset };
  }

  Object.keys(ofs).forEach(key => {
    if (isNumber(offset[key])) {
      ofs[key] = offset[key];
    }
  });

  return ofs;
}

/** 用于checkElement，计算offset对象和当前位置对象的最终值 */
function offsetCalc(bound, offset) {
  return {
    top: bound.top - offset.top,
    left: bound.left - offset.left,
    right: bound.right + offset.right,
    bottom: bound.bottom + offset.bottom,
  };
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
  target.style.boxShadow = `0 0 0 4px ${ color }`;

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


export function getDocScrollOffset() {
  const doc = document.documentElement;
  const body = document.body;

  return {
    x: doc.scrollLeft + body.scrollLeft,
    y: doc.scrollTop + body.scrollTop,
  };
}
