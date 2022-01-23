import { isDom, isNumber } from './is';
import { clamp } from './number';

const portalsID = 'J__PORTALS__NODE__';
export const getPortalsNode = namespace => {
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
  scrollEl.style.border = '2px solid red';

  document.body.appendChild(scrollEl);

  let wSize = scrollEl.offsetWidth - scrollEl.clientWidth;
  let hSize = scrollEl.offsetWidth - scrollEl.clientWidth;

  const sty = getStyle(scrollEl);

  if (sty) {
    const trimPXStr = s => s.replace(/px/, '');
    wSize = wSize - trimPXStr(sty.borderLeftWidth) - trimPXStr(sty.borderRightWidth);
    hSize = hSize - trimPXStr(sty.borderTopWidth) - trimPXStr(sty.borderBottomWidth);
  }

  document.body.removeChild(scrollEl);

  // Get the scrollbar width
  return [wSize, hSize];
}

export function getStyle(dom) {
  if (!dom) return {};
  if (!dom.currentStyle && !window.getComputedStyle) return {};
  return dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom);
}

export function checkElementVisible(target, option = {}) {
  const { fullVisible = false, wrapEl, offset = 0 } = option;

  const ofs = getOffsetObj(offset);

  // 核心是判定视口的可用区域所在的框，再检测元素是否在这个框坐标内

  /** 基础边界(用于窗口) */
  const yMinBase = 0;
  const xMinBase = 0;
  const yMaxBase = window.innerHeight;
  const xMaxBase = window.innerWidth;

  /** 有效边界 */
  let aYMin = yMinBase;
  let aXMin = xMinBase;
  let aYMax = yMaxBase;
  let aXMax = xMaxBase;

  // 需要同时检测是否超出窗口、所在容器
  if (wrapEl) {
    const { top, left, bottom, right } = wrapEl.getBoundingClientRect();

    const yMin = yMinBase + top;
    const xMin = xMinBase + left;
    const yMax = bottom;
    const xMax = right; // 减去元素右边到视口右边

    // 有效区域左上取最小值，最小不小于0
    // 有效区域右下取最大值，最大不大于窗口对应方向尺寸
    aXMin = clamp(Math.max(xMinBase, xMin), xMinBase, xMaxBase);
    aYMin = clamp(Math.max(yMinBase, yMin), yMinBase, yMaxBase);
    aXMax = clamp(Math.min(xMaxBase, xMax), xMinBase, xMaxBase);
    aYMax = clamp(Math.min(yMaxBase, yMax), yMinBase, yMaxBase);
  }

  const bound = isDom(target) ? target.getBoundingClientRect() : target;

  const { top, left, bottom, right } = offsetCalc(bound, ofs);

  /** fullVisible检测 */
  const topPos = fullVisible ? top : bottom;
  const bottomPos = fullVisible ? bottom : top;
  const leftPos = fullVisible ? left : right;
  const rightPos = fullVisible ? right : left;

  // 指定方向是否包含有效尺寸
  const xFalse = aXMax === aXMin;
  const yFalse = aYMax === aYMin;

  const topVisible = yFalse ? false : topPos >= aYMin;
  const leftVisible = xFalse ? false : leftPos >= aXMin;
  const bottomVisible = yFalse ? false : bottomPos <= aYMax;
  const rightVisible = xFalse ? false : rightPos <= aXMax;

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
};

function mountHighlight(target, conf = {}) {
  const cf = {
    ...mountHighlightDefaultConf,
    ...conf,
  };

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
    document.removeEventListener('keydown', clickHandle);
  }

  document.addEventListener('click', clickHandle);
  document.addEventListener('keydown', clickHandle);
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
        const element = isRoot ? document.documentElement : e;

        /* body和html元素不需要检测滚动属性 */
        if (isRoot || scrollStatus.x || scrollStatus.y) {
          if (getAll) {
            if (isRoot) {
              node.indexOf(document.documentElement) === -1 && node.push(element);
            } else {
              node.push(element);
            }
          } else {
            node = element;
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
    // eslint-disable-next-line no-multi-assign
    document.body.scrollLeft = document.documentElement.scrollLeft = conf.x;
  }

  if (isNumber(conf.y)) {
    // eslint-disable-next-line no-multi-assign
    document.body.scrollTop = document.documentElement.scrollTop = conf.y;
  }
}

export function hasScroll(el) {
  let x = Math.max(0, el.scrollWidth - el.clientWidth) > 0;
  let y = Math.max(0, el.scrollHeight - el.clientHeight) > 0;

  if (el === document.documentElement || el === document.body) {
    // ...
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
  };
}
