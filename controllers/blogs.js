//Router 
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    //If missing likes, default likes to 0
    for (let i of blog) {
        if (!i.likes) {
            i.likes = 0
        }
    }
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }


    /* const savedBlog = await blog.save()
    response.status(201).json(result) */


    /* blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }) */
})



module.exports = blogRouter