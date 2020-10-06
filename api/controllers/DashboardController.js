const moment = require('moment');

module.exports = {
  index: async(req, res) => {
    const users = await Users.fetchAll();
    const dataResponse = {
      users
    }
    return res.send({data: dataResponse})
  },
};
