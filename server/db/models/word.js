'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({ url: String, text: String, id: Number}, 
           { collection : 'Words' });
    // description: {
    //     type: String
    // },
    // wordNumber: {
    //     type: Number
    // },
    // meanValence: {
    //     type: Number
    // },
    // valenceSD: {
    //     type: Number
    // },
    // meanArousal: {
    //     type: Number
    // },
    // arousalSD: {
    //     type: Number
    // },
    // meanDominance: {
    //     type: Number
    // },
    // dominanceSD: {
    //     type: Number
    // },
    // wordFrequency: {
    //     type: Number
    // },
// });

mongoose.model('Words', schema);