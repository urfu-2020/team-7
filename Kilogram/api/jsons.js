const { Sequelize } = require('sequelize');
const models = require('../models/models');

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

// eslint-disable-next-line consistent-return
exports.getUserById = async (req, res) => {
  // eslint-disable-next-line no-restricted-globals
  if (!req.params.id || isNaN(req.params.id)) {
    return res.status(400).json({ message: 'No correct id passed!' });
  }
  const user = await models.User.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found!' });
  }
};

exports.getUserByUsername = async (req, res) => {
  if (!req.params.name) {
    res.status(400).json({ message: 'No username passed!' });
  }
  const user = await models.User.findOne({
    where: {
      username: {
        [Sequelize.Op.iLike]: req.params.name,
      },
    },
    raw: true,
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found!' });
  }
};
