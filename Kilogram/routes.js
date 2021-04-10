const { error404 } = require('./api/errors');
const { base } = require('./api/index');

module.exports = (app) => {
  app.get('/', base);
  app.all('*', error404);
};
