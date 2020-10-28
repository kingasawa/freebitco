/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const _ = require('lodash');
const moment = require('moment');
const { errorMessage } = sails.config.custom
const { setting } = sails.config.system

module.exports = {
  attributes: {
    title: {
      type: 'string'
    },
    expired_at: {
      type: 'string'
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
    const data = await Tickets.find({
      sort: 'id DESC'
    })
    return data
  },

  fetchAllByUser: async({userId}) => {
    const data = await Tickets.find({
      limit: 2,
      sort: 'id DESC'
    }).populate('players');

    const currentRound = data[0]
    const lastRound = data[1]

    const userTickets = await Players.find({
      ticket: currentRound.id,
      user_id: userId
    })

    const lastWinner = await Players.find({
      ticket: lastRound.id,
      winner: true
    })

    const expiredTime = moment(currentRound.expired_at)
    const totalUserTickets = _.sumBy(userTickets, u => u.number_ticket);
    const totalTickets = _.sumBy(currentRound.players, c => c.number_ticket);
    const lastTotalTickets = _.sumBy(lastRound.players, c => c.number_ticket);
    const winChange = (totalUserTickets / totalTickets) * 100

    const totalWinnerTickets = _.sumBy(lastWinner, w => w.number_ticket);
    const amountWon = totalTickets * setting.PRICE_PER_GOLDEN_TICKET

    const responseData = {
      currentRound: currentRound.id,
      lastRound: lastRound.id,
      totalUserTickets, totalWinnerTickets, totalTickets,
      winChange, amountWon, lastTotalTickets,
      expiredTime,
      lastWinner: lastWinner[0],
      price_per_ticket: setting.PRICE_PER_GOLDEN_TICKET
    }
    return responseData
  },

  buy: async({userId, numberTickets}) => {
    const user = await Users.findOne({id: userId})
    const userCurrentCoin = user.current_coin
    const totalTicketAmount = parseFloat(numberTickets) * setting.PRICE_PER_GOLDEN_TICKET
    const updatedCurrentCoin = userCurrentCoin - totalTicketAmount

    if (updatedCurrentCoin < 0)
      return {
        error: true,
        message: errorMessage.INSUFFICIENT
      }

    const currentRound = await Tickets.find({
      sort: 'id DESC',
      limit: 1
    })

    const currentRoundId = currentRound[0].id

    try {
      await Players.create({
        user_id: userId,
        number_ticket: numberTickets,
        ticket: currentRoundId
      })

      await Users.update({ id: userId }).set({
        current_coin: updatedCurrentCoin
      })

      const buyTicketSuccess = {
        success: true,
        data: { updatedCurrentCoin: updatedCurrentCoin }
      }

      return buyTicketSuccess

    } catch (e) {
      console.log('error message', e);
      return {
        error: true,
        message: e
      }
    }
  },


};

