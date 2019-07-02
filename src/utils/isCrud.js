import isFunction from 'lodash/isFunction';

const interfaceCrud = {
  /**
   * Create object on API
   * @returns {Object} return object definition of the function
   */
  create: {
    input: {
      url: 'string',
      options: {
        crudConfig: 'object',
        data: 'object'
      }
    },
    output: 'Promise'
  },

  /**
   * Read object on API
   * @returns {Object} return object definition of the function
   */
  read: {
    input: {
      url: 'string',
      options: {
        crudConfig: 'object'
      }
    },
    output: 'Promise'
  },

  /**
   * Update object on API
   * @returns {Object} return object definition of the function
   */
  replace: {
    input: {
      url: 'string',
      options: {
        crudConfig: 'object',
        data: 'object'
      }
    },
    output: 'Promise'
  },

  /**
   * Partial update object on API
   * @returns {Object} return object definition of the function
   */
  modify: {
    input: {
      url: 'string',
      options: {
        crudConfig: 'object',
        data: 'object'
      }
    },
    output: 'Promise'
  },

  /**
   * Delete object on API
   * @returns {Object} return object definition of the function
   */
  delete: {
    input: {
      url: 'string',
      options: {
        crudConfig: 'object'
      }
    },
    output: 'Promise'
  }
};

/**
 * Check if value is a crud object
 * @param {string} value - value to check
 * @returns {boolean} returns true if it's a crud object
 */
export default (value) => {
  Object.getOwnPropertyNames(interfaceCrud).every((name) => isFunction(value[name]))
}
