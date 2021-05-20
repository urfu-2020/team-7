const { Sequelize } = require('sequelize');
const { User, Chat } = require('../models/models');

async function getAllContacts() {
  return User.findAll({ raw: true, attributes: ['name', 'username'] });
}

async function getAllChats(req, res) {
  try {
    const { id } = req.params;
    // Get all chats
    const chats = await Chat.findAll({
      raw: true,
      attributes: ['id', 'type', 'name', 'owner'],
      include: [
        {
          attributes: [],
          model: User,
          where: {
            id,
          },
          raw: true,
        },
      ],
    });
    // Get all teammates from dialogues
    const contacts = new Set();
    for (let i = 0; i < chats.length; i += 1) {
      const chat = chats[i];
      if (chat.type === 'DIALOG') {
        // eslint-disable-next-line no-await-in-loop
        const user = await User.findOne({
          raw: true,
          where: {
            id: {
              [Sequelize.Op.not]: id,
            },
          },
          include: [
            {
              model: Chat,
              where: {
                id: chat.id,
              },
            },
          ],
        });
        contacts.add(user.id);
        chat.user = user;
      }
    }
    // Get rest contacts
    const users = await User.findAll({
      raw: true,
      where: {
        id: {
          [Sequelize.Op.not]: [...contacts, id],
        },
      },
    });
    const response = { chats, users };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = {
  getAllContacts,
  getAllChats,
};
