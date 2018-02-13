var config = require('./config');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");

// CREATE SERVER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
http.listen(config.SERVER_PORT, function(){
    console.log("Connected & Listening to port " + config.SERVER_PORT);
});

// CONTROLLERS
app.use('/words', require('./words'));