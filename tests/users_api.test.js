const supertest = require('supertest')
const app = require('express')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./blogs-helper')
const mongoose = require('mongoose')

describe('post/ create a user', () => {
  beforeEach(async () => {
    console.log('h1')
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('hector', 10)
    await new User({ username: 'hector', passwordHash }).save()
  })

  test('must be created a user', async () => {
    const usersAtStart = await helper.usersInBD()

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

afterAll(() => {
  mongoose.connection.close()
})
