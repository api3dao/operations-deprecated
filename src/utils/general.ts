import { replacer } from './marshaling';

/**
 * Deeply compares two objects, ignoring sorting of keys
 * @param a the first object
 * @param b the second object
 */
export const deepEquals = (a: any, b: any) => JSON.stringify(a, replacer, 2) === JSON.stringify(b, replacer, 2);
