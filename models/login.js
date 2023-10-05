const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const loginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog'
    }
  ]
})

loginSchema.plugin(uniqueValidator)

loginSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', loginSchema)
