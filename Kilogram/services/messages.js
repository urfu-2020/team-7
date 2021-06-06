const { Message, User, Chat } = require('../models/models');
const { io, idsToSockets } = require('../app');

async function getAllMessages(req, res) {
  try {
    const { id } = req.params;
    const messages = await Message.findAll({
      where: {
        chatId: id,
      },
      include: [
        { model: User, raw: true, attributes: ['name', 'username'] },
      ],
      order: [
        ['createdAt', 'ASC'],
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// {to: {type, id}, from: {id, username, ?name}, content: {type, value}}
async function sendMessage(req, res) {
  try {
    let c;
    if (req.body.to.type === 'USER') {
      const ids = await Chat.findAll({
        raw: true,
        where: {
          type: 'DIALOG',
        },
        include: [
          {
            model: User, required: true, where: { id: req.body.to.id },
          },
        ],
      }).then((r) => r.map((o) => o.id));
      c = ids.length === 0
        ? null
        : await Chat.findOne({
          raw: true,
          where: {
            id: ids,
          },
          include: [
            { model: User, required: true, where: { id: req.body.from.id } },
          ],
        });
      if (!c) {
        c = await Chat.create({});
        await c.setUsers([req.body.from.id, req.body.to.id]);
        c = await c.get({ plain: true });
        const chatName = `CHAT${c.id}`;
        if (idsToSockets[req.body.from.id]) {
          idsToSockets[req.body.from.id].forEach((sId) => {
            io.of('/').sockets.get(sId).join(chatName);
          });
        }
        if (idsToSockets[req.body.to.id]) {
          idsToSockets[req.body.to.id].forEach((sId) => {
            io.of('/').sockets.get(sId).join(chatName);
          });
        }
        const users = await User.findAll({
          raw: true,
          where: {
            id: [req.body.from.id, req.body.to.id],
          },
        });
        io.to(chatName).emit('replaceUserToChat', {
          users,
          chat: c,
        });
      }
    } else {
      c = await Chat.findByPk(req.body.to.id);
      c = await c.get({ plain: true });
    }
    const message = await Message.create({
      type: req.body.content.type,
      content: req.body.content.value,
    });
    await message.setUser(req.body.from.id);
    await message.setChat(c.id);
    if (c.type === 'CHANNEL') {
      io.local.emit('receiveMessage', { message, user: req.body.from });
      io.local.emit('updateChatStatus', { message, user: req.body.from });
    } else {
      io.in(`CHAT${c.id}`).emit('receiveMessage', { message, user: req.body.from });
      io.in(`CHAT${c.id}`).emit('updateChatStatus', { message, user: req.body.from });
    }
    res.status(200).json({ message: 'Successfully send!' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getAllMessages,
  sendMessage,
};
