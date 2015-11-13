'use strict';

let fs = require('fs');

module.exports = (mongoose) => {
  let User = require('./user-model')(mongoose);

  return {
    User
  };
}
