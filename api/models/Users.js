/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  attributes: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    lottery_ticket: {
      type: 'number'
    },
    reward_point: {
      type: 'number'
    },
    current_coin: {
      type: 'number'
    },
    referrer: {
      type: 'string'
    },
    latest_roll_time: {
      type: 'string'
    }
  },

  beforeCreate: function(user, cb){
    bcrypt.genSalt(10,(err, salt) => {
      if(err) {
        return cb(err);
      }
      bcrypt.hash(user.password, salt, null,(err, hash) => {
        if(err) {
          return cb(err);
        }
        user.password = hash;
        return cb();
      });
    });
  },
  submitRoll: async(userId) => {
    console.log('userId', userId);
    const user = await Users.findOne({id:userId})

    const { lottery_ticket, reward_point, current_coin } = user

    const currentTime = moment().format();
    const getFreeCoin = FreeCoin.getCoin()

    const updated = await Users.update({id: userId},
      {
        lottery_ticket: lottery_ticket+2,
        reward_point: reward_point+2,
        current_coin: current_coin+getFreeCoin.coin,
        latest_roll_time: currentTime
      }).fetch()

    console.log('updated', updated);

    return {
      number: getFreeCoin.number,
      coin: getFreeCoin.coin
    }
  },
};

