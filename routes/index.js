const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const authChecker = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { loginValidator, createUserValidator } = require('../middlewares/validate');

console.log('Выполнение роута index');
router.use('/signin', loginValidator, login);
router.use('/signup', createUserValidator, createUser);

router.use(authChecker);
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use(authChecker, () => {
  throw new NotFoundError('Эндпойнт отсутствует.');
});

module.exports = router;
