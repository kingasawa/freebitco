const bcypher = require('blockcypher');
const { BLOCKCYPHER_TOKEN } = sails.config.custom
const clientBtc = new bcypher('btc', 'main', BLOCKCYPHER_TOKEN);


module.exports = {
  index: function(req, res) {
    clientBtc.gen;
    return res.view('pages/admin/index')
  },
};
