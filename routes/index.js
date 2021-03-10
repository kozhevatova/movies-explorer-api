const appRouter = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { login, createUser } = require('../controllers/user');

appRouter.post('/signin', login);
appRouter.post('/signup', createUser);

appRouter.use('/users', auth, userRouter);
appRouter.use('/movies', auth, movieRouter);

module.exports = appRouter;
