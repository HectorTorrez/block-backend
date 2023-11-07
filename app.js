const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const { connectDB } = require('./config/connectDB')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middleware/tokenExtractor')
const middleware = require('./utils/middleware')
const resetPassword = require('./controllers/resetPassword')
connectDB()
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
  })
)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/resetPassword', resetPassword)

app.use(middleware.errorHandler)
module.exports = app
