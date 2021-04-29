/// <reference types="node" />

export interface AnyObject {
  [key: string]: any;
}

export interface AnyFunction {
  (...arg: Array<any>): any;
}

export type TupleNumber = [number, number];

export interface Bound {
  left: number;
  top: number;
  bottom: number;
  right: number;
}

export interface BoundWithSize {
  left: number;
  top: number;
  width: number;
  height: number;
}

/* ======================== array ======================= */
/**
 * swap index of two items in array and return the original array
 * if the index is exceeded, no action is performed */
export function swap<T = any>(arr: T, sourceInd: number, targetInd: number): T;




/* ======================== bom ======================= */
/** shortcut to the localStorage api, including automatic JSON.stringify and a spliced ​​unique prefix */
export function setStorage(key: string, val: any): void;

/** shortcut of localStorage api, automatic JSON.parse, can only take the value set by setStorage */
export function getStorage<T = any>(key: string): T | null;





/* ======================== date ======================= */

/**
 * Receive a date string, timestamp (ms), date object, and return it after converting it into a date object, or return null if the conversion fails
 *  */
export function parseDate(dateLike: any): Date | null;

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
export function datetime(dateLike?: any, format?: string): string;

/**
 * get d day, h hour, m minute, s second, ms millisecond between the current time and the specified time. If the current time exceeds the incoming time, all return to '00' and timeOut is true
 * @param dateLike - any time that can be parsed by parseDate()
 * @return count data
 */
export function getDateCountDown(
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

/** convert YYYY-MM-DD hh:mm:ss to YYYY-MM-DD */
export function getDateStringFirst(dataString: string): string;

/**
 * Whether the current time or the specified time is within a certain period of time
 * @param startDate - start time
 * @param endDate - end time
 * @param currentDate - mid time, default is now
 * @return - whether within a time period
 * */
export function isBetweenDate(startDate: any, endDate: any, currentDate?: any): boolean;





/* ======================== dom ======================= */

/**
 * get a dom, multiple calls will return the same dom
 * @param namespace - create a uniq node by namespace
 * @return - dom
 * */
export function getPortalsNode(namespace?: string): HTMLDivElement;

/**
 * get scrollbar width
 * @param className - If the element customizes the scroll bar through css, pass in the class name for customization
 * @return scroll - bar [x, y] width, generally 0 on mobile, unless you customize the scroll bar
 * */
export function getScrollBarWidth(className?: string): TupleNumber;

/**
 * get style value of dom element
 * @param dom - target dom
 * @return - an object containing all available style values, an null means not supported
 *  */
export function getStyle(dom: HTMLElement): Partial<CSSStyleDeclaration>;

/**
 * check if element is visible
 * @param el - an element to be detected or an object that represents location information
 * @param option
 * @param option.fullVisible - false | default is to be completely invisible, and set to true to be invisible if element is partially occluded
 * @param option.wrapEl - By default, the viewport computes visibility through this specified element (viewport is still detected)
 * @param option.offset - Offset of visibility, specifying all directions for numbers, and specific directions for object
 * @return - Whether the overall visibility information and the specified direction does not exceed the visible boundary
 * */
export function checkElementVisible(
  el: HTMLElement | Partial<Bound>,
  option?: { fullVisible?: boolean; wrapEl?: HTMLElement; offset?: number | Partial<Bound> },
): {
  visible: boolean;
  top: boolean;
  left: boolean;
  right: boolean;
  bottom: boolean;
  bound: DOMRect;
};

/**
 * Query the incoming Node for the presence of a specified node in all of its parent nodes
 * @param node - node to be queried
 * @param matcher - matcher, recursively receives the parent node and returns whether it matches
 * @param depth - maximum query depth
 * */
export function getCurrentParent(
  node: Element,
  matcher: (node: Element) => boolean,
  depth?: number,
): boolean;

interface TriggerHighlightConf {
  /** #1890ff | line color */
  color: string,
  /** true | use outline, if false use box-shadow */
  useOutline: boolean,
}

/**
 * highlight selected elements according to elements or selectors
 */
export function triggerHighlight(target: HTMLElement, TriggerHighlightConf?: TriggerHighlightConf): void;
export function triggerHighlight(selector: string, TriggerHighlightConf?: TriggerHighlightConf): void;
export function triggerHighlight(t: string | HTMLElement, TriggerHighlightConf?: TriggerHighlightConf): void;

/**
 * get scrolling parent node, get all when pass getAll
 * When setting or getting scrollTop/scrollLeft on document.documentElement and document.body, the performance of different browsers will be inconsistent, so when the scroll element is document.documentElement or document.body, document.documentElement is returned uniformly for easy identification
 * */
export function getScrollParent(ele: HTMLElement, getAll: true): HTMLElement[];
export function getScrollParent(ele: HTMLElement, getAll?: false): HTMLElement | null;
export function getScrollParent(ele: HTMLElement, getAll?: boolean): HTMLElement | HTMLElement[] | null;


/** get doc scroll offset, used to solve the problem of different versions of the browser to get inconsistent */
export function getDocScrollOffset(): {
  x: number;
  y: number;
}

/** set doc scroll offset */
export function setDocScrollOffset(conf: { x?: number; y?: number }): void;

/** check whether the dom node is scrollable */
export function hasScroll(el: HTMLElement): { x: boolean, y: boolean };


/* ======================== is ======================= */
type Primitive = null | undefined | boolean | number | string | symbol;

export function isArray(arg: any): arg is any[];

export function isTruthyArray<T = any>(arg: any): arg is T[];

export function isNumber(arg: any): arg is number;

export function isString(arg: any): arg is string;

export function isInt(arg: any): arg is number;

/** 检测是否为弱数字(可转为数字的字符数字或数字) */
export function isWeakNumber(arg: any): boolean;

export function isSymbol(arg: any): arg is symbol;

export function isPrimitive(arg: any): arg is Primitive;

export function isError(arg: any): arg is Error;

export function isObject(arg: any): arg is Object;

export function isDom(arg: any): arg is Node;

export function isRegExp(arg: any): arg is RegExp;

export function isFunction(arg: any): arg is AnyFunction;

export function isDate(arg: any): arg is Date;

export function isBoolean(arg: any): arg is boolean;

export function isNull(arg: any): arg is null;

export function isUndefined(arg: any): arg is undefined;

export function isNullOrUndefined(arg: any): arg is null | undefined;

export function isTrueEmpty(arg: any): boolean;

export function isEmpty(arg: any): boolean;

/** 如果入参为truthy或0则返回true，否则返回false */
export function isTruthyOrZero(arg: any): boolean;

/**
 * 检测是否是numberLike(字符数字、数字)
 * @param numLike - 待检测的数字
 * */
export function isNumerical(numLike: number): boolean;


/* ======================== form ======================= */

export function form2obj(el: Node): AnyObject;

export function obj2FormData(obj: AnyObject): FormData;

/* ======================== format ======================= */

export function promisify(fn: AnyFunction, receiver?: object): (...arg: any) => Promise<any>;

export function padSingleNumber(number: number): string;

/** 当左边的值不为truthy或0时，返回feedback */
export function vie(arg: any, feedback?: string): any;

/** 返回入参中第一个truthy值或0, 用于代替 xx || xx2 || xx3 */
export function getFirstTruthyOrZero(...args: any): any;

/* ======================== number ======================= */

/**
 * 获取指定区间内的随机数(双开区间)
 * @param min - 最小值
 * @param max - 最大值
 * @return - 随机数
 *  */
export function getRandRange(min: number, max: number): number;

/**
 * 以指定精度锐化浮点数
 * @param num - 待处理的数字
 * @param precision - 1 | 精度
 * @return - 四舍五入到指定进度的小数
 * */
export function decimalPrecision(num: number, precision?: number): number;

/** 将一组数字或类数字相加、非数字视为0 */
export function sum(...nums: any[]): number;

/** 将一组数字或类数字相减 */
export function subtract(...nums: any[]): number;

/** 将弱数字转为数字，数字会原样返回 */
export function weakNumber(arg: any): number | null;

/* ======================== string ======================= */

/**
 * 替换html字符中的标签为指定字符
 * @param htmlString - html文本
 * @param val - '' | 替换后的值
 * @return - 替换标签后的文本
 * */
export function replaceHtmlTags(htmlString: string, val?: string): string;

/**
 *  生成一段随机字符
 *  @param number - 随机串的长度倍数，默认1倍，随机字符长度为10为
 *  @return string
 *  */
export function createRandString(number?: number): string;


interface FormatStringOption {
  delimiter?: string;
  repeat?: boolean;
  lastRepeat?: boolean;
}


interface Byte2Text {
  (byte: number, conf?: { precision: number }): string;

  KB: number;
  MB: number;
  GB: number;
  TB: number;
}


/**
 * 将字节转为适合人类阅读的字符串
 * @param byte - 待转换的字节
 * @param conf - 其他配置
 * @param conf.precision - 1 | 小数精度
 * @return - 用于展示的字符串
 * */
export const byte2text: Byte2Text;

/**
 * 以指定的模式通过转html文本高亮字符中的所有被匹配字符
 * @param str - 目标字符串
 * @param regExp - 可以被new RegExp()接收的正则字符串或正则表达式
 * @param conf - 其他配置
 * @param conf.color - '#F83D48' | 高亮颜色
 * @return - 附加了html高亮标签的字符串
 * @example
 console.log(heightLightMatchString('你好吗，我很好。', '好'));
 console.log(heightLightMatchString('你好吗，我很好。', /好/));

 // 以上使用均输出:
 // => 你<span style="color: #F83D48">好</span>吗，我很<span style="color: #F83D48">好</span>。
 * */
export function heightLightMatchString(
  str: string,
  regExp: string | RegExp,
  conf?: { color?: string },
): string;

export const validateFormatString: RegExp;

export function formatString(str: string, pattern: string, options?: FormatStringOption): string;

export function unFormatString(str: string, pattern: string, options?: FormatStringOption): string;

/* ======================== object ======================= */

/**
 * 删除掉对象所有falsy值(除了0)
 * @param source - 目标对象
 * @return - 删除调falsy值后的source对象
 */
export function shakeFalsy(source: object): object;

/**
 * 从目标对象删除指定键值
 * @param obj - 目标对象
 * @param props - 待移除的key, 以逗号分隔的字符串
 * @return - 移除后的新对象
 * @example
 const obj = {
      name: 'lxj',
      age: 18,
      sex: 1,
     };
 const obj2 = omit<typeof obj, 'age' | 'sex'>(obj, 'age,sex');

 // => { name: 'lxj' }
 * */
export function omit<O, P extends string>(obj: O, props: string): Omit<O, P>;

/* ======================== function ======================= */

/**
 * 将一个优先错误且回调位于最后一个参数的node风格的callback函数转为return Promise的函数
 * @param {function} fn - 要包装的函数
 * @param {object} receiver - 要绑定作用域的对象
 * @return {function(...[*]): Promise<*>}
 */
export function promisify(fn: AnyFunction, receiver?: object): (...arg: any) => Promise<any>;

/**
 * 返回一个延迟指定时间的Promise, payload为Promise的resolve值，如果其为 Error 对象，则promise在指定延迟后reject
 * @param ms - 延迟时间
 * @param payload {* | Error} - 作为resolve值的任意值，如果是Error对象，则promise会抛出异常
 * @return - promise
 * */
export function delay<T = any>(
  ms: number,
  payload?: T | undefined,
): Promise<T extends Error ? void : T>;

/** 一个便利函数，接收任意参数并返回 */
export const dumpFn: (...arg: any[]) => any;

/** 延迟执行一个函数 */
export function defer(fn: AnyFunction, ...args: any[]): any;


/* ======================== regexp ======================= */
/** 身份证号正则, */
export const idCardRegexp: RegExp;

/* ======================== lang ======================= */

/** 根据不同的js运行环境返回`Global`对象 */
export function getGlobal(): Window | NodeJS.Global;

export const __GLOBAL__: Window | NodeJS.Global;
