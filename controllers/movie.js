const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');
const NotAllowedError = require('../errors/not-allowed-err');

const handleError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err.message);
  } else {
    console.log(err.message);
  }
};

const handleIdNotFound = () => {
  throw new NotFoundError('Нет фильма с таким id');
};

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail,
    nameRU, nameEN,
  } = req.body;
  console.log(req.user._id);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.deleteSavedMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => handleIdNotFound())
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotAllowedError('Нет прав на удаление фильма');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch((err) => handleError(err))
        .catch(next);
    })
    .catch(next);
};
