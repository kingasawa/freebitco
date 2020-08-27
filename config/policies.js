/**
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  // Setup account on Staging & Production
  // '/': 'isAuth',
  'auth/*': true,
  // Token Auth
  '*': 'isLogin',
  'admin/*': 'isAdmin',
};
