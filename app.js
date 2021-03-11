require('dotenv').config({ path: './env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const appRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');
const { dbName } = require('./utils/config');

const { PORT = 3000 } = process.env;
const app = express();

// подключение к серверу mongo
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const options = {
  origin: ['http://localhost:3000',
    'http://annakin.diploma.students.nomoredomains.monster',
    'http://www.annakin.diploma.students.nomoredomains.monster',
    'https://annakin.diploma.students.nomoredomains.monster',
    'https://www.annakin.diploma.students.nomoredomains.monster'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'authorization'],
  credentials: true,
};
app.use('*', cors(options));

app.use(helmet());
// bodyParser deprecated
app.use(express.json());

// логгер запросов
app.use(requestLogger);

app.use(limiter);

// роут
app.use('/', appRouter);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
