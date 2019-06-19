import mergeCrudConfig from '@/crud/mergeCrudConfig';

/**
 * Call fetch with given method and content
 * @param {string} url - url to request
 * @param {Object} crudConfig - Object to config fetch from user
 * @param {Object} fetchInitOpts - Object to config fetch with static values
 * @returns {Promise} return fetch promise
 */
const callFetch = async (url, crudConfig, fetchInitOpts) => {
  const fetchInit = mergeCrudConfig(crudConfig, fetchInitOpts);
  let response;
  try {
    response = await fetch(url, fetchInit);
  } catch (e) {
    return Promise.reject(e);
  }
  if (!response.ok) {
    return Promise.reject(response);
  }
  return response;
};

/**
 * Default CRUD implementation
 * @class DefaultCRUD
 */
const defaultCrud = {
  /**
   * Create object on API
   * @param {string} url - Url to create object on API
   * @param {options} options - Url to create object on API
   * @param {object} options.crudConfig - config
   * @param {object} options.data - Content of the object to create
   * @returns {Promise} return promise to wait response of API
   */
  create: (url, { crudConfig, data } = {}) => callFetch(url, crudConfig, { method: 'POST', body: data }),

  /**
   * Read object on API
   * @param {string} url - Url to read object on API
   * @param {Object} config - Object to config read request
   * @returns {Promise} return promise to wait response of API
   */
  read: (url, { crudConfig } = {}) => callFetch(url, crudConfig, { method: 'GET' }),

  /**
   * Update object on API
   * @param {string} url - Url to update object on API
   * @param {Object} config - Object to config update request
   * @param {Object} data - Content of object to update
   * @returns {Promise} return promise to wait response of API
   */
  replace: (url, { crudConfig, data } = {}) => callFetch(url, crudConfig, { method: 'PUT', body: data }),

  /**
   * Partial update object on API
   * @param {string} url - Url to partially update object on API
   * @param {Object} config - Object to config partial update request
   * param {Object} data - Content of object to update
   * @returns {Promise} return promise to wait response of API
   */
  modify: (url, { crudConfig, data } = {}) => callFetch(url, crudConfig, { method: 'PATCH', body: data }),

  /**
   * Delete object on API
   * @param {string} url - Url to delete object on API
   * @param {Object} config - Object to config delete request
   * @returns {Promise} return promise to wait response of API
   */
  delete: (url, { crudConfig } = {}) => callFetch(url, crudConfig, { method: 'DELETE' }),
};

export default defaultCrud;
