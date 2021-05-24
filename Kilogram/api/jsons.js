const { Sequelize } = require('sequelize');
const models = require('../models/models');

const allowedToUpdate = ['theme'];

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

exports.updateUser = async (req, res) => {
  if (!req.params.id || !req.body) {
    res.status(400).json({ message: 'No id/body specified!' });
  } else if (Object.keys(req.body).filter((key) => !allowedToUpdate.includes(key)).length > 0) {
    res.status(400).json({ message: 'Cannot update this set of fields' });
  } else {
    await models.User.update({ ...req.body }, {
      where: { id: req.params.id },
    }).then(() => {
      res.status(200).json({ message: 'Successfully updated user!' });
    }).catch((err) => {
      res.status(500).json({ message: err.message });
    });
  }
};
