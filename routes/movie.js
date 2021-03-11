const { celebrate, Joi } = require('celebrate');
const movieRouter = require('express').Router();
const { getSavedMovies, createMovie, deleteSavedMovieById } = require('../controllers/movie');

movieRouter.get('/', getSavedMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), deleteSavedMovieById);

module.exports = movieRouter;
