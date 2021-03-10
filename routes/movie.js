const movieRouter = require('express').Router();
const { getSavedMovies, createMovie, deleteSavedMovieById } = require('../controllers/movie');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', deleteSavedMovieById);

module.exports = movieRouter;
