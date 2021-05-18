exports.logout = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_HOME_URL);
};
