'use strict';
var router = require('express').Router();
module.exports = router;
var natural = require('natural');
var fs = require('fs');
var path = require('path');
var Tagger = require("../../../../node_modules/natural/lib/natural").BrillPOSTagger;

var base_folder = path.join(__dirname, "../../../../node_modules/natural/lib/natural/brill_pos_tagger");
var rules_file = path.join(base_folder, "/data/English/tr_from_posjs.txt");
var lexicon_file = path.join(base_folder, "/data/English/lexicon_from_posjs.json");
var default_category = 'N';
var arr = [];

router.post('/', function(req, res, next) {
  var result = analyze(req.body.poem);
  res.status(200).send(result);
});

var analyze = function(poem) {
  var POS = tagger.tag(poem);
  var frequencies = {};

  POS.forEach(function(word) {
  var newWord;
  if (word[1] === "N") {
    newWord = "noun";
  } 
  else if (word[1] === "NN" || word[1] === "NNS" || word[1] === "NNP") {
    newWord = "noun";
  } 
  else if (word[1] === undefined) {
    newWord = "undefined";
  } 
  else if (word[1] === "IN") {
    newWord = "preposition or subordinating conjunction";
  } 
  else if (word[1] === "DT") {
    newWord = "determiner";
  } 
  else if (word[1] === "EX") {
    newWord = "existential there";
  } 
  else if (word[1] === "CC") {
    newWord = "coordinating conjunction";
  } 
  else if (word[1] === "JJ" || word[1] === "JJR" || word[1] === "JJS") {
    newWord = "adjective";
  } 
  else if (word[1] === "VB" || word[1] === "VBZ" || word[1] === "VBG" || word[1] === "VBN" || word[1] === "VBP" || word[1] === "VBD") {
    newWord = "verb";
  } 
  else if (word[1] === "RB" || word[1] === "WRB") {
    newWord = "adverb";
  } 
  else if (word[1] === "PRP" || word[1] === "PRP$" || word[1] === "WP" || word[1] === "WP$") {
    newWord = "pronoun";
  } 
  else if (word[1] === "MD") {
    newWord = "modal";
  } 
  else if (word[1] === "EX") {
    newWord = "existential there";
  } 
  if (frequencies[newWord]) {
    frequencies[newWord] ++;
  } else {
    frequencies[newWord] = 1;
  }
});

for (var key in frequencies) {
  frequencies[key] = ((frequencies[key] / POS.length) * 100).toFixed(2);
}
  return frequencies;
};

var tagger = new Tagger(lexicon_file, rules_file, default_category, function(error) {
      if (error) {
        console.error(error);
      }
});
