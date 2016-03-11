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

var seedPoems = function () {
    var berryman = fs.readFileSync('berryman.txt', 'utf-8');
    var plath = fs.readFileSync('plath.txt', 'utf-8');
    var shakespeare = fs.readFileSync('shakespeare.txt', 'utf-8');
    var stevens = fs.readFileSync('stevens.txt', 'utf-8');

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
        }
    ];

    return Poems.createAsync(poems);

};

connectToDb.then(function () {
    
    User.findAsync({}).then(function (users) {
        return seedUsers();
    }).then(function() {
        return seedPoems();
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
