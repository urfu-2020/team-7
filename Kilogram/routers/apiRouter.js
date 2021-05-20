const router = require('express').Router();
const { userRouter } = require('./usersRouter');
const { chatRouter } = require('./chatsRouter');

router.use('/users', userRouter);
router.use('/chats', chatRouter);

module.exports.apiRouter = router;
