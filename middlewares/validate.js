/* eslint-disable import/no-extraneous-dependencies */
const { celebrate, Joi } = require('celebrate');

const regex = /https?:\/\/[-0-9a-z\\._~:?#\\[\]@!$&'()*+,;=]+\.ru[-0-9a-z._~:\\/?#\\[\]@!$&'()*+,;=]*/i;

// проверка id пользователя
module.exports.idUserValidator = celebrate({
  params: Joi.object().keys({
    userID: Joi.string().hex().length(24),
  }),
});

// проверка создания пользователя
module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email({ minDomainSegments: 1 }),
    password: Joi.string().required(),
  }),
});

// проверка обновления данных пользователя
module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// проверка обновления аватара
module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

// проверка данных для аутентификации
module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 1 }),
    password: Joi.string().required(),
  }),
});

// проверка id карточки
module.exports.idCardValidator = celebrate({
  params: Joi.object().keys({
    cardID: Joi.string().hex().length(24),
  }),
});

// проверка создания карточки
module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});
