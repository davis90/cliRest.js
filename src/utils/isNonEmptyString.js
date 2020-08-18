import isString from '@/utils/isString';

/**
 * Check if value is string and is not empty
 * @param {string} value - value to check
 * @returns {boolean} returns true if it's a non empty string, false otherwise
 */
export default value => isString(value) && value.length > 0;
