/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    unit: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    private_key: {
      type: 'number'
    },
    user: {
      model: 'users'
    }
  },


  fetchAll: async() => {
    return await Users.find()
  },

};

