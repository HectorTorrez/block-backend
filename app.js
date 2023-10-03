const express = require('express')
const app = express()
const { connectDB } = require('./config/connectDB')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
