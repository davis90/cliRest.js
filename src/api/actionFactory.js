import isPlainObject from 'lodash/isPlainObject';
import isNil from 'lodash/isNil';
import defaultTo from 'lodash/defaultTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import normalizeUrl from 'normalize-url';
import InterfaceCrud from '@/crud/InterfaceCrud';
import mergeCrudConfig from '@/crud/mergeCrudConfig';

export default function (apiUrl, crud, actionConfig,
  { crudConfig, crudConfigMerge = mergeCrudConfig } = {}) {
  if (!isString(apiUrl) || isEmpty(apiUrl)) {
    throw TypeError('actionFactory : apiUrl must be a non-empty string');
  }
  if (isNil(crud) || !InterfaceCrud.implements(crud)) {
    throw TypeError('actionFactory : crud must implement InterfaceCrud');
  }
  if (!isPlainObject(actionConfig)) {
    throw TypeError('actionFactory : actionConfig must be plain object');
  }
  if (!isString(actionConfig.url) || isEmpty(actionConfig.url)) {
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
      if (isEmpty(curId) || isObject(ids[i])) {
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
