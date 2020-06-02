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

/* ======================== dom ======================= */

/**
 * 获取一个用于挂载Portals或其他内容的dom节点, 确保节点存且在多次调用时会获取到相同的节点
 * * 常用于某些需要挂载到额外节点的组件上，如弹窗
 * @param namespace - 影响生产节点的id
 * @return - 用于挂在的dom节点
 * */
export function getPortalsNode(namespace?: string): HTMLDivElement;

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

/* ======================== number ======================= */

export function getRandRange(mix: number, max: number): number;

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
export function heightLightMatchString(str: string, regExp: string | RegExp, conf?: { color?: string }): string;

export const validateFormatString: RegExp;

export function formatString(str: string, pattern: string, options?: FormatStringOption): string;

export function unFormatString(str: string, pattern: string, options?: FormatStringOption): string;

export function promisify(fn: AnyFunction, receiver?: object): (...arg: any) => Promise<any>;

export function delay<V = any>(
  time?: number,
  options?: { isReject?: boolean; value?: V },
): Promise<V>;

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

/** 一个便利函数，接收任意参数并返回 */
export const dumpFn: (...arg: any[]) => any;

/* ======================== regexp ======================= */
/** 身份证号正则, */
export const idCardRegexp: RegExp;

/* ======================== lang ======================= */

/** 根据不同的js运行环境返回`Global`对象 */
export function getGlobal(): Window | NodeJS.Global;

export const __GLOBAL__: Window | NodeJS.Global;
