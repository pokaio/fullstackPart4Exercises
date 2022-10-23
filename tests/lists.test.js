//Jest tests
const mongoose = require('mongoose')
const supertest = require('supertest')
const { isObject } = require('lodash');
const app = require('../app')
const api = supertest(app)
var _ = require('lodash')

const listHelper = require("../utils/list_helpers");

const Blogs = require('../models/blog')

beforeEach(async () => {
  await Blogs.deleteMany({})



  const listObject = listHelper.initialBlogs
    .map(list => new Blogs(list))
  const promiseArray = listObject.map(list => list.save())
  await Promise.all(promiseArray)
})



const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  }
]

describe('4.8 supertest GET request', () => {
  test('Returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('content-type', /application\/json/)

    expect(response.body).toHaveLength(listHelper.initialBlogs.length)
  }, 10000)
})

describe('4.9', () => {
  test('Check that the unique identifier of blog post is id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    for (let i of response.body)
      expect(i.id).toBeDefined()
  })
})

describe('4.10 HTTP POST request', () => {
  test('Verifying that we can make an HTTP POST', async () => {
    const blog = new Blogs({
      title: "Test",
      author: "Yah",
      url: "er",
      likes: 1
    })

    const beforeSaved = await api
      .get('/api/blogs')
      .expect(200)

    const savedBlog = await blog.save()

    const afterSaved = await api
      .get('/api/blogs')
      .expect(200)

    //Check that we have added 1 more item to our list
    expect(afterSaved.body.length).toEqual(beforeSaved.body.length + 1)
    //Check that the item added to array is identical
    expect(afterSaved.body[afterSaved.body.length - 1]).toMatchObject(blog.toJSON())
  })
})

describe('4.11 if likes is missing, default to 0', () => {
  test('missing likes', async () => {
    const test = await api
      .get('/api/blogs')
      .expect(200)
    expect(test.body[test.body.length - 1].likes).toBe(0)
  })
})

describe('4.12 POST Missing title or url', () => {
  test('POST missing title', async () => {
    const missing = new Blogs({
      author: "No Title and URL"
    })

    const send = await api
      .post('/api/blogs')
      .send(missing)
      .expect(400)


    /* const send = await missing.save()


    if (!missing.title || !missing.url) {
      console.log('missing')

    } else {
      const send = await missing.save()
    }



    const afterSend = await api
      .get('/api/blogs')
      .expect(200)

    console.log(afterSend.body) */
  })
})





/* describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total number of likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when there are 5 separate entries, summarize the number of likes", () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs)
    expect(result).toBe(36)
  })
});

describe("blog with most favorites", () => {
  test("returns the blog with the most amount of likes", () => {
    const result = listHelper.favoriteBlog(listHelper.initialBlogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
  })
})

describe("author with most blogs", () => {
  test("returns the name of the author with most blog posts", () => {
    const result = listHelper.mostBlogs(listHelper.initialBlogs)
    expect(result).toEqual(
      {
        author: "Robert C. Martin",
        blogs: 3
      }
    )
  })
})

describe("author with most likes", () => {
  test("returns the name of the author with most likes", () => {
    const result = listHelper.mostLikes(listHelper.initialBlogs)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    )
  })
}) */

afterAll(() => {
  mongoose.connection.close()
})