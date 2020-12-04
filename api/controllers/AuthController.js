const passport = require('passport');
const { BASE_URL } = sails.config.custom

module.exports = {
  login: function(req, res) {
    const params = req.allParams()
    console.log('params', params);
    req.wantsJSON = true
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        console.log('info', info)
        return res.status(200).send({
          error: true,
          message: info.message
        });
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
          console.log('heeeee')
          // res.setHeader('authorization',`BEARER ${token}`)
          return res.status(200).send({
            error: false,
            redirect_url: BASE_URL
          })
        });
      }

    })(req, res);
  },

  register: async(req, res) => {
    console.log('register');
    let {referrer, password, email} = req.allParams()
    const checkExisted = await Users.findOne({email})
    if (checkExisted) {return res.json({error: 'email is registered, please choose other email'})}

    const registered = await Users.register({email,password,referrer})
    console.log('registered', registered);
    if(registered.success) {
      await SendMail.welcome(email)
      return res.redirect(`/auth/login?email=${email}`);
    }
    return res.json({error: registered.data})
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

  forgotPassword: async(req, res) => {
    const userId = req.user.id
    await Users.requestForgotPassword(userId)
    return res.json({success: true})
  },

  resetPassword: async(req, res) => {
    console.log('hereeeee')
    res.json({msg: 'ok'})
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
