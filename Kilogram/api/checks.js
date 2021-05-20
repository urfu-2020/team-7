exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated',
    });
  } else {
    next();
  }
};

exports.isSelfId = (req, res, next) => {
  try {
    if (req.params.id && parseInt(req.params.id, 10) !== req.user.id) {
      res.status(400).json({ message: 'Bad request. (Your id and user id is not matching)' });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
