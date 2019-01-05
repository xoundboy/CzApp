var config = require('./config');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var cors = require('cors');

// CREATE SERVER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
http.listen(config.SERVER_PORT, function(){
    console.log("Connected & Listening to port " + config.SERVER_PORT);
});

// SERVE THE SINGLE PAGE APP
app.use('/', express.static('../public'));

// CONTROLLERS
app.use('/words', require('./words'));
app.use('/lexemes', require('./lexemes'));