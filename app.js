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



const express = require('express');
const fs = require('fs');
const validator = require('express-validator');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const jsonfile = require('jsonfile');
const session = require('express-session')

const models = require('./models/models.js')

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

// _________________________________________________________________________


app.get('/', function(req, res){
  console.log('user calls GET');
  models.create(req, res);
  res.render('index', { letters: req.session.letters,
                        guesses: req.session.guesses,
                        number: req.session.guessTotal,
                        magic: req.session.guessTotal
                      });

  console.log(req.session.letters);
});

// _____________________________________________________________________

app.post('/playagain', function(req, res){
  console.log('session destroyed');
  req.session.destroy();
  res.redirect('/');
});

// _____________________________________________________________________

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
      if (models.check(req, res)){
        console.log('user wins');
        var rando = models.compare(req, res);
        console.log(rando);
        res.render('index', { letters: req.session.letters,
                              guesses: "you WIN! ... barely",
                              link: `<a href="https://www.merriam-webster.com/dictionary/${rando}" target="_blank">what does ${rando} mean?</a>`,
                              //magic: 8,
                              playagain: `
                            <form class="playagain" action="/playagain" method="post">
                              <button id="again-button" type="sumbit" name="playagain">play again?</button>
                            </form>`
                            })
      }
      else if(req.session.guessTotal != 1){
        models.compare(req, res);
        res.redirect('/');
      }
      else {
        for(i=0; i < req.session.letters.length; i++){
          if (!req.session.letters[i].correct){
            req.session.letters[i].loser = true;
          }
        }
        req.session.guessTotal--
        console.log('user loses');
        var rando = models.compare(req, res);
        console.log(rando);
        res.render('index', { letters: req.session.letters,
                              link: `<a href="https://www.merriam-webster.com/dictionary/${rando}"target="_blank">what does ${rando} mean?</a>`,
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

// _____________________________________________________________________

app.listen(8080, function(){
  console.log("GO FOR IT, G!");
});


//
