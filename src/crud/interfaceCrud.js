export default {
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