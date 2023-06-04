require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3500
const movies = require('./routers/movies')

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

db.on('error', errormsg => console.log(errormsg))
db.once('open', () => console.log('connection established'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Working')
})

app.use('/api/v1/movies', movies)


app.listen(PORT, () => console.log(`App running on port ${PORT}`))