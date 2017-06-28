// todo for mvp

// -- make black screen blackest when lose instead of clearing it
// -- style remaining elements?
// -- move functions to modules.js and export

// beast mode
// -- user selects difficulty
      //** difficulties are set, just need to let user define
// -- user shouldn't be able to enter same letter twice
      /* ** "If the user guesses the same letter twice, do not take away a guess. Instead, display a message letting them know they've already guessed that letter and ask them to try again." */
// -- display something grim on loss
// -- better celebration on winning
// If a user wins, ask for their name and create a page that shows all the winners so far.
// If a user wins, ask for their name and optionally an image to upload. Show their image on the winners page.



var express = require('express');
var fs = require('fs');
var validator = require('express-validator');
var mustache = require('mustache-express');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var jsonfile = require('jsonfile');
var session = require('express-session')

var app = express();

app.use(express.static('public'));
app.use(express.static('scripts'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.use(session({       // setup sessions
  secret: 'cookiepartycookiepartycookieparty',
  resave: false,
  saveUninitialized: true
}));

//
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// var randomWord;
//
// var easyWords = [];
// var normalWords = [];
// var hardWords = [];
//
// function wordSorter(){
//   console.log('wordSorter runs');
//   for(i = 0; i < words.length; i++){
//     if (words[i].length < 6){
//       easyWords.push(words[i]);
//     }
//     else if (words[i].length <= 8){
//       normalWords.push(words[i]);
//     }
//     else if (words[i].length > 8) {
//       hardWords.push(words[i]);
//     }
//   }
// }
//
// function createWord(req, res){
//   console.log('createWord runs');
//
//   var letters = req.session.letters;
//   var diffChoice = "normal";
//
//   wordSorter();
//   if(!letters){
//     letters = req.session.letters = [];
//
//     if(diffChoice == "easy"){
//       randomWord = easyWords[Math.floor(Math.random()*easyWords.length)];
//       console.log(randomWord);
//     }
//     else if(diffChoice == "normal"){
//       randomWord = normalWords[Math.floor(Math.random()*normalWords.length)];
//       console.log(randomWord);
//     }
//     else if(diffChoice == "hard"){
//       randomWord = hardWords[Math.floor(Math.random()*hardWords.length)];
//       console.log(randomWord);
//     }
//     console.log(randomWord);
//     var sessionWord = randomWord.split("");
//
//       for(i=0; i<sessionWord.length; i++){
//         letters.push({"letter": sessionWord[i], "correct": false});
//         req.session.letters = letters;
//       };
//   }
// };
//
// // ****************
//
// function compareGuess(req, res){
//
//   console.log('compareGuess runs');
//   var correct = false;
//   var guessArray = req.session.guesses;
//   var guessTotal = req.session.guessTotal;
//   var correctedGuess = req.body.guess.toLowerCase();
//
//   if (!guessArray) {
//     guessArray = req.session.guesses = [];
//     // guessTotal = req.session.guessTotal = req.session.letters.length; // if I want number of guesses to equal length of word
//     guessTotal = req.session.guessTotal = 8;
//   }
//
//   for(i=0; i < req.session.letters.length; i++){ // this bit compares guesses to correct
//     if (correctedGuess == req.session.letters[i].letter){
//       correct = true;
//       req.session.letters[i].correct = true;
//     }
//   }
//
//   if (!correct){
//     req.session.guessTotal--
//   }
//
//   guessArray.push(correctedGuess);
//   console.log(guessArray);
//   console.log(req.session.guessTotal);
//   return randomWord;
// }
//
// // ***************
//
// function checkWin(req, res){
//   console.log('checkWin runs');
//
//   var counter = 0;
//   for (var i = 0; i < req.session.letters.length; i++) {
//     if(!req.session.letters[i].correct) {
//       counter ++
//       }
//     }
//     console.log(counter);
//     if (counter == 1){
//       return true;
//     }
//     else {
//       return false;
//     }
//     console.log("checkWin returns " + counter);
//   }

// _________________________________________________________________________


app.get('/', function(req, res){
  console.log('user calls GET');
  createWord(req, res);
  // checkWin(req, res);
  res.render('index', { letters: req.session.letters,
                        guesses: req.session.guesses,
                        number: req.session.guessTotal,
                        magic: req.session.guessTotal
                      });

  console.log(req.session.letters);
});

app.post('/playagain', function(req, res){
  console.log('session destroyed');
  req.session.destroy();
  res.redirect('/');
});


app.post('/', function(req, res){
  console.log('user sends POST');
  req.checkBody('guess', 'please enter a letter...').notEmpty().isAlpha().isLength({min:1, max: 1});

    if(req.validationErrors()) {
      console.log('error logged');
      res.render('index', { letters: req.session.letters,
                            err: "quit fucking around, this is serious..."
                          })
    }
    else {
      if (checkWin(req, res)){
        console.log('user wins');
        compareGuess(req, res);
        res.render('index', { letters: req.session.letters,
                              guesses: "you WIN! ... barely",
                              link: `<a href="https://www.merriam-webster.com/dictionary/${randomWord}" target="_blank">what does ${randomWord} mean?</a>`,
                              //magic: 8,
                              playagain: `
                            <form class="playagain" action="/playagain" method="post">
                              <button id="again-button" type="sumbit" name="playagain">play again?</button>
                            </form>`
                            })
      }
      else if(req.session.guessTotal != 0){
        compareGuess(req, res);
        res.redirect('/');
      }
      else {
        for(i=0; i < req.session.letters.length; i++){
          if (!req.session.letters[i].correct){
            //add new key-value of "loser": true;
            req.session.letters[i].loser = true;
          }
        }
        req.session.guessTotal--
        console.log('user loses');
        res.render('index', { letters: req.session.letters,
                              link: `<a href="https://www.merriam-webster.com/dictionary/${randomWord}"target="_blank">what does ${randomWord} mean?</a>`,
                              guesses: "you lose.",
                              number: 0,
                              magic: req.session.guessTotal,
                              loser: req.session.letters,
                              playagain:`
                            <form class="playagain" action="/playagain" method="post">
                              <button id="again-button" type="sumbit" name="playagain">play again?</button>
                            </form>`
                            })

      }

    }
});

app.listen(8080, function(){
  console.log("GO FOR IT, G!");
});







//
