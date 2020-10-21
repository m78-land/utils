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
