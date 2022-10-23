var _ = require('lodash')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fd",
    title: "Missing likes",
    author: "No likie",
    url: "er",
    __v: 0
  }
]

const dummy = (blogs) => {
  return 1
};

const totalLikes = (blogs) => {
  let initialValue = 0

  const total = blogs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.likes;
  }, initialValue)

  return total
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(x => x.likes)
  const mostFav = Math.max(...likes)

  const result = blogs.filter(x => x.likes === mostFav)

  const displayResult = {
    title: result[0].title,
    author: result[0].author,
    likes: result[0].likes
  }

  return displayResult
}

const mostBlogs = (blogs) => {
  let arr = _.countBy(blogs.map(blogs => blogs.author))
  let result = {
    author: _.max(Object.keys(arr)),
    blogs: _.max(Object.values(arr))
  }
  return result
}

const mostLikes = (blogs) => {
  //Empty list for author/likes
  let list = []

  //Array of authors from obj
  const arr = blogs.map(el => el.author)

  //Array of unique names
  const uniques = Object.keys(_.countBy(arr))

  //Sum of likes for each unique name from array
  let count = 0
  for (let h = 0; h < uniques.length; h++) {
    for (let i = 0; i < blogs.length; i++) {
      if (uniques[h] === blogs[i].author) {
        count += blogs[i].likes
      }
    }
    //Create obj with author/likes and push it onto empty array
    let item = {
      author: uniques[h],
      likes: count
    }
    list.push(item)
    count = 0
  }

  return _.maxBy(list, 'likes')
}

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
