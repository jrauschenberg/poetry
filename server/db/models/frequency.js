'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    author: {
        type: String
    },
    noun: {
        type: Number
    },
    uncategorized: {
        type: Number
    },
    'preposition or subordinating conjunction': {
        type: Number
    },
    determiner: {
        type: Number
    },
    'coordinating conjunction': {
        type: Number
    },
    adjective: {
        type: Number
    },
    verb: {
        type: Number
    },
    adverb: {
        type: Number
    },
    pronoun: {
        type: Number
    },
    modal: {
        type: Number
    },
    'existential there': {
        type: Number
    },
});

mongoose.model('Frequencies', schema);