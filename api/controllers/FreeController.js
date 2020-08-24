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

const ENV_TEST = true;

module.exports = {
  index: async(req,res) => {
    const latestRollTime = req.user.latest_roll_time
    const canRoll = (moment(latestRollTime).add(60, 'minutes') < moment())
    const data = {
      latestRollTime,
      canRoll
    }
    return res.view('pages/free_coin', {data});
  },

  roll: async(req,res) => {
    // if(ENV_TEST) {
    //   return await Users.submitRoll(user.id)
    // }

    const params = req.allParams();
    console.log('params', params);

    const capcha = req.body['g-recaptcha-response']
    recaptcha.validate(capcha)
      .then(async() => {
        console.log('validated');
        const user = req.user
        const data = await Users.submitRoll(user.id)
        console.log('data', data);
        return res.json(data)
        // validated and secure
      })
      .catch(function(errorCodes){
        // invalid
        console.log(recaptcha.translateErrors(errorCodes)); // translate error codes to human readable text
        return res.json({
          error: 1,
          message: 'reCAPTCHA is incorrect or has expired. Please try again.'
        })
      });

  },


};

