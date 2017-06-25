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



// v v  fileSync with err   v v
// var rawWords = fs.readFileSync("/usr/share/dict/words", "utf-8", (err) => {
//   if (err) throw err;
//   console.log("file accessed succesfully");
// });
//
// var words = rawWords.toLowerCase().split("\n");

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// does this work, above? error says cannot read .split of undefined

app.use(function (req, res, next) {

  next()
})








app.use(session({       // setup sessions
  secret: 'cookiepartycookiepartycookieparty',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(req, res){
    var markup;

  // if(session.views){ // if user has submitted data already
  //   session.views++
  // }
  // else { // session START

    var randomWord = words[Math.floor(Math.random()*words.length)]; // generate random on start
    var sessionWord = randomWord.split(""); // an array with each letter of the random word as an index
    // req.session.word = sessionWord; // req.session.word is now an array containing each letter of the random word
    var letters = []; // create empty array of letters
    for(i=0; i<sessionWord.length; i++){ // loop through sessionWord
      letters.push({"letter": sessionWord[i], "correct": false});
    };     // letters should now be a 2D array with objects for each letter

    req.session.letters = letters;    // letters should now be stored in session


    res.render('index', { letters: req.session.letters})

});




app.post('/', function(req, res){

});

app.listen(8080, function(){
  console.log("GO FOR IT, G!");
});









//
