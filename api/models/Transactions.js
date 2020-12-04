/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    amount: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    expired: {
      type: 'string'
    }
  },

  fetchAll: async() => {
    return await Bettings.find();
  },

};

