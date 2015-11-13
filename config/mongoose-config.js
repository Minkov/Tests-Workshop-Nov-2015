'use strict';

let mongoose = require('mongoose');
let mongoDbString = 'mongodb://localhost/test';
mongoose.connect(mongoDbString);

module.export = require('../models')(mongoose);
