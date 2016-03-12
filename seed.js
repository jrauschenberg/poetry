/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var fs = require('fs');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Poems = Promise.promisifyAll(mongoose.model('Poems'));
var Frequencies = Promise.promisifyAll(mongoose.model('Frequencies'));
var Words = Promise.promisifyAll(mongoose.model('Words'));
var Sentiments = Promise.promisifyAll(mongoose.model('Sentiments'));

var berryman = fs.readFileSync('berryman.txt', 'utf-8');
var plath = fs.readFileSync('plath.txt', 'utf-8');
var shakespeare = fs.readFileSync('shakespeare.txt', 'utf-8');
var stevens = fs.readFileSync('stevens.txt', 'utf-8');
var cummings = fs.readFileSync('cummings.txt', 'utf-8');

var berrymanSentiment, plathSentiment, shakespeareSentiment, stevensSentiment, cummingsSentiment;


var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var sentimentAnalysis = function(text, words) {
    text = text.split(/[\n ]/);
    var overallValence = 0;
    var overallValenceValue = 0;
    text.forEach(function(word) {
        words.forEach(function(instance) {
          if (word === instance.description) {
            overallValence ++ ;
            overallValenceValue += instance.meanValence;
          }
        });
    });
    overallValence = overallValenceValue/overallValence;
    return overallValence;
};

var seedSentiments = function () {

    sentiments = [
        {
            author: 'Sylvia Plath',
            sentiment: 5.78
        },
        {
            author: 'William Shakespeare',
            sentiment: 6.00
        },
        {
            author: 'Wallace Stevens',
            sentiment: 6.33
        },
        {
            author: 'John Berryman',
            sentiment: 6.02
        },
        {
            author: 'E.E. Cummings',
            sentiment: 6.46
        }
    ];

    return Sentiments.createAsync(sentiments);

};

var seedPoems = function () {

    var poems = [
        {
            text: plath,
            author: 'Sylvia Plath'
        },
        {
            text: shakespeare,
            author: 'William Shakespeare'
        },
        {
            text: stevens,
            author: 'Wallace Stevens'
        },
        {
            text: berryman,
            author: 'John Berryman'
        },
        {
            text: cummings,
            author: 'E.E. Cummings'
        }
    ];

    return Poems.createAsync(poems);

};

var seedFrequencies = function () {

    var frequencies = [
        {
            author: 'Wallace Stevens',
        noun: '35.80',
        undefined: '3.59',
        'preposition or subordinating conjunction': '15.15',
        determiner: '10.55',
        'coordinating conjunction': '5.39',
        adjective: '7.52',
        verb: '9.09',
        adverb: '3.48',
        pronoun: '6.96',
        modal: '2.24',
        'existential there': '0.22'
    }, {
        author: 'John Berryman',
        noun: '33.46',
    verb: '14.71',
    undefined: '5.88',
    determiner: '11.40',
    adjective: '4.04',
    pronoun: '7.72',
    'preposition or subordinating conjunction': '8.09',
    modal: '2.57',
    'coordinating conjunction': '5.15',
    adverb: '6.25',
    'existential there': '0.74'
    }, {
        author: 'Sylvia Plath',
        pronoun: '7.75',
    verb: '12.10',
    adverb: '5.67',
    noun: '36.11',
    determiner: '11.15',
    adjective: '5.48',
    'preposition or subordinating conjunction': '10.02',
    undefined: '5.48',
    'coordinating conjunction': '4.54',
    'existential there': '0.19',
    modal: '1.51'
    }, {
        author: 'William Shakespeare',
        noun: '28.87',
    'preposition or subordinating conjunction': '6.27',
    determiner: '4.42',
    adjective: '3.15',
    verb: '7.73',
    adverb: '2.68',
    'coordinating conjunction': '2.51',
    undefined: '36.91',
    pronoun: '6.11',
    modal: '1.25',
    'existential there': '0.09'
    },
    {
        author: 'E.E. Cummings',
        pronoun: '6.91',
    noun: '29.47',
    verb: '13.62',
    'preposition or subordinating conjunction': '11.59',
    undefined: '13.82',
    determiner: '7.11',
    adjective: '6.50',
    adverb: '4.88',
    modal: '2.24',
    'coordinating conjunction': '3.86'
    }

    ];

    return Frequencies.createAsync(frequencies);

};

connectToDb.then(function () {
    
    User.findAsync({}).then(function (users) {
        return seedUsers();
    }).then(function() {
        return seedPoems();
    }).then(function() {
        return seedFrequencies();
    }).then(function() {
        return seedSentiments();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).then(function () {
      
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
