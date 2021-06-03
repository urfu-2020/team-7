const { io, idsToSockets, socketsToIds } = require('../app');
const { UserChat } = require('../models/models');

exports.setUserSocket = async (req, res) => {
  if (!req.body || !req.body.id) {
    res.status(400).json({ message: 'No socket id specified!' });
  } else {
    const { id } = req.body;
    if (!idsToSockets[req.params.id]) {
      idsToSockets[req.params.id] = [];
    }
    idsToSockets[req.params.id].push(id);
    socketsToIds[id] = req.params.id;
    const ids = await UserChat.findAll({
      attributes: ['chatId'],
      raw: true,
      where: {
        userId: req.params.id,
      },
    });
    ids.forEach((chat) => {
      const roomName = `CHAT${chat.chatId}`;
      io.of('/').sockets.get(id).join(roomName);
    });
    res.status(200).json({ message: 'OK' });
  }
};
