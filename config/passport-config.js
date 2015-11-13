'use strict';
let passport = require('passport'),
  Strategy = require('passport-http-bearer').Strategy;

module.exports = () => {
  passport.use(new Strategy((token, cb) => {
    console.log(`Token ${token}`);
    cb(null, {
      username: 'success',
      token
    });
  }));
  return passport;
};
