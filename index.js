const express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

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
  connection.query('SELECT * FROM Events INNER JOIN course on Events.course_id = Course.course_id', function (error, results, fields) {
    if (error) throw error;

    res.render('courses', {
      queryResults : results
    })
  });

})

app.get('/course-further-info', (req, res) => {
  res.render('course-further-info', {})
})

app.post('/course-further-info', (req, res) => {
  //DB Query to Display the Course clicked on to see more.
  connection.query('select * from Events INNER JOIN course on Events.course_id = Course.course_id INNER JOIN trainer on Events.trainer_id = Trainer.trainer_id where Events.course_id = ' + req.body.courseNo, function (error, results, fields) {
    if (error) throw error;

    res.render('course-further-info', {
      queryResults: results
    })
  });
})

/* HOW TO GATHER USER INPUT:
Set the name value in the HTML of the element 
Once form is submitted you can access the elements inputted on the form in the POST function below by
using req.body.NAME_OF_HTML_ELEMENT

e.g. req.body.courseName if courseName was the name of the element/name tag in HTML 

 < input type = "text"
 class = "form-control"
 id = "id" name=courseId >

*/

app.post('/add-course', (req, res) => {
  //READ INPUT FROM FORM

  //USE INPUT TO MAKE AN INSERT STATEMENT INTO DB
  connection.query('QUERY HERE', function (error, results, fields) {
    if (error) throw error;
  });
})

app.post('/add-event', (req, res) => {
   //READ INPUT FROM FORM

   //USE INPUT TO MAKE AN INSERT STATEMENT INTO DB
  connection.query('QUERY HERE', function (error, results, fields) {
    if (error) throw error;
  });
})
