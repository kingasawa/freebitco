/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const { setting } = sails.config.system;

module.exports = {
  attributes: {
    human: {
      type: 'boolean',
      defaultsTo: true
    },
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
      type: 'string',
      allowNull: true
    },
    latest_roll_time: {
      type: 'string',
      allowNull: true
    },
    roll: {
      type: 'number',
      defaultsTo: 0
    },
    wallets: {
      collection: 'wallets',
      via: 'user'
    },
    dices: {
      collection: 'dices',
      via: 'user'
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

  fetch: async(id) => {
    return await Users.findOne({id})
  },

  fetchAll: async() => {
    return await Users.find().limit(10)
  },

  submitRoll: async(userId) => {
    const user = await Users.findOne({id:userId})

    const { lottery_ticket, reward_point, current_coin } = user

    const currentTime = moment().format();
    const getFreeCoin = FreeCoin.getCoin();
    const currentCoin = current_coin+getFreeCoin.coin;
    const newLotteryTicket = lottery_ticket+2;
    const newRewardPoint = reward_point+2;

    await Users.update({id: userId},
      {
        lottery_ticket: newLotteryTicket,
        reward_point: newRewardPoint,
        current_coin: currentCoin,
        latest_roll_time: currentTime
      }).fetch()

    return {
      currentCoin,
      number: getFreeCoin.number,
      coin: getFreeCoin.coin,
      lotteryTicket: 2,
      rewardPoint: 2,
      expiredTime: moment().add(setting.ADD_TIME_AMOUNT, setting.ADD_TIME_UNIT)
    }
  },

  updateCoin: async({userId, type, coin}) => {
    const user = await Users.findOne({id:userId})
    const currentCoin = user.current_coin
    let updatedCoin = 0

    if (type === 'add') updatedCoin = currentCoin + coin
    else updatedCoin = currentCoin - coin

    return await Users.update({id: userId},
      { current_coin: updatedCoin }).fetch()
  },

  register: async({email, password, referrer = null}) => {
    try {
      const createdUser = await Users.create({email,password,referrer}).fetch()
      const createdAddress = await BlockCypher.createAddress({email,password})
      await Wallets.create({
        unit: 'btc',
        address: createdAddress.address,
        public: createdAddress.public,
        private: createdAddress.private,
        wif: createdAddress.wif,
        user: createdUser.id
      })
      return {
        success: true,
        data: { email }
      }
    }
    catch(err) {
      console.log('err', err);
      return {
        success: false,
        data: { err }
      }
    }
  },

  updateUser: async(payload) => {
    const { id, human, password, lottery_ticket, reward_point, current_coin } = payload

    const updated = await Users.update({id})
      .set({
        human,
        password,
        lottery_ticket,
        reward_point,
        current_coin
      })
      .fetch()

    console.log('updated', updated);
    return updated
  },




};

