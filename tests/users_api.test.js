const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./blogs-helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app.js')
const path = require('path')
const api = supertest(app)

describe('API EndPoints', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('antonio', 10)
    const user = new User({
      username: 'hector00',
      name: 'hector',
      passwordHash,
      imageProfile: {
        secure_url: 'https://example.com/image.png',
        public_id: 'image.png'
      }
    })

    await user.save()
  })

  test('GET /api/users/ one user must be', async () => {
    const usersAtStart = await helper.usersInBD()
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBD()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('POST /api/users/ an user must be created ', async () => {
    const usersAtStart = await helper.usersInBD()
    const newUser = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123'
    }

    const response = await api
      .post('/users')
      .field('name', newUser.name)
      .field('username', newUser.username)
      .field('password', newUser.password)
      .attach('imageProfile', '../uploadTests/html.png')

    console.log(response)
    const usersAtEnd = await helper.usersInBD()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    // const users = usersAtEnd.map(u => u.username)
    // expect(users).toContain(newUser.username)
  })

  test('PATH /api/users an user must be updated', async () => {
    const usersAtStart = await helper.usersInBD()
    const userToUpdate = usersAtStart[0]
    const user = { username: 'hector00', name: 'Burrito', password: 'antonio' }
    await api
      .patch(`/api/users/${userToUpdate.id}`)
      .send(user)
      .expect(200)

    const usersAtEnd = await helper.usersInBD()
    const userUpdated = usersAtEnd[0]
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(userUpdated.username).toContain(user.username)
    expect(userUpdated.name).toContain(user.name)
  })

  test('PATH /api/users an user must be not updated if not have password', async () => {
    const usersAtStart = await helper.usersInBD()
    const userToUpdate = usersAtStart[0]
    const user = { username: 'hector00', name: 'Burrito' }
    await api
      .patch(`/api/users/${userToUpdate.id}`)
      .send(user)
      .expect(400)
    const usersAtEnd = await helper.usersInBD()
    const userUpdated = usersAtEnd[0]
    expect(userUpdated.username).toContain(user.username)
    expect(userUpdated.name).not.toContain(user.name)
  })

  test('DELETE /api/users one user must be deleted', async () => {
    const usersAtStart = await helper.usersInBD()
    const userToDelete = usersAtStart[0]
    await api
      .delete(`/api/users/${userToDelete.id}`)
      .expect(204)

    const usersAtEnd = await helper.usersInBD()
    expect(usersAtEnd).toHaveLength(usersAtStart.length - 1)
  })
  test('DELETE /api/users a user should not be deleted if the user id is invalid', async () => {
    const usersAtStart = await helper.usersInBD()
    const id = 'aewqe1231231231231232'
    await api
      .delete(`/api/users/${id}`)
      .expect(400)

    const usersAtEnd = await helper.usersInBD()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
