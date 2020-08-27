module.exports = async (req, res, next) => {
  if (req.user) {
    return next();
  }
  else{
    return res.redirect('/auth/login')
  }
  // return next()
//
};
