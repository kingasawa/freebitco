/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment')
module.exports = {
  attributes: {
    time: {
      type: 'string'
    },
    game: {
      type: 'string'
    },
    bet: {
      type: 'string'
    },
    roll: {
      type: 'number'
    },
    stake: {
      type: 'number'
    },
    mult: {
      type: 'number'
    },
    profit: {
      type: 'number'
    },
    jpot: {
      type: 'string'
    },
    ver: {
      type: 'string'
    },
    user: {
      model: 'users'
    }
  },

  manualBet: async(data) => {
    const { userId, betAmount, betOdd, betType, playJackpot } = data
    const currentTime = moment().format();
    let updatedCoin = 0
    let type = 'subtract'
    let betResult = 'lose'
    let resultMessage = '';
    const xWin = betOdd - 1
    const lowNumber = Math.ceil(9500 / parseInt(betOdd))
    const highNumber = 10000 - lowNumber
    const randomNumber = Math.floor(Math.random() * 10000);
    const profit = parseFloat(betAmount) * xWin

    let isWin = false;
    switch (betType) {
      case 'betHigh' :
        isWin = (randomNumber > highNumber);
        break;
      case 'betLow' :
        isWin = (randomNumber < lowNumber);
        break;
    }

    if (isWin) {
      betResult = 'win'
      updatedCoin = profit
      type = 'add'
      resultMessage = `You choose ${betType} so you win ${profit.toFixed(8)} ILU`
    } else {
      updatedCoin = parseFloat(betAmount).toFixed(8)
      type = 'subtract'
      resultMessage = `You choose ${betType} so you lose ${betAmount} ILU`
    }

    const addHistory = await Dices.create({
      time: currentTime,
      game: 'DICE',
      bet: betType,
      roll: randomNumber,
      stake: betAmount,
      mult: betOdd,
      profit,
      jpot: betResult,
      ver: 'click',
      user: userId
    }).fetch()

    console.log('addHistory', addHistory);

    const updated = await Users.updateCoin({userId, type, coin: updatedCoin})
    return {
      randomNumber, betResult, highNumber, lowNumber, resultMessage,
      user: updated[0]
    }
  },

  getGameHistory: async({userId}) => {
    const history = await Dices.find({
      where: { user: userId },
      sort: 'createdAt DESC',
      limit: 20
    })
    return history
  },


};

