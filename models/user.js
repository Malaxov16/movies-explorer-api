// описание схемы и создание модели Users
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const AuthError = require('../errors/authError');

// описание схемы для таблицы с пользователями
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

// метод проверки почты и пароля
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredntials = function (email, password) {
  // найти пользователя в БД
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      // если пользователь по email найден, то проверить соответсвие пароля
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          // если пароли совпадают, то вернуть _id пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('users', userSchema);
