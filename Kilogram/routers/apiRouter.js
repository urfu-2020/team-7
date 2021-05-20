const router = require('express').Router();
const { messagesRouter } = require('./messagesRouter');
const { userRouter } = require('./usersRouter');
const { chatRouter } = require('./chatsRouter');

router.use('/users', userRouter);
router.use('/chats', chatRouter);
router.use('/messages', messagesRouter);

module.exports.apiRouter = router;
