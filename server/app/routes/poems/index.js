'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Poems = mongoose.model('Poems');

router.get('/', function(req, res, next) {
  Poems.find({})
  .then(function(poems) {
    console.log("made it to poems", poems[0]);
    res.sendStatus(200);
  }).then(null, next);
});