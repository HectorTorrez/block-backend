const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, blogText: 1 })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { name, username, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
      name,
      username,
      passwordHash
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    response.status(400).json(error.message)
  }
})

usersRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const { name, username, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userToUpdated = {
      name,
      username,
      passwordHash
    }
    const user = await User.findByIdAndUpdate(id, userToUpdated, { new: true })
    response.json(user).status(200)
  } catch (error) {
    response.status(400).json(error.message)
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    console.log(error.message)
    response.status(400).json(error.message)
  }
})

module.exports = usersRouter
