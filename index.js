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
 //DB Query to Display all Courses.
 connection.query('SELECT * FROM Events INNER JOIN course on Events.course_id = Course.course_id', function (error, results, fields) {
   if (error) throw error;

   res.render('courses', {
     queryResults: results,
     successfulBooking: ""
   })
 });
})

app.get('/addCourse', (req, res) => {
  res.render('addNewCourse', {})
})

app.get('/addEvent', (req, res) => {
  res.render('addNewEvent', {})
})

app.get('/courses', (req, res) => {
  //DB Query to Display all Courses.
  connection.query('SELECT DISTINCT (course.course_id, course.course_title, course.course_description, events.event_date, events.event_location) FROM Events INNER JOIN course on Events.course_id = Course.course_id', function (error, results, fields) {
    if (error) throw error;

    res.render('courses', {
      queryResults : results,
      successfulBooking: ""
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
      
      connection.query('select count(emp_id) AS num from events where course_id = ' + req.body.courseNo + ' group by course_id', function (error, count_results, fields) {
      res.render('course-further-info', {
        queryResults: results,
        count: count_results[0].num
      })
    });
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
  connection.query('QUERY HERE'),
    function (error, results, fields) {
    if (error) throw error;
  };
})

app.post('/add-event', (req, res) => {
   //READ INPUT FROM FORM

   //USE INPUT TO MAKE AN INSERT STATEMENT INTO DB
  connection.query('QUERY HERE', function (error, results, fields) {
    if (error) throw error;
  });
})

app.post('/booking', (req,res) => {
  console.log("Connection has been hit ")
  console.log(req.body.course_id)

   connection.query('INSERT INTO Employee (emp_firstName, emp_lastName, emp_email, emp_acessLevel) VALUES (\'' + req.body.firstName + '\', \'' + req.body.surname + '\', \'' + req.body.email + '\', 1)', function (error, results, fields) {
      connection.query('SELECT * FROM employee WHERE emp_email = \'' + req.body.email + '\'', function (error, emp_results, fields) {
         connection.query('SELECT * FROM Events INNER JOIN course on Events.course_id = Course.course_id', function (error, course_results, fields) {
          connection.query('INSERT INTO EVENTS(event_title, event_date, event_location, trainer_id, emp_id,course_id) VALUES (\'' + course_results[0].course_title + '\', \'' + '2021-02-10' + '\', \'' + course_results[0].event_location + '\', \'' + course_results[0].trainer_id + '\', \'' + emp_results[0].emp_id + '\', \'' + course_results[0].course_id + '\')', function (error, results, fields) {
            if (error) throw error;
          });
      });
    });
   });

  //DB Query to Display all Courses.
  connection.query('SELECT * FROM Events INNER JOIN course on Events.course_id = Course.course_id', function (error, results, fields) {
    if (error) throw error;

    res.render('courses', {
      queryResults: results,
      successfulBooking: "Booking has been made."
    })
  });
});
