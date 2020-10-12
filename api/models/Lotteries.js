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
const runBot = true;

module.exports = {
  attributes: {
    title: {
      type: 'string'
    },
    expired_at: {
      type: 'string'
    },
    lotteryPlayers: {
      collection: 'lotteryplayers',
      via: 'lottery'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  getRoundPlayers: async() => {
    const data = await Lotteries.find({
      limit: 1,
      sort: 'id DESC'
    })
    const currentRoundId = data[0].id

    const getRoundPlayers = await LotteryPlayers.find({
      where: {lottery: currentRoundId},
      select: ['user_id']
    })
    return getRoundPlayers
  },

  getRandomWinner: async() => {
    // let array = [25,27,48,23,98,345,214,784,987,234,23,678,21,222,555,777,888,999]

    let players = await Lotteries.getRoundPlayers();
    players = _.uniqBy(players, 'user_id');
    const topTen = []

    for (i = 0; i < 2; i++) {
      const y = (i > 1) ? 1 : i
      const randomIndex = Math.floor(Math.random() * (players.length - y));
      topTen.push(players[randomIndex])

      _.remove(players, function(n) {
        return n.id === players[randomIndex].id;
      });

      players = _.shuffle(players);
    }

    return topTen
  },

  fetchAll: async() => {
    const data = await Lotteries.find({
      sort: 'id DESC'
    })
    return data
  },

  fetchAllByUser: async({userId}) => {
    const data = await Lotteries.find({
      limit: 2,
      sort: 'id DESC'
    }).populate('lotteryPlayers');

    const currentRound = data[0]
    const lastRound = data[1]

    const userLottery = await LotteryPlayers.find({
      lottery: currentRound.id,
      user_id: userId
    })

    const lastWinner = await LotteryPlayers.find({
      lottery: lastRound.id,
      winner: true
    })

    const expiredTime = moment(currentRound.expired_at)
    const totalUserTickets = _.sumBy(userLottery, u => u.number_ticket);
    const totalTickets = _.sumBy(currentRound.lotteryPlayers, c => c.number_ticket);
    const lastTotalTickets = _.sumBy(lastRound.lotteryPlayers, c => c.number_ticket);
    const winChange = (totalUserTickets === 0) ? 0 : ((totalUserTickets / totalTickets) * 100) // NaN

    const totalWinnerTickets = _.sumBy(lastWinner, w => w.number_ticket);
    const amountWon = totalTickets * setting.PRICE_PER_LOTTERY_TICKET

    const responseData = {
      currentRound: currentRound.id,
      lastRound: lastRound.id,
      totalUserTickets, totalWinnerTickets, totalTickets,
      winChange, amountWon, lastTotalTickets,
      expiredTime,
      lastWinner: lastWinner[0],
      price_per_ticket: setting.PRICE_PER_LOTTERY_TICKET
    }
    console.log('responseData', responseData);
    return responseData
  },

  buy: async({userId, numberTickets}) => {
    const user = await Users.findOne({id: userId})
    const userCurrentCoin = user.current_coin
    const totalTicketAmount = parseFloat(numberTickets) * setting.PRICE_PER_LOTTERY_TICKET
    const updatedCurrentCoin = userCurrentCoin - totalTicketAmount

    if (updatedCurrentCoin < 0)
      return {
        error: true,
        message: errorMessage.INSUFFICIENT
      }

    const currentRound = await Lotteries.find({
      sort: 'id DESC',
      limit: 1
    })

    const currentRoundId = currentRound[0].id

    try {
      const condition = {
        user_id: userId,
        lottery: currentRoundId
      }
      const playerExisted = await LotteryPlayers.findOne(condition)
      const updatedNumberTicket = parseInt(playerExisted.number_ticket) + parseInt(numberTickets)
      console.log('updatedNumberTicket', updatedNumberTicket);
      console.log('playerExisted', playerExisted);
      if (!playerExisted) {
        await LotteryPlayers.create({
          user_id: userId,
          number_ticket: numberTickets,
          lottery: currentRoundId
        })
      } else {
        await LotteryPlayers.update(condition).set({
          number_ticket: updatedNumberTicket,
        })
      }

      await Users.update({ id: userId }).set({
        current_coin: updatedCurrentCoin
      })

      const buyTicketSuccess = {
        success: true,
        data: {
          updatedCurrentCoin: updatedCurrentCoin
        }
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

  botBuyRandom: async() => {
    if(runBot) {
      const users = await Users.find({
        where: {human: false},
        select: ['id']
      })
      const randomIndex = Math.floor(Math.random() * (users.length));
      const randomUser = users[randomIndex]

      const randomTicket = Math.floor(Math.random() * 10);
      const buyTicket = await Lotteries.buy({
        userId: randomUser.id, numberTickets: randomTicket
      })
      return {
        user: randomUser,
        buyTicket: randomTicket
      }
    }
  },



};

