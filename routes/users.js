const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', updateUserInfo);

module.exports = router;
