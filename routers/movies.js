const express = require('express')
const router = express.Router()
const movieModel = require('../models/movies')
const {getAllMovies, addMovie, getMovieById, updateMovieById, deleteMovieById, getMovie} = require('../controllers/movies')

router.route('/').get(getAllMovies).post(addMovie)

router.route('/:id').get(getMovie, getMovieById).patch(getMovie, updateMovieById).delete(getMovie, deleteMovieById)


module.exports = router