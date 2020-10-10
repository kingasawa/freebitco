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

  errorMessage: {
    INSUFFICIENT: "Insufficient balance to purchase"
  },

  ticketType: {
    GOLDEN_TICKET: 1,
    LOTTERY: 2
  },

  BLOCKCYPHER_TOKEN: '9866d89f8b7d4d4f93f1db3dfa26ac51'

};
