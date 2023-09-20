const Movie = require('../models/movie');
const AccessError = require('../errors/accessError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const DefaultError = require('../errors/defaultError');

module.exports.getMovie = (req, res, next) => {
  const query = { owner: `${req.user._id}` };
  Movie.find(query)
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    owner,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для создания фильма.'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const _id = req.params.movieID;
  Movie.findById(_id)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден.');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new AccessError('Вы не владелец фильма.');
      }
      Movie.findByIdAndDelete(_id)
        .then(() => res.send({ message: 'Фильм удален.' }))
        .catch(() => {
          throw new DefaultError('Ошибка удаления фильма.');
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные фильма.'));
        return;
      }
      next(err);
    });
};
