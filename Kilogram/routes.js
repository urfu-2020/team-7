const { error404 } = require('./api/errors');
const { base, login } = require('./api/index');
const { toChats, isAuth } = require('./api/redirects');

module.exports = (app, passport) => {
  app.get('/', isAuth, toChats);
  app.get('/chats', base);
  app.get('/login', login);
  app.get('/logout');
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/return', passport.authenticate('github', { failureRedirect: '/login' }), toChats);
  app.all('*', error404);
};
