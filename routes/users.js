const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validate');

router.get('/me', getUser);
router.patch('/me', updateUserValidator, updateUserInfo);

module.exports = router;
