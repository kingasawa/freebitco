/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  index: async(req,res) => {
    const data = await Tickets.fetchAll({userId: req.user.id})
    return res.view('pages/golden_ticket', {data});
  },

  buy: async(req,res) => {
    console.log('req.allParams()', req.allParams());
    const { numberTickets } = req.allParams()
    const userId = req.user.id

    const buyTicket = await Tickets.buy({numberTickets, userId})
    return res.json(buyTicket)
  },

};

