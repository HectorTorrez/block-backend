const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.log(error)
    response.status(404).json(error)
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

blogsRouter.patch('/:id', async (request, response) => {
  try {
    const { title, author, blogText } = request.body
    const id = request.params.id
    const updatedBlog = {
      title,
      author,
      blogText
    }
    const foundBlog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    response.json(foundBlog).status(200)
  } catch (error) {
    console.log(error)
    response.status(404).json(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    console.log(error)
    response.status(404).json(error)
  }
})

module.exports = blogsRouter
