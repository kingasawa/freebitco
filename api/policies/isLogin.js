module.exports = async (req, res, next) => {
  console.log('is login', req.user);
  if (req.user) {
    return next();
  }
  else{
    return res.redirect('/auth/login')
  }
  // return next()
//
};
