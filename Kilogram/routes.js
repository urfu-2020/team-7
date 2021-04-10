const { error404 } = require('./api/errors');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>');
  });
  app.all('*', error404);
};
