const userRouter = require('express').Router();
const { isAuth, isSelfId } = require('../api/checks');
const { getUserById, getUserByUsername, updateUser } = require('../api/jsons');

userRouter.get('/getById/:id', getUserById);
userRouter.get('/getByName/:name', getUserByUsername);
userRouter.put('/:id', isAuth, isSelfId, updateUser);

module.exports.userRouter = userRouter;
