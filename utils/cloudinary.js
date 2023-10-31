const cloudinary = require('cloudinary')
const { API_KEY, API_SECRET, CLOUD_NAME } = require('./config')

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})
const uploadImage = async (filePath, publicId) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'profilePictures'
  })
}
const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}
module.exports = {
  uploadImage,
  deleteImage
}
