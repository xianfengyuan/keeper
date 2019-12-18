require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/users', require('./users/users.controller'));
app.use('/logins', require('./logins/logins.controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'prod' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
