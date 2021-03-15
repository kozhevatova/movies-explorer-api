const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/user');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateUserInfo);

module.exports = userRouter;
