/**
 * A JSON.stringify replacer function that sorts keys in an Object being marshaled.
 * This is useful for comparing two deep objects with deep nesting.
 *
 * @param key
 * @param value
 */
export const replacer = (key, value) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
        .sort()
        .reduce((sorted, key) => ({ ...sorted, [key]: value[key] }), {})
    : value;
