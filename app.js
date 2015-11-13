/* globals require, console */
'use strict';

let express = require('express');

let app = express();

let passport = require('./config/passport-config')(app);
require('./config/config')(app);

let models = require('./config/mongoose-config');

let usersController = require('./controllers/users-controller')(models.User);

app.post('/api/register', usersController.post);
app.put('/auth/token', usersController.put);

let port = 3001;
app.listen(port, () => console.log(`Server running on ${port}`));
