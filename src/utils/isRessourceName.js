import isNonEmptyString from './isNonEmptyString';

/**
 * Check if value is valid ressource name
 * @param {string} value - value to check
 * @returns {boolean} returns true if it's a valid name, false otherwise
 */
export default value => isNonEmptyString(value) && /^[a-zA-Z0-9_][a-zA-Z0-9_-]*$/.test(value);
