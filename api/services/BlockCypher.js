const axios = require('axios');
const {
  BASE_URL,
  BLOCKCYPHER_TOKEN,
  BLOCKCYPHER_WEBHOOK_CALLBACK_PATH,
  BLOCKCYPHER_WEBHOOK_EVENT_TYPE,
  BLOCKCYPHER_API_URL
} = sails.config.custom

module.exports = {
  createAddress: async(payload) => {
    const address = await axios({
      method: 'post',
      url: `${BLOCKCYPHER_API_URL}/addrs`,
      data: {}
    });
    console.log('address', address.data);
    // address {
    //   private: '3db9aad23eb738af2aa4dc097bd0b1bc843d123502007a327c290814264b6e12',
    //     public: '04e66a0ba863910a54ed91ea0d28f393e463d245cd1206abb5ddad9e6a140a6e438c8c044d339d40caaf0f4641a5e353c0721c8123fa3f796a2bea1f0ca18ad240',
    //     address: 'e39082586941ecc807785d77c83a8310f0d0dbd9'
    // }
    return address.data
  },

  createHook: async(address) => {
    const webhook = {
      event: BLOCKCYPHER_WEBHOOK_EVENT_TYPE,
      address,
      url: `${BASE_URL}/${BLOCKCYPHER_WEBHOOK_CALLBACK_PATH}` // "https://my.domain.com/callbacks/new-tx"
    }

    const createdHook = await axios({
      method: 'post',
      url: `${BLOCKCYPHER_API_URL}/hooks?token=${BLOCKCYPHER_TOKEN}`,
      data: webhook
    })

    console.log('createdHook', createdHook)
    // createdHook {
    //   id: 'd4627141-2ade-4524-aa1f-028e9e55c514',
    //     token: '9866d89f8b7d4d4f93f1db3dfa26ac51',
    //     url: 'http://localhost:1337/hook/tx',
    //     callback_errors: 0,
    //     address: 'e39082586941ecc807785d77c83a8310f0d0dbd9',
    //     event: 'unconfirmed-tx'
    // }

    //new main address: 2a49a17586062eae2a751eae423228251b385d5f, trancatkhan6h@gmail.com
    return createdHook.data
  },

  balance: async(address) => {
    const getBalance = await axios({
      method: 'get',
      url: `${BLOCKCYPHER_API_URL}/addrs/${address}/balance`,
      params: {}
    })

    console.log('getBalance', getBalance.data)
    return getBalance.data
  }

};
