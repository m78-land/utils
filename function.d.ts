import { AnyFunction, EmptyFunction } from './index';

/**
 * 将一个错误优先且回调位于最后一个参数的node风格的callback函数转为Promise return函数
 * @param fn - 要包装的函数
 * @param {object} receiver - 要绑定作用域的对象
 * @return promise - 转换后的函数
 */
export function promisify(fn: AnyFunction, receiver?: object): (...arg: any) => Promise<any>;

/**
 * 返回一个延迟指定时间的Promise, payload为Promise的resolve值，如果其为 Error 对象，则promise在指定延迟后reject
 * @param ms - 延迟时间
 * @param payload - 作为resolve值的任意值，如果是Error对象，则promise会抛出异常
 * @return - promise
 * */
export function delay<T = any>(
  ms: number,
  payload?: T | undefined,
): Promise<T extends Error ? void : T>;

/** 接收任意参数并返回, 用例是作为一个无效接收器或默认参数使用 */
export const dumpFn: (...arg: any[]) => any;

/** 延迟执行一个函数 */
export function defer(fn: AnyFunction, ...args: any[]): any;

/** retry函数的配置 */
export interface FunctionReTryConfig {
  maxDelay?: number;
  rate?: number;
  fixed?: boolean;
  maxRetry?: number;
}

/**
 * 执行一次handle，如果handle
 * @param handle - 处理函数，调用retry时会立即执行一次，如果handle执行返回了truthy值，则会在下一延迟执行点重新执行handle
 * @param delay - 进行重试间隔的毫秒，默认情况下，每次执行的间隔会通过边际递增算法增加, 可以通过config.fixed取消此行为
 * @param config - 配置
 * @param config.maxDelay - 重试延迟的最大延迟
 * @param config.rate - 0.2 | 递增比，此比例越大，则重试的频率越小
 * @param config.fixed - 不使用边际递增算法，固定重试时间
 * @param config.maxRetry - 最大重复次数
 * @return clear() - 用于停止重试并清理内部计时器
 * */
export function retry(handle: () => any, delay: number, config?: FunctionReTryConfig): () => EmptyFunction;

// TODO: 增加异步版本 AsyncRetry

/** 抛出错误 */
export function throwError(msg: string, prefix?: string | undefined): never;

/** 抛出警告 */
export function throwWarning(msg: string, prefix?: string | undefined): void;
