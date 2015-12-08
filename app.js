var express = require("express");
var morgan = require('morgan');

var app = express();

// logging
app.use(morgan('dev'));

// Set the views directory
app.set('views', __dirname + '/views');
// Define the view (templating) engine
app.set('view engine', 'ejs');

// load static pages
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) { 
	res.render('index', {page: 'home', data: {}}); 
});
app.get('/activeNav', function(req, res) { 
	res.render('index', {page: 'activeNav', data: {}}); // update this to take in info about that particular link
});

app.listen(50001);
console.log("Server listening at http://localhost:50001/");