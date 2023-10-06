const mongoose = require('mongoose')
const config = require('../utils/config')
require('dotenv').config()

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error to connect', error.message)
  }
}

module.exports = {
  connectDB
}
