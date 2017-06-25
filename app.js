// current working question at line 123


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
}));


const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


// try to take word creation out of .get because it seems to want to restart the word for every redirect to '/'.
// sessionWord is still being redifined each time user visits '/'.


app.use(function(req, res, next){
  var randomWord = words[Math.floor(Math.random()*words.length)]; // generate random on start
  var sessionWord = randomWord.split(""); // an array with each letter of the random word as an index
  // req.session.word = sessionWord; // req.session.word is now an array containing each letter of the random word
  var letters = []; // create empty array of letters
  for(i=0; i<sessionWord.length; i++){
    letters.push({"letter": sessionWord[i], "correct": false});
  };     // letters should now be a 2D array with objects for each letter

  req.session.letters = letters;    // letters should now be stored in session

  next();
});



app.get('/', function(req, res){

    res.render('index', { letters: req.session.letters })

});




app.post('/', function(req, res){

  // insert input validation here

  var guessArray = [];
  var correctedGuess = req.body.guess.toLowerCase();

  for (i=0; i<req.session.letters.length; i++){
    if (correctedGuess == req.session.letters[i].letter){
      req.session.letters[i].correct = true;
    } // tested in node console and it works.
  };  // req.session.letters.correct should read true if the guess matched.

  guessArray.push(correctedGuess);

  res.render('index', { letters: req.session.letters,
                        guesses: guessArray });
});




app.listen(8080, function(){
  console.log("GO FOR IT, G!");
});









//
