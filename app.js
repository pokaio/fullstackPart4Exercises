//Ex 4.8-4.12

//4.12. Does not check correctly. 
//Error 4.10. Does not post correctly Try:
/* await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/) */


const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app