const chatRouter = require('express').Router();
const { isAuth, isSelfId } = require('../api/checks');
const { getAllChats } = require('../services/contacts');

chatRouter.get('/getAllChats/:id', isAuth, isSelfId, getAllChats);

module.exports.chatRouter = chatRouter;
