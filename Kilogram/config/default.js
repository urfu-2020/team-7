const path = require('path');

module.exports = {
  debug: true,
  port: 8080,
  staticPath: path.join(path.resolve(__dirname, '../..'), 'static'),
  templatePath: path.join(path.resolve(__dirname, '../..'), 'templates'),
  engine: 'hbs',
};
