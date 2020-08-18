import normalizeUrl from 'normalize-url';
import mergeCrudConfig from '@/crud/mergeCrudConfig';
import defaultTo from '@/utils/defaultTo';
import isCrud from '@/utils/isCrud';
import isFunction from '@/utils/isFunction';
import isNonEmptyString from '@/utils/isNonEmptyString';
import isNil from '@/utils/isNil';
import isObject from '@/utils/isObject';
import isString from '@/utils/isString';

/**
 * Create a new action object
 * @param {string} apiUrl - url of the api
 * @param {Object} crud - crud object
 * @param {Object} actionConfig - configutation of action
 * @param {Object} options - options of the action
 * @returns {Object} new action object
 */
function actionFactory(apiUrl, crud, actionConfig,
  { crudConfig, crudConfigMerge = mergeCrudConfig } = {}) {
  if (!isNonEmptyString(apiUrl)) {
    throw TypeError('actionFactory : apiUrl must be a non-empty string');
  }
  if (isNil(crud) || !isCrud(crud)) {
    throw TypeError('actionFactory : crud must implement InterfaceCrud');
  }
  if (!isObject(actionConfig) || Array.isArray(actionConfig)) {
    throw TypeError('actionFactory : actionConfig must be a simple object');
  }
  if (!isNonEmptyString(actionConfig.url)) {
    throw TypeError('actionFactory : actionConfig.url must be a non-empty string');
  }
  if (!isString(actionConfig.method) || !isFunction(crud[actionConfig.method])) {
    throw TypeError('actionFactory : actionConfig.method must be a name of a crud\'s function');
  }
  const url = `${apiUrl}/${actionConfig.url}`;
  const nbIdsInUrl = defaultTo(url.match(/\{\}/g), []).length;

  return function action(...args) {
    const ids = args.slice(0, nbIdsInUrl);
    let updatedUrl = url;
    for (let i = 0; i < Math.min(nbIdsInUrl, ids.length); i += 1) {
      const curId = String(ids[i]);
      if (!isNonEmptyString(curId) || isObject(ids[i])) {
        return Promise.reject(new Error(`${url} : bad id parameter`));
      }
      updatedUrl = updatedUrl.replace('{}', curId);
    }
    updatedUrl = normalizeUrl(updatedUrl);
    const options = defaultTo(args[nbIdsInUrl], {});
    if (!isNil(options.crudConfig)) {
      options.crudConfig = crudConfigMerge(options.crudConfig, crudConfig);
    } else {
      options.crudConfig = crudConfig;
    }
    return crud[actionConfig.method](updatedUrl, options);
  };
}

export default actionFactory;
