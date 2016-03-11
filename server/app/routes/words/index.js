'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var csv = require("fast-csv");
var fs = require('fs');
var mongoose = require('mongoose');
var Words = mongoose.model('Words');

router.get('/', function(req, res, next) {
  Words.find({})
  .then(function(words) {
    console.log("made it to words", words.length, words[0]);
    res.sendStatus(200);
  }).then(null, next);
});