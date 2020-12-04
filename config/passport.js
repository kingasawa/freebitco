const passport = require('passport');
// const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

//After passport serializes the object, return the id
passport.serializeUser((user, done)=> {
  done(null, user);
});

//Passport deserializes the user by id and returns the full user object.
passport.deserializeUser((user, done)=>{
  const id = user.id;
  Users.findOne(id).populate('wallets', {
    where: { unit: 'eth' }
  }).exec((err,userData)=> {
    done(err, userData);
  });
});

//This is the holy grail of the strategy. When a request comes in
//we try and find the user by email and see if their passport
//is correct.

let verifyHandler = (req ,email, password, cb)=> {
  process.nextTick(()=> {
    Users.findOne({ email }).exec((err, user)=> {
      if(err) {return cb(err);}
      if(!user) {return cb(null, false, { message: 'Username not found' });}
      bcrypt.compare(password, user.password, (err, res)=> {
        if (!res || err) {
          return cb(null, false, { message: 'Invalid Password' });
        }
        const userDetails = {
          email: user.email,
          id: user.id
        };
        return cb(null, userDetails, { message: 'Login Successful' });
      });
    });
  });
};

//Register the LocalStrategy with Passport.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true

}, verifyHandler));
