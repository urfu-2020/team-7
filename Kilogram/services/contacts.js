const { User } = require('../models/models');

async function getAllContacts() {
  return User.findAll({ raw: true, attributes: ['name', 'username'] });
}

module.exports = {
  getAllContacts,
};
