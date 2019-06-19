import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import InterfaceCrud from '@/crud/InterfaceCrud';
import defaultCrud from '@/crud/defaultCrud';
import ressourceFactory from '@/api/ressourceFactory';
import mergeCrudConfig from '@/crud/mergeCrudConfig';

const privateProps = new WeakMap();

/**
 * Class that represent an api
 */
class Api {
  /**
   * @param {string} url - Url of the API
   * @param {Object} options - default config object to use for crud
   */
  constructor(url, crud, { crudConfig, crudConfigMerge } = {}) {
    privateProps.set(this, {
      url,
      ressources: [],
      crud,
      crudConfigMerge,
      crudConfig: crudConfigMerge(crudConfig),
    });
  }

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

  get url() {
    return privateProps.get(this).url;
  }

  get crud() {
    return privateProps.get(this).crud;
  }

  get crudConfig() {
    return privateProps.get(this).crudConfig;
  }

  get ressources() {
    return privateProps.get(this).ressources.slice();
  }
}

export default function (url,
  { crud = defaultCrud, crudConfig, crudConfigMerge = mergeCrudConfig } = {}) {
  if (!isString(url) || isEmpty(url)) {
    throw TypeError('apiFactory : url must be a non-empty string');
  }
  if (isNil(crud) || !InterfaceCrud.implements(crud)) {
    throw TypeError('apiFactory : crud have to implement InterfaceCrud');
  }
  if (!isFunction(crudConfigMerge)) {
    throw TypeError('apiFactory : crudConfigMerge have to be a function');
  }
  return new Api(url, crud, { crudConfig, crudConfigMerge });
}
