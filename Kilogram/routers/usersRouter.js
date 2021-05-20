const userRouter = require('express').Router();
const { getUserById, getUserByUsername } = require('../api/jsons');

userRouter.get('/getById/:id', getUserById);
userRouter.get('/getByName/:name', getUserByUsername);

module.exports.userRouter = userRouter;
