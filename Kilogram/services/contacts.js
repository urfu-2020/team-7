const { Sequelize } = require('sequelize');
const { User, Chat } = require('../models/models');
const { io, idsToSockets } = require('../app');

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
    const chatIds = chats.map((chat) => chat.id);
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
    const channels = await Chat.findAll({
      raw: true,
      where: {
        type: 'CHANNEL',
        id: {
          [Sequelize.Op.not]: chatIds,
        },
      },
    });
    const response = { chats, users, channels };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// {name, type, users, owner}
async function createChat(req, res) {
  try {
    const {
      name, type, users, owner,
    } = req.body;
    const c = await Chat.create({
      name,
      type,
      owner,
    });
    await c.setUsers(users);
    const cPlain = c.get({ plain: true });
    const chatName = `CHAT${cPlain.id}`;
    if (type === 'GROUP') {
      users.forEach((uId) => {
        if (idsToSockets[uId]) {
          idsToSockets[uId].forEach((sId) => {
            io.of('/').sockets.get(sId).join(chatName);
          });
        }
      });
      io.to(chatName).emit('addChat', {
        id: c.id, name, owner, type,
      });
    } else {
      if (idsToSockets[owner]) {
        idsToSockets[owner].forEach((sId) => {
          io.of('/').sockets.get(sId).join(chatName);
        });
      }
      io.local.emit('addNewChannel', {
        id: c.id, name, owner, type,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createChat,
  getAllChats,
};
