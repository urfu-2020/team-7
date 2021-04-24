exports.toChats = (req, res) => {
  req.logout();
  res.redirect('/login');
};
