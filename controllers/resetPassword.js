const resetPassword = require('express').Router()
const User = require('../models/user')

resetPassword.post('/', async (request, response, next) => {
  try {
    const { username } = request.body
    const user = await User.findOne({ username })
    console.log(user)
    console.log(username)
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    response.status(200).send({ username: user.username, id: user.id })
  } catch (error) {
    next(error)
  }
})

module.exports = resetPassword
