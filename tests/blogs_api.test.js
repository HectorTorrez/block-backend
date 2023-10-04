const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blogs-helper.js')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.INITIAL_STATE)
})

describe('GET/ get blogs', () => {
  test('must get all the blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
  })

  test('must be error wron endpoint', async () => {
    await api
      .get('/api/blog/')
      .expect(404)
  })
})

describe('Post/ blog creation', () => {
  test('blog must be created', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const newBlog = {
      title: 'drink a lot of water',
      author: 'hector',
      blogText: "It's necesary drink a lot of water to be happy"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain(newBlog.title)
  })
})
