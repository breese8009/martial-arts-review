// require express and other modules
let express = require('express');
let app = express();

// parse incoming urlencoded form data
// and populate the req.body object
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var controllers = require('./controllers');

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * ROUTES
 */

 //api ROUTE (JSON)
 app.get('/api', controllers.api.index); //get all the endpoints and return in JSON format

//style ROUTES
app.get('/api/styles', controllers.styles.index); // get all styles
app.get('/api/styles/:styleId', controllers.styles.show); // get one style
app.post('/api/styles', controllers.styles.create); // create a new style
app.put('/api/styles/:styleId', controllers.styles.update); // edit a style
app.delete('/api/styles/:styleId', controllers.styles.destroy); // delete a style

//school ROUTES
app.get('/api/styles/:styleId/schools', controllers.schools.index); //get all schools of a style
app.post('/api/styles/:styleId/schools', controllers.schools.create); //create a school for a style
app.put('/app/styles/:styleId/schools/:schoolId', controllers.schools.update); //edit a school of the specified style
app.delete('/app/styles/:styleId/schools/:schoolId', controllers.schools.destroy); //delete a school of the specified style

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 4000, function () {
  console.log('Express server is up and running on http://localhost:4000/');
});
