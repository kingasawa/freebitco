/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const abi = sails.config.abi;
// const address = '0xF22B3A82534D297120CAFc51162aCBB8b5688bb7';

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.

// or using the web3 umbrella package

// var Web3 = require('web3');
// const web3 = new Web3()
// web3.setProvider(new web3.providers.WebsocketProvider('https://9t1f4yor7v5t521m4ra9xh24ggd2q4-node.ambisafe.co'));
// web3.setProvider(new web3.providers.HttpProvider());
// const contract = web3.eth.contract(abi).at(address);

module.exports = {
  index: async(req,res) => {

    // const test = await web3.eth.getAccounts();
    // const test = await web3.eth.getAccounts();
    // console.log('test', test);
    return res.send(200);
  },

  // createPaymentAddress: () => {
  //   if(!createNewPaymentAddress){
  //     return paymentAddress
  //   }
  //   let generateAddress = web3.eth.accounts.create();
  //   address = generateAddress.address
  //   let privateKey = generateAddress.privateKey
  //
  //   Address.create({
  //     address,
  //     privateKey
  //   }).fetch()
  //   return address
  // },
};

