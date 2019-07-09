import isFunction from 'lodash/isFunction';
import interfaceCrud from '@/crud/interfaceCrud';

/**
 * Check if value is a crud object
 * @param {string} value - value to check
 * @returns {boolean} returns true if it's a crud object
 */
export default value => Object.getOwnPropertyNames(interfaceCrud)
  .every(name => isFunction(value[name]));
