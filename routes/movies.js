const router = require('express').Router();

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidator, idMovieValidator } = require('../middlewares/validate');

router.get('/', getMovie);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieID', idMovieValidator, deleteMovie);

module.exports = router;
