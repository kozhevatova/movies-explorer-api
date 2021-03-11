const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-auth-err');
const { devJwtSecret } = require('../utils/config');

module.exports = (req, res, next) => {
  // авторизационный заголовок
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  // верификация токена
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : devJwtSecret);
  } catch (err) {
    throw new NotAuthorizedError(err.message);
  }

  // запись пейлоуда в объект запроса
  req.user = payload;
  next();
};
