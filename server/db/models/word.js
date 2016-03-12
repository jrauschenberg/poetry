'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({ url: String, text: String, id: Number}, 
           { collection : 'Words' });

mongoose.model('Words', schema);