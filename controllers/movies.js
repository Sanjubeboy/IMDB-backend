const movieModel = require('../models/movies')

const getAllMovies = async (req, res) => {
    try{
        const movies = await movieModel.find()
        res.status(200).json(movies)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

}


const addMovie = async (req, res) => {
    const newMovie = new movieModel({
        movieName: req.body.movieName,
        genre: req.body.genre,
        language: req.body.language,
        releasedYear: req.body.releasedYear,
        rating: req.body.rating
    })

    try{
        const success = await newMovie.save()
        res.status(200).json(success)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }   
}

const getMovieById = (req, res) => {
    
    try{
        res.status(200).json(res.movie)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const updateMovieById = async (req, res) => {
    if(req.body.movieName != null)
    {
        res.movie.movieName = req.body.movieName
    }
    if(req.body.genre != null)
    {
        res.movie.genre = req.body.genre
    }
    if(req.body.language != null)
    {
        res.movie.language = req.body.language
    }
    if(req.body.releasedYear != null)
    {
        res.movie.releasedYear = req.body.releasedYear
    }
    if(req.body.rating != null)
    {
        res.movie.rating = req.body.rating
    }

    try{
        const updatedmovie = await res.movie.save()
        res.status(200).json(updatedmovie)
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
}


const deleteMovieById = async(req, res) => {
    try{
        await res.movie.deleteOne()
        res.status(200).json({message: `Deleted the Movie ${res.movie.movieName}`})
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
}

const getMovie = async (req, res, next) => {
    let movie
    try{
        movie = await movieModel.findById(req.params.id)
        if(movie == null){
            return res.status(404).json({message:`Cannot find user id ${req.params.id}`})
        }
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }

    res.movie = movie;
    next()

}

module.exports = {getAllMovies, addMovie, getMovieById, updateMovieById, deleteMovieById, getMovie}