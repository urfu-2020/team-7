const messagesRouter = require('express').Router();
const {
  isAuth, isChatAllowedParam, isCorrectMessageBody, isChatAllowedBody,
} = require('../api/checks');
const { getAllMessages, sendMessage } = require('../services/messages');

messagesRouter.get('/:id', isAuth, isChatAllowedParam, getAllMessages);
messagesRouter.post('', isAuth, isCorrectMessageBody, isChatAllowedBody, sendMessage);

module.exports.messagesRouter = messagesRouter;
