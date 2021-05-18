const passport = require('passport');
const passportGithub = require('passport-github');
const models = require('../models/models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findOne({
    where: {
      id,
    },
  }).then((user) => {
    done(null, user);
  }).catch(() => {
    done(new Error('Failed to deserialize user :('));
  });
});

const githubStrategy = new passportGithub.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  // eslint-disable-next-line max-params
  async (accessToken, refreshToken, profile, done) => {
    // eslint-disable-next-line no-unused-vars
    const [user, created] = await models.User.findOrCreate({
      where: {
        id: profile.id,
      },
      defaults: {
        username: profile.username,
        name: profile.displayName,
      },
      raw: true,
    });
    done(null, user);
  },
);

passport.use(githubStrategy);
