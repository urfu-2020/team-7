const express = require('express');
const expressSession = require('express-session');
// eslint-disable-next-line no-unused-vars
const hbs = require('hbs');
const config = require('config');
const passport = require('passport');
const passportGithub = require('passport-github');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');

// SETTING UP AUTH STRATEGY
const strategy = new passportGithub.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // TODO: ПОМЕНЯТЬ ПОРТ ПОСЛЕ ПЕРЕХОДА НА REACT
    // callbackURL: 'http://localhost:3000/auth/return'
  },
  // eslint-disable-next-line max-params
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  },
);
// CREATING APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SETUP
passport.serializeUser((profile, done) => {
  models.User.findOrCreate({
    where: {
      id: profile.id,
    },
    defaults: {
      username: profile.username,
      name: profile.displayName,
    },
  }).then(() => done(null, profile));
});
passport.deserializeUser((profile, done) => {
  done(null, profile);
});
passport.use(strategy);

app.set('view engine', config.get('engine'));
app.set('views', config.get('templatePath'));
app.use(express.static(config.get('staticPath')));

require('./routes')(app, passport);

// DB SETUP
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT || config.get('port'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

start();
