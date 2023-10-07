const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./blogs-helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app.js')
const api = supertest(app)

describe('post/ create a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('antonio', 10)
    const user = new User({ username: 'hector00', name: 'hector', passwordHash })

    await user.save()
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

    console.log('finish find')
    const usersAtEnd = await helper.usersInBD()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const users = usersAtEnd.map(u => u.username)
    expect(users).toContain(newUser.username)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
