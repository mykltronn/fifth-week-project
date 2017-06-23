var express = require('express');
var fs = require('fs');
var validator = require('express-validator');
var mustache = require('mustache-express');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var jsonfile = require('jsonfile');
var session = require('express-session')

var app = express();

app.use(validator());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(session({       // setup sessions
  secret: 'cookiepartycookiepartycookieparty',
  resave: false,
  saveUninitialized: true
}))

// v v  variables   v v
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


does this work, above? error says cannot read .split of undefined



// generate this v v when '/' is requested
var randomWord = words[Math.floor(Math.random()*words.length)];

app.get('/', function(req, res){
    var session = req.session
    var markup;

  // if(session.views){ // if user has submitted data already
  //   session.views++
  // }
  // else { // session START

    var randomWord = words[Math.floor(Math.random()*words.length)]; // generate random on start
    var word = req.session.word;
    var letterArray = word.split(""); // an array with each letter of the random word as an index
    req.session.word = letterArray;

    for (i=0; i < letterArray.length; i++){
        markup += ` <span> _ </span> `
    };


});

app.post('/', function(req, res){


});

app.listen(8080, function(){
  console.log("Server Initialized");
});








//
