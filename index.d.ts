export interface AnyObject {
  [key: string]: any;
}
export interface AnyFunction {
  (...arg: Array<any>): any;
}

/* ======================== is ======================= */
type Primitive = null | undefined | boolean | number | string | symbol;

export function isArray (arg: any): arg is any[];

export function isNumber (arg: any): arg is number;

export function isString (arg: any): arg is string;

/* 仅匹配是否为数字 */
export function isInt (arg: any): arg is number;

export function isSymbol (arg: any): arg is symbol;

export function isPrimitive (arg: any): arg is Primitive;

export function isError (arg: any): arg is Error;

export function isObject (arg: any): arg is Object;

export function isDom (arg: any): arg is Node;

export function isRegExp (arg: any): arg is RegExp;

export function isFunction (arg: any): arg is AnyFunction;

export function isDate (arg: any): arg is Date;

export function isBoolean (arg: any): arg is boolean;

export function isNull (arg: any): arg is null;

export function isUndefined (arg: any): arg is undefined;

export function isNullOrUndefined (arg: any): arg is (null | undefined);

export function isTrueEmpty (arg: any): boolean;

export function isEmpty (arg: any): boolean;

/* ======================== dom ======================= */

export function getPortalsNode (namespace?: string): HTMLDivElement;

/* ======================== date ======================= */

export function datetime (date: Date | string, format?: string): string;

export function getDateCountDown (date: Date | string): {
  ms: string,
  s: string,
  m: string,
  h: string,
  d: string,
  timeOut: boolean,
};

/* ======================== form ======================= */

export function form2obj (el: Node): AnyObject;

export function obj2FormData (obj: AnyObject): FormData;

/* ======================== format ======================= */

export function promisify (fn: AnyFunction, receiver?: object): (...arg: any) => Promise<any>;

export function padSingleNumber (number: number): string;

/* ======================== number ======================= */

export function getRandRange (mix: number, max: number): number;

/* ======================== object ======================= */

export function shakeFalsy (source: object): object;

/* ======================== string ======================= */

export function replaceTags (str: string): string;

export function createRandString (number: number): string;
