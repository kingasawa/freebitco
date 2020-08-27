/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'HomeController.index',
  'GET /admin': 'AdminController.dashboard',
  'GET /admin/users': 'AdminController.users',
  'GET /admin/betting': 'AdminController.betting',
  'GET /free': 'FreeController.index',
  'GET /earn': 'EarnController.index',
  'GET /contest': 'ContestController.index',
  'GET /lottery': 'LotteryController.index',
  'GET /referral': 'ReferralController.index',
  'GET /betting': 'BettingController.index',
  'GET /golden-ticket': 'GoldenTicketController.index',
  'GET /multiple-coin': 'MultipleCoinController.index',
  'POST /free': 'FreeController.roll',
  'GET /auth/login': 'AuthController.loginPage',
  'GET /auth/logout': 'AuthController.logout',
  'GET /auth/register': 'AuthController.registerPage',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/register': 'AuthController.register',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
