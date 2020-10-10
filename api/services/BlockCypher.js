const axios = require('axios');

module.exports = {
  createAddress: async(payload) => {
    const address = await axios({
      method: 'post',
      url: 'https://api.blockcypher.com/v1/btc/test3/addrs',
      data: {}
    });
    console.log('address', address.data);
    return address.data
  },
};
