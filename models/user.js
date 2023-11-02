const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'must be at lest 5 -- {VALUE}']
  },
  name: {
    type: String,
    required: true,
    minLength: [5, 'must be at lest 5 -- {VALUE}']

  },
  passwordHash: {
    type: String,
    required: true,
    minLength: [5, 'must be at lest 5 -- {VALUE}']

  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }

  ],
  imageProfile: {
    type: Object,
    properties: {
      secure_url: {
        type: String
      },
      public_id: {
        type: String
      }
    }
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
