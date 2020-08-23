// services/TokenAuth.js

const jwt = require('jsonwebtoken');

const TokenAuth = {

  validateCaptcha: function(payload) {
    return jwt.sign(payload, sails.config.jwt.tokenSecret);
  }
};

module.exports = TokenAuth;

/**
 * Google Captcha Validation Action
 * @description :: Server-side logic to validate captcha with google recaptcha api
 * @author      :: navinkumar
 */
// 'validateCaptcha':function(req,res){
//   sails.log.debug('req : ' + JSON.stringify(req.param('response')));
//   var secret = 'your secret key';
//   var responseText = req.param('response');
//   requestModule({
//     uri: "https://www.google.com/recaptcha/api/siteverify",
//     qs : {secret : secret, response : responseText},
//     method: "POST"
//   }, function(error, response, body) {
//     if (error) {
//       sails.log.debug("error : " + error);
//     } else {
//       sails.log.debug(response.statusCode, body);
//       var apiResponse = JSON.parse(body);
//       var errorCodes = apiResponse['error-codes'];
//       if(!apiResponse.success && errorCodes !== null){
//         res.json(500,{error:'failure'});
//       } else {
//         res.json(200,{data:'success'});
//       }
//     }
//   });
// },
