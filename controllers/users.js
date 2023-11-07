const usersRouter = require('express').Router()
const fs = require('fs/promises')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { uploadImage, deleteImage } = require('../utils/cloudinary')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, blogText: 1 })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response, next) => {
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

    if (request.files === null) {
      return response.status(400).json({ error: 'Image is required' })
    }

    if (request.files) {
      const { imageProfile } = request.files

      const result = await uploadImage(imageProfile.tempFilePath)
      savedUser.imageProfile = {
        secure_url: result.secure_url,
        public_id: result.public_id
      }
      await fs.unlink(imageProfile.tempFilePath)
      await savedUser.save()
    }

    response.status(201).json(savedUser)
  } catch (error) {
    if (request.files.imageProfile.tempFilePath) {
      await fs.unlink(request.files.imageProfile.tempFilePath)
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
    response.status(400).json({ error: error.message })
  }
})

usersRouter.patch('/:id', async (request, response, next) => {
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

    const userFound = await User.findById(id)
    console.log(request.files)

    if (request.files === null || request.files === undefined) {
      const user = await User.findByIdAndUpdate(id, userToUpdated)
      return response.json(user).status(200)
    }

    if (request.files) {
      const { imageProfile } = request.files

      if (userFound.imageProfile && userFound.imageProfile.public_id) {
        await deleteImage(userFound.imageProfile.public_id)
      }

      const result = await uploadImage(imageProfile.tempFilePath)
      userToUpdated.imageProfile = {
        secure_url: result.secure_url,
        public_id: result.public_id
      }
      await fs.unlink(imageProfile.tempFilePath)
      const user = await User.findByIdAndUpdate(id, userToUpdated, { new: true })
      return response.json(user).status(200)
    }
  } catch (error) {
    next(error)
    response.status(400).json(error.message)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
    response.status(400).json(error.message)
  }
})

module.exports = usersRouter
