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
    image: {
      type: 'string'
    },
    start_date: {
      type: 'string'
    },
    end_date: {
      type: 'string'
    },
    prize_pool: {
      type: 'number'
    },
    answer: {
      type: 'number',
      allowNull: true
    },
    questions: {
      collection: 'questions',
      via: 'betting'
    }
  },

  fetchAll: async() => {
    return await Bettings.find();
  },

};

