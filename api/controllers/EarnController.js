/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')

module.exports = {
  index: async(req,res) => {

    return res.view('pages/earn_btc');
  },

  roll: async(req,res) => {
    const user = req.user
    const data = await Users.submitRoll(user.id)
    console.log('data', data);
    return res.json(data)
  },


};

