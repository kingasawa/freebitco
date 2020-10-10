const moment = require('moment');

module.exports = {
  index: function(req, res) {
    return res.view('pages/admin/index')
  },

  dashboard: async(req, res) => {
    const users = await Users.fetchAll();
    const userCount = await Users.count()
    const goldenTicketCount = await Players.sum('number_ticket')
    const lotteryTicketCount = await LotteryPlayers.sum('number_ticket')

    const data = {
      users,
      userCount,
      goldenTicketCount,
      lotteryTicketCount
    }
    console.log('data', data);
    // return res.send({data: dataResponse})

    return res.view('pages/admin/dashboard', {data})
  },

  users: async(req,res) => {
    const users = await Users.fetchAll();
    return res.view('pages/admin/users', { users, moment })
  },

  betting: async(req,res) => {
    const bets = await Bettings.fetchAll();
    return res.view('pages/admin/betting', { bets, moment })
  },

  goldenTicket: async(req,res) => {
    const goldenTickets = await Tickets.fetchAll();
    return res.view('pages/admin/golden_ticket', { goldenTickets, moment })
  },

  lotteryTicket: async(req,res) => {
    const lotteryTickets = await Lotteries.fetchAll();
    return res.view('pages/admin/lottery_ticket', { lotteryTickets, moment })
  },

  addGoldenTicket: async(req,res) => {
    const params = req.allParams()
    sails.log.debug('params', params)
    return res.json()
  },

};
