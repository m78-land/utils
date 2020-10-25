/// <reference types="node" />

export interface AnyObject {
  [key: string]: any;
}


export interface AnyFunction {
  (...arg: Array<any>): any;
}


/* ======================== is ======================= */
type Primitive = null | undefined | boolean | number | string | symbol;

export function isArray(arg: any): arg is any[];

export function isNumber(arg: any): arg is number;

export function isString(arg: any): arg is string;

/* 仅匹配是否为数字 */
export function isInt(arg: any): arg is number;

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

/* ======================== dom ======================= */

/**
 * 获取一个用于挂载Portals或其他内容的dom节点, 确保节点存且在多次调用时会获取到相同的节点
 * * 常用于某些需要挂载到额外节点的组件上，如弹窗
 * @param namespace - 影响生产节点的id
 * @return - 用于挂在的dom节点
 * */
export function getPortalsNode(namespace?: string): HTMLDivElement;

/**
 * 获取滚动条宽度
 * @param nodeTarget - 如果某些元素通过css定制过滚动条，通过页面级的测量是不能正确获取宽度的，可以使用此属性指定待测量元素所在节点
 * @return 滚动条宽度，在移动端一般都是0
 * */
export function getScrollBarWidth(nodeTarget?: HTMLElement): number;

/**
 * 获取指定dom元素的样式值
 * @param dom - 待查询元素
 * @return - 包含所有可用样式值的对象，为空对象表示不支持
 *  */
export function getStyle(dom: HTMLElement): Partial<CSSStyleDeclaration>;

/**
 * 元素是否在视口可见位置
 * @param el - 待检测元素
 * @param option
 * @param option.fullVisible - 默认完全不可见时才算不可见，设置为true只要元素有部分遮挡即视为不可见
 * @param option.wrapEl - 默认以视口计算可见性，通过此项指定元素(指定wrapEl时，依然会对视口进行检测)
 * @return - 整体的可见信息和指定方向是否未超过可见边界
 * */
export function checkElementVisible(
  el: HTMLElement,
  option?: { fullVisible?: boolean; wrapEl?: HTMLElement },
): {
  visible: boolean;
  top: boolean;
  left: boolean;
  right: boolean;
  bottom: boolean;
};

/**
 * 根据传入的node节点查询其所有父节点中是否存在指定节点
 * @param node - 待查询的节点
 * @param matcher - 匹配器，递归接收父节点，返回值决定是否匹配
 * @param depth - 查询最大深度
 * */
export function getCurrentParent(
  node: Element,
  matcher: (node: Element) => boolean,
  depth?: number,
): boolean;

/**
 * 根据元素或选择器对选中元素进行高亮显示
 */
export function triggerHighlight(target: HTMLElement, color?: string): void;
export function triggerHighlight(selector: string, color?: string): void;
export function triggerHighlight(t: string | HTMLElement, color?: string): void;

/** 获取首个可滚动父节点 */
export function getFirstScrollParent(ele: HTMLElement): HTMLElement | null;

/* ======================== date ======================= */

/**
 * 接收一个日期字符串、时间戳(ms)、日期对象，将其转换为日期对象后返回，不能成功转换时返回null
 * - 日期串中的`-`会自动转为`/`以兼容safari
 *  */
export function parseDate(dateLike: any): Date | null;

/**
 * 格式化日期为可读日期字符
 * @param dateLike - new Date() | 任意能通过new Date()解析的时间，日期串中的`-`会自动转为`/`以兼容safari, 默认当前时间
 * @param format - 'YYYY-MM-DD hh:mm:ss' | 自定义的格式化串
 * @return - 格式化后的日期字符串，如果日期无效，返回空字符串
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
 * 获取当前时间到指定时间相隔的d 日,h 时,m 分,s 秒,ms 毫秒, 当前时间超过传入时间的话全部返回为'00'且timeOut为true
 * @param dateLike - 任意能通过new Date()解析的时间，日期串中的`-`会自动转为`/`以兼容safari
 * @return 倒计时相关的数据
 */
export function getDateCountDown(
  dateLike: any,
): {
  ms: string;
  s: string;
  m: string;
  h: string;
  d: string;
  /** 是否已超时 */
  timeOut: boolean;
};

/** 转换YYYY-MM-DD hh:mm:ss为YYYY-MM-DD */
export function getDateStringFirst(dataString: string): string;

/**
 * 当前时间或指定时间是否在某个时间段内
 * @param startDate - 起始时间
 * @param endDate - 结束时间
 * @param currentDate - 指定作为参照的时间，默认为当前时间
 * @return - 是否在时间段内
 * */
export function isBetweenDate(startDate: any, endDate: any, currentDate?: any): boolean;

/* ======================== form ======================= */

export function form2obj(el: Node): AnyObject;

export function obj2FormData(obj: AnyObject): FormData;

/* ======================== format ======================= */

export function promisify(fn: AnyFunction, receiver?: object): (...arg: any) => Promise<any>;

export function padSingleNumber(number: number): string;

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

/* ======================== regexp ======================= */
/** 身份证号正则, */
export const idCardRegexp: RegExp;

/* ======================== lang ======================= */

/** 根据不同的js运行环境返回`Global`对象 */
export function getGlobal(): Window | NodeJS.Global;

export const __GLOBAL__: Window | NodeJS.Global;
