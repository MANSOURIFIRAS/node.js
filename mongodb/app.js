var express = require('express');
const bodyParser = require('body-parser');

var path = require('path');
var app = express();

//import database ;
var mongoose = require("mongoose");
var configDB = require("./database/mongodb.json");
const contact = require('./models/contact');
//mongo config
const connect = mongoose.connect(
  configDB.mongo.uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB !!")
);

var indexRouter = require('./routes/index');
var contacts = require('./routes/contacts');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/contacts', contacts);



module.exports = app;

