const passport = require('passport');

module.exports = {
  login: function(req, res) {
    const params = req.allParams()
    console.log('params', params);
    req.wantsJSON = true
    passport.authenticate('local', function(err, user, info) {
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
    const checkExisted = await Users.findOne({email})
    if (checkExisted) return res.json({error: 'email is registered, please choose other email'})
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
