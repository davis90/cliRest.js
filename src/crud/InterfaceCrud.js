/* eslint class-methods-use-this: 0 */
/* eslint no-unused-vars: 0 */

import { Interface } from 'arkitect.js';

/**
 * Interface of CRUD of an API
 * @Interface
 * @class InterfaceCrud
 */
class InterfaceCrud extends Interface {
  /**
   * Create object on API
   * @param {string} url - Url to create object on API
   * @param {Object} config - Object to config creation request
   * @param {Object} data - Content of object to create
   * @returns {Promise} return promise to wait response of API
   */
  create(url, { crudConfig, data }) {
  }

  /**
   * Read object on API
   * @param {string} url - Url to read object on API
   * @param {Object} config - Object to config read request
   * @returns {Promise} return promise to wait response of API
   */
  read(url, { crudConfig }) {}

  /**
   * Update object on API
   * @param {string} url - Url to update object on API
   * @param {Object} config - Object to config update request
   * @param {Object} data - Content of object to update
   * @returns {Promise} return promise to wait response of API
   */
  replace(url, { crudConfig, data }) {}

  /**
   * Partial update object on API
   * @param {string} url - Url to partially update object on API
   * @param {Object} config - Object to config partial update request
   * @param {Object} data - Content of object to update
   * @returns {Promise} return promise to wait response of API
   */
  modify(url, { crudConfig, data }) {}

  /**
   * Delete object on API
   * @param {string} url - Url to delete object on API
   * @param {Object} config - Object to config delete request
   * @returns {Promise} return promise to wait response of API
   */
  delete(url, { crudConfig }) {}
}

export default InterfaceCrud;
