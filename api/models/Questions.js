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
    outcome_odds: {
      type: 'string'
    },
    bets_count: {
      type: 'string'
    },
    percent: {
      type: 'string'
    },
    prize_pool: {
      type: 'number'
    },
    betting: {
      model: 'bettings'
    }
  },

};

