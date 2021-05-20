const messagesRouter = require('express').Router();
const { isAuth, isChatAllowed } = require('../api/checks');
const { getAllMessages } = require('../services/messages');
const { Message, User } = require('../models/models');

messagesRouter.get('/new', async (req, res) => {
  const m = await Message.create({
    content: 'blablablab',
  });
  const u = await User.findOne({
    raw: true,
    where: {
      username: 'SavelevMatthew',
    },
  });
  m.setUser(u.id);
  m.setChat(5);
  res.status(200).json(m);
});
messagesRouter.get('/:id', isAuth, isChatAllowed, getAllMessages);

module.exports.messagesRouter = messagesRouter;
