/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/

  // BASE_URL: 'http://localhost:1337',
  BASE_URL: 'https://freeilu.com',

  errorMessage: {
    INSUFFICIENT: "Insufficient balance to purchase"
  },

  ticketType: {
    GOLDEN_TICKET: 1,
    LOTTERY: 2
  },

  BLOCKCYPHER_TOKEN: '9866d89f8b7d4d4f93f1db3dfa26ac51',
  // BLOCKCYPHER_API_URL: 'https://api.blockcypher.com/v1/beth/test',
  BLOCKCYPHER_API_URL: 'https://api.blockcypher.com/v1/eth/main',
  BLOCKCYPHER_WEBHOOK_CALLBACK_PATH: 'hook/tx',
  BLOCKCYPHER_WEBHOOK_EVENT_TYPE: 'unconfirmed-tx',
  SYSTEM_EMAIL_ACCOUNT: 'freeilu.com@gmail.com',
  SYSTEM_EMAIL_PASSWORD: 'Abc!@#321'

};
