/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  random: async(req,res) => {
    const data = await Lotteries.botBuyRandom()
    return res.json(data)
  },

  index: async(req,res) => {
    const data = await Lotteries.fetchAll({userId: req.user.id})
    return res.view('pages/lottery', {data});
  },

  buy: async(req,res) => {
    const { numberTickets } = req.allParams()
    const userId = req.user.id

    const buyTicket = await Lotteries.buy({numberTickets, userId})
    return res.json(buyTicket)
  },

};

