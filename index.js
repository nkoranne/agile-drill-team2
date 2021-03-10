const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Now listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.render('courses', {})
})

app.get('/addCourse', (req, res) => {
  res.render('addNewCourse', {})
})

app.get('/addEvent', (req, res) => {
  res.render('addNewEvent', {})
})

app.get('/courses', (req, res) => {
  res.render('courses', {
  })
})

app.get('/course-1', (req, res) => {
  res.render('course-1', {})
})

app.get('/course-2', (req, res) => {
  res.render('course-2', { })
})