/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
bcypher = require('blockcypher');
const bcapi = new bcypher('btc', 'main', '9866d89f8b7d4d4f93f1db3dfa26ac51');


module.exports = {
  attributes: {
    unit: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    public: {
      type: 'string'
    },
    private: {
      type: 'string'
    },
    wif: {
      type: 'string'
    },
    user: {
      model: 'users'
    }
  },


  createAddress: async({email, password}) => {
    const params = {
      "passphrase": "replaceme",
      "label": "firstwallet"
    };
    const wallet = await bitgo.coin('tbtc').wallets().generateWallet(params);
    console.log('wallet', wallet);
    return wallet
  },

};

