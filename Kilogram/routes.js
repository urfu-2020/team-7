module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>');
  });
  app.all('*', (req, res) => {
    res.sendStatus(404);
  });
};
