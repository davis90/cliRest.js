import isNil from '@/utils/isNil';

/**
 * Check if value exist, if not, return the default value
 * @param {*} value - value to check
 * @param {*} defVal - default value
 * @returns {*} returns value if exists, default value otherwise
 */
export default (value, defVal) => ((isNil(value) || Number.isNaN(value)) ? defVal : value);
