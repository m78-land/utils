/**
 * swap index of two items in array and return the original array
 * if the index is exceeded, no action is performed */
export function swap<T = any>(arr: T, sourceInd: number, targetInd: number): T;

/** move array item `form -> to` */
export function move(array: any[], form: number, to: number): any[] | undefined;

/** Pass T or T [] to ensure that T [] is returned */
export function ensureArray<T>(val: T[] | T): T[];

/** Array deduplication, only basic types are supported */
export function uniq<T>(array: T[]): T[];

/** Array deduplication through comparator */
export function uniqWith<T>(array: T[], comparator: (a: T, b: T) => boolean): T[];
