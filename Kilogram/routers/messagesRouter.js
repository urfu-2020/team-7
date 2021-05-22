const messagesRouter = require('express').Router();
const { isAuth, isChatAllowed } = require('../api/checks');
const { getAllMessages } = require('../services/messages');

messagesRouter.get('/:id', isAuth, isChatAllowed, getAllMessages);

module.exports.messagesRouter = messagesRouter;
