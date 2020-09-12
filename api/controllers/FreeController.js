/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')

var reCAPTCHA = require('recaptcha2');

var recaptcha = new reCAPTCHA({
  siteKey: '6LetQcIZAAAAAI_7HFSamc53qiygzSnozw18a6VJ', // retrieved during setup
  secretKey: '6LetQcIZAAAAAAVpdP2ndf3vuYjmuNs4q5ffyLef' // retrieved during setup
});

module.exports = {
  index: async(req,res) => {
    const latestRollTime = req.user.latest_roll_time
    const expiredTime = moment(latestRollTime).add(60, 'minutes')
    const canRoll = expiredTime < moment()
    const data = {
      expiredTime,
      canRoll
    }
    return res.view('pages/free_coin', {data});
  },

  roll: async(req,res) => {
    const capcha = req.body['g-recaptcha-response']
    recaptcha.validate(capcha)
      .then(async() => {
        const user = req.user
        const data = await Users.submitRoll(user.id)
        return res.json(data)
      })
      .catch(function(errorCodes){
        return res.json({
          error: 1,
          message: 'reCAPTCHA is incorrect or has expired. Please try again.'
        })
      });

  },


};

