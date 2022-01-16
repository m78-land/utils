/**
 * any key&value object
 *
 * 任意健值的对象
 * */
import { CSSProperties } from 'react';

/** any object */
export interface AnyObject {
  [key: string]: any;
}

/** any function */
export interface AnyFunction {
  (...arg: Array<any>): any;
}

/** empty function (no arguments, no returns) */
export interface EmptyFunction {
  (): void;
}

/** a number tuple */
export type TupleNumber = [number, number];

/** size */
export interface Size {
  width: number;
  height: number;
}

/** describe bound of object */
export interface Bound {
  left: number;
  top: number;
  bottom: number;
  right: number;
}

/** describe bound of the object */
export interface BoundSize {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Component common props */
export interface ComponentBaseProps {
  /** 包裹元素的类名 */
  className?: string;
  /** 包裹元素样式 */
  style?: CSSProperties;
}

/** Component common props */
export interface ComponentBasePropsWithAny extends ComponentBaseProps {
  /** 透传到包裹元素上的属性 */
  [key: string]: any;
}

/** An object containing id field */
export interface IdProps {
  id: number;
}

/** An object containing data field */
export interface DataProps {
  data: number;
}
