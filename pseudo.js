// current problem @6:50pm Sunday June 25th




save it


function compareGuess(req, res){

  console.log('running');
  var guessArray = req.session.guesses;
  var guessTotal = req.session.guessTotal;
  var correctedGuess = req.body.guess.toLowerCase();

  if (!guessArray) {
    guessArray = req.session.guesses = [];
    guessTotal = req.session.letters.length;
  }

  for(i=0; i < req.session.letters.length; i++){ // this bit compares guesses to correct
    if (correctedGuess == req.session.letters[i].letter){
      req.session.letters[i].correct = true;
    }
  }

  guessArray.push(correctedGuess);
  guessTotal--
  console.log("guesses altered");
  console.log(guessArray);
}


// a session starts when user first requests '/'
// user should see empty _ for each letter of the generated words
// user should see an input field and be encouraged to guess a letter
// user will still be viewing the "GET" at this point.
/* once user clicks the submit button for the input form the user will be
transfered to a POST that resubmits the HTML but now with the users guessed letter
appears either in place of one of the "_" or if incorrect, in a list of guessed letters */
// mustache requires the definition of a key-value pair. I could append an object to an array.
//
// if jsonfile.guesses.correct == "false"

// will this work:

var guesses = require('guesses.json')
//or maybe needs:
var guesses = guesses.readFile('./guesses.json', function(err, obj){
  console.dir(obj);
});
//and guesses.json is something like:
{ "guess": "m",
  "correct": false
}
{ "guess": "t",
  "correct": true
}

//so maybe if guesses.correct == true, add to markup....
{{#guesses}}
  {{#guesses.correct}}
  <span>{{gueses.guess}}
  {{/guesses.correct}}
  {{^guesses.correct}}
  <span>_<span>
  {{/guesses.correct}}
{{guesses.guess}}

//will this work? If so you've nearly got the whole thing. Will test later.

// this will only display "_" for the number of guesses.
// maybe it's better to store the correct word in the json.
// then when the user input matches guesses.letter, change guesses.correct to true.
// but this stores a json file for every user interaction. Obviously not scalable, so maybe best just to store it in the mystery zone that is the session. So that might look like this:
// -- ('index.mustache', { letters: req.session.guesses}) ... that's it, just store an object in the session. convert sessionWord[] to an object, maybe like this:
var guesses = []
for (i=0; i < sessionWord.length; i++){
  guesses.push({"letter": sessionWord[i], "correct": false});
} // this should append an object for each letter of the word. Time to test it:

// -- Eyup, this creates an array containing an object for each letter with correct=false

// req.session.guesses = guesses;
// now guesses is stored in the session.
// using templating in mustache, ('index', {letters: req.session.guesses})
// then, from above but corrected:
{{#letters}}
  {{#letters.correct}}
  <span>{{letters.letter}}
  {{/letters.correct}}
  {{^letters.correct}}
  <span>_<span>
  {{/letters.correct}}
{{/letters}}

// this probably wont display things in the correct order... will have to test later on.
// if it doesn't store in the correct order, try rearranging the #/^/ to # ^ / /
// -- in other words, nest the ^ inside #/ so maybe it wont upset the order






// can I store letters and words in an object?
// the object could have key:value pairs like:
// --  {"letter": "o",
// --   "guessed": false}
// the question is how to a get the user's guess and use it change false to true
// AND how do I use whether or not guessed equals false to tell whether or not to show _ or the letter

//currently I have an array of letters. When user uses input to guess a letter
sessionWord = ['c', 'o', 'm', 'p', 'a', 's', 's', 'i', 'o', 'n']
// -- var currentGuess = 's'
for (i=0: i < sessionWord.length; i++){
 if currentGuess =
};

//maybe I can do this instead:
// -- var currentGuess = [];
for (i=0: i < sessionWord.length; i++){
 currentGuess.push("_");
}
// this logic works, but the array is hard to access in index.mustache.
// definitely better to have currentGuess and

so store guessed letters in an object with guesses {"letter": "s", "correct": true}
for (i=0: i < sessionWord.length; i++){
  if (req.body.guess == "sessionWord[i]"){
    var obj = req.body.guess;
    jsonOfGuesses.writeFile(file, obj, {flag: 'a'}, function (err) {
        console.log(err);
      });
    }
    else {
      ?
    }
};

data.js = someting like this:
module.exports = {
  users:[
    {
    username: "ahgipadg",
    password: "ahgdipa"
    }
    {
      etc
    }
  ]
}

var data = require('data.js')


function authenticate(username, password){
  var authenticatedUser = data.users.find(function (user) {
      if(user.username === username && user.password === password){
        req.session.authenticated = true
      }
      else {
        return false
      }
  })
  return req.session.authenticated
}

you can chain GETs and POSTs:

app.get('/', function(req, res, next){
  res.send('Do something')
})

app.get('/', function(req, res, next){
  get user name and password
})



app.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(username, password);
})
//
