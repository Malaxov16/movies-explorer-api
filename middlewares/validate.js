const { celebrate, Joi } = require('celebrate');

const regex = /https?:\/\/[-0-9a-z\\._~:?#\\[\]@!$&'()*+,;=]+\.[-0-9a-z._~:\\/?#\\[\]@!$&'()*+,;=]*/i;

// проверка авторизации пользователя
module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

// проверка обновления данных пользователя
module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 1 }),
  }),
});

// проверка создания пользователя
module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 1 }),
    password: Joi.string().required(),
  }),
});

// проверка создания фильма
module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().pattern(regex),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// проверка id фильма
module.exports.idMovieValidator = celebrate({
  params: Joi.object().keys({
    movieID: Joi.string().hex().length(24).required(),
  }),
});
