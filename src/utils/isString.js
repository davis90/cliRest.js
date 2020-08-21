/**
 * Check if value is a string
 * @param {*} value - value to check
 * @returns {Boolean} returns true if it's a string, false otherwise
 */
export default (value) => typeof value === 'string'
    || (!Array.isArray(value) && Object.prototype.toString.call(value) === '[object String]');
