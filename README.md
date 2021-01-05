# utils

## introduce
useful javascript util kit

<br>

## Installation
使用npm
```
npm install @lxjx/utils

```
使用yarn
```
yarn add @lxjx/utils
```

<br>


## Usage
```js
import { isEmpty } from '@lxjx/utils';

isEmpty({})   // => true
isEmpty([])   // => true

// or
import * as utils from '@lxjx/utils';

utils.isEmpty({})   // => true
utils.isEmpty([])   // => true
```

<br>

## Array

### swap

```ts
/** 
 * swap index of two items in array and return the original array
 * if the index is exceeded, no action is performed */
function swap<T = any>(
  arr: T, 
  sourceInd: number, 
  targetInd: number
): T
```

<br>
<br>


## Bom

### setStorage/getStorage

```ts
/** shortcut to the localStorage api, including automatic JSON.stringify and a spliced ​​unique prefix */
function setStorage(key: string, val: any): void;


/** shortcut of localStorage api, automatic JSON.parse, can only take the value set by setStorage */
function getStorage<T = any>(key: string): T | null;

```

<br>
<br>


## Date

### parseDate

```ts
/**
 * Receive a date string, timestamp (ms), date object, and return it after converting it into a date object, or return null if the conversion fails
 *  */
function parseDate(dateLike: any): Date | null;
```

<br>

### datetime

```ts
/**
 * format the date into readable date string
 * @param dateLike - new Date() | any time that can be parsed by parseDate(), default current time
 * @param format - 'YYYY-MM-DD hh:mm:ss' | custom format
 * @return - formatted date string, if date is invalid, return an empty string
 * @example
 datetime(); // => 2020-06-01 18:45:57
 datetime('2020-06-01 15:30:30', 'hh时mm分 YYYY年MM月'); // => 15时30分 2020年06月
 datetime(1591008308782, 'YY年MM月DD日'); // => 21年06月01日
 datetime('1591008308782'); // => ''
 datetime('hello'); // => ''
 datetime(new Date()); // => 2020-06-01 18:46:39
 */
function datetime(dateLike?: any, format?: string): string;
```

<br>

### getDateCountDown

```ts
/**
 * get d day, h hour, m minute, s second, ms millisecond between the current time and the specified time. If the current time exceeds the incoming time, all return to '00' and timeOut is true
 * @param dateLike - any time that can be parsed by parseDate()
 * @return count data
 */
function getDateCountDown(
  dateLike: any,
): {
  ms: string;
  s: string;
  m: string;
  h: string;
  d: string;
  /** is timeout */
  timeOut: boolean;
};
```

<br>

### getDateStringFirst

```ts
/** convert YYYY-MM-DD hh:mm:ss to YYYY-MM-DD */
function getDateStringFirst(dataString: string): string;
```

<br>

### isBetweenDate

```ts
/**
 * Whether the current time or the specified time is within a certain period of time
 * @param startDate - start time
 * @param endDate - end time
 * @param currentDate - mid time, default is now
 * @return - whether within a time period
 * */
function isBetweenDate(startDate: any, endDate: any, currentDate?: any): boolean;

```


<br>
<br>


## Dom

### getPortalsNode

```ts
/**
 * get a dom, multiple calls will return the same dom
 * @param namespace - create a uniq node by namespace
 * @return - dom
 * */
function getPortalsNode(namespace?: string): HTMLDivElement;
```

<br>

### getScrollBarWidth

```ts
/**
 * get scrollbar width
 * @param nodeTarget - if some elements have customized the scroll bar through css, the width cannot be obtained correctly by page-level measurement. You can use this attribute to specify the node where the element to be measured is located
 * @return scroll bar width, generally 0 on mobile
 * */
function getScrollBarWidth(nodeTarget?: HTMLElement): number;

```

<br>

### getStyle

```ts
/**
 * get style value of dom element
 * @param dom - target dom
 * @return - an object containing all available style values, an null means not supported
 *  */
function getStyle(dom: HTMLElement): Partial<CSSStyleDeclaration>;
```

<br>

### checkElementVisible

```ts
/**
 * Whether element is visible in viewport
 * @param el - an element to be detected or an object that represents location information
 * @param option
 * @param option.fullVisible - false | default is to be completely invisible, and set to true to be invisible if element is partially occluded
 * @param option.wrapEl - By default, the viewport computes visibility through this specified element (viewport is still detected)
 * @param option.offset - Offset of visibility, specifying all directions for numbers, and specific directions for object
 * @return - Whether the overall visibility information and the specified direction does not exceed the visible boundary
 * */
function checkElementVisible(
  el: HTMLElement | {
    right: number;
    bottom: number;
    left: number;
    top: number;
  },
  option?: { fullVisible?: boolean; wrapEl?: HTMLElement; offset?: number | { left?: number; top?: number; right?: number; bottom?: number; } },
): {
  visible: boolean;
  top: boolean;
  left: boolean;
  right: boolean;
  bottom: boolean;
  bound: DOMRect;
};
```

<br>

### getCurrentParent

```ts
/**
 * Query the incoming Node for the presence of a specified node in all of its parent nodes
 * @param node - node to be queried
 * @param matcher - matcher, recursively receives the parent node and returns whether it matches
 * @param depth - maximum query depth
 * */
function getCurrentParent(
  node: Element,
  matcher: (node: Element) => boolean,
  depth?: number,
): boolean;
```

<br>

### triggerHighlight

```ts
interface TriggerHighlightConf {
  /** #1890ff | line color */
  color: string,
  /** true | use outline, if false use box-shadow */
  useOutline: boolean,
}

/**
 * highlight selected elements according to elements or selectors
 */
function triggerHighlight(target: HTMLElement, TriggerHighlightConf?: TriggerHighlightConf): void;
function triggerHighlight(selector: string, TriggerHighlightConf?: TriggerHighlightConf): void;
```

<br>

### getScrollParent

```ts
/**
 * get scrolling parent node, get all when pass getAll
 * when setting or getting scrollTop/scrollLeft on document.documentElement and document.body, the performance of different browsers will be inconsistent, so when the scroll element is document.documentElement or document.body, document.documentElement is returned uniformly for easy identification
 * */
function getScrollParent(ele: HTMLElement, getAll: true): HTMLElement[];
function getScrollParent(ele: HTMLElement, getAll?: false): HTMLElement | null;
```

<br>

### getDocScrollOffset

```ts
/** get doc scroll offset, used to solve the problem of different versions of the browser to get inconsistent */
function getDocScrollOffset(): {
  x: number;
  y: number;
}
```

<br>

### setDocScrollOffset

```ts
/** set doc scroll offset */
function setDocScrollOffset(conf: { x?: number; y?: number }): void;
```

<br>

### hasScroll

```ts
/** check whether the dom node is scrollable */
function hasScroll(el: HTMLElement): { x: boolean, y: boolean };
```
