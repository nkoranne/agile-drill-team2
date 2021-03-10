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