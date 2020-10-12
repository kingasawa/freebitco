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

  // Authenticated
  'GET /auth/login': 'AuthController.loginPage',
  'POST /auth/login': 'AuthController.login',
  'GET /auth/logout': 'AuthController.logout',
  'GET /auth/register': 'AuthController.registerPage',
  'POST /auth/register': 'AuthController.register',

  // Common Page
  'GET /': 'HomeController.index',
  'GET /getDashboard': 'DashboardController.index',
  'GET /wallet': 'WalletController.index',
  'GET /admin/golden_ticket/create': { view: 'pages/admin/create_golden_ticket' },
  'GET /faq': { view: 'pages/faq' },

  // Admin Page
  'GET /admin': 'AdminController.dashboard',
  'GET /admin/users': 'AdminController.users',
  'GET /admin/betting': 'AdminController.betting',
  'GET /admin/golden_ticket': 'AdminController.goldenTicket',
  'GET /admin/lottery_ticket': 'AdminController.lotteryTicket',

  'GET /earn': 'EarnController.index',
  'GET /contest': 'ContestController.index',
  'GET /referral': 'ReferralController.index',
  'GET /betting': 'BettingController.index',

  // Get Free Coin
  'GET /free': 'FreeController.index',
  'POST /free': 'FreeController.roll',

  // Golden Ticket
  'GET /golden-ticket': 'GoldenTicketController.index',
  'POST /golden-ticket': 'GoldenTicketController.buy',

  // Lottery
  'GET /lottery': 'LotteryController.index',
  'POST /lottery': 'LotteryController.buy',
  'POST /lottery/random': 'LotteryController.random',

  // Multiple Coin
  'GET /multiple-coin': 'MultipleCoinController.index',
  'POST /multiple-coin/manualBet': 'MultipleCoinController.manualBet',

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
