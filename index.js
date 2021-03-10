const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req,res) => {
    res.sendFile('index.html', {
      root: __dirname
    })
})

app.get('/courses', (req, res) => {
    res.sendFile('courses.html', {
    root: __dirname})
})