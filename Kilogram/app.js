const express = require('express');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(path.resolve(__dirname, '..'), 'templates'));
const port = 8080;

require('./routes')(app);

app.listen(port);
