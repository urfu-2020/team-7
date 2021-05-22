const {
  Chat, User, Message, UserChat,
} = require('./models/models');

const socketToRooms = {};
const idsToSockets = {};
const socketsToIds = {};

function setupIO(io) {
  io.on('connection', (socket) => {
    socketToRooms[socket.id] = [];
    // GETTING USER ID
    socket.on('setId', async (id) => {
      socketsToIds[socket.id] = id;
      idsToSockets[id] = socket.id;
      const ids = await UserChat.findAll({
        attributes: ['chatId'],
        raw: true,
        where: {
          userId: id,
        },
      });
      ids.forEach((chat) => {
        const roomName = `CHAT${chat.chatId}`;
        socketToRooms[socket.id].push(roomName);
        socket.join(roomName);
      });
    });

    // ON GETTING MESSAGE FROM CLIENT
    socket.on('sendMessage', async (message) => {
      let c;
      // IF MSG IS FIRST...NEED TO CREATE A CHAT...OR FIND ALREADY CREATED
      if (message.type === 'USER') {
        c = await Chat.findOne({
          raw: true,
          where: {
            type: 'DIALOG',
          },
          include: [
            { model: User, where: { id: message.userFrom.id } },
            { model: User, where: { id: message.userTo } },
          ],
        });
        if (!c) {
          c = await Chat.create();
          await c.setUsers([message.userFrom.id, message.userTo]);
          c = c.get({ plain: true });
          const chatName = `CHAT${c.id}`;
          socket.join(chatName);
          if (idsToSockets[message.userTo]) {
            io.sockets.connected[idsToSockets[message.userTo]].join(chatName);
          }
          const users = await User.findAll({
            raw: true,
            include: [
              {
                model: Chat,
                where: {
                  id: c.id,
                },
              },
            ],
          });
          io.to(chatName).emit('replaceUserToChat', {
            users,
            chat: c,
          });
        }
      } else {
        c = await Chat.findByPk(message.chatId);
        c = c.get({ plain: true });
      }
      // CREATE MESSAGE, APPEND TO CHAT
      const m = await Message.create({ content: message.content });
      await m.setChat(c.id);
      await m.setUser(message.userFrom.id);
      // TODO: SEND USER TO UPDATE CHAT
      io.in(`CHAT${c.id}`).emit('receiveMessage', { message: m, user: message.userFrom });
    });

    // REMOVING SOCKET
    socket.on('disconnect', () => {
      if (socketsToIds[socket.id]) {
        const id = socketsToIds[socket.id];
        if (idsToSockets[id]) delete idsToSockets[id];
        delete socketsToIds[socket.id];
      }
      if (socketToRooms[socket.id]) {
        socketToRooms[socket.id].forEach((room) => {
          socket.leave(room);
        });
        delete socketToRooms[socket.id];
      }
    });
  });
}

module.exports = {
  setupIO,
};
