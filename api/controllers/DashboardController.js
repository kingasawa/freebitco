const moment = require('moment');

module.exports = {
  index: async(req, res) => {
    const users = await Users.fetchAll();
    const userCount = await Users.count()
    const goldenTicketCount = await Players.sum('number_ticket')
    const lotteryTicketCount = await LotteryPlayers.sum('number_ticket')
    const dataResponse = {
      users,
      userCount,
      goldenTicketCount,
      lotteryTicketCount
    }
    // console.log('dataResponse', dataResponse);
    return res.send({data: dataResponse})
  },
};
