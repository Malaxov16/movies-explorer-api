const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

const { JWT_SECRET = 'secret' } = process.env;

const opts = { runValidators: true, new: true };

// получение данных пользователя по id
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для поиска пользователя.'));
      }
      next(err);
    });
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((data) => {
          const user = data.toObject();
          delete user.password;
          res.status(201).send({ data: user });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email существует.'));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные для создания пользователя.'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

// обновление инфомрации о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, opts)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для обновления данных о пользователе.'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
        return;
      }
      next(err);
    });
};

// авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredntials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
