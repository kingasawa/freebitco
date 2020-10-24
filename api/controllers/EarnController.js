/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  index: async(req,res) => {
    const userId = req.user.id
    const user = await Users.fetch(userId)
    return res.view('pages/earn', {user});
  },

};

