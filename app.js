const express = require('express')
const app = express()
const { connectDB } = require('./config/connectDB')
const cors = require('cors')
connectDB()

app.use(cors())
app.use(express.json())

module.exports = app
