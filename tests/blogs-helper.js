const Blog = require('../models/blog')
const User = require('../models/user')

const INITIAL_STATE = [
  {
    title: 'eat',
    author: 'hector',
    blogText: 'please, eat a lot',
    userId: '651b6ba18535669862dd87a3'
  },
  {
    title: 'eat',
    author: 'anto',
    blogText: 'please, eat a lot',
    userId: '651b6de475c17cab56871cf8'
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInBD = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const mockRequest = {
  files: {
    imageProfile: {
      tempFilePath: '/path/to/temp/file'
    }
  }
}

module.exports = {
  blogsInDB,
  INITIAL_STATE,
  usersInBD,
  mockRequest
}
