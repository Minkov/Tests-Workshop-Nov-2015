'use strict';

module.exports = (mongoose) => {
  let userSchema = new mongoose.Schema({
    username: String,
    usernameToLower: String,
    authKey: String,
    token: String
  });
  mongoose.model('User', userSchema);
  return mongoose.model('User');
};
