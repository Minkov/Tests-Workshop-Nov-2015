'use strict';
var uuid = require('node-uuid');

function getRandomToken() {
  return uuid.v4();
}

function findUser(User, username, callback) {
  User.find({
    usernameToLower: username.toLowerCase()
  }, (err, users) => {
    if (err) {
      throw err;
    }
    callback(users[0]);
  });
}

module.exports = function(User) {
  return {
    get: (req, res) => {
      User.find({}, (err, users) => {
        if (err) {
          throw err;
        }
        res.json(users);
      });
    },
    post: (req, res) => {
      let reqUser = req.body;
      findUser(User, reqUser.username, user => {
        if (user) {
          res.status(400)
            .json({
              msg: 'Duplicated user'
            });
          return;
        }

        reqUser.usernameToLower = reqUser.username.toLowerCase();
        var user = new User(reqUser);

        user.save((err) => {
          if (err) {
            throw err;
          }
          res.json(true);
        })
      });
    },
    put: (req, res) => {
      let reqUser = req.body;

      findUser(User, reqUser.username, (user) => {
        if (!user || user.authKey !== reqUser.authKey) {
          res.status(404)
            .json({
              msg: 'Invalid username or password'
            })
        }

        if (!user.token) {
          user.token = getRandomToken();
          user.save();
        }

        res.json({
          username: user.username,
          token: user.token
        })
      });
    }
  };
}
