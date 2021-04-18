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

export function getScrollBarWidth(className) {

  // Create the measurement node
  const scrollEl = document.createElement('div');
  if (className) scrollEl.className = className;
  scrollEl.style.overflow = 'scroll';
  scrollEl.style.height = '200px';
  scrollEl.style.width = '200px';

  document.body.appendChild(scrollEl);

  const size = scrollEl.offsetWidth - scrollEl.clientWidth;

  document.body.removeChild(scrollEl);

  // Get the scrollbar width
  return size;
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

export function triggerHighlight(t, conf) {
  if (isDom(t)) {
    mountHighlight(t, conf);
  } else {
    const temp = document.querySelectorAll(t);
    if (temp.length) {
      Array.from(temp).forEach(item => mountHighlight(item, conf));
    }
  }
}

const mountHighlightDefaultConf = {
  color: '#1890ff',
  useOutline: true,
}

function mountHighlight(target, conf = {}) {
  const cf = {
    ...mountHighlightDefaultConf,
    ...conf,
  }

  if (cf.useOutline) {
    target.style.outline = `1px auto ${cf.color}`;
  } else {
    target.style.boxShadow = `0 0 0 4px ${cf.color}`;
  }

  function clickHandle() {
    if (cf.useOutline) {
      target.style.outline = '';
    } else {
      target.style.boxShadow = '';
    }

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

export function getScrollParent(ele, getAll) {
  let node = getAll ? [] : null;

  function handle(el) {
    const parent = el.parentNode;

    if (parent) {
      const e = parent;
      const h = e.clientHeight;
      const sH = e.scrollHeight;

      if (sH > h) {
        const isRoot = e === document.documentElement || e === document.body;
        const scrollStatus = hasScroll(e);

        // 为body或doc时，统一取documentElement方便识别，部分浏览器支持body设置document.scrollXxx部分浏览器支持documentElement设置
        const el = isRoot ? document.documentElement : e;

        /* body和html元素不需要检测滚动属性 */
        if (isRoot || scrollStatus.x || scrollStatus.y) {
          if (getAll) {
            if (isRoot) {
              node.indexOf(document.documentElement) === -1 && node.push(el);
            } else {
              node.push(el);
            }
          } else {
            node = el;
            return;
          }
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
    // Math.ceil用于解决高分屏缩放时的滚动位置小数问题
    x: Math.ceil(doc.scrollLeft + body.scrollLeft),
    y: Math.ceil(doc.scrollTop + body.scrollTop),
  };
}

export function setDocScrollOffset(conf = {}) {
  if (isNumber(conf.x)) {
    document.body.scrollLeft = document.documentElement.scrollLeft = conf.x;
  }

  if (isNumber(conf.y)) {
    document.body.scrollTop = document.documentElement.scrollTop = conf.y;
  }
}


export function hasScroll(el) {
  let x = Math.max(0, el.scrollWidth - el.clientWidth) > 0;
  let y = Math.max(0, el.scrollHeight - el.clientHeight) > 0;

  if (el === document.documentElement || el === document.body) {

  } else {
    const { overflowX, overflowY } = getStyle(el);
    if (overflowX !== 'scroll' && overflowX !== 'auto') {
      x = false;
    }
    if (overflowY !== 'scroll' && overflowY !== 'auto') {
      y = false;
    }
  }

  return {
    x,
    y,
  }
}
