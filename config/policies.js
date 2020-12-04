/**
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  // Setup account on Staging & Production
  // '/': 'isAuth',
  'auth/*': true,
  'wallet/*': true,
  'blockcypher/*': true,
  // Token Auth
  '*': 'isLogin',
  'admin/*': 'isAdmin',
};
