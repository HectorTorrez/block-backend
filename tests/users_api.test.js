const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./blogs-helper')
const app = require('express')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

describe('post/ create a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('antonio', 10)
    const user = new User({ username: 'hector00', name: 'hector', passwordHash })

    await user.save()
  })
  test('must be created a user', async () => {
    const usersAtStart = await helper.usersInBD()
    console.log(usersAtStart)
    const newUser = {
      name: 'antonio',
      username: 'antonio00',
      password: '123456'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInBD()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const users = usersAtEnd.map(u => u.username)
    expect(users).toContain(newUser.username)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
