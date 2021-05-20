const path = require('path');
const { authRouter } = require('./routers/authRouter');
const { apiRouter } = require('./routers/apiRouter');

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
  }
};
