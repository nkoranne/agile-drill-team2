const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Now listening at http://localhost:${port}`)
})

app.get('/', (req,res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.get('/addCourse', (req,res) => {
    res.sendFile('addNewCourse.html', {root: __dirname})
})

app.get('/addEvent', (req,res) => {
  res.sendFile('addNewEvent.html', {root: __dirname})
})

app.get('/courses', (req, res) => {
    res.sendFile('courses.html', {
    root: __dirname})
})

app.get('/course-1', (req, res) => {
  res.sendFile('course-1.html', {
    root: __dirname
  })
})

app.get('/course-2', (req, res) => {
  res.sendFile('course-2.html', {
    root: __dirname
  })
})