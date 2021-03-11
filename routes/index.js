const { celebrate, Joi } = require('celebrate');
const appRouter = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-err');

appRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

appRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

// роуты, защищенные авторизацией
appRouter.use('/users', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), auth, userRouter);

appRouter.use('/movies', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), auth, movieRouter);

appRouter.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = appRouter;
