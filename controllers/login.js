const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
    console.log(passwordCorrect)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userFortoken = {
      username: user.username,
      id: user.id
    }
    const expiresIn = '5m'
    const jwtOptions = {
      expiresIn
    }
    const token = jwt.sign(userFortoken, process.env.SECRET, jwtOptions)
    console.log(token)
    response.status(200).send({ token, username: user.username, name: user.name })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json(error.message)
    }
  }
})

module.exports = loginRouter
