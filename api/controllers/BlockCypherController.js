const bcypher = require('blockcypher');
const { BLOCKCYPHER_TOKEN } = sails.config.custom
const clientBtc = new bcypher('btc', 'main', BLOCKCYPHER_TOKEN);


module.exports = {
  index: (req, res) => {
    clientBtc.gen;
    return res.view('pages/admin/index')
  },

  testHook: async(req ,res) => {
    const { address } = req.allParams()
    const hook = await BlockCypher.createHook(address)
    console.log('hook', hook)
    return res.json(hook)
  },

  hookPost: async(req, res) => {
    const params = req.allParams()
    console.log('params post', params)
  },

  hookGet: async(req, res) => {
    const params = req.allParams()
    console.log('params get', params)
  },

  balance: async(req, res) => {
    const params = req.allParams()
    console.log('params balance', params)
    const balance = await BlockCypher.balance(params.address)
    return res.status(200).send(balance)
  }

};
