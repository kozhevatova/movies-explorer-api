const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/user');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateUserInfo);

module.exports = userRouter;
