const chatRouter = require('express').Router();
const { isAuth, isSelfId, isCorrectChatBody } = require('../api/checks');
const { getAllChats, createChat } = require('../services/contacts');

chatRouter.get('/getAllChats/:id', isAuth, isSelfId, getAllChats);
chatRouter.post('/', isAuth, isCorrectChatBody, createChat);

module.exports.chatRouter = chatRouter;
