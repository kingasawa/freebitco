const passport = require('passport');
const moment = require('moment');

module.exports = {
  dashboard: function(req, res) {
    return res.view('pages/admin/dashboard')
  },

  users: async(req,res) => {
    const users = await Users.fetchAll();
    console.log('users', users);
    return res.view('pages/admin/users', {users, moment})
  },

  betting: async(req,res) => {
    const bets = await Bettings.fetchAll();
    console.log('bets', bets);
    return res.view('pages/admin/betting', {bets, moment})
  },

};
