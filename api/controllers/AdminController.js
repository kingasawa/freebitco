const moment = require('moment');

module.exports = {
  dashboard: function(req, res) {
    return res.view('pages/admin/dashboard')
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
    const goldenTickets = await GoldenTickets.fetchAll();
    return res.view('pages/admin/golden_ticket', { goldenTickets, moment })
  },

  addGoldenTicket: async(req,res) => {
    const params = req.allParams()
    sails.log.debug('params', params)
    return res.json()
  },

};
