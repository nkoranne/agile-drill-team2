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
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'MapDatabase'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log(`Now listening at http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.render('courses', {});
})

app.get('/addCourse', (req, res) => {
  res.render('addNewCourse', {});
})

app.get('/addEvent', (req, res) => {
  res.render('addNewEvent', {});
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
  console.log("adding course");
  //READ INPUT FROM FORM
  var title = req.body.title;
  var description = req.body.description;
  var duration = req.body.duration;
  var preferred = req.body.preferred;

  //Validation

  //Title is less than 100 characters
  if (title.length > 100) {
    res.render('addNewCourse', {});
  }

  //Description is less than 300 characters
  if (description.length > 300) {
    res.render('addNewCourse', {});
  }

  //Preferred Attendee list is less than 200 characters
  if (preferred.length > 200) {
    res.render('addNewCourse', {});
  }

  //USE INPUT TO MAKE AN INSERT STATEMENT INTO DB
  connection.query('INSERT INTO Course (course_title, course_description, course_duration, PreferedAttendees) VALUES (\'' + title + '\', \'' + description + '\', \'' + duration + '\', \'' + preferred + '\');', function (error, results, fields) {
    if (error) throw error;
  });

  res.render('addNewCourse', {});
})

app.post('/add-event', (req, res) => {
  console.log("adding event ", req.body);
   //READ INPUT FROM FORM

   var course_id = req.body.course_id;
   var title = req.body.title;
   var date = req.body.date;
   var locationDropdown = req.body.locationDropdown;

   console.log(course_id);
   console.log(title);

   /*if (title == null) {
    connection.query('SELECT * FROM Course where course_id = ' + course_id, function (error, results, fields) {
      if (error) throw error;
        console.log(results)
    });
   }*/

   //USE INPUT TO MAKE AN INSERT STATEMENT INTO DB
   /*connection.query('INSERT INTO Events (event_title, event_location, event_date, trainer_id, course_id) VALUES (\'' + title + '\', \'' + description + '\', \'' + duration + '\', \'' + preferred + '\');', function (error, results, fields) {
    if (error) throw error;
  });*/

  //res.render('addNewEvent', {})
})
