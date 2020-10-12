/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.system = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/

  setting: {
    PRICE_PER_GOLDEN_TICKET: 25000,
    PRICE_PER_LOTTERY_TICKET: 1,
    DECIMAL_CONFIG: 8,
    ADD_TIME_AMOUNT: 60,
    ADD_TIME_UNIT: 'minutes'
  }

};
