import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

/**
 * Merge two crud config objects in one
 * @param {Object} firstCrud - first crud config to merge
 * @param {Object} secondCrud - second crud config to merge
 * @returns {Object} merged crud config object
 */
const mergeCrudConfig = (firstCrud, secondCrud) => {
  const crud1 = isObject(firstCrud) && !isArray(firstCrud) ? firstCrud : {};
  const crud2 = isObject(secondCrud) && !isArray(secondCrud) ? secondCrud : {};
  return merge({}, crud1, crud2);
};

export default mergeCrudConfig;
