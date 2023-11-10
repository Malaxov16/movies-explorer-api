const router = require('express').Router();

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidator, idMovieValidator } = require('../middlewares/validate');

console.log('Выполнение роута movies');
router.get('/', getMovie);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieID', idMovieValidator, deleteMovie);

module.exports = router;
