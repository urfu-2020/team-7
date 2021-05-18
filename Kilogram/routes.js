const { isAuth } = require('./api/checks');
const { authRouter } = require('./routers/authRouter');
const { successAuth } = require('./api/index');

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.get('/', isAuth, successAuth);
};
