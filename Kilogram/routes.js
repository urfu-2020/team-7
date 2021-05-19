const path = require('path');
const { authRouter } = require('./routers/authRouter');

module.exports = (app) => {
  app.use('/auth', authRouter);
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
  }
};
