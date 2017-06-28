const express = require('express');
const fs = require('fs');
const validator = require('express-validator');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const jsonfile = require('jsonfile');
const session = require('express-session')


const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


var randomWord;

var easyWords = [];
var normalWords = [];
var hardWords = [];

function wordSorter(){
  console.log('wordSorter runs');
  for(i = 0; i < words.length; i++){
    if (words[i].length < 6){
      easyWords.push(words[i]);
    }
    else if (words[i].length <= 8){
      normalWords.push(words[i]);
    }
    else if (words[i].length > 8) {
      hardWords.push(words[i]);
    }
  }
}

function createWord(req, res){
  console.log('createWord runs');

  var letters = req.session.letters;
  var diffChoice = "normal";

  wordSorter();
  if(!letters){
    letters = req.session.letters = [];

    if(diffChoice == "easy"){
      randomWord = easyWords[Math.floor(Math.random()*easyWords.length)];
    }
    else if(diffChoice == "normal"){
      randomWord = normalWords[Math.floor(Math.random()*normalWords.length)];
    }
    else if(diffChoice == "hard"){
      randomWord = hardWords[Math.floor(Math.random()*hardWords.length)];
    }
    var sessionWord = randomWord.split("");

      for(i=0; i<sessionWord.length; i++){
        letters.push({"letter": sessionWord[i], "correct": false});
        req.session.letters = letters;
      };
  }
};

// ****************

function compareGuess(req, res){

  console.log('compareGuess runs');
  var correct = false;
  var guessArray = req.session.guesses;
  var guessTotal = req.session.guessTotal;
  var correctedGuess = req.body.guess.toLowerCase();

  if (!guessArray) {
    guessArray = req.session.guesses = [];
    // guessTotal = req.session.guessTotal = req.session.letters.length; // if I want number of guesses to equal length of word
    guessTotal = req.session.guessTotal = 8;
  }

  for(i=0; i < req.session.letters.length; i++){ // this bit compares guesses to correct
    if (correctedGuess == req.session.letters[i].letter){
      correct = true;
      req.session.letters[i].correct = true;
    }
  }

  if (!correct){
    req.session.guessTotal--
  }

  guessArray.push(correctedGuess);
  console.log("Guess array is " + guessArray);
  console.log("Guess total is " + req.session.guessTotal);
  return randomWord;
}

// ***************

function checkWin(req, res){
  console.log('checkWin runs');

  var counter = 0;
  for (var i = 0; i < req.session.letters.length; i++) {
    if(!req.session.letters[i].correct) {
      counter ++
      }
    }
    if (counter == 1){
      return true;
    }
    else {
      return false;
    }
    console.log("checkWin returns " + counter);
  }

//watch organizing large express apps
module.exports = {
  sort: wordSorter,
  create: createWord,
  compare: compareGuess,
  check: checkWin,
  randomWord: randomWord
}
