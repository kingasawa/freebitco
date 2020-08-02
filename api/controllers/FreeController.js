/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')

module.exports = {
  index: async(req,res) => {
    const latestRollTime = req.user.latest_roll_time
    const canRoll = (moment(latestRollTime).add(60, 'minutes') < moment())
    const data = {
      latestRollTime,
      canRoll
    }

    console.log('data', data);
    return res.view('pages/free_coin', {data});
  },

  roll: async(req,res) => {
    const user = req.user
    const data = await Users.submitRoll(user.id)
    console.log('data', data);
    return res.json(data)
  },


};

