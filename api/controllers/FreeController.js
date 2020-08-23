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
    const canRoll = (moment(latestRollTime).add(60, 'minutes') < moment())
    const data = {
      latestRollTime,
      canRoll
    }

    console.log('data', data);
    return res.view('pages/free_coin', {data});
  },

  roll: async(req,res) => {
    console.log('req', req);
    console.log('req body', req.body);
    console.log('req param', req.allParams());
    const capcha = req.body['g-recaptcha-response']
    console.log('capcha', capcha);

    recaptcha.validate(capcha)
      .then(function(){
        console.log('validated');
        // validated and secure
      })
      .catch(function(errorCodes){
        // invalid
        console.log(recaptcha.translateErrors(errorCodes)); // translate error codes to human readable text
      });

    console.log('typeof capcha', typeof capcha);
    if(capcha.length === 0) {
      console.log('need verify capcha');
    } else {
      console.log('verified');
    }

    const user = req.user
    const data = await Users.submitRoll(user.id)
    console.log('data', data);
    return res.json(data)
  },


};

