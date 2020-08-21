import isNonEmptyString from '@/utils/isNonEmptyString';

/**
 * Check if value is valid ressource path
 * @param {string} value - value to check
 * @returns {boolean} returns true if it's a valid path, false otherwise
 */
export default (value) => {
  const reg = /^(([a-zA-Z0-9_-][.a-zA-Z0-9_-]*|\{\})\/)*([a-zA-Z0-9_-][.a-zA-Z0-9_-]*|\{\})\/{0,1}$/;
  return isNonEmptyString(value) && reg.test(value);
};
