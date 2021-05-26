const {
  Chat, User, Message, UserChat,
} = require('./models/models');

const idsToSockets = {};
const socketsToIds = {};

function setupIO(io) {
  io.on('connection', (socket) => {
    // GETTING USER ID
    socket.on('setId', async (id) => {
      socketsToIds[socket.id] = id;
      if (!idsToSockets[id]) idsToSockets[id] = [];
      idsToSockets[id].push(socket.id);
      const ids = await UserChat.findAll({
        attributes: ['chatId'],
        raw: true,
        where: {
          userId: id,
        },
      });
      ids.forEach((chat) => {
        const roomName = `CHAT${chat.chatId}`;
        socket.join(roomName);
      });
    });
    // ON GETTING MESSAGE FROM CLIENT
    // type, content, from: {id, name, username}, to: {type, id}
    socket.on('sendMessage', async (message) => {
      let c;
      // IF MSG IS FIRST...NEED TO CREATE A CHAT...OR FIND ALREADY CREATED
      if (message.to.type === 'USER') {
        // FIND RECIPIENT DIALOGS
        const ids = await Chat.findAll({
          raw: true,
          where: {
            type: 'DIALOG',
          },
          include: [
            {
              model: User, required: true, where: { id: message.to.id },
            },
          ],
        }).then((r) => r.map((o) => o.id));
        // FIND SENDERS DIALOG WITH SAME ID
        c = ids.length === 0
          ? null
          : await Chat.findOne({
            raw: true,
            where: {
              id: ids,
            },
            include: [
              { model: User, required: true, where: { id: message.from.id } },
            ],
          });
        if (!c) {
          c = await Chat.create({});
          await c.setUsers([message.to.id, message.from.id]);
          c = c.get({ plain: true });
          const chatName = `CHAT${c.id}`;
          // ADDING SENDER AND RECEIVER IN ROOM IF THEY'RE ONLINE
          if (idsToSockets[message.from.id]) {
            idsToSockets[message.from.id].forEach((socketId) => {
              io.of('/').sockets.get(socketId).join(chatName);
            });
          }
          if (idsToSockets[message.to.id]) {
            idsToSockets[message.to.id].forEach((socketId) => {
              io.of('/').sockets.get(socketId).join(chatName);
            });
          }
          // GET INFO ABOUT THIS USERS TO SEND TO CLIENT
          const users = await User.findAll({
            raw: true,
            where: {
              id: [message.to.id, message.from.id],
            },
          });
          // TRIGGER CLIENTS TO UPDATE STATE
          io.to(chatName).emit('replaceUserToChat', {
            users,
            chat: c,
          });
        }
        // CHAT ALREADY CREATED
      } else {
        c = await Chat.findByPk(message.to.id);
        c = c.get({ plain: true });
      }
      const m = await Message.create({ content: message.content });
      await m.setChat(c.id);
      await m.setUser(message.from.id);
      io.in(`CHAT${c.id}`).emit('receiveMessage', { message: m, user: message.from });
    });

    // CHAT CREATION PROCESS
    socket.on('createChat', async (data) => {
      const c = await Chat.create({ name: data.name, type: 'GROUP', owner: data.owner });
      await c.setUsers(data.users);
      const cPlain = c.get({ plain: true });
      const chatName = `CHAT${cPlain.id}`;
      // UPDATING SOCKET INFO
      data.users.forEach((id) => {
        if (idsToSockets[id]) {
          idsToSockets[id].forEach((socketId) => {
            io.of('/').sockets.get(socketId).join(chatName);
            // io.sockets.sockets.get(socketId).join(chatName);
          });
        }
        io.to(chatName).emit('addChat', {
          id: c.id, name: c.name, owner: c.owner, type: c.type,
        });
        io.emit('addNewChannel', {
          id: c.id, name: c.name, owner: c.owner, type: c.type,
        });
      });
    });

    // CHANNEL CREATION PROCESS
    socket.on('createChannel', async (data) => {
      const c = await Chat.create({ name: data.name, type: 'CHANNEL', owner: data.owner });
      await c.setUsers([data.owner]);
      const plain = c.get({ plain: true });
      const chatName = `CHAT${plain.id}`;
      if (idsToSockets[data.owner]) {
        idsToSockets[data.owner].forEach((socketId) => {
          io.of('/').sockets.get(socketId).join(chatName);
        });
      }
      io.to(chatName).emit('addChat', {
        id: c.id, name: c.name, owner: c.owner, type: c.type,
      });
    });

    // REMOVING SOCKET
    socket.on('disconnect', () => {
      if (socketsToIds[socket.id]) {
        const id = socketsToIds[socket.id];
        if (idsToSockets[id]) {
          const index = idsToSockets[id].indexOf(socket.id);
          if (index > -1) {
            idsToSockets[id].splice(index, 1);
          }
          if (idsToSockets[id].length === 0) {
            delete idsToSockets[id];
          }
        }
        delete socketsToIds[socket.id];
      }
      socket.leaveAll();
    });
  });
}

module.exports = {
  setupIO,
};
