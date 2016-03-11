'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    text: {
        type: String
    },
    author: {
        type: String
    }
});

mongoose.model('Poems', schema);