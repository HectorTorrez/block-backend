const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, blogText } = request.body

  try {
    const newBlog = {
      title,
      author,
      blogText
    }
    const blog = new Blog(newBlog)
    await blog.save()
    response.status(201).json(blog)
  } catch (error) {
    console.log(error.message)
    if (error.name === 'ValidationError') {
      response.status(404).json(error.message)
    }
    console.log(error)
  }
})

module.exports = blogsRouter
