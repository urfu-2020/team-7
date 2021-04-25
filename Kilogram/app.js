const express = require('express');
// eslint-disable-next-line no-unused-vars
const hbs = require('hbs');
const config = require('config');

const app = express();

app.set('view engine', config.get('engine'));
app.set('views', config.get('templatePath'));
app.use(express.static(config.get('staticPath')));

require('./routes')(app);

app.listen(process.env.PORT || config.get('port'));
