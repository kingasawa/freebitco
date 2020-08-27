module.exports = async (req, res, next) => {
  if (req.user && req.user.roll === 1) {
    return next();
  }
  else{
    return res.redirect('/auth/login')
  }
  // return next()
//
};
