function setupIO(io, idsToSockets, socketsToIds) {
  io.on('connection', (socket) => {
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
            // eslint-disable-next-line no-param-reassign
            delete idsToSockets[id];
          }
        }
        // eslint-disable-next-line no-param-reassign
        delete socketsToIds[socket.id];
      }
      socket.leaveAll();
    });
  });
}

module.exports = {
  setupIO,
};
