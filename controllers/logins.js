const loginRouter = require('express').Router()
const User = require('../models/login')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  try {
    const { name, username, password } = request.body
    const saltRounds = 10
    const passwordHash = bcrypt.hash(password, saltRounds)

    const newUser = {
      name,
      username,
      passwordHash
    }
    const user = await new User(newUser)
    response.status(201).json(user)
  } catch (error) {
    console.log(error)
    response.status(400).json(error)
  }
})
