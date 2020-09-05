/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string'
    },
    expired_at: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    players: {
      collection: 'players',
      via: 'ticket'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  fetchAll: async() => {
    return await GoldenTickets.find();
  },

};

