import isNil from '@/utils/isNil';

/**
 * Check if value is an object
 * @param {*} value - value to check
 * @returns {Boolean} returns true if it's an object. false otherwise
 */
export default (value) => !isNil(value) && typeof value === 'object'
    && Object.prototype.toString.call(value) === '[object Object]';
