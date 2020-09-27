/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

module.exports.rules = {
  multiplyCoin: {
    ODD: {
      2: {
        min: 4750,
        max: 5250
      },
      3: {
        min: 3167,
        max: 6833
      }
    }
  }
};


