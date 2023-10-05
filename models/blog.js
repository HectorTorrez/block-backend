const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, 'must be at lest 3 -- {VALUE}']
  },
  author: {
    type: String,
    required: true,
    minLength: [3, 'must be at lest 3 -- {VALUE}']
  },
  blogText: {
    type: String,
    validate: {
      validator: (value) => typeof value === 'string',
      message: '{VALUE} is not a valid string.'
    },
    required: true,
    minLength: [10, 'must be at lest 10 -- {VALUE}']
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]

})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
