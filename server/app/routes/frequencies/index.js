'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Frequencies = mongoose.model('Frequencies');

router.get('/', function(req, res, next) {
  Frequencies.find({})
  .then(function(frequencies) {
    console.log("made it to frequencies", frequencies[0]);
    res.status(200).send(frequencies);
  }).then(null, next);
});