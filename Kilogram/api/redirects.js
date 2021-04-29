exports.toChats = (req, res) => {
  res.redirect('/chats');
};
exports.isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
