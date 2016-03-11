'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    author: {
        type: String
    },
    sentiment: {
      type: Number
    }
});

mongoose.model('Sentiments', schema);