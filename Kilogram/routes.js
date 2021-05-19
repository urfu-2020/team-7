const { authRouter } = require('./routers/authRouter');

module.exports = (app) => {
  app.use('/auth', authRouter);
};
