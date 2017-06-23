var express = require('express');
var validator = require('express-validator');
var mustache = require('mustache-express');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var jsonfile = require('jsonfile');

var app = express();

app.use(validator());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


// v v  variables   v v
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

// generate this v v when '/' is requested
var randomWord = words[Math.floor(Math.random()*words.length)];
