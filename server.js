// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
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

// routers 
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});







// app.get('/api', function apiIndex(req, res) {
//  res.json({
//    message: "Welcome to my personal favorite birds api! Here's what you need to know!",
//    documentationUrl: "https://github.com/achentha/express-personal-api/blob/master/README.md",
//    baseUrl: "https://dry-scrubland-21249.herokuapp.com/",
//    endpoints: [
//      {method: "GET", path: "/api", description: "Gets project page"},
//      {method: "GET", path: "/api/bjj", description: "Jiu Jitsu Data"},
//      {method: "DELETE", path: "/api/bjj:bjjId", description: "Delete a favorite bird"},
//    ]
//  })
// });

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 4000, function () {
  console.log('Express server is up and running on http://localhost:4000/');
});
