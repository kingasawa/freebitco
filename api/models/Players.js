/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user_id: {
      type: 'number'
    },
    number_ticket: {
      type: 'number'
    },
    winner: {
      type: 'boolean',
      defaultsTo: false
    },
    ticket: {
      model: 'goldentickets'
    }
  },

};

