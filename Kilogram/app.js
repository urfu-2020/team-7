const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const config = require('config');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const expressSession = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const passportSetup = require('./config/passport-setup');
const sequelize = require('./db');
const { setupIO } = require('./socketSetup');

// MIDDLEWARES
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.EXPRESS_SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: process.env.CLIENT_HOME_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());

// SERVE STATIC REACT FILES
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(staticPath));
}

require('./routes')(app);

// SOCKET SETUP
setupIO(io);

// DB SETUP
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(process.env.PORT || config.get('port'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

start();
