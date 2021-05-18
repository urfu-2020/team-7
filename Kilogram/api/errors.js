exports.error404 = (req, res) => res.sendStatus(404);
exports.error401 = (req, res) => res.status(401).json({
  success: false,
  message: 'Failed to authenticate user',
});
