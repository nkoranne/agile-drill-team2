const express = require('express')
var mysql = require('mysql')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

var connection = mysql.createConnection({
  socketPath: '/tmp/mysql.sock',
  user: 'root',
  password: 'password',
  database: 'MapDatabase'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


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
  //DB Query to Display all Courses.
  connection.query('SELECT * FROM Course', function (error, results, fields) {
    if (error) throw error;
    console.log(results);

    res.render('courses', {
      queryResults : results
    })
  });

})

app.get('/course-1', (req, res) => {
  res.render('course-1', {})
})

app.get('/course-2', (req, res) => {
  res.render('course-2', { })
})