const passport = require('passport');

module.exports = {
  login: function(req, res) {
    const params = req.allParams()
    console.log('2 receive params', params);
    req.wantsJSON = true
    passport.authenticate('local', function(err, user, info) {
      console.log('err, user, info', {err, user, info});
      if ((err) || (!user)) {
        return res.status(403).send(info);
      } else {
        let token = TokenAuth.generateToken(user)
        console.log('token', token);
        console.log('user', user);
        user.token = token
        req.logIn(user, function(err) {
          if (err) {
            sails.log.error('Auth.logIn', err);
            res.send(err);
          }
          // res.setHeader('authorization',`BEARER ${token}`)
          return res.redirect('/')
        });
      }

    })(req, res);
  },

  register: async(req, res) => {
    let {referrer,password,email} = req.allParams()
    console.log('params', req.allParams());
    Users.create({email,password,referrer}).then(()=>{
      return res.redirect(`/auth/login?email=${email}`);
    }).catch((err)=>{
      res.json(err)
    })
  },

  logout: function(req, res) {
    req.logout();
    setTimeout(()=>{
      res.redirect(`/auth/login`);
    },1000)
  },

  session: async(req, res) =>{
    res.status(200).send(req.session)
  },

  loginPage: async(req,res) => {
    const { email = null } = req.allParams()
    // console.log('req', req);
    console.log('1 login page');
    if(req.user) {
      return res.redirect('/');
    }
    return res.view('pages/login', {email});
  },
  registerPage: async(req,res) => {
    if(req.user) {
      return res.redirect('/');
    }
    return res.view('pages/register');
  },

};
