import { AnyFunction } from './common';

/**
 * 根据不同的js运行环境返回`Global`对象
 *
 * Return the 'global' object according to different JS running environments
 * */
export function getGlobal(): Window | NodeJS.Global;

export const __GLOBAL__: Window | NodeJS.Global;

/**
 * A custom event object
 *
 * 一个自定义事件对象
 * */
export interface CustomEvent<Listener extends AnyFunction> {
  /**
   * Register a listener
   *
   * 注册一个监听器
   * */
  on: (listener: Listener) => void;
  /**
   * Destroy a listener
   *
   * 销毁一个监听器
   * */
  off: (listener: Listener) => void;
  /**
   * Trigger listeners
   *
   * 触发监听
   * */
  emit: (...args: Parameters<Listener>) => void;
}

/**
 * Create a CustomEvent
 * */
export function createEvent<Listener extends AnyFunction = AnyFunction>(): CustomEvent<Listener>;
