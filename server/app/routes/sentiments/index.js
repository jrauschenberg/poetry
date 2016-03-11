'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Sentiments = mongoose.model('Sentiments');

router.get('/', function(req, res, next) {
  Sentiments.find({})
  .then(function(sentiments) {
    res.status(200).send(sentiments);
  }).then(null, next);
});