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
      .expect('Content-Type', /application\/json/)
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

  test('blog must be not created, if title and blogText are mising', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const newBlog = {
      author: 'hector'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('blog must be not created, if title and author dont have the min of length', async () => {
    const blogsAtStart = await helper.blogsInDB()

    const newBlog = {
      title: 'an',
      author: 'a',
      blogText: 'water and more water'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(result.body).toContain(`Blog validation failed: title: must be at lest 3 -- ${newBlog.title}, author: must be at lest 3 -- ${newBlog.author}`)
  })

  test('blog must be no created, if blogText dont have the min of length', async () => {
    const blogsAtStart = await helper.blogsInDB()

    const newBlog = {
      title: 'water',
      author: 'antonio',
      blogText: 'water '
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(result.body).toContain(`Blog validation failed: blogText: must be at lest 10 -- ${newBlog.blogText}`)
  })
})

describe('PATH/ updated blog', () => {
  test('blog must be updated', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send({ blogText: 'eat more meat and drink more water during the day' })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.blogText).toContain('eat more meat and drink more water during the day')
  })

  test('blog must be not updated', async () => {
    const id = 123123132

    const result = await api
      .patch(`/api/blogs/${id}`)
      .send({ blogText: 'eat more meat and drink more water during the day' })
      .expect(400)

    expect(result.body.message.toString()).toContain(`Cast to ObjectId failed for value "${id}" (type string) at path "_id" for model "Blog"`)
  })
})

describe('DELETE/ blog', () => {
  test('blog must be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContain(blogToDelete.id)
  })

  test('blog must be not deleted', async () => {
    const id = 123123132

    const result = await api
      .delete(`/api/blogs/${id}`)
      .expect(400)

    expect(result.body.message).toContain(`Cast to ObjectId failed for value "${id}" (type string) at path "_id" for model "Blog"`)
  })
})
