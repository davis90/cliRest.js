import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import defaultCrud from '@/crud/defaultCrud';
import ressourceFactory from '@/api/ressourceFactory';
import mergeCrudConfig from '@/crud/mergeCrudConfig';
import isCrud from '@/utils/isCrud';

const privateProps = new WeakMap();

/**
 * Class that represent an api
 */
class Api {
  /**
   * @param {string} url - Url of the API
   * @param {Object} options - default config object to use for crud
   */
  constructor(url, crud, { crudConfig, crudConfigMerge }) {
    privateProps.set(this, {
      url,
      ressources: [],
      crud,
      crudConfigMerge,
      crudConfig: crudConfigMerge(crudConfig),
    });
  }

  /**
   * Add a ressource to the Api instance
   * @param {string} ressourceName - name of the ressource
   * @param {Object} options - options of the new ressource
   * @returns {Api} return current api instance
   */
  addRessource(ressourceName, { actionsConfig, crudConfig, ressourcePath } = {}) {
    const { crudConfigMerge } = privateProps.get(this);
    const ressourceCrudConfig = crudConfigMerge(crudConfig, this.crudConfig);
    const opts = {
      path: ressourcePath,
      crudConfig: ressourceCrudConfig,
      actionsConfig,
      crudConfigMerge,
    };
    this[ressourceName] = ressourceFactory(ressourceName, this.url, this.crud, opts);
    privateProps.get(this).ressources.push(this[ressourceName]);
    return this;
  }

  /**
   * Get url of the api
   * @returns {string} the url of the api
   */
  get url() {
    return privateProps.get(this).url;
  }

  /**
   * Get crud object of the api
   * @returns {Object} the crud object of the api
   */
  get crud() {
    return privateProps.get(this).crud;
  }

  /**
   * Get crud config object of the api
   * @returns {Object} the crud config object of the api
   */
  get crudConfig() {
    return privateProps.get(this).crudConfig;
  }

  /**
   * Get ressource names
   * @returns {Array<string>} array of ressource names
   */
  get ressources() {
    return privateProps.get(this).ressources.slice();
  }
}

/**
 * Create a new api instance
 * @param {string} url - url of the api
 * @param {Object} options - options of the action
 * @returns {Object} new action object
 */
function apiFactory(url,
  { crud = defaultCrud, crudConfig, crudConfigMerge = mergeCrudConfig } = {}) {
  if (!isString(url) || isEmpty(url)) {
    throw TypeError('apiFactory : url must be a non-empty string');
  }
  if (isNil(crud) || !isCrud(crud)) {
    throw TypeError('apiFactory : crud have to implement InterfaceCrud');
  }
  if (!isFunction(crudConfigMerge)) {
    throw TypeError('apiFactory : crudConfigMerge have to be a function');
  }
  return new Api(url, crud, { crudConfig, crudConfigMerge });
}

export default apiFactory;
