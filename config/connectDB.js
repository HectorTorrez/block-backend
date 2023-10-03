const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error to connect', error.message)
  }
}

module.exports = {
  connectDB
}
