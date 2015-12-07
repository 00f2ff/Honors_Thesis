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



app.listen(50000);
console.log("Server listening at http://localhost:50000/");