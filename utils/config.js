require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const CLOUD_NAME = process.env.cloud_name
const API_KEY = process.env.api_key
const API_SECRET = process.env.api_secret

module.exports = {
  MONGODB_URI,
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET
}
