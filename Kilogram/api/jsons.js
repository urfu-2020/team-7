exports.passData = (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'User was successfully authorized!',
      user: req.user,
      cookies: req.cookies,
    });
  }
};
