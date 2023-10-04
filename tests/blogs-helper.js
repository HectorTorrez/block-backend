const Blog = require('../models/blog')

const INITIAL_STATE = [
  {
    title: 'eat',
    author: 'hector',
    blogText: 'please, eat a lot',
    id: '651b6ba18535669862dd87a3'
  },
  {
    title: 'eat',
    author: 'anto',
    blogText: 'please, eat a lot',
    id: '651b6de475c17cab56871cf8'
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  blogsInDB,
  INITIAL_STATE
}
