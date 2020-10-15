/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')

module.exports = {
  index: async(req,res) => {
    const userId = req.user.id
    const gameHistory = await Dices.getGameHistory({userId})
    console.log('gameHistory', gameHistory);
    return res.view('pages/multiple_coin', {gameHistory, moment});
  },

  manualBet: async(req,res) => {
    const params = req.allParams()
    params.userId = req.user.id
    params.userCoin = req.user.current_coin
    sails.log.debug('params', params)
    const result = await Dices.manualBet(params)
    return res.json(result)
  },


};

