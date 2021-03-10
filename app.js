require('dotenv').config({ path: './env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
// const { celebrate, Joi } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const options = {
  origin: ['http://localhost:3000'],
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application is running in port ${PORT}`);
});
