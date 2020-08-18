import actionFactory from '@/api/actionFactory';
import mergeCrudConfig from '@/crud/mergeCrudConfig';
import isRessourceName from '@/utils/isRessourceName';
import isRessourcePath from '@/utils/isRessourcePath';
import defaultTo from '@/utils/defaultTo';
import isCrud from '@/utils/isCrud';
import isNil from '@/utils/isNil';
import isObject from '@/utils/isObject';
import isNonEmptyString from '@/utils/isNonEmptyString';


/**
 * Get default actions config object
 * @param {string} path -  url of the API
 * @returns {Object} new default action config object
 */
const getDefaultActionsConfig = (path) => {
  const defUrlWithId = `${path}/{}`;
  return {
    list: { method: 'read', url: path },
    read: { method: 'read', url: defUrlWithId },
    create: { method: 'create', url: path },
    replace: { method: 'replace', url: defUrlWithId },
    modify: { method: 'modify', url: defUrlWithId },
    delete: { method: 'delete', url: defUrlWithId },
  };
};

/**
 * Create a new ressource object
 * @param {string} name - name of the ressource
 * @param {string} apiUrl - url of the api
 * @param {Object} crud - crud object
 * @param {Object} options - options of the ressource
 * @returns {Object} new ressource object
 */
function ressourceFactory(name, apiUrl, crud, {
  actionsConfig, path, crudConfig, crudConfigMerge = mergeCrudConfig,
} = {}) {
  if (!isRessourceName(name)) {
    throw TypeError('ressourceFactory : name must be a non-empty string');
  }
  if (!isNonEmptyString(apiUrl)) {
    throw TypeError('ressourceFactory : apiUrl must be a non-empty string');
  }
  if (isNil(crud) || !isCrud(crud)) {
    throw TypeError('ressourceFactory : crud must implement InterfaceCrud');
  }
  if (!isNil(path) && !isRessourcePath(path)) {
    throw TypeError('ressourceFactory : path of ressource must be a non-empty string');
  }
  if (!isNil(actionsConfig) && (!isObject(actionsConfig) || Array.isArray(actionsConfig))) {
    throw TypeError('ressourceFactory : actionsConfig have to be a simple object');
  }
  const ressourcePath = defaultTo(path, name);
  const actionsConf = defaultTo(actionsConfig, getDefaultActionsConfig(ressourcePath));
  const ressource = Object.create(null);
  Object.getOwnPropertyNames(actionsConf).forEach((actionName) => {
    const action = actionFactory(apiUrl, crud, actionsConf[actionName],
      { crudConfig, crudConfigMerge });
    ressource[actionName] = action;
  });

  return ressource;
}

export default ressourceFactory;
