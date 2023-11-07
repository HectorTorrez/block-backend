const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userFortoken = {
      username: user.username,
      id: user.id
    }
    const expiresIn = '1h'
    const jwtOptions = {
      expiresIn
    }
    const token = jwt.sign(userFortoken, process.env.SECRET, jwtOptions)
    response.status(200).send({ token, username: user.username, name: user.name, imageProfile: user.imageProfile, id: user.id })
  } catch (error) {
    next(error)
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json(error.message)
    }
  }
})

module.exports = loginRouter
