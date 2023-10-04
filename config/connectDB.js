const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
require('dotenv').config()

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error to connect', error.message)
  }
}

module.exports = {
  connectDB
}
